<script setup lang="ts">
import type { IconName } from '@/ABC/bc-types'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import type { RegexKey } from '@/ABC/ui/bc-regexp'
import { computed, reactive, ref } from 'vue'

// สถานะและค่าเริ่มต้นของ props ทั้งหมด
const props = reactive({
    id: 'playground-input',
    label: 'Label Input',
    placeholder: 'placeholder something...',
    icon: 'Search' as IconName | undefined,
    isClear: true,
    isLoading: false,
    isDebounce: false,
    disabled: false,
    formats: [] as RegexKey[],
})

// ค่าปัจจุบันของ input และค่าล่าสุดที่ถูก emit
const inputValue = ref<string>('')
const lastEmittedValue = ref<string | null>(null)

// ตัวเลือกสำหรับรูปแบบการกรอกข้อมูล พร้อมไอคอนประกอบ
const formatOptions: Array<{ value: RegexKey; label: string; icon: IconName }> =
    [
        { value: 'en', label: 'English only', icon: 'Text' },
        { value: 'th', label: 'Thai only', icon: 'Text' },
        { value: 'number', label: 'Numbers only', icon: 'Ampersand' },
        { value: 'finance', label: 'Finance numbers', icon: 'DollarSign' },
        { value: 'mixed', label: 'Mixed', icon: 'Ampersand' },
    ]

// ตัวเลือกไอคอนที่สามารถใช้ได้
const iconOptions: Array<{ value: IconName | ''; label: string }> = [
    { value: '', label: 'None' },
    { value: 'Search', label: 'Search' },
    { value: 'Mail', label: 'Mail' },
    { value: 'User', label: 'User' },
    { value: 'BookUser', label: 'BookUser' },
]

// สลับเปิด/ปิดตัวกรองรูปแบบข้อมูล
const toggleFormat = (checked: boolean, format: RegexKey) => {
    const index = props.formats.indexOf(format)
    if (checked && index === -1) {
        props.formats.push(format)
    } else if (!checked && index !== -1) {
        props.formats.splice(index, 1)
    }
}

// จัดการการเปลี่ยนแปลงค่าใน input
const handleInput = (value: string | null) => {
    inputValue.value = value || ''
    lastEmittedValue.value = value
}

// สร้างโค้ดตัวอย่างตาม props ที่เลือก
const generatedCode = computed(() => {
    const lines = [
        `<BcInput`,
        `  id="${props.id}"`,
        `  label="${props.label}"`,
        `  placeholder="${props.placeholder}"`,
    ]

    if (props.icon) {
        lines.push(`  icon="${props.icon}"`)
    }

    if (props.formats.length) {
        lines.push(
            `  :formats="[${props.formats.map((f) => `'${f}'`).join(', ')}]"`
        )
    }

    lines.push(
        `  :isClear="${props.isClear}"`,
        `  :isLoading="${props.isLoading}"`,
        `  :isDebounce="${props.isDebounce}"`,
        `  :disabled="${props.disabled}"`,
        `  :data-value="inputValue"`,
        `  @input="handleInput"`,
        `/>`
    )

    return lines.join('\n')
})

// คัดลอกโค้ดไปยัง clipboard
const copyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
}
</script>

<template>
    <!-- คอนเทนเนอร์หลัก -->
    <div class="bg-slate-50 min-h-screen p-6 space-y-6">
        <!-- ส่วนแสดงตัวอย่าง -->
        <section class="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div class="flex items-center gap-2 mb-4">
                <BcIcon name="Eye" size="24" color="primary" />
                <h2 class="text-xl font-bold">ดูตัวอย่าง</h2>
            </div>
            <BcInput
                v-bind="props"
                :data-value="inputValue"
                @input="handleInput"
            />
            <div class="p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
                <div class="flex items-center gap-2">
                    <BcIcon name="Info" size="16" />
                    <span>ค่าปัจจุบัน: {{ inputValue || '(ว่าง)' }}</span>
                </div>
            </div>
        </section>

        <!-- ส่วนควบคุมการตั้งค่า -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- การตั้งค่าพื้นฐาน -->
            <section class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center gap-2 mb-6">
                    <BcIcon name="ThumbsUp" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ตั้งค่าพื้นฐาน</h2>
                </div>

                <div class="space-y-4">
                    <BcInput
                        id="playground-input"
                        label="ข้อความ Label"
                        :data-value="props.label"
                        icon="Text"
                        @input="(v) => (props.label = v || '')"
                    />

                    <BcInput
                        id="playground-placeholder"
                        label="ข้อความ Placeholder"
                        :data-value="props.placeholder"
                        icon="Text"
                        @input="(v) => (props.placeholder = v || '')"
                    />

                    <div class="space-y-2">
                        <label
                            class="text-sm font-medium flex items-center gap-2"
                        >
                            <BcIcon name="Palette" size="16" />
                            เลือกไอคอน
                        </label>
                        <select
                            v-model="props.icon"
                            class="w-full p-2 border rounded-lg focus:border-primary outline-none"
                        >
                            <option
                                v-for="option in iconOptions"
                                :key="option.value"
                                :value="option.value"
                            >
                                {{ option.label }}
                            </option>
                        </select>
                    </div>
                </div>
            </section>

            <!-- การตั้งค่าสถานะ -->
            <section class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center gap-2 mb-6">
                    <BcIcon name="ToggleLeft" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ตั้งค่าสถานะ</h2>
                </div>

                <div class="grid gap-4">
                    <BcCheckBox
                        v-model="props.isClear"
                        label="เปิดใช้ปุ่มล้างข้อมูล"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="props.isLoading"
                        label="แสดงสถานะกำลังโหลด"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="props.isDebounce"
                        label="เปิดใช้ Debounce (500ms)"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="props.disabled"
                        label="ปิดการใช้งาน Input"
                        size="lg"
                    />
                </div>
            </section>

            <!-- การตั้งค่าการกรองข้อมูล -->
            <section class="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
                <div class="flex items-center gap-2 mb-6">
                    <BcIcon name="ListFilter" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ตั้งค่าการกรองข้อมูล</h2>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div
                        v-for="format in formatOptions"
                        :key="format.value"
                        class="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <BcCheckBox
                            :label="format.label"
                            :model-value="props.formats.includes(format.value)"
                            @change="
                                (checked) => toggleFormat(checked, format.value)
                            "
                            size="lg"
                        >
                            <template #prefix>
                                <BcIcon :name="format.icon" size="20" />
                            </template>
                        </BcCheckBox>
                    </div>
                </div>
            </section>
        </div>

        <!-- ส่วนแสดงโค้ด -->
        <section class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <BcIcon name="Code" size="24" color="primary" />
                    <h2 class="text-xl font-bold">โค้ดตัวอย่าง</h2>
                </div>
                <button
                    @click="copyCode"
                    class="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                    <BcIcon name="Copy" size="16" />
                    <span>คัดลอกโค้ด</span>
                </button>
            </div>
            <pre
                class="bg-slate-800 text-slate-50 p-4 rounded-lg overflow-x-auto"
                >{{ generatedCode }}</pre
            >
        </section>
    </div>
</template>
