<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import type { TimeRange } from '@/ABC/components/BcTimeRange.vue'
import BcTimeRange from '@/ABC/components/BcTimeRange.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { ref } from 'vue'
import TimeRangePlayground from './children/TimeRangePlayground.vue'

// Props ที่รองรับ
const propsData = [
    {
        prop: 'dataValue',
        type: '[string | null, string | null]',
        required: true,
        default: '[null, null]',
        description: 'ช่วงเวลาที่เลือก [เริ่มต้น, สิ้นสุด]',
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

// Events ที่รองรับ
const eventsData = [
    {
        event: '@input',
        payload: '[string | null, string | null]',
        description: 'เมื่อมีการเลือกช่วงเวลา',
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

// ตัวอย่างการใช้งาน
const examples = [
    {
        key: 'basic',
        title: 'การใช้งานพื้นฐาน',
        description: 'เลือกช่วงเวลาแบบพื้นฐาน',
        code: `<BcTimeRange
  :data-value="timeRange"
  label="ช่วงเวลาทำงาน"
  @input="handleTimeRange"
/>`,
    },
    {
        key: 'ampm',
        title: 'รูปแบบ AM/PM',
        description: 'เลือกช่วงเวลาแบบ 12 ชั่วโมง',
        code: `<BcTimeRange
  :data-value="timeRange"
  format="12h"
  label="เวลาทำงาน"
  @input="handleTimeRange"
/>`,
    },
    {
        key: 'restricted',
        title: 'กำหนดช่วงเวลาที่เลือกได้',
        description: 'จำกัดเวลาระหว่าง 09:00 - 17:00',
        code: `<BcTimeRange
  :data-value="timeRange"
  minTime="09:00"
  maxTime="17:00"
  :step="15"
  label="เวลาทำการ"
  @input="handleTimeRange"
/>`,
    },
]

// สถานะสำหรับตัวอย่าง
const timeRangeStates = ref({
    basic: [null, null] as TimeRange,
    ampm: [null, null] as TimeRange,
    restricted: [null, null] as TimeRange,
})

// คัดลอกโค้ด
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}
</script>

<template>
    <BcLayout
        title="Time Range"
        subtitle="คอมโพเนนต์สำหรับเลือกช่วงเวลา รองรับทั้งรูปแบบ 12 และ 24 ชั่วโมง"
        icon="Clock"
    >
        <!-- Props -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="ListFilter" size="24" color="primary" />
                <h2 class="text-xl font-bold">Props ที่รองรับ</h2>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-slate-800 text-white">
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

        <!-- Events -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="MessageCircleMore" size="24" color="primary" />
                <h2 class="text-xl font-bold">Events ที่รองรับ</h2>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-slate-800 text-white">
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

        <!-- Playground -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <TimeRangePlayground />
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

                <!-- Code -->
                <div class="relative bg-slate-800 rounded-lg p-4 mb-6">
                    <BcButton
                        @click="() => copyCode(example.code)"
                        variant="white"
                        icon="Copy"
                        class="!absolute top-3 right-3"
                        size="sm"
                    />
                    <pre
                        class="text-sm text-slate-200"
                    ><code>{{ example.code }}</code></pre>
                </div>

                <!-- Live Example -->
                <div class="bg-slate-50 p-4 rounded-lg space-y-4">
                    <template v-if="example.title === 'การใช้งานพื้นฐาน'">
                        <BcTimeRange
                            id="basic-time"
                            :data-value="timeRangeStates.basic"
                            label="ช่วงเวลาทำงาน"
                            @input="(value) => (timeRangeStates.basic = value)"
                        />
                    </template>

                    <template v-if="example.title === 'รูปแบบ AM/PM'">
                        <BcTimeRange
                            id="ampm-time"
                            :data-value="timeRangeStates.ampm"
                            format="12h"
                            label="เวลาทำงาน"
                            @input="(value) => (timeRangeStates.ampm = value)"
                        />
                    </template>

                    <template
                        v-if="example.title === 'กำหนดช่วงเวลาที่เลือกได้'"
                    >
                        <BcTimeRange
                            id="restricted-time"
                            :data-value="timeRangeStates.restricted"
                            minTime="09:00"
                            maxTime="17:00"
                            :step="15"
                            label="เวลาทำการ"
                            @input="
                                (value) => (timeRangeStates.restricted = value)
                            "
                        />
                    </template>

                    เวลาที่เลือก:
                    {{
                        timeRangeStates[
                            example.key as keyof typeof timeRangeStates
                        ]?.[0] || 'ไม่ระบุ'
                    }}
                    -
                    {{
                        timeRangeStates[
                            example.key as keyof typeof timeRangeStates
                        ]?.[1] || 'ไม่ระบุ'
                    }}
                </div>
            </div>
        </section>

        <!-- Best Practices -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Info" size="24" color="primary" />
                <h2 class="text-xl font-bold">แนวทางการใช้งาน</h2>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Do's -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 class="font-bold text-green-800 mb-3">ควรปฏิบัติ</h3>
                    <ul class="space-y-2 text-green-800">
                        <li class="flex items-start gap-2">
                            <BcIcon name="Check" size="16" />
                            ใช้ step ที่เหมาะสม (15/30 นาที สำหรับงานทั่วไป)
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon name="Check" size="16" />
                            กำหนดเวลาต่ำสุด-สูงสุดที่สมเหตุสมผล
                        </li>
                    </ul>
                </div>

                <!-- Don'ts -->
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 class="font-bold text-red-800 mb-3">ไม่ควรปฏิบัติ</h3>
                    <ul class="space-y-2 text-red-800">
                        <li class="flex items-start gap-2">
                            <BcIcon name="X" size="16" />
                            ใช้ step ที่ละเอียดเกินไป (< 5 นาที)
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon name="X" size="16" />
                            กำหนดช่วงเวลาที่จำกัดการใช้งานมากเกินไป
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
</style>
