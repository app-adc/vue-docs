<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import BcSelect from '@/ABC/components/BcSelect.vue'
import { useAlert } from '@/ABC/ui/bc-composition'
import { computed, reactive } from 'vue'

type TypeIcon = 'BadgeCheck' | 'BadgeHelp' | 'BadgeAlert' | 'CircleX'
// Playground state
const playgroundState = reactive({
    titles: ['แจ้งเตือน', 'คุณแน่ใจหรือไม่?'],
    subtitles: ['การดำเนินการนี้ไม่สามารถย้อนกลับได้'],
    icon: 'BadgeHelp' as TypeIcon,
    isClose: true,
    isClickOutSide: true,
    btnConfirm: 'ยืนยัน',
    btnCancel: 'ยกเลิก',
    timeout: 2000,
})

// Icon options
const iconOptions = [
    { value: 'BadgeCheck', label: 'เครื่องหมายถูก (สำเร็จ)' },
    { value: 'BadgeHelp', label: 'เครื่องหมายคำถาม (ยืนยัน)' },
    { value: 'BadgeAlert', label: 'เครื่องหมายตกใจ (เตือน)' },
    { value: 'CircleX', label: 'เครื่องหมายผิด (ผิดพลาด)' },
]

// Show alert using current settings
const { activeAlert, removeAlert } = useAlert()

const showAlert = () => {
    activeAlert({
        ...playgroundState,
        next: () => {
            console.log('Confirmed')
            removeAlert()
        },
    })
}

// Generate code based on playground settings
const generatedCode = computed(() => {
    const lines = ['const { activeAlert } = useAlert()\n']
    lines.push('activeAlert({')
    if (playgroundState.titles.length) {
        lines.push(`  titles: ${JSON.stringify(playgroundState.titles)},`)
    }
    if (playgroundState.subtitles.length) {
        lines.push(`  subtitles: ${JSON.stringify(playgroundState.subtitles)},`)
    }
    lines.push(`  icon: '${playgroundState.icon}',`)
    if (!playgroundState.isClose) {
        lines.push('  isClose: false,')
    }
    if (!playgroundState.isClickOutSide) {
        lines.push('  isClickOutSide: false,')
    }
    if (playgroundState.btnConfirm) {
        lines.push(`  btnConfirm: '${playgroundState.btnConfirm}',`)
    }
    if (playgroundState.btnCancel) {
        lines.push(`  btnCancel: '${playgroundState.btnCancel}',`)
    }
    if (playgroundState.timeout !== 2000) {
        lines.push(`  timeout: ${playgroundState.timeout},`)
    }
    lines.push('  next: () => {')
    lines.push('    console.log("Confirmed")')
    lines.push('    removeAlert()')
    lines.push('  }')
    lines.push('})')

    return lines.join('\n')
})

