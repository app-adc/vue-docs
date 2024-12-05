<script setup lang="ts">
import type { PropsInput } from '@/ABC/bc-types'
import BcForm from '@/ABC/components/BcForm.vue'
import { swCalendarBetween } from 'adc-calendar'
import { dateToCombine, toCombineText } from 'adc-directive'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

export type DateRange = [string, string] | null

type PropsBcCalendarBetween = Omit<PropsInput, 'dataValue'> & {
    /**
     * Selected date range values in string format
     */
    dataValue: DateRange
    /**
     * Minimum selectable date
     */
    minDate?: Date
    /**
     * Maximum selectable date
     */
    maxDate?: Date
    /**
     * Calendar ID for DOM reference
     * @default 'bc-calendar-between'
     * @Param calendarId ใช้สำหรับกำหนด id ของ calendar ที่จะใช้ในการ render ในกรณีที่มีหลาย calendar ในหน้าเดียวกัน
     */
    calendarId?: string
    /**
     * Calendar position style
     * @default 'absolute'
     */
    position?: 'absolute' | 'relative'
}

type CalendarEmits = {
    (e: 'input', dates: DateRange): void
    (e: 'focus'): void
    (e: 'blur'): void
}

const props = withDefaults(defineProps<PropsBcCalendarBetween>(), {
    calendarId: 'bc-calendar-between',
    position: 'absolute',
    icon: 'CalendarDays',
    isClear: true,
})

const emit = defineEmits<CalendarEmits>()

// State
const calendarRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const calendar = ref<any>(null)
const dataForSubmit = ref<DateRange>(null)

// Computed
const displayValue = computed((): string => {
    if (!dataForSubmit.value?.length && !props.dataValue?.length) return ''

    if (dataForSubmit.value?.length) {
        return toCombineText(
            dataForSubmit.value.map((date) => {
                if (date) {
                    const dateShow = new Date(date).toLocaleDateString(
                        'th-TH',
                        {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                        }
                    )
                    return dateShow
                }
                return ''
            }),
            ' - '
        )
    } else {
        if (!props.dataValue?.length) return ''

        return toCombineText(
            props.dataValue.map((date) => {
                if (date) {
                    const dateShow = new Date(date).toLocaleDateString(
                        'th-TH',
                        {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                        }
                    )
                    return dateShow
                }
                return ''
            }),
            ' - '
        )
    }
})

const containerClasses = computed(() => ({
    'bc-calendar': true,
    'bc-calendar--open': isOpen.value,
    [`bc-calendar--${props.position}`]: true,
}))

// Methods
const initializeCalendar = (): void => {
    calendar.value = new swCalendarBetween(`#${props.calendarId}`, {
        values: [new Date(), new Date()],
        min: props.minDate,
        max: props.maxDate,
        style: {
            background: '#ffffff',
        },
        lang: 'thai',
        year: 'th',
        nextDate: (res: Date[]) => {
            const startDate = dateToCombine(res[0])
            const endDate = dateToCombine(res[1])
            emit('input', [startDate.valueOfDate, endDate.valueOfDate])
            dataForSubmit.value = [startDate.valueOfDate, endDate.valueOfDate]
            closeCalendar()
        },
    })
}

const toggleCalendar = (): void => {
    if (isOpen.value) {
        closeCalendar()
    } else {
        openCalendar()
    }
}

const openCalendar = (): void => {
    if (props.disabled) return
    calendar.value?.render()
    isOpen.value = true
    emit('focus')
}

const closeCalendar = (): void => {
    calendar.value?.stop()
    isOpen.value = false
    emit('blur')
}

const handleClickOutside = (event: MouseEvent): void => {
    if (
        calendarRef.value &&
        !calendarRef.value.contains(event.target as Node)
    ) {
        closeCalendar()
    }
}

const handleClear = (): void => {
    emit('input', ['', ''])
    dataForSubmit.value = null
    closeCalendar()
}

// Lifecycle hooks
onMounted(() => {
    initializeCalendar()
    console.log('swCalendarBetween >>', calendar.value)
})

// Cleanup
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    calendar.value?.stop
})

// Watchers
watch(() => props.minDate, initializeCalendar)
watch(() => props.maxDate, initializeCalendar)
watch(() => props.dataValue, initializeCalendar)
</script>

<template>
    <div ref="calendarRef" class="relative">
        <BcForm v-bind="props" :data-value="displayValue" @clear="handleClear">
            <input
                :id="id"
                readonly
                :value="displayValue"
                class="w-full disabled:bg-[#F9FAFB] cursor-pointer !left-4"
                :class="{ '!pl-9': icon }"
                :placeholder="placeholder"
                :disabled="disabled"
                @click="toggleCalendar"
                :data-cy="id"
            />
        </BcForm>

        <div v-show="isOpen" :class="containerClasses" :aria-details="position">
            <div :id="calendarId"></div>
        </div>
    </div>
</template>

<style scoped>
.bc-calendar {
    min-width: 300px;
    max-width: 320px;
    position: relative;
    z-index: 10;
    background-color: white;
    border-radius: var(--borderRadius);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.bc-calendar--absolute {
    position: absolute;
    top: calc(100% + 4px);
}

.bc-calendar--relative {
    position: relative;
    margin-top: 0.5rem;
}
</style>
