<script setup lang="ts">
import { computed, ref } from 'vue'
import BcIcon from './BcIcon.vue'

interface Props {
    /**
     * ค่าคะแนนที่เลือก (1-maxRating)
     */
    dataValue: number
    /**
     * คะแนนสูงสุดที่สามารถให้ได้
     */
    maxRating?: number
    /**
     * ขนาดของ rating
     */
    size?: number
    /**
     * ปิดการใช้งาน
     */
    disabled?: boolean
    /**
     * แสดงคะแนนเป็นตัวเลข
     */
    showScore?: boolean
    /**
     * ข้อความที่แสดงเหนือหรือใต้ rating
     */
    label?: string
    /**
     * ตำแหน่งของ label (เหนือหรือใต้ rating)
     */
    labelPosition?: 'top' | 'bottom'
    /**
     * อนุญาตให้เลือกครึ่งดาว
     */
    allowHalf?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    maxRating: 5,
    size: 24,
    disabled: false,
    showScore: false,
    labelPosition: 'top',
    allowHalf: false,
})

const emit = defineEmits<{
    (e: 'input', value: number): void
}>()

// State
const hoverValue = ref(0)
const isHalfStar = ref(false)

// Computed styles
const containerClasses = computed(() => [
    'inline-flex gap-2',
    props.labelPosition === 'top' ? 'flex-col' : 'flex-col-reverse',
    props.disabled && 'opacity-50 cursor-not-allowed',
])

const starsContainerClasses = computed(() => [
    'flex flex-col items-center gap-1',
    !props.disabled && 'cursor-pointer',
])

const starsClasses = computed(() => ['flex items-center gap-1'])

const labelClasses = computed(() => [
    'text-sm font-medium text-slate-600 text-center w-full',
])

// Methods
const calculateRating = (index: number, event: MouseEvent) => {
    if (!props.allowHalf) {
        return index + 1
    }
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = event.clientX - rect.left
    isHalfStar.value = x < rect.width / 2
    return isHalfStar.value ? index + 0.5 : index + 1
}

const handleMouseMove = (index: number, event: MouseEvent) => {
    if (props.disabled) return
    hoverValue.value = calculateRating(index, event)
}

const handleMouseLeave = () => {
    hoverValue.value = 0
    isHalfStar.value = false
}

const handleClick = (index: number, event: MouseEvent) => {
    if (props.disabled) return
    const newValue = calculateRating(index, event)
    emit('input', newValue)
}

const stars = computed(() => {
    return Array.from({ length: props.maxRating }, (_, index) => {
        const value = index + 1
        const currentValue = hoverValue.value || props.dataValue
        const isHalf = currentValue === index + 0.5
        const isFull = currentValue >= value

        return {
            value,
            isFull,
            isHalf,
        }
    })
})
</script>

<template>
    <div :class="containerClasses">
        <label v-if="label" :class="labelClasses">
            {{ label }}
        </label>

        <div :class="starsContainerClasses">
            <div class="flex items-center">
                <div
                    :class="starsClasses"
                    @mouseleave="handleMouseLeave"
                    role="radiogroup"
                    :aria-label="label || 'Rating'"
                >
                    <button
                        v-for="(star, index) in stars"
                        :key="index"
                        type="button"
                        role="radio"
                        :aria-checked="star.isFull || star.isHalf"
                        :aria-label="
                            star.isHalf
                                ? `${index + 0.5} of ${maxRating} stars`
                                : `${index + 1} of ${maxRating} stars`
                        "
                        class="transition-transform duration-200 hover:scale-110 relative"
                        :class="{ 'scale-105': star.isFull || star.isHalf }"
                        :style="{ width: `${size}px`, height: `${size}px` }"
                        @mousemove="handleMouseMove(index, $event)"
                        @click="handleClick(index, $event)"
                        :disabled="disabled"
                    >
                        <!-- Outline Star -->
                        <BcIcon
                            name="Star"
                            :size="size"
                            color="icon"
                            class="absolute inset-0"
                            :style="{
                                visibility:
                                    !star.isFull && !star.isHalf
                                        ? 'visible'
                                        : 'hidden',
                            }"
                        />

                        <!-- Filled Star Container -->
                        <div
                            class="absolute inset-0 overflow-hidden"
                            :style="{
                                width: star.isHalf ? '50%' : '100%',
                                visibility:
                                    star.isFull || star.isHalf
                                        ? 'visible'
                                        : 'hidden',
                            }"
                        >
                            <!-- Filled Star -->
                            <svg
                                :width="size"
                                :height="size"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 2L14.81 8.62L22 9.24L16.55 13.97L18.18 21L12 17.27L5.82 21L7.45 13.97L2 9.24L9.19 8.62L12 2Z"
                                    fill="var(--warning)"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
                <span
                    v-if="showScore"
                    class="text-sm font-medium min-w-[3rem] text-center"
                    :class="dataValue > 0 ? 'text-warning' : 'text-slate-400'"
                >
                    {{ dataValue || 0 }}/{{ maxRating }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
    transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
    transform: scale(0.9);
    opacity: 0;
}

button:focus-visible {
    outline: 2px solid var(--warning);
    outline-offset: 2px;
    border-radius: 4px;
}
</style>
