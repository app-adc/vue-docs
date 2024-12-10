<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcTime from '@/ABC/components/BcTime.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { ref } from 'vue'
import TimePlayground from './children/TimePlayground.vue'

// Props documentation
const propsData = [
    {
        prop: 'dataValue',
        type: 'string | null',
        required: true,
        default: '-',
        description: 'ค่าเวลาที่เลือก (รูปแบบ HH:mm หรือ hh:mm a)',
    },
    {
        prop: 'format',
        type: "'12h' | '24h'",
        required: false,
        default: '24h',
        description: 'รูปแบบการแสดงเวลา',
    },
    {
        prop: 'minTime',
        type: 'string',
        required: false,
        default: '-',
        description: 'เวลาต่ำสุดที่เลือกได้',
    },
    {
        prop: 'maxTime',
        type: 'string',
        required: false,
        default: '-',
        description: 'เวลาสูงสุดที่เลือกได้',
    },
    {
        prop: 'step',
        type: 'number',
        required: false,
        default: '30',
        description: 'ช่วงเวลาระหว่างตัวเลือก (นาที)',
    },
    {
        prop: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'ปิดการใช้งาน',
    },
    {
        prop: 'placeholder',
        type: 'string',
        required: false,
        default: 'เลือกเวลา',
        description: 'ข้อความที่แสดงเมื่อยังไม่มีการเลือกเวลา',
    },
    {
        prop: 'form',
        type: 'string',
        required: false,
        default: '-',
        description: 'ใช้สำหรับกำหนด form validation',
    },
    {
        prop: 'error',
        type: 'function',
        required: false,
        default: '-',
        description: 'ข้อความแสดงเมื่อเกิด error',
    },
    {
        prop: 'rule',
        type: 'function',
        required: false,
        default: '-',
        description: 'เงื่อนไขการ validate ข้อมูล',
    },
]

// Events documentation
const eventsData = [
    {
        event: '@input',
        payload: 'string | null',
        description: 'เมื่อมีการเลือกเวลา',
    },
    {
        event: '@focus',
        payload: '-',
        description: 'เมื่อ input ได้รับ focus',
    },
    {
        event: '@blur',
        payload: '-',
        description: 'เมื่อ input เสีย focus',
    },
]

// Playground state

// Examples
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'การเลือกเวลาแบบพื้นฐานในรูปแบบ 24 ชั่วโมง',
        code: `<BcTime
    :data-value="selectedTime"
    label="เลือกเวลา"
/>`,
    },
    {
        title: 'การกำหนดรูปแบบ 12 ชั่วโมง',
        description: 'การเลือกเวลาในรูปแบบ AM/PM',
        code: `<BcTime
    :data-value="selectedTime"
    format="12h"
    label="เลือกเวลา"
/>`,
    },
    {
        title: 'การกำหนดช่วงเวลา',
        description: 'การจำกัดเวลาที่เลือกได้',
        code: `<BcTime
    :data-value="selectedTime"
    minTime="09:00"
    maxTime="17:00"
    step="15"
    label="เวลาทำการ"
/>`,
    },
]
type TimeStates = {
    basic: string | null
    format12h: string | null
    range: string | null
}
// Example states
const timeStates = ref<TimeStates>({
    basic: null,
    format12h: null,
    range: null,
})

// Copy code to clipboard
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}
</script>

