<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import BcInputPlayground from '@/ABC/pages/children/InputPlayground.vue'
import { isEmail } from '@/ABC/ui/bc-functional'
import { ref } from 'vue'

// Props documentation
const propsData = [
    {
        prop: 'id',
        type: 'string',
        required: true,
        default: '-',
        description: 'รหัสอ้างอิงสำหรับ input',
    },
    {
        prop: 'dataValue',
        type: 'TypeInputValue', // string | number | null
        required: true,
        default: '-',
        description: 'ค่าที่แสดงใน input',
    },
    {
        prop: 'label',
        type: 'string',
        required: false,
        default: '-',
        description: 'ข้อความที่แสดงเหนือ input',
    },
    {
        prop: 'placeholder',
        type: 'string',
        required: false,
        default: 'ระบุ[label]',
        description: 'ข้อความที่แสดงเมื่อไม่มีค่าใน input',
    },
    {
        prop: 'rule',
        type: '(value: TypeInputValue) => boolean',
        required: false,
        default: '-',
        description: 'ฟังก์ชันสำหรับตรวจสอบความถูกต้องของข้อมูล',
    },
    {
        prop: 'error',
        type: '(value: TypeInputValue) => string',
        required: false,
        default: '-',
        description: 'ฟังก์ชันสำหรับข้อความแสดงข้อผิดพลาด',
    },
    {
        prop: 'icon',
        type: 'IconName',
        required: false,
        default: '-',
        description: 'ไอคอนที่แสดงด้านหน้า input',
    },
    {
        prop: 'isClear',
        type: 'boolean',
        required: false,
        default: 'true',
        description: 'แสดงปุ่มลบข้อมูล',
    },
    {
        prop: 'isLoading',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'แสดงสถานะกำลังโหลด',
    },
    {
        prop: 'isDebounce',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'เปิดใช้งาน debounce (delay 500ms)',
    },
    {
        prop: 'formats',
        type: 'RegexKey[]',
        required: false,
        default: '[]',
        description:
            'รูปแบบการกรองข้อมูล (en, th, number, finance, special, mixed)',
    },
    {
        prop: 'form',
        type: 'string',
        required: false,
        default: '-',
        description: 'รหัสอ้างอิงสำหรับการ validate form',
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
        event: '@input',
        payload: '[value: string | null, el: HTMLInputElement]',
        description: 'เกิดขึ้นเมื่อค่าใน input เปลี่ยนแปลง',
    },
    {
        event: '@enter',
        payload: '[e: HTMLInputElement]',
        description: 'เกิดขึ้นเมื่อกดปุ่ม Enter',
    },
    {
        event: '@focus',
        payload: '[e: HTMLInputElement]',
        description: 'เกิดขึ้นเมื่อ input ได้รับ focus',
    },
    {
        event: '@blur',
        payload: '[e: HTMLInputElement]',
        description: 'เกิดขึ้นเมื่อ input สูญเสีย focus',
    },
]

// Input format examples
const formatTypes = {
    en: 'อังกฤษ a-z, A-Z',
    th: 'ไทย ก-ฮ',
    number: 'ตัวเลข 0-9',
    finance: 'การเงิน 0-9 และจุดทศนิยม',
    special: 'อักขระพิเศษ -, /, _, ช่องว่าง',
    mixed: 'ผสม (ไทย, อังกฤษ, ตัวเลข, อักขระพิเศษ)',
}

// Example states
const inputValues = ref({
    basic: '',
    withIcon: '',
    withValidation: '',
    withFormat: '',
    withDebounce: '',
    withCustomError: '',
})

// Examples
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'Input พื้นฐานพร้อมปุ่มลบข้อมูล',
        code: `<BcInput
    id="basic-input"
    label="ชื่อผู้ใช้"
    :data-value="inputValue"
    @input="(v) => inputValue = v"
/>`,
    },
    {
        title: 'การใช้งานกับไอคอน',
        description: 'การกรอกข้อมูลพร้อมไอคอนและการใช้งาน rule () => validate',
        code: `<BcInput
    id="email-input"
    label="อีเมล"
    icon="Mail"
    :data-value="inputValue"
    :rule="(v) => validateEmail(v)"
    :error="(v) => 'กรุณากรอกอีเมลให้ถูกต้อง'"
    @input="(v) => inputValue = v"
/>`,
    },
    {
        title: 'การกรองรูปแบบข้อมูล',
        description: 'การกรองข้อมูลตามรูปแบบที่กำหนด props formats[]',
        code: `<BcInput
    id="number-input"
    label="เบอร์โทรศัพท์" 
    :data-value="inputValue"
    :formats="['number']"
    @input="(v) => inputValue = v"
/>`,
    },
    {
        title: 'การใช้ Debounce',
        description: 'หน่วงเวลาการส่งค่า 500ms',
        code: `<BcInput
    id="search-input"
    label="ค้นหา"
    :data-value="inputValue"
    :is-debounce="true"
    @input="handleDebounceInput"
/>`,
    },
]

// ฟังก์ชันคัดลอกโค้ด
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}
</script>

