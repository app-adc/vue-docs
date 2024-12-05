<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcToast from '@/ABC/components/BcToast.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { ref } from 'vue'

// ข้อมูลตาราง Props
const propsData = [
    {
        prop: 'modelValue',
        type: 'boolean',
        required: true,
        default: '-',
        description: 'ควบคุมการแสดงผลของ toast (v-model)',
    },
    {
        prop: 'message',
        type: 'string',
        required: true,
        default: '-',
        description: 'ข้อความที่ต้องการแสดงใน toast',
    },
    {
        prop: 'variant',
        type: "'success' | 'error' | 'warning' | 'info'",
        required: false,
        default: 'success',
        description: 'รูปแบบของ toast',
    },
    {
        prop: 'duration',
        type: 'number',
        required: false,
        default: '2000',
        description: 'ระยะเวลาที่แสดง toast (มิลลิวินาที)',
    },
    {
        prop: 'position',
        type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'",
        required: false,
        default: 'top-right',
        description: 'ตำแหน่งที่แสดง toast',
    },
    {
        prop: 'dismissible',
        type: 'boolean',
        required: false,
        default: 'true',
        description: 'แสดงปุ่มปิด toast',
    },
]

// ข้อมูลตาราง Events
const eventsData = [
    {
        event: '@update:modelValue',
        payload: 'boolean',
        description: 'เกิดขึ้นเมื่อสถานะการแสดง toast เปลี่ยนแปลง',
    },
    {
        event: '@close',
        payload: 'void',
        description: 'เกิดขึ้นเมื่อ toast ถูกปิด',
    },
]

// ตัวอย่างการใช้งาน
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'การแสดง toast แบบพื้นฐาน',
        code: `<BcToast
    v-model="isVisible"
    message="บันทึกข้อมูลสำเร็จ"
    variant="success"
/>`,
    },
    {
        title: 'รูปแบบต่างๆ',
        description: 'การใช้ variant ต่างๆ ของ toast',
        code: `<BcToast
    v-model="isVisible"
    message="การดำเนินการสำเร็จ"
    variant="success"
/>

<BcToast
    v-model="isVisible"
    message="เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
    variant="error"
/>

<BcToast
    v-model="isVisible"
    message="โปรดระวัง! ข้อมูลอาจสูญหาย"
    variant="warning"
/>

<BcToast
    v-model="isVisible"
    message="มีการอัพเดตใหม่พร้อมใช้งาน"
    variant="info"
/>`,
    },
    {
        title: 'ตำแหน่งต่างๆ',
        description: 'การกำหนดตำแหน่งแสดง toast',
        code: `<BcToast
    v-model="isVisible"
    message="แสดงที่มุมบนขวา"
    position="top-right"
/>

<BcToast
    v-model="isVisible"
    message="แสดงที่มุมล่างซ้าย"
    position="bottom-left"
/>

<BcToast
    v-model="isVisible"
    message="แสดงตรงกลางด้านบน"
    position="top-center"
/>`,
    },
]

// สถานะสำหรับตัวอย่าง
const toastStates = ref({
    basic: false,
    success: false,
    error: false,
    warning: false,
    info: false,
    topRight: false,
    bottomLeft: false,
    topCenter: false,
})

// ฟังก์ชันคัดลอกโค้ด
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}

const showToast = (type: keyof typeof toastStates.value) => {
    toastStates.value[type] = true
    setTimeout(() => {
        toastStates.value[type] = false
    }, 2000)
}
</script>

<template>
    <BcLayout
        title="แจ้งเตือน (Toast)"
        subtitle="คอมโพเนนต์สำหรับแสดงข้อความแจ้งเตือนแบบชั่วคราว"
        icon="MessageCircleMore"
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
                <div class="bg-white p-4 rounded-lg space-y-4">
                    <template v-if="example.title === 'การใช้งานพื้นฐาน'">
                        <BcButton @click="showToast('basic')"
                            >แสดง Toast พื้นฐาน</BcButton
                        >
                        <BcToast
                            v-model="toastStates.basic"
                            message="บันทึกข้อมูลสำเร็จ"
                            variant="success"
                        />
                    </template>

                    <template v-if="example.title === 'รูปแบบต่างๆ'">
                        <div class="flex gap-2 flex-wrap">
                            <BcButton
                                @click="showToast('success')"
                                variant="primary"
                            >
                                Success Toast
                            </BcButton>
                            <BcButton
                                @click="showToast('error')"
                                variant="primary"
                            >
                                Error Toast
                            </BcButton>
                            <BcButton
                                @click="showToast('warning')"
                                variant="primary"
                            >
                                Warning Toast
                            </BcButton>
                            <BcButton
                                @click="showToast('info')"
                                variant="primary"
                            >
                                Info Toast
                            </BcButton>
                        </div>

                        <BcToast
                            v-model="toastStates.success"
                            message="การดำเนินการสำเร็จ"
                            variant="success"
                        />
                        <BcToast
                            v-model="toastStates.error"
                            message="เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
                            variant="error"
                        />
                        <BcToast
                            v-model="toastStates.warning"
                            message="โปรดระวัง! ข้อมูลอาจสูญหาย"
                            variant="warning"
                        />
                        <BcToast
                            v-model="toastStates.info"
                            message="มีการอัพเดตใหม่พร้อมใช้งาน"
                            variant="info"
                        />
                    </template>

                    <template v-if="example.title === 'ตำแหน่งต่างๆ'">
                        <div class="flex gap-2 flex-wrap">
                            <BcButton @click="showToast('topRight')">
                                Top Right Toast
                            </BcButton>
                            <BcButton @click="showToast('bottomLeft')">
                                Bottom Left Toast
                            </BcButton>
                            <BcButton @click="showToast('topCenter')">
                                Top Center Toast
                            </BcButton>
                        </div>

                        <BcToast
                            v-model="toastStates.topRight"
                            message="แสดงที่มุมบนขวา"
                            position="top-right"
                        />
                        <BcToast
                            v-model="toastStates.bottomLeft"
                            message="แสดงที่มุมล่างซ้าย"
                            position="bottom-left"
                        />
                        <BcToast
                            v-model="toastStates.topCenter"
                            message="แสดงตรงกลางด้านบน"
                            position="top-center"
                        />
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
