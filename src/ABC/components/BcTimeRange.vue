<script setup lang="ts">
import { ref, computed } from 'vue'
import BcForm from '@/ABC/components/BcForm.vue'
import type { PropsInput } from '@/ABC/bc-types'

type TimeFormat = '12h' | '24h'
export type TimeRange = [string | null, string | null]

type PropsBcTimeRange = Omit<PropsInput, 'dataValue'> & {
    /**
     * ช่วงเวลาที่เลือก [เวลาเริ่มต้น, เวลาสิ้นสุด]
     */
    dataValue: TimeRange
    /**
     * รูปแบบการแสดงเวลา
     * @default '24h'
     */
    format?: TimeFormat
    /**
     * เวลาต่ำสุดที่เลือกได้
     */
    minTime?: string
    /**
     * เวลาสูงสุดที่เลือกได้
     */
    maxTime?: string
    /**
     * ช่วงเวลาระหว่างตัวเลือก (นาที)
     * @default 30
     */
    step?: number
}

const props = withDefaults(defineProps<PropsBcTimeRange>(), {
    format: '24h',
    step: 30,
    icon: 'Clock',
    isClear: true,
})

const emit = defineEmits<{
    (e: 'input', value: TimeRange): void
    (e: 'focus'): void
    (e: 'blur'): void
}>()

// State
const activeInput = ref<'start' | 'end' | null>(null)
const isOpen = ref(false)

// Utils
const padNumber = (num: number): string => num.toString().padStart(2, '0')

const convertTimeToMinutes = (time: string): number => {
    const [timeStr, period] = time.split(' ')
    const [hours, minutes] = timeStr.split(':').map(Number)
    let totalMinutes = hours * 60 + minutes

    if (period === 'PM' && hours !== 12) {
        totalMinutes += 12 * 60
    } else if (period === 'AM' && hours === 12) {
        totalMinutes = minutes
    }

    return totalMinutes
}

// Computed
const timeOptions = computed(() => {
    const times: string[] = []
    const totalMinutes = 24 * 60
    const start = props.minTime ? convertTimeToMinutes(props.minTime) : 0
    const end = props.maxTime
        ? convertTimeToMinutes(props.maxTime)
        : totalMinutes

    for (let minutes = start; minutes <= end; minutes += props.step) {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60

        if (props.format === '24h') {
            times.push(`${padNumber(hours)}:${padNumber(mins)}`)
        } else {
            const period = hours >= 12 ? 'PM' : 'AM'
            const displayHours = hours % 12 || 12
            times.push(
                `${padNumber(displayHours)}:${padNumber(mins)} ${period}`
            )
        }
    }

    return times
})

const displayValue = computed(() => {
    const [start, end] = props.dataValue
    if (!start || !end) return ''
    return `${start} - ${end}`
})

const filteredTimeOptions = computed(() => {
    // ถ้าเลือกเวลาเริ่มต้น จะแสดงเฉพาะเวลาที่มากกว่าเวลาเริ่มต้น
    if (activeInput.value === 'end' && props.dataValue[0]) {
        return timeOptions.value.filter(
            (time) =>
                convertTimeToMinutes(time) >
                convertTimeToMinutes(props.dataValue[0]!)
        )
    }
    // ถ้าเลือกเวลาสิ้นสุด จะแสดงเฉพาะเวลาที่น้อยกว่าเวลาสิ้นสุด
    else if (activeInput.value === 'start' && props.dataValue[1]) {
        return timeOptions.value.filter(
            (time) =>
                convertTimeToMinutes(time) <
                convertTimeToMinutes(props.dataValue[1]!)
        )
    }

    return timeOptions.value
})

