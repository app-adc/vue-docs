ครับ ผมจะสร้าง doc ใหม่ทั้งหมดให้: ```vue
<script setup lang="ts">
import type { IconName } from '@/ABC/bc-types'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcSelect from '@/ABC/components/BcSelect.vue'
import BcToast from '@/ABC/components/BcToast.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { reactive, ref } from 'vue'
import SelectPlayground from './children/SelectPlayground.vue'

// Props documentation
const propsData = [
    {
        prop: 'id',
        type: 'string',
        required: true,
        default: '-',
        description: 'รหัสอ้างอิงสำหรับ select input',
    },
    {
        prop: 'dataValue',
        type: 'string | number | null',
        required: true,
        default: 'null',
        description: 'ค่าที่ถูกเลือก',
    },
    {
        prop: 'items',
        type: 'ReadonlyArray<T>',
        required: true,
        default: '[]',
        description: 'รายการข้อมูลทั้งหมดที่สามารถเลือกได้',
    },
    {
        prop: 'label',
        type: 'string',
        required: false,
        default: '""',
        description: 'ข้อความที่แสดงเหนือ select',
    },
    {
        prop: 'placeholder',
        type: 'string',
        required: false,
        default: '""',
        description: 'ข้อความที่แสดงเมื่อยังไม่มีการเลือก',
    },
    {
        prop: 'reduceValue',
        type: '(item: T) => string',
        required: true,
        default: '-',
        description: 'ฟังก์ชันสำหรับแปลง item เป็นค่าที่ใช้ในการ bind',
    },
    {
        prop: 'reduceLabel',
        type: '(item: T) => string',
        required: true,
        default: '-',
        description: 'ฟังก์ชันสำหรับแปลง item เป็นข้อความที่แสดง',
    },
    {
        prop: 'isAutoComplete',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'เปิดใช้งานโหมด autocomplete',
    },
    {
        prop: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'ปิดการใช้งาน select',
    },
    {
        prop: 'isClear',
        type: 'boolean',
        required: false,
        default: 'true',
        description: 'แสดงปุ่มล้างค่า',
    },
]

// Events documentation
const eventsData = [
    {
        event: '@input',
        payload: '(value: string | null, el: HTMLInputElement | null)',
        description: 'เมื่อมีการเปลี่ยนแปลงค่า input',
    },
    {
        event: '@selected',
        payload: '(item: T)',
        description: 'เมื่อมีการเลือกรายการ',
    },
    {
        event: '@enter',
        payload: '(e: HTMLInputElement)',
        description: 'เมื่อกดปุ่ม Enter',
    },
    {
        event: '@focus',
        payload: '(e: HTMLInputElement)',
        description: 'เมื่อ select ได้รับ focus',
    },
    {
        event: '@blur',
        payload: '(e: HTMLInputElement)',
        description: 'เมื่อ select เสีย focus',
    },
]

// Toast state
const showToast = ref(false)
const toastMessage = ref('')

// Examples
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'การเลือกข้อมูลแบบพื้นฐาน',
        code: `<BcSelect
    id="basic-select"
    :dataValue="selectedValue"
    :items="items"
    :reduceValue="item => item.id"
    :reduceLabel="item => item.name"
    label="เลือกรายการ"
    @input="value => selectedValue = value"
/>`,
    },
    {
        title: 'การใช้งานแบบ Autocomplete',
        description: 'การค้นหาและเลือกข้อมูลแบบ autocomplete',
        code: `<BcSelect
    id="autocomplete-select"
    :dataValue="selectedValue"
    :items="items"
    :reduceValue="item => item.id"
    :reduceLabel="item => item.name"
    label="ค้นหาและเลือกรายการ"
    :isAutoComplete="true"
    @input="value => selectedValue = value"
/>`,
    },
    {
        title: 'การปรับแต่ง Item Template',
        description: 'การกำหนดรูปแบบการแสดงผลของแต่ละรายการ',
        code: `<BcSelect
    id="custom-select"
    :dataValue="selectedValue"
    :items="items"
    :reduceValue="item => item.id"
    :reduceLabel="item => item.name"
    label="เลือกรายการ"
>
    <template #item="{ item }">
        <div class="flex items-center gap-2">
            <BcIcon :name="item.icon" size="20" />
            <span>{{ item.name }}</span>
        </div>
    </template>
