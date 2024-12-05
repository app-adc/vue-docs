<script setup lang="ts">
import { computed, ref } from 'vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import { toUid } from 'adc-directive'
import type { ColorName } from '@/ABC/bc-types'

// Props สำหรับ Checkbox
type CheckboxProps = {
    // ค่าที่เลือก
    modelValue: boolean
    // รหัสอ้างอิง
    id?: string
    // ข้อความแสดง
    label?: string
    // ปิดการใช้งาน
    disabled?: boolean
    // ขนาด checkbox
    size?: 'sm' | 'md' | 'lg'
    // ตำแหน่ง label
    labelAlign?: 'left' | 'right'
    // สีของ checkbox
    color?: ColorName
}

// Events
type Emits = {
    (e: 'update:modelValue', value: boolean): void
    (e: 'change', value: boolean): void
}

const props = withDefaults(defineProps<CheckboxProps>(), {
    size: 'md',
    disabled: false,
    labelAlign: 'right',
    color: 'primary',
})

const emit = defineEmits<Emits>()

// ตัวแปรเก็บ input element
const inputRef = ref<HTMLInputElement | null>(null)

// ขนาด checkbox ตาม size prop
const checkboxSize = computed(
    () =>
        ({
            sm: 'w-4 h-4',
            md: 'w-6 h-6',
            lg: 'w-7 h-7',
        }[props.size])
)

// ขนาด icon ตาม size prop
const iconSize = computed(
    () =>
        ({
            sm: 16,
            md: 18,
            lg: 22,
        }[props.size])
)

// คำนวณ classes สำหรับ wrapper
const wrapperClasses = computed(() => [
    'inline-flex',
    'items-center',
    'gap-2',
    props.disabled && 'cursor-not-allowed opacity-50',
    // 'bg-slate-600 w-max',
])

// คำนวณ classes สำหรับ checkbox
const checkboxClasses = computed(() => [
    'relative',
    'flex',
    'items-center',
    'justify-center',
    'border',
    'rounded',
    'transition-all',
    'duration-200',
    checkboxSize.value,
    props.modelValue
        ? `bg-${props.color} border-${props.color}`
        : 'bg-white border-slate-300',
    !props.disabled && 'cursor-pointer hover:border-primary',
])

// คำนวณ classes สำหรับ label
const labelClasses = computed(() => [
    'select-none',
    'cursor-pointer',
    'text-sm',
    props.disabled && 'cursor-not-allowed',
])

// จัดการ change event
const handleChange = (event: Event) => {
    if (props.disabled) return
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.checked)
    emit('change', target.checked)
}

const refId = ref(props.id || toUid(8))
</script>

<template>
    <div :class="wrapperClasses" alt="checkbox" aria-label="checkbox">
        <!-- Label ด้านซ้าย -->
        <label
            v-if="label && labelAlign === 'left'"
            :for="refId"
            :class="labelClasses"
        >
            {{ label }}
        </label>

        <!-- Checkbox -->
        <div :class="checkboxClasses">
            <input
                ref="inputRef"
                type="checkbox"
                :id="refId"
                :checked="modelValue"
                :disabled="disabled"
                class="absolute opacity-0 w-full h-full cursor-pointer"
                @change="handleChange"
            />

            <BcIcon
                v-if="modelValue"
                name="Check"
                :size="iconSize"
                color="white"
                class="transition-transform duration-200 pointer-events-none"
            />
        </div>

        <!-- Label ด้านขวา -->
        <label
            v-if="label && labelAlign === 'right'"
            :for="refId"
            :class="labelClasses"
        >
            {{ label }}
        </label>
    </div>
</template>