<template>
    <BcLayout
        title="Input ข้อความ"
        subtitle="คอมโพเนนต์สำหรับรับข้อมูลข้อความ พร้อมฟังก์ชันการตรวจสอบและกรองข้อมูล"
        icon="TextCursor"
    >
        <!-- ส่วนแสดง Props -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="ListFilter" size="24" color="primary" />
                <h2 class="text-xl font-bold">Props ที่รองรับ</h2>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-table text-slate-700">
                            <th
                                class="border border-slate-300 p-3 text-left w-1/6"
                            >
                                Prop
                            </th>
                            <th
                                class="border border-slate-300 p-3 text-left w-1/4"
                            >
                                Type
                            </th>
                            <th
                                class="border border-slate-300 p-3 text-left w-1/6"
                            >
                                Default
                            </th>
                            <th class="border border-slate-300 p-3 text-left">
                                คำอธิบาย
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="prop in propsData"
                            :key="prop.prop"
                            class="hover:bg-slate-50"
                        >
                            <td
                                class="border border-slate-300 p-3 font-mono text-sm"
                            >
                                {{ prop.prop }}
                            </td>
                            <td
                                class="border border-slate-300 p-3 font-mono text-sm text-blue-600"
                            >
                                {{ prop.type }}
                            </td>
                            <td
                                class="border border-slate-300 p-3 font-mono text-sm"
                            >
                                {{ prop.default }}
                            </td>
                            <td class="border border-slate-300 p-3">
                                {{ prop.description }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- ส่วนแสดง Events -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="MessageCircleMore" size="24" color="primary" />
                <h2 class="text-xl font-bold">Events ที่รองรับ</h2>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-table text-slate-700">
                            <th
                                class="border border-slate-300 p-3 text-left w-1/4"
                            >
                                Event
                            </th>
                            <th
                                class="border border-slate-300 p-3 text-left w-1/3"
                            >
                                Payload
                            </th>
                            <th class="border border-slate-300 p-3 text-left">
                                คำอธิบาย
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="event in eventsData"
                            :key="event.event"
                            class="hover:bg-slate-50"
                        >
                            <td
                                class="border border-slate-300 p-3 font-mono text-sm"
                            >
                                {{ event.event }}
                            </td>
                            <td
                                class="border border-slate-300 p-3 font-mono text-sm"
                            >
                                {{ event.payload }}
                            </td>
                            <td class="border border-slate-300 p-3">
                                {{ event.description }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- ส่วนแสดงรูปแบบการกรองข้อมูล -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="FileCode" size="24" color="primary" />
                <h2 class="text-xl font-bold">รูปแบบการกรองข้อมูล (Formats)</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                    v-for="(desc, type) in formatTypes"
                    :key="type"
                    class="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-primary transition-colors"
                >
                    <code class="text-blue-600 font-medium">{{ type }}</code>
                    <p class="mt-2 text-sm text-slate-600">{{ desc }}</p>
                </div>
            </div>
        </section>

        <!-- ส่วน Playground -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="PenTool" size="24" color="primary" />
                <div>
                    <h2 class="text-xl font-bold">
                        Interactive Input Playground
                    </h2>
                    <p class="text-sm text-slate-600 mt-1">
                        ทดลองปรับแต่งค่า props ต่างๆ และดูผลลัพธ์ที่เกิดขึ้นกับ
                        input
                    </p>
                </div>
            </div>

            <BcInputPlayground />
        </section>

        <!-- ส่วนแสดงตัวอย่างการใช้งาน -->
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

                <!-- ส่วนแสดงโค้ด -->
                <div class="relative bg-slate-800 rounded-lg p-4 mb-6">
                    <BcButton
                        @click="() => copyCode(example.code)"
                        variant="white"
                        icon="Copy"
                        class="!absolute top-3 right-3"
                        size="sm"
                    />
                    <pre
                        class="text-sm text-slate-200 overflow-x-auto"
                    ><code>{{ example.code }}</code></pre>
                </div>

                <!-- ส่วนแสดงตัวอย่าง -->
                <div class="bg-white p-4 rounded-lg">
                    <!-- Basic Example -->
                    <template v-if="example.title === 'การใช้งานพื้นฐาน'">
                        <BcInput
                            id="basic-input"
                            label="ชื่อผู้ใช้"
                            :data-value="inputValues.basic"
                            @input="(v) => (inputValues.basic = v || '')"
                        />
                    </template>

                    <!-- Icon Example -->
                    <template v-if="example.title === 'การใช้งานกับไอคอน'">
                        <BcInput
                            id="email-input"
                            label="อีเมล"
                            icon="Mail"
                            :data-value="inputValues.withIcon"
                            :rule="(v) => isEmail(v || '')"
                            :error="() => 'กรุณากรอกอีเมลให้ถูกต้อง'"
                            @input="(v) => (inputValues.withIcon = v || '')"
                        />
                    </template>

                    <!-- Format Example -->
                    <template v-if="example.title === 'การกรองรูปแบบข้อมูล'">
                        <BcInput
                            id="phone-input"
                            label="เบอร์โทรศัพท์"
                            :data-value="inputValues.withFormat"
                            :formats="['number']"
                            @input="(v) => (inputValues.withFormat = v || '')"
                        />
                    </template>

                    <!-- Debounce Example -->
                    <template v-if="example.title === 'การใช้ Debounce'">
                        <BcInput
                            id="search-input"
                            label="ค้นหา"
                            :data-value="inputValues.withDebounce"
                            :is-debounce="true"
                            @input="(v) => (inputValues.withDebounce = v || '')"
                        />
                        <p class="mt-2 text-sm text-slate-500">
                            ค่าจะถูกส่งหลังจากหยุดพิมพ์ 500ms
                        </p>
                    </template>
                </div>
            </div>
        </section>
    </BcLayout>
</template>