// Copy code to clipboard
const copyCode = async () => {
    try {
        await navigator.clipboard.writeText(generatedCode.value)
        activeAlert({
            titles: ['สำเร็จ'],
            subtitles: ['คัดลอกโค้ดแล้ว'],
            icon: 'BadgeCheck',
            timeout: 1500,
        })
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Controls -->
        <div class="space-y-4">
            <!-- Titles -->
            <div>
                <label class="text-sm font-medium mb-1 block">
                    หัวข้อ Alert
                </label>
                <div class="space-y-2">
                    <BcInput
                        v-for="(_, index) in playgroundState.titles"
                        :key="index"
                        :id="`title-${index}`"
                        :data-value="playgroundState.titles[index]"
                        @input="
                            (v) => (playgroundState.titles[index] = v || '')
                        "
                        placeholder="ใส่หัวข้อ"
                    />
                </div>
                <BcButton
                    variant="outline"
                    size="sm"
                    icon="Plus"
                    class="mt-2"
                    @click="playgroundState.titles.push('')"
                >
                    เพิ่มหัวข้อ
                </BcButton>
            </div>

            <!-- Subtitles -->
            <div>
                <label class="text-sm font-medium mb-1 block">
                    ข้อความรายละเอียด
                </label>
                <div class="space-y-2">
                    <BcInput
                        v-for="(_, index) in playgroundState.subtitles"
                        :key="index"
                        :id="`subtitle-${index}`"
                        :data-value="playgroundState.subtitles[index]"
                        @input="
                            (v) => (playgroundState.subtitles[index] = v || '')
                        "
                        placeholder="ใส่รายละเอียด"
                    />
                </div>
                <BcButton
                    variant="outline"
                    size="sm"
                    icon="Plus"
                    class="mt-2"
                    @click="playgroundState.subtitles.push('')"
                >
                    เพิ่มรายละเอียด
                </BcButton>
            </div>

            <!-- Icon -->
            <div>
                <label class="text-sm font-medium mb-1 block"> ไอคอน </label>
                <BcSelect
                    id="icon-select"
                    :data-value="playgroundState.icon"
                    :items="iconOptions"
                    :reduce-value="(item) => item.value"
                    :reduce-label="(item) => item.label"
                    @selected="(v) => (playgroundState.icon = v.value as TypeIcon)"
                />
            </div>

            <!-- Buttons -->
            <div class="grid grid-cols-2 gap-4">
                <BcInput
                    id="btn-confirm"
                    label="ข้อความปุ่มยืนยัน"
                    :data-value="playgroundState.btnConfirm"
                    @input="(v) => (playgroundState.btnConfirm = v || '')"
                    placeholder="ใส่ข้อความปุ่มยืนยัน"
                />
                <BcInput
                    id="btn-cancel"
                    label="ข้อความปุ่มยกเลิก"
                    :data-value="playgroundState.btnCancel"
                    @input="(v) => (playgroundState.btnCancel = v || '')"
                    placeholder="ใส่ข้อความปุ่มยกเลิก"
                />
            </div>

            <!-- Options -->
            <div class="space-y-2">
                <BcCheckBox
                    v-model="playgroundState.isClose"
                    label="แสดงปุ่มปิด"
                />
                <BcCheckBox
                    v-model="playgroundState.isClickOutSide"
                    label="คลิกพื้นหลังเพื่อปิด"
                />
            </div>

            <!-- Timeout -->
            <div>
                <label class="text-sm font-medium mb-1 block">
                    เวลาปิดอัตโนมัติ (ms)
                </label>
                <BcInput
                    id="timeout"
                    :data-value="String(playgroundState.timeout)"
                    @input="
                        (v) => (playgroundState.timeout = Number(v) || 2000)
                    "
                    placeholder="ระบุเวลาในหน่วยมิลลิวินาที"
                />
            </div>

            <!-- Preview Button -->
            <BcButton class="w-full" @click="showAlert">
                แสดง Alert ตัวอย่าง
            </BcButton>
        </div>

        <!-- Code Preview -->
        <div class="space-y-4">
            <div class="relative bg-slate-800 rounded-lg p-4">
                <BcButton
                    @click="copyCode"
                    variant="white"
                    icon="Copy"
                    class="absolute top-2 right-2"
                    size="sm"
                />
                <pre
                    class="text-sm text-slate-200"
                ><code>{{ generatedCode }}</code></pre>
            </div>

            <!-- Tips -->
            <div class="bg-blue-50 p-4 rounded-lg">
                <div class="flex gap-2">
                    <BcIcon name="Info" size="20" color="primary" />
                    <div class="text-sm text-blue-700">
                        <p class="font-medium mb-1">คำแนะนำ</p>
                        <ul class="list-disc list-inside space-y-1">
                            <li>สามารถกำหนดหัวข้อและรายละเอียดได้หลายบรรทัด</li>
                            <li>เลือกไอคอนให้เหมาะสมกับประเภทของข้อความ</li>
                            <li>ปรับแต่ง timeout ตามความเหมาะสมของเนื้อหา</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
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
