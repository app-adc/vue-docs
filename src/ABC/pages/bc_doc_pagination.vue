<script setup lang="ts">
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcPagination from '@/ABC/components/BcPagination.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { ref } from 'vue'

// ข้อมูลตาราง Props
const propsData = [
    {
        prop: 'dataValue',
        type: 'number',
        required: true,
        default: '-',
        description: 'หน้าปัจจุบัน (เริ่มจาก 0)',
    },
    {
        prop: 'total',
        type: 'number',
        required: true,
        default: '-',
        description: 'จำนวนข้อมูลทั้งหมด',
    },
    {
        prop: 'size',
        type: 'number',
        required: false,
        default: '10',
        description: 'จำนวนข้อมูลต่อหน้า',
    },
]

// ข้อมูลตาราง Events
const eventsData = [
    {
        event: '@change',
        payload: 'number',
        description: 'เกิดขึ้นเมื่อมีการเปลี่ยนหน้า ส่งค่าหน้าที่เลือกกลับไป',
    },
]

// ตัวอย่างการใช้งาน
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'การแสดงการแบ่งหน้าพื้นฐาน',
        code: `<BcPagination
    :data-value="0"
    :total="100"
    @change="(page) => handlePageChange(page)"
/>`,
    },
    {
        title: 'กำหนดจำนวนต่อหน้า',
        description: 'การกำหนดจำนวนรายการต่อหน้า',
        code: `<BcPagination
    :data-value="0"
    :total="100"
    :size="20"
    @change="(page) => handlePageChange(page)"
/>`,
    },
]

// สถานะสำหรับตัวอย่าง
const paginationState = ref({
    currentPage: 0,
    total: 100,
    size: 10,
})

const currentExample = ref({
    currentPage: 0,
    total: 100,
    size: 20,
})

// ฟังก์ชันจัดการการเปลี่ยนหน้า
const handlePageChange = (page: number) => {
    paginationState.value.currentPage = page
}

const handleCustomSizeChange = (page: number) => {
    currentExample.value.currentPage = page
}

// ฟังก์ชันคัดลอกโค้ด
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}
</script>

<template>
    <BcLayout
        title="การแบ่งหน้า (Pagination)"
        subtitle="คอมโพเนนต์สำหรับแบ่งหน้าข้อมูลและนำทางระหว่างหน้า"
        icon="MoveHorizontal"
    >
        <!-- Props Table -->
        <section class="mb-8">
            <h2 class="text-xl font-bold mb-4">Props ที่รองรับ</h2>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-slate-50">
                            <th class="border p-2 text-left">Prop</th>
                            <th class="border p-2 text-left">Type</th>
                            <th class="border p-2 text-left">Default</th>
                            <th class="border p-2 text-left">คำอธิบาย</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="prop in propsData"
                            :key="prop.prop"
                            class="border-b"
                        >
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
        <section class="mb-8">
            <h2 class="text-xl font-bold mb-4">Events ที่รองรับ</h2>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-slate-50">
                            <th class="border p-2 text-left">Event</th>
                            <th class="border p-2 text-left">Payload</th>
                            <th class="border p-2 text-left">คำอธิบาย</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="event in eventsData"
                            :key="event.event"
                            class="border-b"
                        >
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
        <section class="space-y-8">
            <h2 class="text-xl font-bold mb-4">ตัวอย่างการใช้งาน</h2>

            <div
                v-for="example in examples"
                :key="example.title"
                class="border rounded-lg p-4"
            >
                <h3 class="text-lg font-bold mb-2">{{ example.title }}</h3>
                <p class="text-slate-600 mb-4">{{ example.description }}</p>

                <!-- Code Example -->
                <div class="relative bg-slate-50 rounded-lg p-4 mb-4">
                    <button
                        @click="copyCode(example.code)"
                        class="absolute top-2 right-2 p-2 rounded hover:bg-slate-200"
                        title="คัดลอกโค้ด"
                    >
                        <BcIcon name="Copy" size="20" />
                    </button>
                    <pre
                        class="text-sm overflow-x-auto"
                    ><code>{{ example.code }}</code></pre>
                </div>

                <!-- Live Example -->
                <div class="bg-white p-4 rounded-lg">
                    <template v-if="example.title === 'การใช้งานพื้นฐาน'">
                        <BcPagination
                            :data-value="paginationState.currentPage"
                            :total="paginationState.total"
                            @change="handlePageChange"
                        />
                        <div class="mt-2 text-sm text-slate-600">
                            หน้าปัจจุบัน: {{ paginationState.currentPage + 1 }}
                        </div>
                    </template>

                    <template v-if="example.title === 'กำหนดจำนวนต่อหน้า'">
                        <BcPagination
                            :data-value="currentExample.currentPage"
                            :total="currentExample.total"
                            :size="currentExample.size"
                            @change="handleCustomSizeChange"
                        />
                        <div class="mt-2 text-sm text-slate-600">
                            หน้าปัจจุบัน: {{ currentExample.currentPage + 1 }},
                            จำนวนต่อหน้า: {{ currentExample.size }}
                        </div>
                    </template>
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

table {
    border: 1px solid var(--border);
}

th,
td {
    border: 1px solid var(--border);
}
</style>