<template>
    <BcLayout
        title="Time Picker Component"
        subtitle="คอมโพเนนต์สำหรับเลือกเวลาที่รองรับทั้งรูปแบบ 12 และ 24 ชั่วโมง"
        icon="Clock"
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
                            <td class="border p-3">{{ prop.description }}</td>
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

        <!-- Interactive Playground -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <TimePlayground />
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
                <div class="bg-slate-50 p-4 rounded-lg">
                    <!-- Basic Example -->
                    <template v-if="example.title === 'การใช้งานพื้นฐาน'">
                        <div class="space-y-4">
                            <BcTime
                                id="time-basic"
                                :dataValue="timeStates.basic"
                                label="เลือกเวลา"
                                @input="(value) => (timeStates.basic = value)"
                            />
                            <p class="text-sm text-slate-600">
                                เวลาที่เลือก:
                                {{ timeStates.basic || 'ยังไม่ได้เลือก' }}
                            </p>
                        </div>
                    </template>

                    <!-- 12h Format Example -->
                    <template
                        v-if="example.title === 'การกำหนดรูปแบบ 12 ชั่วโมง'"
                    >
                        <div class="space-y-4">
                            <BcTime
                                id="time-12h"
                                :dataValue="timeStates.format12h"
                                format="12h"
                                label="เลือกเวลา"
                                @input="
                                    (value) => (timeStates.format12h = value)
                                "
                            />
                            <p class="text-sm text-slate-600">
                                เวลาที่เลือก:
                                {{ timeStates.format12h || 'ยังไม่ได้เลือก' }}
                            </p>
                        </div>
                    </template>

                    <!-- Range Example -->
                    <template v-if="example.title === 'การกำหนดช่วงเวลา'">
                        <div class="space-y-4">
                            <BcTime
                                id="time-range"
                                :dataValue="timeStates.range"
                                minTime="09:00"
                                maxTime="17:00"
                                :step="15"
                                label="เวลาทำการ"
                                @input="(value) => (timeStates.range = value)"
                            />
                            <p class="text-sm text-slate-600">
                                เวลาที่เลือก:
                                {{ timeStates.range || 'ยังไม่ได้เลือก' }}
                            </p>
                        </div>
                    </template>
                </div>
            </div>
        </section>

        <!-- Best Practices -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Info" size="24" color="primary" />
                <h2 class="text-xl font-bold">แนวทางการใช้งานที่แนะนำ</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 class="font-bold text-blue-800 mb-2">
                        การใช้งานที่แนะนำ
                    </h3>
                    <ul class="space-y-2 text-blue-700">
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            ใช้รูปแบบเวลาที่เหมาะสมกับผู้ใช้งานในประเทศนั้นๆ
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            กำหนดช่วงเวลาที่เหมาะสมกับการใช้งาน เช่น เวลาทำการ
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            ใช้ step size ที่สมเหตุสมผล (15-30
                            นาทีสำหรับการนัดหมายทั่วไป)
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            แสดงข้อความ placeholder ที่ชัดเจน
                        </li>
                    </ul>
                </div>

                <div
                    class="bg-yellow-50 p-4 rounded-lg border border-yellow-200"
                >
                    <h3 class="font-bold text-yellow-800 mb-2">ข้อควรระวัง</h3>
                    <ul class="space-y-2 text-yellow-700">
                        <li class="flex items-center gap-2">
                            <BcIcon name="AlertTriangle" size="16" />
                            หลีกเลี่ยงการใช้ step size ที่เล็กเกินไปโดยไม่จำเป็น
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="AlertTriangle" size="16" />
                            ตรวจสอบความถูกต้องของ minTime และ maxTime
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="AlertTriangle" size="16" />
                            ระวังการใช้รูปแบบเวลาที่ไม่คุ้นเคยกับผู้ใช้
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Accessibility -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="UserCheck" size="24" color="primary" />
                <h2 class="text-xl font-bold">
                    การเข้าถึงและการใช้งาน (Accessibility)
                </h2>
            </div>

            <div class="space-y-4">
                <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 class="font-bold text-blue-800 mb-2">
                        คุณสมบัติที่รองรับ
                    </h3>
                    <ul class="space-y-2 text-blue-700">
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            รองรับการใช้งานผ่านแป้นพิมพ์ (Tab, Space, Enter)
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            มีข้อความอธิบายสำหรับ Screen Reader
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            แสดง Focus indicator ที่ชัดเจน
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            รองรับการนำทางด้วยปุ่มลูกศร
                        </li>
                    </ul>
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

/* Custom range input styling */
input[type='range'] {
    appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: #e2e8f0;
    outline: none;
    padding: 0;
    margin: 10px 0;
}

input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    transition: all 0.15s ease-in-out;
}

input[type='range']::-webkit-slider-thumb:hover {
    transform: scale(1.1);
}

input[type='time'] {
    appearance: none;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
}
</style>
