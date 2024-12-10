<script setup lang="ts">
import BcFileUpload from '@/ABC/components/BcFileUpload.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { ref } from 'vue'
import FileUploadPlayground from './children/FileUploadPlayground.vue'

// Props documentation
const propsData = [
    {
        prop: 'id',
        type: 'string',
        required: false,
        default: '-',
        description: 'รหัสอ้างอิงสำหรับ input',
    },
    {
        prop: 'form',
        type: 'string',
        required: false,
        default: '-',
        description: 'ใช้สำหรับ validation ของ form',
    },
    {
        prop: 'dataValue',
        type: 'FileState[]',
        required: true,
        default: '[]',
        description: 'อาร์เรย์ของไฟล์ที่เลือก',
    },
    {
        prop: 'label',
        type: 'string',
        required: false,
        default: '""',
        description: 'ข้อความที่แสดงเหนือ input',
    },
    {
        prop: 'placeholder',
        type: 'string',
        required: false,
        default: 'เลือกไฟล์...',
        description: 'ข้อความที่แสดงเมื่อยังไม่มีการเลือกไฟล์',
    },
    {
        prop: 'accept',
        type: 'string[]',
        required: false,
        default: '[".pdf", ".jpg", ".png"]',
        description: 'นามสกุลไฟล์ที่ยอมรับ',
    },
    {
        prop: 'multiple',
        type: 'boolean',
        required: false,
        default: 'true',
        description: 'อนุญาตให้เลือกไฟล์หลายไฟล์',
    },
    {
        prop: 'rule',
        type: '(files: FileState[]) => boolean',
        required: false,
        default: '-',
        description: 'ฟังก์ชันตรวจสอบความถูกต้อง',
    },
    {
        prop: 'error',
        type: '(files: FileState[]) => string',
        required: false,
        default: '-',
        description: 'ฟังก์ชันข้อความแสดงข้อผิดพลาด',
    },
    {
        prop: 'icon',
        type: 'IconName',
        required: false,
        default: 'Upload',
        description: 'ไอคอนที่แสดง',
    },
    {
        prop: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'ปิดการใช้งาน input',
    },
]

// Events documentation
const eventsData = [
    {
        event: '@change',
        payload: 'FileState[]',
        description: 'เกิดขึ้นเมื่อมีการเลือกหรือลบไฟล์',
    },
]

// รูปแบบการกรองไฟล์
const formatTypes = {
    pdf: 'ไฟล์เอกสาร PDF',
    jpeg: 'รูปภาพ JPEG',
    png: 'รูปภาพ PNG',
    doc: 'เอกสาร Word',
    xlsx: 'เอกสาร Excel',
}

// Examples
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'การอัพโหลดไฟล์แบบพื้นฐาน',
        code: `<BcFileUpload
    id="basic-upload"
    :dataValue="files"
    label="อัพโหลดเอกสาร"
    @change="handleFileChange"
/>`,
    },
    {
        title: 'การตรวจสอบความถูกต้อง',
        description: 'การตรวจสอบว่ามีการเลือกไฟล์หรือไม่',
        code: `<BcFileUpload
    id="required-upload"
    :dataValue="files"
    label="เอกสารประกอบ"
    :rule="(files) => files.length > 0"
    :error="() => 'กรุณาเลือกไฟล์อย่างน้อย 1 ไฟล์'"
    @change="handleFileChange"
/>`,
    },
    {
        title: 'การจำกัดประเภทไฟล์',
        description: 'จำกัดให้เลือกเฉพาะไฟล์ PDF',
        code: `<BcFileUpload
    id="pdf-upload"
    :dataValue="files"
    label="เอกสาร PDF"
    :accept="[.pdf]"
    :multiple="false"
    @change="handleFileChange"
/>`,
    },
]

// Example states
const fileStates = ref<{ [key: string]: any[] }>({
    basic: [],
    required: [],
    pdf: [],
})

// Methods
function handleFileChange(files: any[], type: string) {
    fileStates.value[type] = files
}

// ฟังก์ชันคัดลอกโค้ด
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}

// Validation functions
const validateRequired = (files: any[]) => files.length > 0
</script>

