<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcModal from '@/ABC/components/BcModal.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { ref } from 'vue'

// ข้อมูลตาราง Props
const propsData = [
    {
        prop: 'modelValue',
        type: 'boolean',
        required: true,
        default: '-',
        description: 'สถานะการแสดง modal (v-model)',
    },
    {
        prop: 'id',
        type: 'string',
        required: true,
        default: '-',
        description: 'ID ของ modal สำหรับ accessibility',
    },
    {
        prop: 'styleCustom',
        type: 'CSSProperties',
        required: false,
        default: '-',
        description: 'ปรับแต่ง style ของ modal content',
    },
    {
        prop: 'title',
        type: 'string',
        required: false,
        default: '-',
        description: 'หัวข้อของ modal',
    },
    {
        prop: 'isClear',
        type: 'boolean',
        required: false,
        default: 'true',
        description: 'แสดงปุ่มปิด',
    },
    {
        prop: 'width',
        type: 'string',
        required: false,
        default: '340px',
        description: 'กำหนดความกว้างของ modal',
    },
    {
        prop: 'ariaLabel',
        type: 'string',
        required: false,
        default: 'Modal Dialog',
        description: 'label สำหรับ accessibility',
    },
]

// ข้อมูลตาราง Events
const eventsData = [
    {
        event: '@update:modelValue',
        payload: 'boolean',
        description: 'เกิดขึ้นเมื่อสถานะการแสดง modal เปลี่ยนแปลง',
    },
    {
        event: '@afterClose',
        payload: '-',
        description: 'เกิดขึ้นหลังจากปิด modal',
    },
    {
        event: '@afterOpen',
        payload: '-',
        description: 'เกิดขึ้นหลังจากเปิด modal',
    },
]

// ข้อมูลตาราง Slots
const slotsData = [
    {
        name: 'default',
        description: 'เนื้อหาหลักของ modal',
    },
    {
        name: 'footer',
        description: 'ส่วนล่างของ modal สำหรับใส่ปุ่มหรือการกระทำต่างๆ',
    },
]

// ตัวอย่างการใช้งาน
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'Modal พื้นฐานพร้อมหัวข้อและปุ่มปิด',
        code: `<BcModal
    v-model="isOpen"
    id="basic-modal"
    title="ยืนยันการทำรายการ"
>
    <p>คุณต้องการดำเนินการต่อหรือไม่?</p>
</BcModal>`,
    },
    {
        title: 'การใช้งานกับ Footer',
        description: 'Modal พร้อมปุ่มกดในส่วน footer',
        code: `<BcModal
    v-model="isOpen"
    id="modal-with-footer"
    title="ยืนยันการลบ"
>
    <p>คุณแน่ใจหรือไม่ที่จะลบรายการนี้?</p>
    <template #footer>
        <BcButton variant="outline" @click="isOpen = false">
            ยกเลิก
        </BcButton>
        <BcButton variant="primary" @click="handleConfirm">
            ยืนยัน
        </BcButton>
    </template>
</BcModal>`,
    },
    {
        title: 'การปรับแต่ง Style',
        description: 'Modal ที่มีการปรับแต่งขนาดและสไตล์',
        code: `<BcModal
    v-model="isOpen"
    id="custom-modal"
    title="แสดงรายละเอียด"
    width="600px"
    :style-custom="{
        maxHeight: '80vh',
        overflow: 'auto'
    }"
>
    <div class="p-4">
        <p>เนื้อหาที่มีความยาว...</p>
    </div>
</BcModal>`,
    },
]

// สถานะสำหรับตัวอย่าง
const modalStates = ref({
    basic: false,
    withFooter: false,
    custom: false,
})

// ฟังก์ชันจำลองการทำงาน
const handleConfirm = () => {
    alert('ยืนยันการทำรายการ')
    modalStates.value.withFooter = false
}

// ฟังก์ชันคัดลอกโค้ด
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}
</script>
<template>
    <BcLayout
        title="Modal Dialog"
        subtitle="คอมโพเนนต์สำหรับแสดงเนื้อหาแบบ Modal"
        icon="BookOpen"
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

        <!-- Slots Table -->
        <section class="mb-8">
            <h2 class="text-xl font-bold mb-4">Slots ที่รองรับ</h2>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-slate-50">
                            <th class="border p-2 text-left">Name</th>
                            <th class="border p-2 text-left">คำอธิบาย</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="slot in slotsData"
                            :key="slot.name"
                            class="border-b"
                        >
                            <td class="border p-2 font-mono text-sm">
                                {{ slot.name }}
                            </td>
                            <td class="border p-2">{{ slot.description }}</td>
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
                        <BcButton @click="modalStates.basic = true"
                            >เปิด Modal พื้นฐาน</BcButton
                        >
                        <BcModal
                            v-model="modalStates.basic"
                            id="basic-modal"
                            title="ยืนยันการทำรายการ"
                        >
                            <p>คุณต้องการดำเนินการต่อหรือไม่?</p>
                        </BcModal>
                    </template>

                    <template v-if="example.title === 'การใช้งานกับ Footer'">
                        <BcButton @click="modalStates.withFooter = true">
                            เปิด Modal พร้อม Footer
                        </BcButton>
                        <BcModal
                            v-model="modalStates.withFooter"
                            id="modal-with-footer"
                            title="ยืนยันการลบ"
                        >
                            <p>คุณแน่ใจหรือไม่ที่จะลบรายการนี้?</p>
                            <template #footer>
                                <BcButton
                                    variant="outline"
                                    @click="modalStates.withFooter = false"
                                >
                                    ยกเลิก
                                </BcButton>
                                <BcButton
                                    variant="primary"
                                    @click="handleConfirm"
                                >
                                    ยืนยัน
                                </BcButton>
                            </template>
                        </BcModal>
                    </template>

                    <template v-if="example.title === 'การปรับแต่ง Style'">
                        <BcButton @click="modalStates.custom = true">
                            เปิด Modal แบบกำหนดเอง
                        </BcButton>
                        <BcModal
                            v-model="modalStates.custom"
                            id="custom-modal"
                            title="แสดงรายละเอียด"
                            :width="600"
                            :style-custom="{
                                maxHeight: '80vh',
                                overflow: 'auto',
                            }"
                        >
                            <div class="p-4">
                                <p>เนื้อหาที่มีความยาว...</p>
                                <p class="mt-4">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Quisquam voluptates, quod,
                                    quae, voluptate quibusdam voluptatibus
                                    quidem voluptatem quos quia quas
                                    consequuntur. Quisquam, quae. Quisquam
                                    voluptates, quod, quae, voluptate quibusdam
                                    voluptatibus quidem voluptatem quos quia
                                    quas consequuntur. Quisquam, quae.
                                </p>
                            </div>
                        </BcModal>
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