// Methods
const handleSelect = (time: string) => {
    const [start, end] = props.dataValue
    let newRange: TimeRange

    if (activeInput.value === 'start') {
        // ถ้ามีเวลาสิ้นสุดอยู่แล้ว ตรวจสอบว่าเวลาที่เลือกต้องน้อยกว่า
        if (end && convertTimeToMinutes(time) >= convertTimeToMinutes(end)) {
            return // ไม่อนุญาตให้เลือกเวลาเริ่มต้นที่มากกว่าหรือเท่ากับเวลาสิ้นสุด
        }
        newRange = [time, end]
        activeInput.value = 'end'
    } else {
        // ถ้ามีเวลาเริ่มต้นอยู่แล้ว ตรวจสอบว่าเวลาที่เลือกต้องมากกว่า
        if (
            start &&
            convertTimeToMinutes(time) <= convertTimeToMinutes(start)
        ) {
            return // ไม่อนุญาตให้เลือกเวลาสิ้นสุดที่น้อยกว่าหรือเท่ากับเวลาเริ่มต้น
        }
        newRange = [start, time]
        isOpen.value = false
        activeInput.value = null
    }

    emit('input', newRange)
    if (!isOpen.value) emit('blur')
}

const handleClear = () => {
    emit('input', [null, null])
    isOpen.value = false
    activeInput.value = null
}

const toggleDropdown = (type: 'start' | 'end') => {
    if (!props.disabled) {
        activeInput.value = type
        isOpen.value = true
        emit('focus')
    }
}
</script>

<template>
    <BcForm v-bind="props" :data-value="displayValue" @clear="handleClear">
        <div class="relative flex items-center gap-2">
            <!-- Start Time -->
            <div class="relative flex-1">
                <input
                    :id="`${id}-start`"
                    type="text"
                    readonly
                    :value="dataValue[0]"
                    placeholder="เริ่มต้น"
                    :disabled="disabled"
                    class="w-full disabled:bg-[#F9FAFB] cursor-pointer"
                    :class="{ '!pl-9': icon }"
                    @click="toggleDropdown('start')"
                />
            </div>

            <span class="text-slate-400">-</span>

            <!-- End Time -->
            <div class="relative flex-1">
                <input
                    :id="`${id}-end`"
                    type="text"
                    readonly
                    :value="dataValue[1]"
                    placeholder="สิ้นสุด"
                    :disabled="disabled"
                    class="w-full disabled:bg-[#F9FAFB] cursor-pointer"
                    @click="toggleDropdown('end')"
                />
            </div>

            <!-- Dropdown -->
            <div
                v-if="isOpen"
                class="absolute z-50 w-[calc(50%-0.75rem)] mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto time-dropdown"
                :class="{
                    'left-0': activeInput === 'start',
                    'right-0': activeInput === 'end',
                }"
            >
                <div
                    v-for="time in filteredTimeOptions"
                    :key="time"
                    class="px-4 py-2 cursor-pointer hover:bg-slate-50 transition-colors"
                    :class="{
                        'bg-primary/10 text-primary':
                            (activeInput === 'start' &&
                                time === dataValue[0]) ||
                            (activeInput === 'end' && time === dataValue[1]),
                        'opacity-50 cursor-not-allowed':
                            (activeInput === 'end' &&
                                dataValue[0] &&
                                convertTimeToMinutes(time) <=
                                    convertTimeToMinutes(dataValue[0])) ||
                            (activeInput === 'start' &&
                                dataValue[1] &&
                                convertTimeToMinutes(time) >=
                                    convertTimeToMinutes(dataValue[1])),
                    }"
                    @click="handleSelect(time)"
                >
                    {{ time }}
                </div>
            </div>
        </div>
    </BcForm>
</template>

<style scoped>
.time-dropdown {
    scrollbar-width: thin;
    scrollbar-color: #e2e8f0 transparent;
}

.time-dropdown::-webkit-scrollbar {
    width: 6px;
}

.time-dropdown::-webkit-scrollbar-track {
    background: transparent;
}

.time-dropdown::-webkit-scrollbar-thumb {
    background-color: #e2e8f0;
    border-radius: 3px;
}
</style>
