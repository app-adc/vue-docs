<script setup lang="ts">
import { ref, computed } from 'vue'
import BcForm from '@/ABC/components/BcForm.vue'
import type { PropsInput } from '@/ABC/bc-types'

type TimeFormat = '12h' | '24h'
type TimeValue = string | null

type PropsBcTime = Omit<PropsInput, 'dataValue'> & {
    /**
     * ค่าเวลาที่เลือก (รูปแบบ HH:mm หรือ hh:mm a)
     */
    dataValue: TimeValue
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

const props = withDefaults(defineProps<PropsBcTime>(), {
    format: '24h',
    step: 30,
    icon: 'Clock',
    isClear: true,
})

const emit = defineEmits<{
    (e: 'input', value: TimeValue): void
    (e: 'focus'): void
    (e: 'blur'): void
}>()

// State
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

const displayValue = computed(() => props.dataValue || '')

// Methods
const handleSelect = (time: string) => {
    emit('input', time)
    isOpen.value = false
    emit('blur')
}

const handleClear = () => {
    emit('input', null)
    isOpen.value = false
}

const toggleDropdown = () => {
    if (!props.disabled) {
        isOpen.value = !isOpen.value
        if (isOpen.value) emit('focus')
        else emit('blur')
    }
}
</script>

<template>
    <BcForm v-bind="props" :data-value="displayValue" @clear="handleClear">
        <div class="relative w-full">
            <input
                :id="id"
                type="text"
                readonly
                :value="displayValue"
                :placeholder="placeholder"
                :disabled="disabled"
                class="w-full disabled:bg-[#F9FAFB] cursor-pointer"
                :class="{ '!pl-9': icon }"
                @click="toggleDropdown"
            />

            <!-- Dropdown -->
            <div
                v-if="isOpen"
                class="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto time-dropdown"
            >
                <div
                    v-for="time in timeOptions"
                    :key="time"
                    class="px-4 py-2 cursor-pointer hover:bg-slate-50 transition-colors"
                    :class="{
                        'bg-primary/10 text-primary': time === dataValue,
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
