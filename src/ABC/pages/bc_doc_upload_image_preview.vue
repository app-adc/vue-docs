<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcUploadImagePreview from '@/ABC/components/BcUploadImagePreview.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { computed, ref } from 'vue'

// ตัวเลือกขนาด
const sizeOptions = [
    { value: 'sm', label: 'เล็ก (96x96px)' },
    { value: 'md', label: 'กลาง (128x128px)' },
    { value: 'lg', label: 'ใหญ่ (160x160px)' },
    { value: 'xl', label: 'ใหญ่มาก (192x192px)' },
    { value: 'xxl', label: 'ใหญ่พิเศษ (224x224px)' },
]

// Props documentation
const propsData = [
    {
        prop: 'modelValue',
        type: 'string | null',
        required: true,
        default: 'null',
        description: 'ค่ารูปภาพที่เลือก (base64 หรือ URL)',
    },
    {
        prop: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl' | 'xxl'",
        required: false,
        default: 'lg',
        description: 'ขนาดของ preview',
    },
    {
        prop: 'accept',
        type: 'string[]',
        required: false,
        default: "['image/jpeg', 'image/png']",
        description: 'ประเภทไฟล์ที่ยอมรับ',
    },
    {
        prop: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'ปิดการใช้งานการอัพโหลด',
    },
    {
        prop: 'clearable',
        type: 'boolean',
        required: false,
        default: 'true',
        description: 'แสดงปุ่มลบรูปภาพ',
    },
]

// Events documentation
const eventsData = [
    {
        event: '@update:modelValue',
        payload: 'string | null',
        description: 'อัพเดทค่ารูปภาพ',
    },
    {
        event: '@change',
        payload: 'File',
        description: 'เมื่อมีการเลือกไฟล์ใหม่',
    },
    {
        event: '@clear',
        payload: 'void',
        description: 'เมื่อมีการลบรูปภาพ',
    },
]

// สถานะสำหรับ playground
const playgroundState = ref<{
    modelValue: string | null
    size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
    disabled: boolean
    clearable: boolean
    acceptJPEG: boolean
    acceptPNG: boolean
}>({
    modelValue: null,
    size: 'lg',
    disabled: false,
    clearable: true,
    acceptJPEG: true,
    acceptPNG: true,
})

// สร้างโค้ดตัวอย่างจากสถานะปัจจุบัน
const generatedCode = computed(() => {
    const accepts = []
    if (playgroundState.value.acceptJPEG) accepts.push('image/jpeg')
    if (playgroundState.value.acceptPNG) accepts.push('image/png')

    const lines = [
        '<BcUploadImagePreview',
        `  v-model="imageValue"`,
        `  size="${playgroundState.value.size}"`,
        `  :clearable="${playgroundState.value.clearable}"`,
        `  :disabled="${playgroundState.value.disabled}"`,
        `  :accept="[${accepts.map((a) => `'${a}'`).join(', ')}]"`,
        '/>',
    ]

    return lines.join('\n')
})

// Examples
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'อัพโหลดรูปภาพแบบพื้นฐาน',
        code: `<BcUploadImagePreview
  v-model="image"
  @change="handleChange"
/>`,
    },
    {
        title: 'การกำหนดขนาด',
        description: 'กำหนดขนาดของพื้นที่แสดงรูป',
        code: `<BcUploadImagePreview
  v-model="image"
  size="xl"
/>`,
    },
    {
        title: 'การจำกัดประเภทไฟล์',
        description: 'กำหนดประเภทไฟล์ที่สามารถอัพโหลดได้',
        code: `<BcUploadImagePreview  
  v-model="image"
  :accept="['image/jpeg']"
/>`,
    },
]

// จัดการการอัพโหลดไฟล์
const handleUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
        playgroundState.value.modelValue = reader.result as string
    }
    reader.readAsDataURL(file)
}

// คัดลอกโค้ด
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}
</script>

