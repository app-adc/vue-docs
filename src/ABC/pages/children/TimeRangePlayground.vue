<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import type { TimeRange } from '@/ABC/components/BcTimeRange.vue'
import BcTimeRange from '@/ABC/components/BcTimeRange.vue'
import BcToast from '@/ABC/components/BcToast.vue'
import { computed, reactive, ref } from 'vue'

// Toast state
const showToast = ref(false)
const toastMessage = ref('')

// Playground state
const playgroundState = reactive({
    value: [null, null] as TimeRange,
    format: '24h' as '12h' | '24h',
    step: 30,
    minTime: '',
    maxTime: '',
    disabled: false,
    label: 'ช่วงเวลาทำงาน',
    icon: 'Clock' as 'Clock' | undefined,
    isClear: true,
})

// Step options
const stepOptions = [
    { value: 5, label: '5 นาที' },
    { value: 15, label: '15 นาที' },
    { value: 30, label: '30 นาที' },
    { value: 60, label: '1 ชั่วโมง' },
]

// Format radio options
const formatOptions = [
    { value: '24h', label: '24 ชั่วโมง' },
    { value: '12h', label: '12 ชั่วโมง (AM/PM)' },
] as const

// Click counter for demo
const clickCount = ref(0)

const handleTimeRangeSelect = (value: TimeRange) => {
    playgroundState.value = value
    clickCount.value++
}

// Generate code based on current settings
const generatedCode = computed(() => {
    const lines = ['<BcTimeRange']

    lines.push(`  :dataValue="timeRange"`)
    if (playgroundState.label) lines.push(`  label="${playgroundState.label}"`)
    if (playgroundState.format !== '24h')
        lines.push(`  format="${playgroundState.format}"`)
    if (playgroundState.step !== 30)
        lines.push(`  :step="${playgroundState.step}"`)
    if (playgroundState.minTime)
        lines.push(`  minTime="${playgroundState.minTime}"`)
    if (playgroundState.maxTime)
        lines.push(`  maxTime="${playgroundState.maxTime}"`)
    if (playgroundState.disabled) lines.push(`  disabled`)

    lines.push(`  @input="handleTimeRangeChange"`)

    lines.push('/>')
    return lines.join('\n')
})

// Copy code to clipboard
const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
    toastMessage.value = 'คัดลอกโค้ดแล้ว!'
    showToast.value = true
}
</script>

<template>
    <div class="space-y-8">
        <!-- Preview Section -->
        <section class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center gap-2 mb-4">
                <BcIcon name="Eye" size="24" color="primary" />
                <h2 class="text-xl font-bold">ดูตัวอย่าง</h2>
            </div>

            <div class="space-y-4">
                <div class="p-6 bg-slate-50 rounded-lg">
                    <BcTimeRange
                        id="time-range-playground"
                        v-bind="playgroundState"
                        :data-value="playgroundState.value"
                        @input="handleTimeRangeSelect"
                    />
                </div>

                <div class="p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
                    <div class="flex items-center gap-2">
                        <BcIcon name="Info" size="16" />
                        <span>
                            ช่วงเวลาที่เลือก:
                            {{ playgroundState.value[0] || '(ยังไม่ได้เลือก)' }}
                            -
                            {{ playgroundState.value[1] || '(ยังไม่ได้เลือก)' }}
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
                    <!-- Label and Placeholder -->
                    <BcInput
                        id="label-input"
                        label="Label"
                        :data-value="playgroundState.label"
                        @input="(v) => (playgroundState.label = v || '')"
                        placeholder="ใส่ข้อความ Label"
                    />

                    <!-- Format Selection -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">รูปแบบเวลา</label>
                        <div class="flex gap-2">
                            <BcButton
                                v-for="format in formatOptions"
                                :key="format.value"
                                variant="outline"
                                :color="
                                    playgroundState.format === format.value
                                        ? 'primary'
                                        : 'outline'
                                "
                                @click="playgroundState.format = format.value"
                                size="sm"
                            >
                                {{ format.label }}
                            </BcButton>
                        </div>
                    </div>

                    <!-- Step Selection -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">ช่วงเวลา</label>
                        <div class="grid grid-cols-2 gap-2">
                            <BcButton
                                v-for="step in stepOptions"
                                :key="step.value"
                                variant="outline"
                                :color="
                                    playgroundState.step === step.value
                                        ? 'primary'
                                        : 'outline'
                                "
                                @click="playgroundState.step = step.value"
                                size="sm"
                            >
                                {{ step.label }}
                            </BcButton>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Additional Settings -->
            <section class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center gap-2 mb-6">
                    <BcIcon name="Sliders" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ตั้งค่าเพิ่มเติม</h2>
                </div>

                <div class="space-y-4">
                    <!-- Time Range -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium"
                            >เวลาต่ำสุด - สูงสุด</label
                        >
                        <div class="grid grid-cols-2 gap-4">
                            <input
                                v-model="playgroundState.minTime"
                                type="time"
                                class="w-full p-2 border rounded-lg"
                                placeholder="เวลาต่ำสุด"
                            />
                            <input
                                v-model="playgroundState.maxTime"
                                type="time"
                                class="w-full p-2 border rounded-lg"
                                placeholder="เวลาสูงสุด"
                            />
                        </div>
                    </div>

                    <!-- Component State -->
                    <div class="flex gap-x-4">
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

input[type='time'] {
    appearance: none;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
}

input[type='time']::-webkit-calendar-picker-indicator {
    cursor: pointer;
}

.transition-transform {
    transition: transform 0.2s ease-in-out;
}

.hover\:transform:hover {
    transform: scale(1.05);
}
</style>
