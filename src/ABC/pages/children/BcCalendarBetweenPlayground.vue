<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcCalendarBetween, {
    DateRange,
} from '@/ABC/components/BcCalendarBetween.vue'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import BcToast from '@/ABC/components/BcToast.vue'
import { computed, reactive, ref } from 'vue'

// Toast state
const showToast = ref(false)
const toastMessage = ref('')

// Playground state
type PlaygroundState = {
    value: DateRange
    label: string
    placeholder: string
    icon: 'CalendarDays' | undefined
    disabled: boolean
    isClear: boolean
    required: boolean
}
const playgroundState = reactive<PlaygroundState>({
    value: ['', ''],
    label: 'เลือกช่วงวันที่',
    placeholder: 'กรุณาเลือกช่วงวันที่',
    icon: 'CalendarDays' as 'CalendarDays' | undefined,
    disabled: false,
    isClear: true,
    required: false,
})

// Click counter for demo
const clickCount = ref(0)

const handleCalendarChange = (value: DateRange) => {
    playgroundState.value = value
    clickCount.value++
}

// Generate code based on current settings
const generatedCode = computed(() => {
    const lines = ['<BcCalendarBetween']

    lines.push(`  :dataValue="dateRange"`)
    if (playgroundState.label) lines.push(`  label="${playgroundState.label}"`)
    if (playgroundState.placeholder !== 'กรุณาเลือกช่วงวันที่') {
        lines.push(`  placeholder="${playgroundState.placeholder}"`)
    }
    if (playgroundState.icon) lines.push(`  icon="${playgroundState.icon}"`)
    if (playgroundState.required) {
        lines.push(`  :rule="(dates) => dates[0] && dates[1]"`)
        lines.push(`  :error="() => 'กรุณาเลือกช่วงวันที่'"`)
    }
    if (playgroundState.disabled) lines.push(`  disabled`)
    if (!playgroundState.isClear) lines.push(`  :isClear="false"`)
    lines.push(`  @input="handleDateChange"`)
    lines.push('/>')

    return lines.join('\n')
})

// Copy code to clipboard
const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
    toastMessage.value = 'คัดลอกโค้ดแล้ว!'
    showToast.value = true
}

// Format date for display
const formatDateRange = (dates: DateRange): string => {
    if (!dates || !dates[0] || !dates[1]) return '(ยังไม่ได้เลือก)'
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }
    return `${formatDate(dates[0])} - ${formatDate(dates[1])}`
}
</script>

<template>
    <div class="space-y-8">
        <!-- Preview Section -->
        <section class="bg-white rounded-xl shadow p-6 mt-6">
            <div class="flex items-center gap-2 mb-4">
                <BcIcon name="Eye" size="24" color="primary" />
                <h2 class="text-xl font-bold">ดูตัวอย่าง</h2>
            </div>

            <div class="space-y-4">
                <div class="p-6 bg-slate-50 rounded-lg">
                    <BcCalendarBetween
                        id="playground-calendar"
                        v-bind="playgroundState"
                        :dataValue="playgroundState.value"
                        @input="handleCalendarChange"
                    />
                </div>

                <div class="p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
                    <div class="flex items-center gap-2">
                        <BcIcon name="Info" size="16" />
                        <span>
                            ช่วงวันที่เลือก:
                            {{ formatDateRange(playgroundState.value) }}
                        </span>
                    </div>
                    <div class="mt-2 text-xs text-slate-500">
                        จำนวนครั้งที่เลือก: {{ clickCount }}
                    </div>
                </div>
            </div>
        </section>

        <!-- Controls -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Settings -->
            <section class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center gap-2 mb-6">
                    <BcIcon name="Settings" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ตั้งค่าพื้นฐาน</h2>
                </div>

                <div class="space-y-4">
                    <!-- Label -->
                    <BcInput
                        id="label-input"
                        label="Label"
                        :dataValue="playgroundState.label"
                        @input="(v) => (playgroundState.label = v || '')"
                        placeholder="ใส่ข้อความ Label"
                    />

                    <!-- Placeholder -->
                    <BcInput
                        id="placeholder-input"
                        label="Placeholder"
                        :dataValue="playgroundState.placeholder"
                        @input="(v) => (playgroundState.placeholder = v || '')"
                        placeholder="ใส่ข้อความ Placeholder"
                    />
                </div>
            </section>

            <!-- Additional Settings -->
            <section class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center gap-2 mb-6">
                    <BcIcon name="Sliders" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ตั้งค่าเพิ่มเติม</h2>
                </div>

                <div class="flex gap-x-3 items-center">
                    <BcCheckBox
                        v-model="playgroundState.isClear"
                        label="แสดงปุ่มล้างข้อมูล"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="playgroundState.required"
                        label="บังคับให้เลือก"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="playgroundState.disabled"
                        label="ปิดการใช้งาน"
                        size="lg"
                    />
                </div>
            </section>
        </div>

        <!-- Generated Code -->
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

        <!-- Toast Notification -->
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

.bg-slate-800 :deep(.bg-white) {
    --tw-bg-opacity: 0.9;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-slate-800 :deep(.bg-white:hover) {
    --tw-bg-opacity: 1;
}
</style>
