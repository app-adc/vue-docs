<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import CheckboxPlayground from '@/ABC/pages/children/CheckboxPlayground.vue'
import { ref } from 'vue'

// Props สำหรับการแสดงผลในตาราง
const propsData = [
    {
        prop: 'modelValue',
        type: 'boolean',
        required: true,
        default: '-',
        description: 'ค่าที่ถูกเลือกของ checkbox (v-model)',
    },
    {
        prop: 'id',
        type: 'string',
        required: false,
        default: 'random uid',
        description: 'รหัสอ้างอิงสำหรับ checkbox',
    },
    {
        prop: 'label',
        type: 'string',
        required: false,
        default: '-',
        description: 'ข้อความที่แสดงคู่กับ checkbox',
    },
    {
        prop: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'ปิดการใช้งาน checkbox',
    },
    {
        prop: 'size',
        type: "'sm' | 'md' | 'lg'",
        required: false,
        default: 'md',
        description: 'ขนาดของ checkbox',
    },
    {
        prop: 'align',
        type: "'left' | 'right'",
        required: false,
        default: 'right',
        description: 'ตำแหน่งของ label',
    },
    {
        prop: 'color',
        type: 'ColorName',
        required: false,
        default: 'primary',
        description: 'สีของ checkbox เมื่อถูกเลือก',
    },
]

// Events สำหรับการแสดงผลในตาราง
const eventsData = [
    {
        event: '@update:modelValue',
        payload: 'boolean',
        description: 'เกิดขึ้นเมื่อสถานะของ checkbox เปลี่ยนแปลง',
    },
    {
        event: '@change',
        payload: 'boolean',
        description: 'เกิดขึ้นเมื่อมีการคลิกที่ checkbox',
    },
]

// ตัวอย่างการใช้งาน
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'Checkbox พื้นฐานพร้อมข้อความ',
        code: `<BcCheckBox
    v-model="isChecked"
    label="ยอมรับเงื่อนไขการใช้งาน"
/>`,
    },
    {
        title: 'ขนาดต่างๆ',
        description: 'Checkbox ในขนาด sm, md และ lg',
        code: `<BcCheckBox v-model="checked" label="ขนาดเล็ก" size="sm" />
<BcCheckBox v-model="checked" label="ขนาดกลาง" size="md" />
<BcCheckBox v-model="checked" label="ขนาดใหญ่" size="lg" />`,
    },
    {
        title: 'การจัดตำแหน่ง Label',
        description: 'การวาง label ด้านซ้ายและขวาของ checkbox',
        code: `<BcCheckBox v-model="checked" label="Label ด้านขวา" labelAlign="right" />
<BcCheckBox v-model="checked" label="Label ด้านซ้าย" labelAlign="left" />`,
    },
    {
        title: 'การปรับแต่งสี',
        description: 'การกำหนดสีของ checkbox เมื่อถูกเลือก',
        code: `<BcCheckBox v-model="checked" label="สีหลัก" color="primary" />
<BcCheckBox v-model="checked" label="สีรอง" color="secondary" />
<BcCheckBox v-model="checked" label="สีสำเร็จ" color="success" />`,
    },
]

// สถานะสำหรับตัวอย่าง
const checkboxStates = ref({
    basic: false,
    sizes: {
        sm: false,
        md: false,
        lg: false,
    },
    alignment: {
        right: false,
        left: false,
    },
    colors: {
        primary: false,
        secondary: false,
        success: false,
    },
})

// ฟังก์ชันคัดลอกโค้ด
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}
</script>

