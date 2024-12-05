<script setup lang="ts">
import type { PropsInput } from '@/ABC/bc-types'
import BcForm from '@/ABC/components/BcForm.vue'
import { replaceTextByRegExp } from '@/ABC/notUsed/function'
import { useDebounceFn } from '@vueuse/core' // เพิ่ม import useDebounceFn
import { computed, ref } from 'vue'

type PropsInputComponent = PropsInput & { type?: 'text' | 'password' }
const props = withDefaults(defineProps<PropsInputComponent>(), {
    isClear: true,
    isLoading: false,
    isDebounce: false, // default isDebounce เป็น false
    durationDebounce: 500, // default duration 500ms
    type: 'text',
})

const emit = defineEmits<{
    input: [val: string | null, el: HTMLInputElement]
    enter: [e: HTMLInputElement]
    focus: [e: HTMLInputElement]
    blur: [e: HTMLInputElement]
}>()

// เพิ่ม padding-left เมื่อมี icon
const classEventInput = computed(() => ({
    ['!pl-9']: typeof props.icon === 'string',
}))

// อ้างอิงถึง input element
const inputEl = ref<null | HTMLInputElement>(null)

// สร้าง function สำหรับจัดการ input ที่มี debounce
const debouncedInput = useDebounceFn(() => {
    // อัพเดตค่าใน input element
    if (inputEl.value) {
        emit('input', inputEl.value.value, inputEl.value)
    }
}, props.durationDebounce) // delay 500ms

// จัดการ event input
function onInput() {
    if (!inputEl.value) return

    inputEl.value.value = replaceTextByRegExp(
        inputEl!.value!.value,
        props.formats || []
    )

    if (props.isDebounce) {
        // ใช้ debounce function ถ้า isDebounce เป็น true
        debouncedInput()
    } else {
        // ทำงานปกติถ้า isDebounce เป็น false
        // const dataInput = replaceTextByRegExp(value, props.formats || [])

        emit('input', inputEl.value.value, inputEl.value)
    }
}

// จัดการ event blur
function onBlur() {
    emit('blur', inputEl.value!)
}

// จัดการ event keydown
function onKeydown(e: KeyboardEvent) {
    const key = e.key
    if (key && key.toLocaleLowerCase() == 'enter') {
        emit('enter', inputEl.value!)
    }
    // อนุญาตให้ใช้ปุ่มลูกศรและ backspace
    let rules = ['ArrowLeft', 'ArrowRight', 'Backspace']
    if (rules.includes(key)) return true

    return true
}

// สร้าง placeholder text
const getPlaceholder = computed((): string => {
    const text = props.placeholder
        ? props.placeholder
        : props.label
        ? `ระบุ${props.label}`
        : ''
    return props.isLoading ? 'กำลังโหลดข้อมูล...' : text
})
</script>

<template>
    <BcForm v-bind="props" @clear="$emit('input', null, inputEl!)">
        <input
            ref="inputEl"
            :id="props.id"
            v-bind="{
                ...$attrs,
                onBlur,
                onKeydown,
                onInput,
            }"
            class="w-full disabled:bg-[#F9FAFB] col-auto"
            :class="classEventInput"
            :data-cy="props.id"
            autoComplete="off"
            :value="props.dataValue"
            :type="props.type"
            :placeholder="getPlaceholder"
            :disabled="props.disabled"
            :alt="`input ${props.label || props.placeholder}`"
        />
        <slot />
    </BcForm>
</template>
