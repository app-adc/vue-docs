<script setup lang="ts">
import type { IconName } from '@/ABC/bc-types'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcMultiselect from '@/ABC/components/BcMultiSelect.vue'
import BcToast from '@/ABC/components/BcToast.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { reactive, ref } from 'vue'
import MultiselectPlayground from './children/MultiselectPlayground.vue'

// Props documentation
const propsData = [
    {
        prop: 'id',
        type: 'string',
        required: true,
        default: '-',
        description: 'รหัสอ้างอิงสำหรับ multiselect input',
    },
    {
        prop: 'dataValue',
        type: 'Array<string | number> | null',
        required: true,
        default: 'null',
        description: 'ค่าที่ถูกเลือก (เป็น array)',
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
        description: 'ข้อความที่แสดงเหนือ multiselect',
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
        type: '(item: T) => string | number | null',
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
        prop: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'ปิดการใช้งาน multiselect',
    },
    {
        prop: 'isClear',
        type: 'boolean',
        required: false,
        default: 'true',
        description: 'แสดงปุ่มล้างค่า',
    },
    {
        prop: 'max',
        type: 'number',
        required: false,
        default: 'undefined',
        description: 'จำนวนสูงสุดที่สามารถเลือกได้',
    },
]

// Events documentation
const eventsData = [
    {
        event: '@input',
        payload:
            '(value: Array<string | number> | null, el: HTMLInputElement | null)',
        description: 'เมื่อมีการเปลี่ยนแปลงค่า input',
    },
    {
        event: '@selected',
        payload: '(items: Array<T>)',
        description: 'เมื่อมีการเลือกหรือยกเลิกรายการ',
    },
    {
        event: '@enter',
        payload: '(e: HTMLInputElement)',
        description: 'เมื่อกดปุ่ม Enter',
    },
    {
        event: '@focus',
        payload: '(e: HTMLInputElement)',
        description: 'เมื่อ multiselect ได้รับ focus',
    },
    {
        event: '@blur',
        payload: '(e: HTMLInputElement)',
        description: 'เมื่อ multiselect เสีย focus',
    },
]

// Toast state
const showToast = ref(false)
const toastMessage = ref('')

// Examples
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'การเลือกหลายรายการแบบพื้นฐาน',
        code: `<BcMultiselect
    id="basic-multiselect"
    :dataValue="selectedValues"
    :items="items"
    :reduceValue="item => item.id"
    :reduceLabel="item => item.name"
    label="เลือกหลายรายการ"
    @input="value => selectedValues = value"
/>`,
    },
    {
        title: 'การจำกัดจำนวนการเลือก',
        description: 'กำหนดจำนวนสูงสุดที่สามารถเลือกได้',
        code: `<BcMultiselect
    id="limited-multiselect"
    :dataValue="selectedValues"
    :items="items"
    :reduceValue="item => item.id"
    :reduceLabel="item => item.name"
    :max="3"
    label="เลือกได้สูงสุด 3 รายการ"
    @input="value => selectedValues = value"
/>`,
    },
    {
        title: 'การปรับแต่ง Item Template',
        description: 'การกำหนดรูปแบบการแสดงผลของแต่ละรายการ',
        code: `<BcMultiselect
    id="custom-multiselect"
    :dataValue="selectedValues"
    :items="items"
    :reduceValue="item => item.id"
    :reduceLabel="item => item.name"
    label="เลือกรายการ"
>
    <template #item="{ item, label, selected }">
        <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-2">
                <BcIcon :name="item.icon" size="20" />
                <span>{{ label }}</span>
            </div>
            <span v-if="selected" class="text-green-600">✓</span>
        </div>
    </template>
</BcMultiselect>`,
    },
]

// Example states and data
const itemsData = [
    { id: '1', name: 'Option 1', icon: 'User' },
    { id: '2', name: 'Option 2', icon: 'Settings' },
    { id: '3', name: 'Option 3', icon: 'Mail' },
    { id: '4', name: 'Option 4', icon: 'Bell' },
    { id: '5', name: 'Option 5', icon: 'Calendar' },
]