</BcSelect>`,
    },
]

// Example states and data
const itemsData = [
    { id: '1', name: 'Option 1', icon: 'User' },
    { id: '2', name: 'Option 2', icon: 'Settings' },
    { id: '3', name: 'Option 3', icon: 'Mail' },
]

const exampleStates = reactive({
    basic: '',
    autocomplete: '',
    custom: '',
})

// Methods
const copyCode = async (code: string) => {
    try {
        await navigator.clipboard.writeText(code)
        toastMessage.value = 'คัดลอกโค้ดแล้ว!'
        showToast.value = true
    } catch (err) {
        toastMessage.value = 'ไม่สามารถคัดลอกได้'
        showToast.value = true
    }
}
</script>

<template>
    <BcLayout
        title="Select Component"
        subtitle="คอมโพเนนต์สำหรับเลือกข้อมูลจากรายการที่กำหนด พร้อมความสามารถในการค้นหาและ autocomplete"
        icon="ListFilter"
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
                        <tr class="bg-slate-800 text-white">
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
                        <tr class="bg-slate-800 text-white">
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

        <!-- Playground -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="PenTool" size="24" color="primary" />
                <div>
                    <h2 class="text-xl font-bold">
                        ทดลองใช้งาน Select Component
                    </h2>
                    <p class="text-sm text-slate-600 mt-1">
                        ทดลองปรับแต่งค่า props ต่างๆ และดูผลลัพธ์ที่เกิดขึ้น
                    </p>
                </div>
            </div>

            <SelectPlayground />
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
                        <BcSelect
                            id="basic-select"
                            :data-value="exampleStates.basic"
                            :items="itemsData"
                            :reduce-value="(item) => item.id"
                            :reduce-label="(item) => item.name"
                            label="เลือกรายการ"
                            @input="
                                (value) => (exampleStates.basic = value || '')
                            "
                        />
                    </template>

                    <template
                        v-if="example.title === 'การใช้งานแบบ Autocomplete'"
                    >
                        <BcSelect
                            id="autocomplete-select"
                            :data-value="exampleStates.autocomplete"
                            :items="itemsData"
                            :reduce-value="(item) => item.id"
                            :reduce-label="(item) => item.name"
                            label="ค้นหาและเลือกรายการ"
                            :is-auto-complete="true"
                            @input="
                                (value) =>
                                    (exampleStates.autocomplete = value || '')
                            "
                        />
                    </template>

                    <template
                        v-if="example.title === 'การปรับแต่ง Item Template'"
                    >
                        <BcSelect
                            id="custom-select"
                            :data-value="exampleStates.custom"
                            :items="itemsData"
                            :reduce-value="(item) => item.id"
                            :reduce-label="(item) => item.name"
                            label="เลือกรายการ"
                            @input="
                                (value) => (exampleStates.custom = value || '')
                            "
                        >
                            <template #item="{ item }">
                                <div class="flex items-center gap-2">
                                    <BcIcon
                                        :name="item.icon as IconName"
                                        size="20"
                                    />
                                    <span>{{ item.name }}</span>
                                </div>
                            </template>
                        </BcSelect>
                    </template>
                </div>
            </div>
        </section>

        <!-- Additional Notes -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Info" size="24" color="primary" />
                <h2 class="text-xl font-bold">ข้อแนะนำเพิ่มเติม</h2>
            </div>

            <div class="space-y-4">
                <!-- Usage Tips -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 class="text-lg font-bold mb-2 text-blue-800">
                        แนวทางการใช้งานที่แนะนำ
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-blue-800">
                        <li>ตั้งชื่อ ID ให้เป็นเอกลักษณ์และสื่อความหมาย</li>
                        <li>
                            กำหนด reduce functions ที่เหมาะสมกับโครงสร้างข้อมูล
                        </li>
                        <li>ใช้ isAutoComplete เมื่อมีข้อมูลจำนวนมาก</li>
                        <li>จำกัดจำนวนผลลัพธ์การค้นหาเพื่อประสิทธิภาพ</li>
                        <li>แสดง loading state เมื่อกำลังโหลดข้อมูล</li>
                        <li>ใช้ custom template สำหรับการแสดงผลที่ซับซ้อน</li>
                    </ul>
                </div>

                <!-- Performance Tips -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 class="text-lg font-bold mb-2 text-green-800">
                        คำแนะนำด้านประสิทธิภาพ
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-green-800">
                        <li>ใช้ computed properties สำหรับการกรองข้อมูล</li>
                        <li>ใช้ debounce สำหรับการค้นหาแบบ real-time</li>
                        <li>จำกัดจำนวนรายการที่แสดงในการค้นหา</li>
                        <li>ใช้ virtual scrolling สำหรับข้อมูลจำนวนมาก</li>
                        <li>ระวังการ re-render ที่ไม่จำเป็น</li>
                    </ul>
                </div>

                <!-- Best Practices -->
                <div
                    class="bg-purple-50 border border-purple-200 rounded-lg p-4"
                >
                    <h3 class="text-lg font-bold mb-2 text-purple-800">
                        แนวทางปฏิบัติที่ดี
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-purple-800">
                        <li>ใช้ TypeScript types อย่างถูกต้อง</li>
                        <li>จัดการ keyboard navigation ให้ครบถ้วน</li>
                        <li>รองรับการใช้งานผ่าน screen readers</li>
                        <li>แสดงข้อความแจ้งเตือนที่ชัดเจน</li>
                    </ul>
                </div>

                <!-- Warnings -->
                <div
                    class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                >
                    <h3 class="text-lg font-bold mb-2 text-yellow-800">
                        ข้อควรระวัง
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-yellow-800">
                        <li>ระวังการใช้งานกับข้อมูลจำนวนมากเกินไป</li>
                        <li>ตรวจสอบความถูกต้องของ reduce functions</li>
                        <li>จัดการกรณี error และ edge cases ให้ครบถ้วน</li>
                        <li>ระวังการ memorize ข้อมูลที่มากเกินไป</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Validation Section -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="ShieldCheck" size="24" color="primary" />
                <h2 class="text-xl font-bold">การตรวจสอบความถูกต้อง</h2>
            </div>

            <div class="space-y-4">
                <div class="bg-slate-800 rounded-lg p-4">
                    <h3 class="text-lg font-bold text-white mb-2">
                        การใช้งาน Validation
                    </h3>
                    <pre
                        class="text-slate-200"
                    ><code>// ตัวอย่างการใช้งาน validation
&lt;BcSelect
    id="validated-select"
    :data-value="selectedValue"
    :items="items"
    :reduce-value="item => item.id"
    :reduce-label="item => item.name"
    :rule="(value) => !!value"
    :error="() => 'กรุณาเลือกรายการ'"
/&gt;</code></pre>
                </div>
            </div>
        </section>

        <!-- Toast -->
        <BcToast
            v-model="showToast"
            :message="toastMessage"
            variant="success"
            position="top-right"
            :duration="2000"
        />
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
