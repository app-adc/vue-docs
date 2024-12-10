<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import AlertPlayground from '@/ABC/pages/children/AlertPlayground.vue'
import { useAlert } from '@/ABC/ui/bc-composition'

// Props documentation
const propsData = [
    {
        prop: 'titles',
        type: 'string[]',
        required: false,
        default: '[]',
        description: 'หัวข้อของ Alert (รองรับหลายบรรทัด)',
    },
    {
        prop: 'subtitles',
        type: 'string[]',
        required: false,
        default: '[]',
        description: 'ข้อความรายละเอียด (รองรับหลายบรรทัด)',
    },
    {
        prop: 'icon',
        type: "'BadgeCheck' | 'BadgeHelp' | 'BadgeAlert' | 'CircleX'",
        required: false,
        default: "'BadgeCheck'",
        description: 'ไอคอนที่แสดงใน Alert',
    },
    {
        prop: 'isClose',
        type: 'boolean',
        required: false,
        default: 'true',
        description: 'แสดงปุ่มปิด Alert',
    },
    {
        prop: 'isClickOutSide',
        type: 'boolean',
        required: false,
        default: 'true',
        description: 'อนุญาตให้คลิกพื้นหลังเพื่อปิด Alert',
    },
    {
        prop: 'btnConfirm',
        type: 'string',
        required: false,
        default: "''",
        description: 'ข้อความปุ่มยืนยัน',
    },
    {
        prop: 'btnCancel',
        type: 'string',
        required: false,
        default: "''",
        description: 'ข้อความปุ่มยกเลิก',
    },
    {
        prop: 'timeout',
        type: 'number',
        required: false,
        default: '2000',
        description: 'เวลาที่ Alert จะปิดอัตโนมัติ (มิลลิวินาที)',
    },
]

// Alert examples with code snippets
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'Alert แบบพื้นฐานแสดงข้อความสำเร็จ',
        code: `const { activeAlert } = useAlert()

activeAlert({
    titles: ['สำเร็จ'],
    subtitles: ['บันทึกข้อมูลเรียบร้อยแล้ว'],
    icon: 'BadgeCheck',
    timeout: 2000
})`,
    },
    {
        title: 'Alert แบบยืนยัน',
        description: 'Alert ที่ต้องการการยืนยันจากผู้ใช้',
        code: `const { activeAlert } = useAlert()

activeAlert({
    titles: ['ยืนยันการลบ', 'คุณแน่ใจหรือไม่?'],
    subtitles: ['การดำเนินการนี้ไม่สามารถย้อนกลับได้'],
    icon: 'BadgeHelp',
    isClose: false,
    btnCancel: 'ยกเลิก',
    btnConfirm: 'ยืนยัน',
    next: () => {
        // โค้ดที่จะทำงานเมื่อกดยืนยัน
        console.log('ยืนยันการลบ')
        removeAlert()
    }
})`,
    },
    {
        title: 'Alert แบบแจ้งเตือน',
        description: 'Alert สำหรับแจ้งเตือนผู้ใช้',
        code: `const { activeAlert } = useAlert()

activeAlert({
    titles: ['แจ้งเตือน'],
    subtitles: [
        'การเชื่อมต่อไม่เสถียร',
        'กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต'
    ],
    icon: 'BadgeAlert',
    isClickOutSide: false,
    btnConfirm: 'ตกลง'
})`,
    },
]

// Copy functionality
const { activeAlert } = useAlert()

const copyCode = async (code: string) => {
    try {
        await navigator.clipboard.writeText(code)
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
    <BcLayout
        title="Modal Alert"
        subtitle="คอมโพเนนต์สำหรับแสดง Alert ในรูปแบบ Modal ที่มีความยืดหยุ่นและปรับแต่งได้"
        icon="MessageCircleMore"
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

        <!-- Playground -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="PenTool" size="24" color="primary" />
                <h2 class="text-xl font-bold">ทดลองใช้งาน Alert</h2>
            </div>

            <AlertPlayground />
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
                <div class="relative bg-slate-800 rounded-lg p-4">
                    <BcButton
                        @click="() => copyCode(example.code)"
                        variant="white"
                        icon="Copy"
                        class="absolute top-2 right-2"
                        size="sm"
                    />
                    <pre
                        class="text-sm text-slate-200"
                    ><code>{{ example.code }}</code></pre>
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

.bg-slate-800 :deep(.bg-white) {
    --tw-bg-opacity: 0.9;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-slate-800 :deep(.bg-white:hover) {
    --tw-bg-opacity: 1;
}
</style>
