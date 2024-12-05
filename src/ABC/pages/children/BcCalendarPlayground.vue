<script setup lang="ts">
import type { IconName } from '@/ABC/bc-types'
import BcButton from '@/ABC/components/BcButton.vue'
import BcCalendar from '@/ABC/components/BcCalendar.vue'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import BcToast from '@/ABC/components/BcToast.vue'
import { computed, reactive, ref } from 'vue'

// สถานะ Toast
const showToast = ref(false)
const toastMessage = ref('')

// สถานะ Playground
const playgroundState = reactive({
    value: null as string | null,
    label: 'เลือกวันที่',
    placeholder: 'กรุณาเลือกวันที่',
    icon: 'CalendarDays' as IconName,
    minDate: undefined as Date | undefined,
    maxDate: undefined as Date | undefined,
    disabled: false,
    isClear: true,
    form: 'calendar-form',
    isRequiredField: false,
})

// นับจำนวนครั้งที่เลือก
const clickCount = ref(0)

const handleDateSelect = (value: string | null) => {
    playgroundState.value = value
    clickCount.value++
}

// ตัวเลือกไอคอน
const iconOptions: Array<{ value: IconName | ''; label: string }> = [
    { value: '', label: 'ไม่มีไอคอน' },
    { value: 'CalendarDays', label: 'ปฏิทิน' },
    { value: 'Calendar', label: 'ปฏิทินเรียบง่าย' },
]

// Validation
const requiredRule = (val: string | null): boolean => !!val
const errorMessage = (): string => 'กรุณาเลือกวันที่'

// สร้างโค้ดตัวอย่าง
const generatedCode = computed(() => {
    const lines = ['<BcCalendar']

    if (playgroundState.form) {
        lines.push(`  form="${playgroundState.form}"`)
    }
    if (playgroundState.isRequiredField) {
        lines.push(`  :rule="requiredRule"`)
        lines.push(`  :error="errorMessage"`)
    }
    lines.push(`  :data-value="selectedDate"`)
    if (playgroundState.label) lines.push(`  label="${playgroundState.label}"`)
    if (playgroundState.placeholder) {
        lines.push(`  placeholder="${playgroundState.placeholder}"`)
    }
    if (playgroundState.icon) {
        lines.push(`  icon="${playgroundState.icon}"`)
    }
    if (playgroundState.minDate) {
        lines.push(
            `  :minDate="new Date('${playgroundState.minDate.toISOString()}')"`
        )
    }
    if (playgroundState.maxDate) {
        lines.push(
            `  :maxDate="new Date('${playgroundState.maxDate.toISOString()}')"`
        )
    }
    if (!playgroundState.isClear) lines.push(`  :isClear="false"`)
    if (playgroundState.disabled) lines.push(`  disabled`)

    lines.push(`  @input="handleDateChange"`)
    lines.push('/>')

    return lines.join('\n')
})

// คัดลอกโค้ด
const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
    toastMessage.value = 'คัดลอกโค้ดแล้ว!'
    showToast.value = true
}

// จัดการ Date Range
const handleMinDateChange = (dateStr: string) => {
    playgroundState.minDate = dateStr ? new Date(dateStr) : undefined
}

const handleMaxDateChange = (dateStr: string) => {
    playgroundState.maxDate = dateStr ? new Date(dateStr) : undefined
}
</script>