<template>
    <BcLayout
        title="อัพโหลดรูปภาพ (Upload Image Preview)"
        subtitle="คอมโพเนนต์สำหรับอัพโหลดและแสดงตัวอย่างรูปภาพ"
        icon="Image"
    >
        <!-- Props Table -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="ListFilter" size="24" color="primary" />
                <h2 class="text-xl font-bold">Props ที่รองรับ</h2>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-table text-white">
                            <th class="border p-2 text-left">Prop</th>
                            <th class="border p-2 text-left">Type</th>
                            <th class="border p-2 text-left">Default</th>
                            <th class="border p-2 text-left">คำอธิบาย</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prop in propsData" :key="prop.prop">
                            <td class="border p-2 font-mono text-sm">
                                {{ prop.prop }}
                            </td>
                            <td
                                class="border p-2 font-mono text-sm text-blue-600"
                            >
                                {{ prop.type }}
                            </td>
                            <td class="border p-2 font-mono text-sm">
                                {{ prop.default }}
                            </td>
                            <td class="border p-2">{{ prop.description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Events Table -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="MessageCircleMore" size="24" color="primary" />
                <h2 class="text-xl font-bold">Events ที่รองรับ</h2>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-table text-white">
                            <th class="border p-2 text-left">Event</th>
                            <th class="border p-2 text-left">Payload</th>
                            <th class="border p-2 text-left">คำอธิบาย</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="event in eventsData" :key="event.event">
                            <td class="border p-2 font-mono text-sm">
                                {{ event.event }}
                            </td>
                            <td class="border p-2 font-mono text-sm">
                                {{ event.payload }}
                            </td>
                            <td class="border p-2">{{ event.description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Examples -->
        <section class="space-y-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="BookOpen" size="24" color="primary" />
                <h2 class="text-xl font-bold">ตัวอย่างการใช้งาน</h2>
            </div>

            <div
                v-for="example in examples"
                :key="example.title"
                class="bg-white rounded-xl shadow-lg p-6"
            >
                <h3 class="text-lg font-bold mb-2">{{ example.title }}</h3>
                <p class="text-slate-600 mb-4">{{ example.description }}</p>

                <!-- Code Example -->
                <div class="relative bg-slate-800 rounded-lg p-4 mb-4">
                    <BcButton
                        @click="() => copyCode(example.code)"
                        variant="white"
                        icon="Copy"
                        class="!absolute top-3 right-3"
                        size="sm"
                    />
                    <pre
                        class="text-sm text-slate-200"
                    ><code>{{ example.code }}</code></pre>
                </div>

                <!-- Live Example -->
                <div class="bg-slate-50 p-4 rounded-lg flex justify-center">
                    <BcUploadImagePreview
                        v-if="example.title === 'การใช้งานพื้นฐาน'"
                        v-model="playgroundState.modelValue"
                        @change="handleUpload"
                    />

                    <BcUploadImagePreview
                        v-if="example.title === 'การกำหนดขนาด'"
                        v-model="playgroundState.modelValue"
                        size="xl"
                    />

                    <BcUploadImagePreview
                        v-if="example.title === 'การจำกัดประเภทไฟล์'"
                        v-model="playgroundState.modelValue"
                        :accept="['image/jpeg']"
                    />
                </div>
            </div>
        </section>

        <!-- Interactive Playground -->
        <section class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="PenTool" size="24" color="primary" />
                <h2 class="text-xl font-bold">Interactive Playground</h2>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Controls -->
                <div class="space-y-4">
                    <!-- ขนาด -->
                    <div>
                        <label class="text-sm font-medium mb-2 block"
                            >ขนาด</label
                        >
                        <select
                            v-model="playgroundState.size"
                            class="w-full p-2 border rounded-lg focus:border-primary outline-none"
                        >
                            <option
                                v-for="option in sizeOptions"
                                :key="option.value"
                                :value="option.value"
                            >
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                    <!-- การทำงาน -->
                    <div class="flex gap-x-4">
                        <BcCheckBox
                            v-model="playgroundState.disabled"
                            label="ปิดการใช้งาน"
                            size="lg"
                        />
                        <BcCheckBox
                            v-model="playgroundState.clearable"
                            label="แสดงปุ่มลบ"
                            size="lg"
                        />
                    </div>

                    <!-- ประเภทไฟล์ที่ยอมรับ -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium block"
                            >ประเภทไฟล์ที่ยอมรับ</label
                        >
                        <div class="flex gap-x-4">
                            <BcCheckBox
                                v-model="playgroundState.acceptJPEG"
                                label="JPEG (.jpg, .jpeg)"
                                size="lg"
                            />
                            <BcCheckBox
                                v-model="playgroundState.acceptPNG"
                                label="PNG (.png)"
                                size="lg"
                            />
                        </div>
                    </div>
                </div>

                <!-- Preview -->
                <div class="space-y-8">
                    <!-- Live Preview -->
                    <div class="bg-slate-50 rounded-lg p-4 flex justify-center">
                        <BcUploadImagePreview
                            v-bind="playgroundState"
                            @change="handleUpload"
                        />
                    </div>

                    <!-- Generated Code -->
                    <div class="relative bg-slate-800 rounded-lg p-4">
                        <BcButton
                            @click="() => copyCode(generatedCode)"
                            variant="white"
                            icon="Copy"
                            class="!absolute top-3 right-3"
                            size="sm"
                        />
                        <pre
                            class="text-sm text-slate-200"
                        ><code>{{ generatedCode }}</code></pre>
                    </div>
                </div>
            </div>
        </section>
        <!-- Best Practices section in bc_doc_upload_image_preview.vue -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Lightbulb" size="24" color="primary" />
                <div>
                    <h2 class="text-xl font-bold">แนวทางการใช้งานที่แนะนำ</h2>
                    <p class="text-sm text-slate-600 mt-1">
                        การใช้งานที่ดีและข้อควรระวัง
                    </p>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Do's -->
                <div class="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 class="font-bold text-green-800 mb-4">
                        ควรปฏิบัติ (Do's)
                    </h3>
                    <ul class="space-y-4">
                        <!-- กำหนดประเภทไฟล์ -->
                        <li class="flex items-start gap-2">
                            <BcIcon
                                name="Check"
                                size="20"
                                class="text-green-600 flex-shrink-0 mt-1"
                            />
                            <div>
                                <p class="font-medium text-green-800">
                                    กำหนด accept ให้ชัดเจน
                                </p>
                                <p class="text-sm text-green-700 mt-1">
                                    ควรระบุประเภทไฟล์ที่ยอมรับให้ชัดเจน เช่น
                                    ['image/jpeg', 'image/png']
                                    เพื่อป้องกันการอัพโหลดไฟล์ผิดประเภท
                                </p>
                            </div>
                        </li>
                        <!-- ปรับขนาดให้เหมาะสม -->
                        <li class="flex items-start gap-2">
                            <BcIcon
                                name="Check"
                                size="20"
                                class="text-green-600 flex-shrink-0 mt-1"
                            />
                            <div>
                                <p class="font-medium text-green-800">
                                    เลือกขนาดที่เหมาะสม
                                </p>
                                <p class="text-sm text-green-700 mt-1">
                                    ควรเลือกขนาด (size)
                                    ให้เหมาะสมกับพื้นที่และการใช้งาน เช่น 'lg'
                                    สำหรับภาพหลัก, 'sm' สำหรับ avatar
                                </p>
                            </div>
                        </li>
                        <!-- จัดการ state -->
                        <li class="flex items-start gap-2">
                            <BcIcon
                                name="Check"
                                size="20"
                                class="text-green-600 flex-shrink-0 mt-1"
                            />
                            <div>
                                <p class="font-medium text-green-800">
                                    จัดการ disabled state
                                </p>
                                <p class="text-sm text-green-700 mt-1">
                                    ใช้ disabled prop
                                    เมื่อต้องการป้องกันการอัพโหลดชั่วคราว เช่น
                                    ระหว่างกำลังส่งข้อมูล
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Don'ts -->
                <div class="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h3 class="font-bold text-red-800 mb-4">
                        ไม่ควรปฏิบัติ (Don'ts)
                    </h3>
                    <ul class="space-y-4">
                        <!-- ไม่กำหนดประเภทไฟล์ -->
                        <li class="flex items-start gap-2">
                            <BcIcon
                                name="X"
                                size="20"
                                class="text-red-600 flex-shrink-0 mt-1"
                            />
                            <div>
                                <p class="font-medium text-red-800">
                                    ไม่กำหนด accept
                                </p>
                                <p class="text-sm text-red-700 mt-1">
                                    ไม่ควรปล่อยให้ accept เป็นค่าเริ่มต้น
                                    ควรระบุประเภทไฟล์ที่ต้องการเสมอ
                                </p>
                            </div>
                        </li>
                        <!-- ไม่จัดการ v-model -->
                        <li class="flex items-start gap-2">
                            <BcIcon
                                name="X"
                                size="20"
                                class="text-red-600 flex-shrink-0 mt-1"
                            />
                            <div>
                                <p class="font-medium text-red-800">
                                    ไม่ใช้ v-model
                                </p>
                                <p class="text-sm text-red-700 mt-1">
                                    ไม่ควรใช้แค่ @change event ควรใช้ v-model
                                    เพื่อจัดการค่ารูปภาพที่ถูกต้อง
                                </p>
                            </div>
                        </li>
                        <!-- ไม่จัดการ clear -->
                        <li class="flex items-start gap-2">
                            <BcIcon
                                name="X"
                                size="20"
                                class="text-red-600 flex-shrink-0 mt-1"
                            />
                            <div>
                                <p class="font-medium text-red-800">
                                    ปิด clearable โดยไม่จำเป็น
                                </p>
                                <p class="text-sm text-red-700 mt-1">
                                    ควรเปิด clearable ไว้เสมอ
                                    ยกเว้นกรณีที่จำเป็นต้องมีรูปภาพเท่านั้น
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Tips -->
            <div class="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 class="font-bold text-blue-800 mb-4">เคล็ดลับการใช้งาน</h3>
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-medium text-blue-800 mb-2">
                            การจัดการรูปภาพ
                        </h4>
                        <ul class="space-y-2 text-sm text-blue-700">
                            <li class="flex items-center gap-2">
                                <BcIcon
                                    name="Info"
                                    size="16"
                                    class="text-blue-600"
                                />
                                v-model จะเก็บค่าเป็น base64 string หรือ URL
                            </li>
                            <li class="flex items-center gap-2">
                                <BcIcon
                                    name="Info"
                                    size="16"
                                    class="text-blue-600"
                                />
                                ควรเตรียมพื้นที่แสดงผลให้พอดีกับ size ที่เลือก
                            </li>
                            <li class="flex items-center gap-2">
                                <BcIcon
                                    name="Info"
                                    size="16"
                                    class="text-blue-600"
                                />
                                รองรับไฟล์ JPEG และ PNG เป็นค่าเริ่มต้น
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-medium text-blue-800 mb-2">
                            Event Handling
                        </h4>
                        <ul class="space-y-2 text-sm text-blue-700">
                            <li class="flex items-center gap-2">
                                <BcIcon
                                    name="Info"
                                    size="16"
                                    class="text-blue-600"
                                />
                                @change จะส่ง File object กลับมา
                            </li>
                            <li class="flex items-center gap-2">
                                <BcIcon
                                    name="Info"
                                    size="16"
                                    class="text-blue-600"
                                />
                                @clear เมื่อมีการลบรูปภาพ
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </BcLayout>
</template>

<style scoped>
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}

code {
    font-family: ui-monospace, monospace;
}

table {
    border: 1px solid var(--border);
}

th,
td {
    border: 1px solid var(--border);
}

.bg-slate-800 :deep(.bg-white) {
    --tw-bg-opacity: 0.9;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-slate-800 :deep(.bg-white:hover) {
    --tw-bg-opacity: 1;
}
</style>
