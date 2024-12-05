<script setup lang="ts">
import type { IconName } from '@/ABC/bc-types'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcFileUpload from '@/ABC/components/BcFileUpload.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import { computed, reactive, ref } from 'vue'

// สถานะและค่าเริ่มต้นของ props ทั้งหมด
const props = reactive({
    id: 'playground-upload',
    label: 'อัพโหลดเอกสาร',
    placeholder: 'เลือกไฟล์...',
    icon: 'Upload' as IconName | undefined,
    accept: ['.pdf', '.jpg', '.png'],
    multiple: true,
    disabled: false,
    required: false,
    form: 'upload-form',
    isClear: true,
})

// ค่าปัจจุบันของไฟล์
const files = ref<any[]>([])

// ตัวเลือกไอคอน
const iconOptions: Array<{ value: IconName | ''; label: string }> = [
    { value: '', label: 'ไม่มีไอคอน' },
    { value: 'Upload', label: 'Upload' },
    { value: 'File', label: 'File' },
    { value: 'FileText', label: 'FileText' },
    { value: 'Files', label: 'Files' },
    { value: 'Image', label: 'Image' },
    { value: 'ImagePlus', label: 'ImagePlus' },
]

// ตัวเลือกประเภทไฟล์
const acceptOptions: {
    value: string
    label: string
    icon: IconName
}[] = [
    { value: '.pdf', label: 'PDF (.pdf)', icon: 'FileText' },
    { value: '.jpg', label: 'JPEG (.jpg)', icon: 'Image' },
    { value: '.png', label: 'PNG (.png)', icon: 'Image' },
    { value: '.doc', label: 'Word (.doc)', icon: 'File' },
    { value: '.xlsx', label: 'Excel (.xlsx)', icon: 'Dock' },
]

// จัดการการเปลี่ยนแปลงของไฟล์
const handleFileChange = (newFiles: any[]) => {
    files.value = newFiles
}

// สร้างโค้ดตัวอย่างตาม props ที่เลือก
const generatedCode = computed(() => {
    const lines = [
        `<BcFileUpload`,
        `  id="${props.id}"`,
        `  label="${props.label}"`,
        `  placeholder="${props.placeholder}"`,
    ]

    if (props.icon) {
        lines.push(`  icon="${props.icon}"`)
    }

    if (props.accept.length) {
        lines.push(
            `  :accept="[${props.accept.map((a) => `'${a}'`).join(', ')}]"`
        )
    }

    if (props.required) {
        lines.push(`  :rule="(files) => files.length > 0"`)
        lines.push(`  :error="() => 'กรุณาเลือกไฟล์อย่างน้อย 1 ไฟล์'"`)
    }

    if (props.form) {
        lines.push(`  form="${props.form}"`)
    }

    lines.push(
        `  :multiple="${props.multiple}"`,
        `  :disabled="${props.disabled}"`,
        `  :isClear="${props.isClear}"`,
        `  :dataValue="files"`,
        `  @change="handleFileChange"`,
        `/>`
    )

    return lines.join('\n')
})

// ตัวเลือกประเภทไฟล์
const toggleAcceptType = (checked: boolean, type: string) => {
    const index = props.accept.indexOf(type)
    if (checked && index === -1) {
        props.accept.push(type)
    } else if (!checked && index !== -1) {
        props.accept.splice(index, 1)
    }
}

// คัดลอกโค้ดไปยัง clipboard
const copyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
}

// แสดงข้อมูลไฟล์
const fileInfo = computed(() => {
    if (!files.value.length) return 'ยังไม่มีไฟล์ที่เลือก'
    return `เลือกไฟล์แล้ว ${files.value.length} ไฟล์`
})
</script>

<template>
    <!-- Playground Container -->
    <div class="bg-slate-50 p-6 space-y-6">
        <!-- Preview Section -->
        <section class="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div class="flex items-center gap-2 mb-4">
                <BcIcon name="Eye" size="24" color="primary" />
                <h2 class="text-xl font-bold">ดูตัวอย่าง</h2>
            </div>

            <BcFileUpload
                v-bind="props"
                :dataValue="files"
                :rule="props.required ? (files) => files.length > 0 : undefined"
                :error="
                    props.required
                        ? () => 'กรุณาเลือกไฟล์อย่างน้อย 1 ไฟล์'
                        : undefined
                "
                @change="handleFileChange"
            />

            <div class="p-3 bg-slate-50 rounded-lg">
                <div class="flex items-center gap-2 text-sm text-slate-600">
                    <BcIcon name="Info" size="16" />
                    <span>{{ fileInfo }}</span>
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
                    <BcInput
                        id="playground-upload"
                        label="Label"
                        :dataValue="props.label"
                        @input="(v) => (props.label = v || '')"
                        placeholder="ใส่ข้อความ Label"
                    />

                    <BcInput
                        id="playground-upload"
                        label="Placeholder"
                        :dataValue="props.placeholder"
                        @input="(v) => (props.placeholder = v || '')"
                        placeholder="ใส่ข้อความ Placeholder"
                    />

                    <BcInput
                        id="playground-upload"
                        label="Form"
                        :dataValue="props.form"
                        @input="(v) => (props.form = v || '')"
                        placeholder="ระบุ form สำหรับการ validate"
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
                            class="w-full p-2 border rounded-lg"
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

            <!-- State Settings -->
            <section class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center gap-2 mb-6">
                    <BcIcon name="ToggleLeft" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ตั้งค่าสถานะ</h2>
                </div>

                <div class="grid gap-4">
                    <BcCheckBox
                        v-model="props.isClear"
                        label="แสดงปุ่มล้างข้อมูล"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="props.multiple"
                        label="อนุญาตให้เลือกหลายไฟล์"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="props.required"
                        label="บังคับให้เลือกไฟล์"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="props.disabled"
                        label="ปิดการใช้งาน"
                        size="lg"
                    />
                </div>
            </section>

            <!-- File Type Settings -->
            <section class="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
                <div class="flex items-center gap-2 mb-6">
                    <BcIcon name="FileText" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ประเภทไฟล์ที่ยอมรับ</h2>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div
                        v-for="type in acceptOptions"
                        :key="type.value"
                        class="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <div class="flex items-center gap-3">
                            <BcIcon :name="type.icon" size="20" />
                            <BcCheckBox
                                :label="type.label"
                                :model-value="props.accept.includes(type.value)"
                                @change="
                                    (checked) =>
                                        toggleAcceptType(checked, type.value)
                                "
                                size="lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Generated Code -->
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

<style scoped>
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}

code {
    font-family: ui-monospace, monospace;
}
</style>