<template>
    <div class="space-y-8">
        <!-- ส่วนแสดงตัวอย่าง -->
        <section class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center gap-2 mb-4">
                <BcIcon name="Eye" size="24" color="primary" />
                <h2 class="text-xl font-bold">ดูตัวอย่าง</h2>
            </div>

            <div class="space-y-4">
                <div class="p-6 bg-slate-50 rounded-lg">
                    <BcCalendar
                        id="playground-calendar"
                        :data-value="playgroundState.value"
                        v-bind="playgroundState"
                        :rule="
                            playgroundState.isRequiredField
                                ? requiredRule
                                : undefined
                        "
                        :error="
                            playgroundState.isRequiredField
                                ? errorMessage
                                : undefined
                        "
                        @input="handleDateSelect"
                    />
                </div>

                <div class="p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
                    <div class="flex items-center gap-2">
                        <BcIcon name="Info" size="16" />
                        <span>
                            วันที่เลือก:
                            {{ playgroundState.value || '(ยังไม่ได้เลือก)' }}
                        </span>
                    </div>
                    <div class="mt-2 text-xs text-slate-500">
                        จำนวนครั้งที่เลือก: {{ clickCount }}
                    </div>
                </div>
            </div>
        </section>

        <!-- ส่วนควบคุม -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- ตั้งค่าพื้นฐาน -->
            <section class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center gap-2 mb-6">
                    <BcIcon name="Settings" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ตั้งค่าพื้นฐาน</h2>
                </div>

                <div class="space-y-4">
                    <BcInput
                        id="form-input"
                        label="Form Name"
                        :data-value="playgroundState.form"
                        @input="(v) => (playgroundState.form = v || '')"
                        placeholder="ชื่อฟอร์มสำหรับ validate"
                    />

                    <BcCheckBox
                        v-model="playgroundState.isRequiredField"
                        label="บังคับเลือกวันที่"
                        size="lg"
                    />

                    <BcInput
                        id="label-input"
                        label="Label"
                        :data-value="playgroundState.label"
                        @input="(v) => (playgroundState.label = v || '')"
                        placeholder="ใส่ข้อความ Label"
                    />

                    <BcInput
                        id="placeholder-input"
                        label="Placeholder"
                        :data-value="playgroundState.placeholder"
                        @input="(v) => (playgroundState.placeholder = v || '')"
                        placeholder="ใส่ข้อความ Placeholder"
                    />

                    <div class="space-y-2">
                        <label class="text-sm font-medium">ไอคอน</label>
                        <select
                            v-model="playgroundState.icon"
                            class="w-full p-2 border rounded-lg"
                        >
                            <option
                                v-for="icon in iconOptions"
                                :key="icon.value"
                                :value="icon.value"
                            >
                                {{ icon.label }}
                            </option>
                        </select>
                    </div>
                </div>
            </section>

            <!-- ตั้งค่าเพิ่มเติม -->
            <section class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center gap-2 mb-6">
                    <BcIcon name="Sliders" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ตั้งค่าเพิ่มเติม</h2>
                </div>

                <div class="space-y-4">
                    <div class="space-y-2">
                        <label class="text-sm font-medium"
                            >ช่วงวันที่ที่เลือกได้</label
                        >
                        <div class="grid grid-cols-2 gap-4">
                            <input
                                type="date"
                                class="w-full p-2 border rounded-lg"
                                @input="(e) => handleMinDateChange((e.target as HTMLInputElement).value)"
                                placeholder="วันที่เริ่มต้น"
                            />
                            <input
                                type="date"
                                class="w-full p-2 border rounded-lg"
                                @input="(e) => handleMaxDateChange((e.target as HTMLInputElement).value)"
                                placeholder="วันที่สิ้นสุด"
                            />
                        </div>
                    </div>

                    <div class="flex gap-x-4 pt-4">
                        <BcCheckBox
                            v-model="playgroundState.isClear"
                            label="แสดงปุ่มล้างข้อมูล"
                            size="lg"
                        />
                        <BcCheckBox
                            v-model="playgroundState.disabled"
                            label="ปิดการใช้งาน"
                            size="lg"
                        />
                    </div>
                </div>
            </section>
        </div>

        <!-- โค้ดตัวอย่าง -->
        <section class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between gap-3 mb-4">
                <div class="flex items-center gap-2">
                    <BcIcon name="Code" size="24" color="primary" />
                    <h2 class="text-xl font-bold">โค้ดตัวอย่าง</h2>
                </div>
                <BcButton
                    @click="handleCopyCode"
                    variant="outline"
                    size="sm"
                    icon="Copy"
                >
                    คัดลอกโค้ด
                </BcButton>
            </div>
            <pre
                class="bg-slate-800 text-slate-50 p-4 rounded-lg overflow-x-auto"
                >{{ generatedCode }}</pre
            >
        </section>

        <!-- Toast แจ้งเตือน -->
        <BcToast
            v-model="showToast"
            :message="toastMessage"
            variant="success"
            position="top-right"
            :duration="2000"
        />
    </div>
</template>

<style scoped>
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}

input[type='date'] {
    appearance: none;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
}

input[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
}
</style>
