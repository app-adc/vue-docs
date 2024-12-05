<script setup lang="ts">
import type { ColorName, IconName } from '@/ABC/bc-types'
import BcButton from '@/ABC/components/BcButton.vue'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcToast from '@/ABC/components/BcToast.vue'
import { computed, reactive, ref } from 'vue'

type ButtonSize = 'sm' | 'md' | 'lg'

// Toast state
const showToast = ref(false)
const toastMessage = ref('')

// Playground state
const playgroundState = reactive({
    variant: 'primary' as ColorName,
    color: undefined as ColorName | undefined,
    size: 'md' as ButtonSize,
    icon: undefined as IconName | undefined,
    iconAlign: 'LEFT' as 'LEFT' | 'RIGHT',
    isLoading: false,
    disabled: false,
    text: 'ปุ่มตัวอย่าง',
})

// Available options
const Variants: ColorName[] = [
    'primary',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'error',
    'outline',
    'link',
    'icon',
    'white',
]
const Sizes: Array<{ value: ButtonSize; label: string }> = [
    { value: 'sm', label: 'เล็ก' },
    { value: 'md', label: 'กลาง' },
    { value: 'lg', label: 'ใหญ่' },
]
const Icons: Array<{ value: IconName | ''; label: string }> = [
    { value: '', label: 'ไม่มี' },
    { value: 'Heart', label: 'หัวใจ' },
    { value: 'Send', label: 'ส่ง' },
    { value: 'Save', label: 'บันทึก' },
    { value: 'Trash2', label: 'ลบ' },
]

const showCopyToast = async (textCopy: string) => {
    const success = await copyToClipboard(textCopy)
    toastMessage.value = success ? 'คัดลอกโค้ดแล้ว!' : 'ไม่สามารถคัดลอกได้'
    showToast.value = true
}

// Click counter for demo
const clickCount = ref(0)
const handleClick = () => {
    clickCount.value++
    showCopyToast(generatedCode.value)
}

// Code generation
const generatedCode = computed(() => {
    const lines = ['<BcButton']

    if (playgroundState.variant !== 'primary') {
        lines.push(`  variant="${playgroundState.variant}"`)
    }
    if (playgroundState.color) {
        lines.push(`  color="${playgroundState.color}"`)
    }
    if (playgroundState.size !== 'md') {
        lines.push(`  size="${playgroundState.size}"`)
    }
    if (playgroundState.icon) {
        lines.push(`  icon="${playgroundState.icon}"`)
    }
    if (playgroundState.iconAlign !== 'LEFT') {
        lines.push(`  iconAlign="${playgroundState.iconAlign}"`)
    }
    if (playgroundState.isLoading) {
        lines.push('  :isLoading="true"')
    }
    if (playgroundState.disabled) {
        lines.push('  disabled')
    }

    if (lines.length === 1) {
        lines[0] = `<BcButton>${playgroundState.text}</BcButton>`
    } else {
        lines.push(`>${playgroundState.text}</BcButton>`)
    }

    return lines.join('\n')
})

// Copy functions

const handleSizeChange = (newSize: ButtonSize) => {
    playgroundState.size = newSize
}

// Utility function for clipboard operations
const copyToClipboard = async (text: string) => {
    try {
        if (window?.navigator?.clipboard) {
            await window.navigator.clipboard.writeText(text)
            return true
        }
        // Fallback implementation...
    } catch (err) {
        console.error('Failed to copy text:', err)
        return false
    }
}
</script>

<template>
    <div class="space-y-8">
        <!-- Interactive Playground -->
        <section class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="PenTool" size="24" color="primary" />
                <div>
                    <h2 class="text-xl font-bold">Interactive Playground</h2>
                    <p class="text-sm text-slate-600 mt-1">
                        ทดลองปรับแต่งค่า props ต่างๆ
                        และดูผลลัพธ์ที่เกิดขึ้นกับปุ่ม
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Preview Section -->
                <div class="space-y-6">
                    <div
                        class="bg-slate-50 h-40 rounded-lg flex items-center justify-center"
                    >
                        <BcButton
                            v-bind="playgroundState"
                            class="transition-all duration-200"
                            @click="handleClick"
                        >
                            {{ playgroundState.text }}
                        </BcButton>
                    </div>
                    <div class="text-sm text-slate-600">
                        จำนวนคลิก: {{ clickCount }}
                    </div>
                    <div class="bg-slate-100 p-4 rounded-lg">
                        <pre class="text-sm">{{ generatedCode }}</pre>
                        <BcButton
                            @click="showCopyToast(generatedCode)"
                            variant="outline"
                            size="sm"
                            class="mt-2"
                            icon="Copy"
                        >
                            คัดลอกโค้ด
                        </BcButton>
                    </div>
                </div>

                <!-- Controls Section -->
                <div class="space-y-4">
                    <!-- Button Text -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">ข้อความปุ่ม</label>
                        <input
                            v-model="playgroundState.text"
                            class="w-full p-2 border rounded-lg"
                            placeholder="ใส่ข้อความปุ่ม"
                        />
                    </div>

                    <!-- Variant Selection -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">รูปแบบ</label>
                        <div class="flex gap-2 flex-wrap">
                            <BcButton
                                v-for="variant in Variants"
                                :key="variant"
                                :variant="variant"
                                size="sm"
                                @click="playgroundState.variant = variant"
                            >
                                {{ variant }}
                            </BcButton>
                        </div>
                    </div>

                    <!-- Size Selection -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">ขนาด</label>
                        <div class="flex gap-2">
                            <BcButton
                                v-for="size in Sizes"
                                :key="size.value"
                                variant="outline"
                                :color="
                                    playgroundState.size === size.value
                                        ? 'primary'
                                        : 'outline'
                                "
                                @click="handleSizeChange(size.value)"
                                size="sm"
                            >
                                {{ size.label }}
                            </BcButton>
                        </div>
                    </div>

                    <!-- Icon Selection -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">ไอคอน</label>
                        <select
                            v-model="playgroundState.icon"
                            class="w-full p-2 border rounded-lg"
                        >
                            <option
                                v-for="icon in Icons"
                                :key="icon.value"
                                :value="icon.value"
                            >
                                {{ icon.label }}
                            </option>
                        </select>
                    </div>

                    <!-- Additional Options -->
                    <div class="flex items-center gap-6 pt-4">
                        <BcCheckBox
                            :model-value="playgroundState.iconAlign === 'RIGHT'"
                            label="แสดงไอคอนด้านขวา"
                            @change="
                                (checked) =>
                                    (playgroundState.iconAlign = checked
                                        ? 'RIGHT'
                                        : 'LEFT')
                            "
                        />
                        <BcCheckBox
                            v-model="playgroundState.isLoading"
                            label="แสดงสถานะโหลด"
                        />
                        <BcCheckBox
                            v-model="playgroundState.disabled"
                            label="ปิดการใช้งาน"
                        />
                    </div>
                </div>
            </div>
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>
