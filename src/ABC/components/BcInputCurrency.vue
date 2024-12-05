<script setup lang="ts">
import type { PropsInput } from '@/ABC/bc-types'
import BcForm from '@/ABC/components/BcForm.vue'
import { toCurrency } from 'adc-directive'
import { computed, onMounted, ref, watch } from 'vue'

// กำหนด type สำหรับทศนิยม
type Decimal = 0 | 2

interface PropsInputCurrency
    extends Omit<PropsInput, 'id' | 'dataValue' | 'formats' | 'type'> {
    id: string
    /**
     * ค่าที่รับเข้ามาจาก parent
     * สามารถเป็นได้ทั้ง string หรือ number แต่ต้องไม่เป็น null
     */
    dataValue: string
    /**
     * จำนวนทศนิยมที่ต้องการแสดง
     * @default 2
     */
    decimal?: Decimal
}

const props = withDefaults(defineProps<PropsInputCurrency>(), {
    decimal: 2,
    isClear: true,
})

const emit = defineEmits<{
    input: [value: PropsInputCurrency['dataValue'], el: HTMLInputElement]
    enter: [e: HTMLInputElement]
    focus: [e: HTMLInputElement]
    blur: [e: HTMLInputElement]
}>()

// อ้างอิงถึง input element
const inputEl = ref<null | HTMLInputElement>(null)

const formatCurrency = (text: Readonly<string>): string => {
    const normalized = cleanValue(text)
    return +normalized > 0 ? toCurrency(normalized, props.decimal) : '0'
}

/**
 * ทำความสะอาดและตรวจสอบความถูกต้องของข้อมูล
 * @default '0'
 */
const cleanValue = (value: Readonly<string>): string => {
    /**
     * ทำให้เป็นค่าตัวเลขที่ถูกต้อง
     */

    if (props.decimal === 0) {
        value = value.split('.')[0]
    } else {
        if (value.split('.').length > 2) {
            value = value.slice(0, value.length - 1)
        }
    }

    const val = value.replace(/[^0-9.]/g, '')

    // กรณีไม่มีค่าหรือแปลงเป็นตัวเลขไม่ได้ ให้คืนค่า 0
    if (!val || isNaN(Number(val))) return '0'

    if (props.decimal === 0) {
        if (val.startsWith('0') && val.length > 1) {
            return val.replace(/^0+/, '')
        }
    } else {
        // กรณีที่เป็น 0 และมีค่ามากกว่า 1 ตัว ให้ตัด 0 ออก
        if (val.startsWith('0') && val.length > 1 && !val.startsWith('0.')) {
            return val.replace(/^0+/, '')
        }
        // กรณีที่เป็น . และมีค่ามากกว่า 1 ตัว ให้เติม 0 นำหน้า
        if (val.startsWith('.') && val.length > 1) {
            return `0${val}`
        }
    }
    return val
}

/**
 * จัดการ input event
 */
const onInput = () => {
    if (!inputEl.value) return
    // ถ้าไม่มีค่าใส่เข้ามา ให้ใช้ 0
    const newValue = cleanValue(inputEl.value.value)
    inputEl.value.value = newValue
    // inputEl.value.value = formatToFinalValue()

    // อัพเดท state ภายใน

    // ส่งค่าออกไปในรูปแบบเดียวกับ dataValue
    emit('input', newValue, inputEl.value!)
}

/**
 * จัดการ blur event
 */
const onBlur = () => {
    // จัดรูปแบบค่าให้สมบูรณ์
    // อัพเดทค่าที่แสดงใน input
    inputEl.value!.value = formatCurrency(inputEl.value!.value)
    // ส่งค่าที่ผ่านการตรวจสอบแล้ว
    console.log('onBlur', inputEl.value!.value)
    emit('input', cleanValue(inputEl.value!.value), inputEl.value!)
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
// เพิ่ม padding-left เมื่อมี icon
const classEventInput = computed(() => ({
    ['!pl-9']: typeof props.icon === 'string',
}))

const valueBcForm = computed(() =>
    props.dataValue == '0' ? '' : props.dataValue
)

/**
 * ติดตามการเปลี่ยนแปลงของ dataValue
 */
watch(
    () => props.dataValue,
    (newDataValue) => {
        if (inputEl.value) {
            // แปลงค่าเป็น string และทำความสะอาด
            const cleanNewValue = cleanValue(newDataValue)
            const cleanInput = cleanValue(inputEl.value.value)

            // อัพเดท state ภายในถ้าค่าเปลี่ยน
            if (cleanNewValue !== cleanInput) {
                inputEl.value.value = formatCurrency(newDataValue)
            }
        }
    }
)
onMounted(() => {
    const checkValue = cleanValue(props.dataValue)
    if (checkValue !== props.dataValue) {
        emit('input', checkValue, inputEl.value!)
    }
    if (inputEl.value) {
        inputEl.value.value = formatCurrency(props.dataValue)
    }
})
</script>

<template>
    <BcForm
        v-bind="props"
        :data-value="valueBcForm"
        @clear="$emit('input', '0', inputEl!)"
    >
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
            :placeholder="getPlaceholder"
            :disabled="props.disabled"
            :alt="`input ${props.label || props.placeholder}`"
        />
        <slot />
    </BcForm>
</template>
