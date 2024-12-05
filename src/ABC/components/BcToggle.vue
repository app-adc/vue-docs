<script setup lang="ts">
import type { ColorName } from '@/ABC/bc-types'
import { computed } from 'vue'

/**
 * Props สำหรับ Toggle component
 */
interface PropsToggle {
    /**
     * สถานะของ toggle (เปิด/ปิด)
     */
    modelValue: boolean
    /**
     * สีของ toggle เมื่อเปิด
     * @default 'primary'
     */
    color?: ColorName
    /**
     * รหัสสำหรับอ้างอิง
     */
    id?: string
    /**
     * ข้อความที่แสดงคู่กับ toggle
     */
    label?: string
    /**
     * ตำแหน่งของ label
     * @default 'right'
     */
    labelAlign?: 'left' | 'right'
    /**
     * ขนาดของ toggle
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg'
    /**
     * ปิดการใช้งาน toggle
     * @default false
     */
    disabled?: boolean
}

// กำหนดค่าเริ่มต้นสำหรับ props
const props = withDefaults(defineProps<PropsToggle>(), {
    color: 'primary',
    labelAlign: 'right',
    size: 'md',
    disabled: false,
})

// กำหนด events ที่ toggle สามารถ emit ได้
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'change', value: boolean): void
}>()

// คำนวณ classes สำหรับ wrapper
const wrapperClasses = computed(() => [
    'inline-flex',
    'items-center',
    'gap-2',
    props.disabled && 'cursor-not-allowed opacity-50',
    props.labelAlign === 'left' && 'flex-row-reverse',
])

// คำนวณขนาดของ toggle ตาม size prop
const toggleSize = computed(
    () =>
        ({
            sm: { width: '2.28rem', height: '1.25rem' },
            md: { width: '2.75rem', height: '1.5rem' },
            lg: { width: '3.27rem', height: '1.75rem' },
        }[props.size])
)

// คำนวณขนาดของ handle (วงกลมที่เลื่อนได้) ตาม size prop
const handleSize = computed(
    () =>
        ({
            sm: '1rem',
            md: '1.25rem',
            lg: '1.5rem',
        }[props.size])
)

// คำนวณ classes สำหรับ toggle
const toggleClasses = computed(() => [
    'relative',
    'inline-flex',
    'items-center',
    'rounded-full',
    'transition-colors',
    'duration-200',
    'ease-in-out',
    props.modelValue ? `bg-${props.color}` : 'bg-slate-200',
    !props.disabled && 'cursor-pointer',
])

// คำนวณ classes สำหรับ handle
const handleClasses = computed(() => [
    'absolute',
    'rounded-full',
    'bg-white',
    'shadow-sm',
    'transition-transform',
    'duration-200',
    'ease-in-out',
    'transform',
    props.modelValue && 'translate-x-full',
])

// จัดการ click event
const handleClick = () => {
    if (props.disabled) return
    emit('update:modelValue', !props.modelValue)
    emit('change', !props.modelValue)
}
</script>

<template>
    <div
        :class="wrapperClasses"
        @click="handleClick"
        role="switch"
        :aria-checked="modelValue"
        :aria-disabled="disabled"
        alt="Toggle"
        aria-label="Toggle"
    >
        <!-- Label ด้านซ้ายหรือขวา -->
        <label
            v-if="label"
            :for="id"
            class="select-none text-sm"
            :class="[
                disabled && 'cursor-not-allowed',
                !disabled && 'cursor-pointer',
            ]"
        >
            {{ label }}
        </label>

        <!-- Toggle button -->
        <div
            :class="toggleClasses"
            :style="{
                width: toggleSize.width,
                height: toggleSize.height,
            }"
        >
            <!-- Handle (วงกลมที่เลื่อนได้) -->
            <span
                :class="handleClasses"
                :style="{
                    width: handleSize,
                    height: handleSize,
                    margin: '0.125rem',
                }"
            />
        </div>
    </div>
</template>

<style scoped>
/* Animation สำหรับการเปลี่ยนสี */
[role='switch'] {
    -webkit-tap-highlight-color: transparent;
}

/* ปรับแต่ง focus styles สำหรับ accessibility */
[role='switch']:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}

/* เพิ่ม hover effect เมื่อไม่ได้ถูก disabled */
[role='switch']:not([aria-disabled='true']):hover {
    opacity: 0.9;
}
</style>