<template>
    <BcLayout
        title="Checkbox"
        subtitle="คอมโพเนนต์สำหรับตัวเลือกแบบเลือกได้หลายรายการ"
        icon="Check"
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
                            <th class="border p-3 text-left w-1/6">Prop</th>
                            <th class="border p-3 text-left w-1/4">Type</th>
                            <th class="border p-3 text-left w-1/6">Default</th>
                            <th class="border p-3 text-left">คำอธิบาย</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="prop in propsData"
                            :key="prop.prop"
                            class="hover:bg-slate-50"
                        >
                            <td class="border p-3 font-mono text-sm">
                                {{ prop.prop }}
                            </td>
                            <td
                                class="border p-3 font-mono text-sm text-blue-600"
                            >
                                {{ prop.type }}
                            </td>
                            <td class="border p-3 font-mono text-sm">
                                {{ prop.default }}
                            </td>
                            <td class="border p-3">
                                {{ prop.description }}
                            </td>
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
                            <th class="border p-3 text-left w-1/4">Event</th>
                            <th class="border p-3 text-left w-1/4">Payload</th>
                            <th class="border p-3 text-left">คำอธิบาย</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="event in eventsData"
                            :key="event.event"
                            class="hover:bg-slate-50"
                        >
                            <td class="border p-3 font-mono text-sm">
                                {{ event.event }}
                            </td>
                            <td class="border p-3 font-mono text-sm">
                                {{ event.payload }}
                            </td>
                            <td class="border p-3">{{ event.description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Add Playground section before Additional Tips -->
        <section class="mb-8">
            <CheckboxPlayground />
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

                <!-- Live Example -->
                <div class="bg-white p-4 rounded-lg space-y-4">
                    <!-- Basic Example -->
                    <template v-if="example.title === 'การใช้งานพื้นฐาน'">
                        <BcCheckBox
                            v-model="checkboxStates.basic"
                            label="ยอมรับเงื่อนไขการใช้งาน"
                        />
                        <p class="text-sm text-slate-600">
                            สถานะ:
                            {{ checkboxStates.basic ? 'เลือก' : 'ไม่เลือก' }}
                        </p>
                    </template>

                    <!-- Sizes Example -->
                    <template v-if="example.title === 'ขนาดต่างๆ'">
                        <div class="flex items-center gap-6">
                            <BcCheckBox
                                v-model="checkboxStates.sizes.sm"
                                label="ขนาดเล็ก"
                                size="sm"
                            />
                            <BcCheckBox
                                v-model="checkboxStates.sizes.md"
                                label="ขนาดกลาง"
                                size="md"
                            />
                            <BcCheckBox
                                v-model="checkboxStates.sizes.lg"
                                label="ขนาดใหญ่"
                                size="lg"
                            />
                        </div>
                    </template>

                    <!-- Alignment Example -->
                    <template v-if="example.title === 'การจัดตำแหน่ง Label'">
                        <div class="flex items-center gap-6">
                            <BcCheckBox
                                v-model="checkboxStates.alignment.right"
                                label="Label ด้านขวา"
                                labelAlign="right"
                            />
                            <BcCheckBox
                                v-model="checkboxStates.alignment.left"
                                label="Label ด้านซ้าย"
                                labelAlign="left"
                            />
                        </div>
                    </template>

                    <!-- Colors Example -->
                    <template v-if="example.title === 'การปรับแต่งสี'">
                        <div class="flex items-center gap-6">
                            <BcCheckBox
                                v-model="checkboxStates.colors.primary"
                                label="สีหลัก"
                                color="primary"
                            />
                            <BcCheckBox
                                v-model="checkboxStates.colors.secondary"
                                label="สีรอง"
                                color="secondary"
                            />
                            <BcCheckBox
                                v-model="checkboxStates.colors.success"
                                label="สีสำเร็จ"
                                color="success"
                            />
                        </div>
                    </template>
                </div>
            </div>
        </section>

        <!-- Additional Tips -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Info" size="24" color="primary" />
                <h2 class="text-xl font-bold">คำแนะนำเพิ่มเติม</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 class="font-bold text-blue-800 mb-2">
                        การใช้งานที่แนะนำ
                    </h3>
                    <ul class="space-y-2 text-blue-700">
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            ควรกำหนด label ที่ชัดเจนเพื่อให้ผู้ใช้เข้าใจได้ง่าย
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            เลือกขนาดให้เหมาะสมกับการใช้งานและพื้นที่
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            ใช้สีที่สอดคล้องกับ UI ของแอปพลิเคชัน
                        </li>
                    </ul>
                </div>

                <!-- <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 class="font-bold text-yellow-800 mb-2">
                        ข้อควรระวัง
                    </h3>
                    <ul class="space-y-2 text-yellow-700">
                        <li class="flex items-center gap-2">
                            <B -->
                <!-- </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </section>
    </BcLayout>
</template>
