<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import BcTime from '@/ABC/components/BcTime.vue'
import BcToast from '@/ABC/components/BcToast.vue'
import { computed, reactive, ref } from 'vue'

// Toast state
const showToast = ref(false)
const toastMessage = ref('')
type TypePlaygroundState = {
    value: string | null
    format: '12h' | '24h'
    step: number
    minTime: string
    maxTime: string
    disabled: boolean
    label: string
    placeholder: string
    icon: 'Clock' | undefined
    isClear: boolean
}
// Playground state
const playgroundState = reactive<TypePlaygroundState>({
    value: null as string | null,
    format: '24h',
    step: 30,
    minTime: '',
    maxTime: '',
    disabled: false,
    label: 'เลือกเวลา',
    placeholder: 'กรุณาเลือกเวลา',
    icon: 'Clock' as 'Clock' | undefined,
    isClear: true,
})

// Click counter for demo
const clickCount = ref(0)

const handleTimeSelect = (value: string | null) => {
    playgroundState.value = value
    clickCount.value++
}

// Generate code based on current settings
const generatedCode = computed(() => {
    const lines = ['<BcTime']

    lines.push(`  :data-value="time"`)
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
    if (playgroundState.placeholder !== 'กรุณาเลือกเวลา') {
        lines.push(`  placeholder="${playgroundState.placeholder}"`)
    }
    lines.push(`  @input="handleTimeInput"`)

    lines.push('/>')
    return lines.join('\n')
})

// Copy code to clipboard
const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
    toastMessage.value = 'คัดลอกโค้ดแล้ว!'
    showToast.value = true
}

// Format radio options
const formatOptions: {
    value: '12h' | '24h'
    label: string
}[] = [
    { value: '24h', label: '24 ชั่วโมง' },
    { value: '12h', label: '12 ชั่วโมง (AM/PM)' },
]

// Step options
const stepOptions = [
    { value: 5, label: '5 นาที' },
    { value: 15, label: '15 นาที' },
    { value: 30, label: '30 นาที' },
    { value: 60, label: '1 ชั่วโมง' },
]
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
                    <BcTime
                        id="time-playground"
                        v-bind="playgroundState"
                        :data-value="playgroundState.value"
                        @input="handleTimeSelect"
                    />
                </div>

                <div class="p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
                    <div class="flex items-center gap-2">
                        <BcIcon name="Info" size="16" />
                        <span
                            >เวลาที่เลือก:
                            {{
                                playgroundState.value || '(ยังไม่ได้เลือก)'
                            }}</span
                        >
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

                    <BcInput
                        id="placeholder-input"
                        label="Placeholder"
                        :data-value="playgroundState.placeholder"
                        @input="(v) => (playgroundState.placeholder = v || '')"
                        placeholder="ใส่ข้อความ Placeholder"
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
                    <div class="space-y-2 pt-4 flex gap-x-4">
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