<template>
    <BcLayout
        title="อัพโหลดไฟล์ (File Upload)"
        subtitle="คอมโพเนนต์สำหรับอัพโหลดไฟล์โดยใช้ File System Access API พร้อมฟังก์ชันการแสดงตัวอย่างและการตรวจสอบ"
        icon="Upload"
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
                        <tr class="bg-table text-slate-700">
                            <th class="border p-2 text-left w-1/6">Prop</th>
                            <th class="border p-2 text-left w-1/4">Type</th>
                            <th class="border p-2 text-left w-1/6">Default</th>
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
                        <tr class="bg-table text-slate-700">
                            <th class="border p-2 text-left w-1/4">Event</th>
                            <th class="border p-2 text-left w-1/3">Payload</th>
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

        <!-- ส่วนแสดงรูปแบบการกรองไฟล์ -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="FileCode" size="24" color="primary" />
                <h2 class="text-xl font-bold">รูปแบบไฟล์ที่รองรับ</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                    v-for="(desc, type) in formatTypes"
                    :key="type"
                    class="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-primary transition-colors"
                >
                    <code class="text-blue-600 font-medium">.{{ type }}</code>
                    <p class="mt-2 text-sm text-slate-600">{{ desc }}</p>
                </div>
            </div>
        </section>

        <!-- Playground -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="PenTool" size="24" color="primary" />
                <div>
                    <h2 class="text-xl font-bold">ทดลองใช้งาน FileUpload</h2>
                    <p class="text-sm text-slate-600 mt-1">
                        ทดลองปรับแต่งค่า props ต่างๆ และดูผลลัพธ์ที่เกิดขึ้นกับ
                        component
                    </p>
                </div>
            </div>

            <FileUploadPlayground />
        </section>

        <!-- Examples -->
        <section class="space-y-6">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="BookOpen" size="24" color="primary" />
                <h2 class="text-xl font-bold">ตัวอย่างการใช้งาน</h2>
            </div>

            <div
                v-for="example in examples"
                :key="example.title"
                class="bg-white rounded-xl shadow-lg p-6"
            >
                <h3 class="text-lg font-bold mb-3">{{ example.title }}</h3>
                <p class="text-slate-600 mb-4">{{ example.description }}</p>

                <!-- Code Example -->
                <div class="relative bg-slate-800 rounded-lg p-4 mb-6">
                    <button
                        @click="() => copyCode(example.code)"
                        class="absolute top-2 right-2 p-2 hover:bg-slate-700 rounded"
                    >
                        <BcIcon name="Copy" size="20" color="white" />
                    </button>
                    <pre
                        class="text-sm text-slate-200"
                    ><code>{{ example.code }}</code></pre>
                </div>

                <!-- Live Example -->
                <div class="bg-slate-50 p-4 rounded-lg">
                    <template v-if="example.title === 'การใช้งานพื้นฐาน'">
                        <BcFileUpload
                            id="basic-upload"
                            :dataValue="fileStates.basic"
                            label="อัพโหลดเอกสาร"
                            @change="
                                (files) => handleFileChange(files, 'basic')
                            "
                        />
                    </template>

                    <template v-if="example.title === 'การตรวจสอบความถูกต้อง'">
                        <BcFileUpload
                            id="required-upload"
                            :dataValue="fileStates.required"
                            label="เอกสารประกอบ"
                            :rule="validateRequired"
                            :error="() => 'กรุณาเลือกไฟล์อย่างน้อย 1 ไฟล์'"
                            @change="
                                (files) => handleFileChange(files, 'required')
                            "
                        />
                    </template>

                    <template v-if="example.title === 'การจำกัดประเภทไฟล์'">
                        <BcFileUpload
                            id="pdf-upload"
                            :dataValue="fileStates.pdf"
                            label="เอกสาร PDF"
                            :accept="['.pdf']"
                            :multiple="false"
                            @change="(files) => handleFileChange(files, 'pdf')"
                        />
                    </template>
                </div>
            </div>
        </section>

        <!-- Additional Notes -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Info" size="24" color="primary" />
                <h2 class="text-xl font-bold">คำแนะนำเพิ่มเติม</h2>
            </div>

            <div class="space-y-4">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 class="text-lg font-bold mb-2 text-blue-800">
                        แนวทางการใช้งานที่แนะนำ
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-blue-800">
                        <li>ควรกำหนดขนาดไฟล์สูงสุดที่ยอมรับให้ชัดเจน</li>
                        <li>ควรระบุประเภทไฟล์ที่รองรับให้ผู้ใช้ทราบ</li>
                        <li>ควรแสดงความคืบหน้าเมื่ออัพโหลดไฟล์ขนาดใหญ่</li>
                        <li>ควรมีการแสดงตัวอย่างสำหรับไฟล์รูปภาพ</li>
                        <li>ควรมีการ clean up resources เมื่อไม่ใช้งาน</li>
                    </ul>
                </div>

                <div
                    class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                >
                    <h3 class="text-lg font-bold mb-2 text-yellow-800">
                        ข้อควรระวัง
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-yellow-800">
                        <li>ระวังการใช้งานหน่วยความจำเมื่อมีไฟล์จำนวนมาก</li>
                        <li>ควรมีการจัดการ error ที่อาจเกิดขึ้น</li>
                        <li>ควรตรวจสอบการรองรับ File System Access API</li>
                        <li>ควรมี fallback สำหรับ browser ที่ไม่รองรับ</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Type System -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="FileCode" size="24" color="primary" />
                <h2 class="text-xl font-bold">Type System</h2>
            </div>

            <div class="space-y-4">
                <!-- FileState Type -->
                <div class="bg-slate-800 rounded-lg p-4">
                    <h3 class="text-lg font-bold text-white mb-2">FileState</h3>
                    <pre class="text-slate-200"><code>type FileState = {
    id: string | number | null    // ID ของไฟล์
    file: File | string          // ไฟล์หรือ URL
    image: string                // URL สำหรับแสดงตัวอย่าง
    isActive: boolean           // สถานะการแสดงผล
}</code></pre>
                </div>

                <!-- Validation Types -->
                <div class="bg-slate-800 rounded-lg p-4">
                    <h3 class="text-lg font-bold text-white mb-2">
                        Validation Functions
                    </h3>
                    <pre
                        class="text-slate-200"
                    ><code>type ValidationRule = (files: FileState[]) => boolean
type ErrorMessage = (files: FileState[]) => string

// ตัวอย่างการใช้งาน
const requireFile: ValidationRule = (files) => files.length > 0
const errorMessage: ErrorMessage = () => 'กรุณาเลือกไฟล์'</code></pre>
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

.list-disc {
    list-style-type: disc;
    padding-left: 1rem;
}

.list-inside {
    list-style-position: inside;
}
</style>