const exampleStates = reactive({
    basic: [] as string[],
    limited: [] as string[],
    custom: [] as string[],
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
        title="Multiselect Component"
        subtitle="คอมโพเนนต์สำหรับเลือกหลายรายการจากข้อมูลที่กำหนด พร้อมความสามารถในการค้นหา autocomplete และจำกัดจำนวนการเลือก"
        icon="Lightbulb"
    >
        <!-- Props Table -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Lightbulb" size="24" color="primary" />
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
                <BcIcon name="Zap" size="24" color="primary" />
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
                            <td
                                class="border p-2 font-mono text-sm text-blue-600"
                            >
                                {{ event.payload }}
                            </td>
                            <td class="border p-2">{{ event.description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Slots Documentation -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Code" size="24" color="primary" />
                <h2 class="text-xl font-bold">Slots ที่รองรับ</h2>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-blue-500 bg-blue-50 p-4">
                    <h3 class="font-bold mb-2">Slot: #item</h3>
                    <p class="text-slate-600 mb-2">
                        ใช้สำหรับกำหนดรูปแบบการแสดงผลของแต่ละรายการใน dropdown
                    </p>
                    <div class="bg-slate-800 rounded p-2 mt-2">
                        <code class="text-slate-200 text-sm">
                            Props: { item: T, label: string, selected: boolean }
                        </code>
                    </div>
                </div>

                <div class="border-l-4 border-green-500 bg-green-50 p-4">
                    <h3 class="font-bold mb-2">Slot: #actions</h3>
                    <p class="text-slate-600 mb-2">
                        ใช้สำหรับเพิ่มปุ่มหรือ actions ด้านล่าง dropdown
                    </p>
                    <div class="bg-slate-800 rounded p-2 mt-2">
                        <code class="text-slate-200 text-sm">
                            Props: ไม่มี
                        </code>
                    </div>
                </div>
            </div>
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
                        <BcMultiselect
                            id="basic-multiselect"
                            :data-value="exampleStates.basic"
                            :items="itemsData"
                            :reduce-value="(item) => item.id"
                            :reduce-label="(item) => item.name"
                            label="เลือกหลายรายการ"
                            @input="
                                (value) =>
                                    (exampleStates.basic = value
                                        ? (value as string[])
                                        : [])
                            "
                        />
                        <div
                            v-if="exampleStates.basic.length"
                            class="mt-4 text-sm text-slate-600"
                        >
                            เลือกแล้ว: {{ exampleStates.basic.length }} รายการ
                        </div>
                    </template>

                    <template v-if="example.title === 'การจำกัดจำนวนการเลือก'">
                        <BcMultiselect
                            id="limited-multiselect"
                            :data-value="exampleStates.limited"
                            :items="itemsData"
                            :reduce-value="(item) => item.id"
                            :reduce-label="(item) => item.name"
                            :max="3"
                            label="เลือกได้สูงสุด 3 รายการ"
                            @input="
                                (value) =>
                                    (exampleStates.limited = value
                                        ? (value as string[])
                                        : [])
                            "
                        />
                        <div
                            v-if="exampleStates.limited.length"
                            class="mt-4 text-sm"
                            :class="
                                exampleStates.limited.length >= 3
                                    ? 'text-red-600'
                                    : 'text-slate-600'
                            "
                        >
                            เลือกแล้ว: {{ exampleStates.limited.length }}/3
                            รายการ
                        </div>
                    </template>

                    <template
                        v-if="example.title === 'การปรับแต่ง Item Template'"
                    >
                        <BcMultiselect
                            id="custom-multiselect"
                            :data-value="exampleStates.custom"
                            :items="itemsData"
                            :reduce-value="(item) => item.id"
                            :reduce-label="(item) => item.name"
                            label="เลือกรายการ"
                            @input="
                                (value) =>
                                    (exampleStates.custom = value
                                        ? (value as string[])
                                        : [])
                            "
                        >
                            <template #item="{ item, label, selected }">
                                <div
                                    class="flex items-center justify-between w-full"
                                >
                                    <div class="flex items-center gap-2">
                                        <BcIcon
                                            :name="item.icon as IconName"
                                            size="20"
                                        />
                                        <span>{{ label }}</span>
                                    </div>
                                    <span
                                        v-if="selected"
                                        class="text-green-600 font-bold"
                                        >✓</span
                                    >
                                </div>
                            </template>
                        </BcMultiselect>
                    </template>
                </div>
            </div>
        </section>

        <!-- Keyboard Shortcuts -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Shield" size="24" color="primary" />
                <h2 class="text-xl font-bold">Keyboard Shortcuts</h2>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-slate-800 text-white">
                            <th class="border p-2 text-left w-1/4">Key</th>
                            <th class="border p-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border p-2 font-mono text-sm">
                                Arrow Down
                            </td>
                            <td class="border p-2">เลื่อนไปรายการถัดไป</td>
                        </tr>
                        <tr>
                            <td class="border p-2 font-mono text-sm">
                                Arrow Up
                            </td>
                            <td class="border p-2">เลื่อนไปรายการก่อนหน้า</td>
                        </tr>
                        <tr>
                            <td class="border p-2 font-mono text-sm">Enter</td>
                            <td class="border p-2">
                                เลือก/ยกเลิกรายการที่ highlight
                            </td>
                        </tr>
                        <tr>
                            <td class="border p-2 font-mono text-sm">Escape</td>
                            <td class="border p-2">ปิด dropdown</td>
                        </tr>
                        <tr>
                            <td class="border p-2 font-mono text-sm">
                                Backspace
                            </td>
                            <td class="border p-2">
                                ลบรายการสุดท้ายเมื่อ input ว่าง
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Playground -->
        <section class="mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Bug" size="24" color="primary" />
                <h2 class="text-xl font-bold">Interactive Playground</h2>
            </div>

            <MultiselectPlayground />
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
                        <li>
                            ใช้ max prop เพื่อจำกัดจำนวนการเลือกตามความเหมาะสม
                        </li>
                        <li>แสดง loading state เมื่อกำลังโหลดข้อมูล</li>
                        <li>ใช้ custom template สำหรับการแสดงผลที่ซับซ้อน</li>
                        <li>แสดงจำนวนรายการที่เลือกแล้วเพื่อให้ผู้ใช้ทราบ</li>
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
                        <li>
                            จำกัดจำนวนรายการที่แสดงในการค้นหา (ปัจจุบัน 200)
                        </li>
                        <li>ใช้ virtual scrolling สำหรับข้อมูลจำนวนมากมาก</li>
                        <li>ระวังการ re-render ที่ไม่จำเป็น</li>
                        <li>
                            ใช้ max prop
                            เพื่อป้องกันการเลือกมากเกินไปและส่งผลต่อ UX
                        </li>
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
                        <li>
                            ใช้ visual feedback ให้ชัดเจนว่ารายการไหนถูกเลือก
                        </li>
                        <li>
                            จัดการกรณีที่เลือกครบตามจำนวน max แล้วอย่างเหมาะสม
                        </li>
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
                        <li>
                            ระวังการเลือกรายการมากเกินไปจนส่งผลต่อ performance
                        </li>
                        <li>
                            ตรวจสอบให้แน่ใจว่า dataValue เป็น array
                            เสมอเมื่อมีการเลือก
                        </li>
                    </ul>
                </div>

                <!-- Features Highlight -->
                <div
                    class="bg-indigo-50 border border-indigo-200 rounded-lg p-4"
                >
                    <h3 class="text-lg font-bold mb-2 text-indigo-800">
                        ฟีเจอร์พิเศษ
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-indigo-800">
                        <li>
                            <strong>Multi-Selection:</strong>
                            เลือกได้หลายรายการพร้อมกัน
                        </li>
                        <li>
                            <strong>Tags Display:</strong>
                            แสดงรายการที่เลือกเป็น tags พร้อมปุ่มลบ
                        </li>
                        <li>
                            <strong>Max Limit:</strong>
                            จำกัดจำนวนการเลือกสูงสุดตามที่กำหนด
                        </li>
                        <li>
                            <strong>Visual Feedback:</strong> เครื่องหมาย ✓
                            แสดงรายการที่เลือก
                        </li>
                        <li>
                            <strong>Keyboard Support:</strong> รองรับ Backspace
                            สำหรับลบรายการ
                        </li>
                        <li>
                            <strong>Search & Filter:</strong>
                            ค้นหาด้วยหลาย keyword พร้อมกัน
                        </li>
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
&lt;BcMultiselect
    id="validated-multiselect"
    :data-value="selectedValues"
    :items="items"
    :reduce-value="item => item.id"
    :reduce-label="item => item.name"
    :rule="(value) => value && value.length > 0"
    :error="() => 'กรุณาเลือกอย่างน้อย 1 รายการ'"
/&gt;

// ตัวอย่าง validation กับ max
&lt;BcMultiselect
    id="max-validated-multiselect"
    :data-value="selectedValues"
    :items="items"
    :reduce-value="item => item.id"
    :reduce-label="item => item.name"
    :max="5"
    :rule="(value) => value && value.length >= 2 && value.length <= 5"
    :error="() => 'กรุณาเลือก 2-5 รายการ'"
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
