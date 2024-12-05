<script setup lang="ts">
import type { DateRange } from '@/ABC/components/BcCalendarBetween.vue'
import BcCalendarBetween from '@/ABC/components/BcCalendarBetween.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { ref } from 'vue'
import BcCalendarBetweenPlayground from './children/BcCalendarBetweenPlayground.vue'

// Props documentation
const propsData = [
    {
        prop: 'dataValue',
        type: 'DateRange',
        required: true,
        default: '-',
        description: 'ช่วงวันที่ที่เลือก [startDate, endDate]',
    },
    {
        prop: 'minDate',
        type: 'Date',
        required: false,
        default: '-',
        description: 'วันที่ต่ำสุดที่สามารถเลือกได้',
    },
    {
        prop: 'maxDate',
        type: 'Date',
        required: false,
        default: '-',
        description: 'วันที่สูงสุดที่สามารถเลือกได้',
    },
    {
        prop: 'calendarId',
        type: 'string',
        required: false,
        default: 'bc-calendar-between',
        description: 'ID ของปฏิทินสำหรับอ้างอิงใน DOM',
    },
    {
        prop: 'position',
        type: "'absolute' | 'relative'",
        required: false,
        default: 'absolute',
        description: 'ตำแหน่งการแสดงปฏิทิน',
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
        default: '-',
        description: 'ข้อความที่แสดงเมื่อยังไม่ได้เลือกวันที่',
    },
    {
        prop: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'ปิดการใช้งานการเลือกวันที่',
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
        payload: 'DateRange',
        description: 'เกิดขึ้นเมื่อมีการเลือกช่วงวันที่',
    },
    {
        event: '@focus',
        payload: 'void',
        description: 'เกิดขึ้นเมื่อเปิดปฏิทิน',
    },
    {
        event: '@blur',
        payload: 'void',
        description: 'เกิดขึ้นเมื่อปิดปฏิทิน',
    },
]

// CSS Variables documentation
const cssVariables = `[calendar='root'] {
    --font-family: var(--font-family) !important;
    --background: #fff !important;
    --picker: var(--primary) !important;
    --text-picker: #fff !important;
    --current: var(--secondary) !important;
    --text-current: #fff !important;
    --text: var(--color) !important;
    --text-week: #1e293b !important;
    --dateRadius: 3rem !important;
    --borderRadius: 0.75rem !important;
    --border: none !important;
    --width: 300px !important;
    --text-color: #fff !important;
    --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
}`

// Examples
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'การเลือกช่วงวันที่แบบพื้นฐาน',
        code: `<BcCalendarBetween
    id="basic-calendar"
    calendarId="basic-calendar-between"
    label="เลือกช่วงวันที่"
    :data-value="selectedDates"
    @input="handleDateChange"
/>`,
    },
    {
        title: 'การกำหนดช่วงวันที่',
        description: 'กำหนดวันที่ต่ำสุดและสูงสุดที่สามารถเลือกได้',
        code: `<BcCalendarBetween
    id="limited-calendar"
    calendarId="limited-calendar-between"
    label="ช่วงวันที่"
    :min-date="new Date('2024-01-01')"
    :max-date="new Date('2024-12-31')"
    :data-value="selectedDates"
    @input="handleDateChange"
/>`,
    },
    {
        title: 'การแสดงผลแบบ Relative',
        description: 'แสดงปฏิทินในตำแหน่ง relative',
        code: `<BcCalendarBetween
    id="relative-calendar"
    calendarId="relative-calendar-between"
    label="ช่วงวันที่"
    position="relative"
    :data-value="selectedDates"
    @input="handleDateChange"
/>`,
    },
]

// Example states
const dateStates = ref<Record<string, DateRange>>({
    basic: null,
    limited: null,
    relative: null,
})

// Fixed event handler
const handleDateChange = (
    dates: DateRange,
    type: 'basic' | 'limited' | 'relative'
) => {
    dateStates.value[type] = dates
}

// Format date for display
const formatDate = (date: string | null) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const formatDateRange = (range: DateRange) => {
    if (!range) return 'ยังไม่ได้เลือกวันที่'
    return `${formatDate(range[0])} - ${formatDate(range[1])}`
}

// Copy code function
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}
</script>

<template>
    <BcLayout
        title="ตัวเลือกช่วงวันที่ (Calendar Between)"
        subtitle="คอมโพเนนต์สำหรับเลือกช่วงวันที่ในรูปแบบปฏิทิน"
        icon="CalendarDays"
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

        <!-- Styling Section -->
        <section class="mb-8">
            <h2 class="text-xl font-bold mb-4">การปรับแต่ง Style</h2>
            <p class="text-slate-600 mb-4">
                ปฏิทินสามารถปรับแต่งได้ผ่าน CSS Variables โดยกำหนดค่าต่างๆ ผ่าน
                attribute calendar="root"
            </p>

            <div class="bg-slate-50 rounded-lg p-4">
                <div class="mb-4 flex justify-between items-center">
                    <h3 class="font-bold">CSS Variables ที่รองรับ</h3>
                    <button
                        @click="copyCode(cssVariables)"
                        class="p-2 hover:bg-slate-200 rounded"
                        title="Copy code"
                    >
                        <BcIcon name="Copy" size="20" />
                    </button>
                </div>
                <pre
                    class="text-sm overflow-x-auto"
                ><code>{{ cssVariables }}</code></pre>
            </div>

            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                    <h4 class="font-medium">ตัวแปรที่ใช้</h4>
                    <ul class="space-y-1 text-sm text-slate-600">
                        <li><code>--font-family</code>: ฟอนต์ที่ใช้ในปฏิทิน</li>
                        <li><code>--background</code>: สีพื้นหลังของปฏิทิน</li>
                        <li><code>--picker</code>: สีของวันที่ที่เลือก</li>
                        <li>
                            <code>--text-picker</code>:
                            สีตัวอักษรของวันที่ที่เลือก
                        </li>
                        <li><code>--current</code>: สีของวันปัจจุบัน</li>
                        <li>
                            <code>--text-current</code>:
                            สีตัวอักษรของวันปัจจุบัน
                        </li>
                    </ul>
                </div>
                <div class="space-y-2">
                    <h4 class="font-medium">ตัวแปรเพิ่มเติม</h4>
                    <ul class="space-y-1 text-sm text-slate-600">
                        <li><code>--text</code>: สีตัวอักษรทั่วไป</li>
                        <li>
                            <code>--text-week</code>: สีตัวอักษรของวันในสัปดาห์
                        </li>
                        <li><code>--dateRadius</code>: ความโค้งมนของวันที่</li>
                        <li>
                            <code>--borderRadius</code>: ความโค้งมนของปฏิทิน
                        </li>
                        <li><code>--width</code>: ความกว้างของปฏิทิน</li>
                        <li><code>--shadow</code>: เงาของปฏิทิน</li>
                    </ul>
                </div>
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
                        <BcCalendarBetween
                            id="basic-calendar"
                            calendarId="basic-calendar-between"
                            label="เลือกช่วงวันที่"
                            :data-value="dateStates.basic"
                            @input="(dates) => handleDateChange(dates, 'basic')"
                        />
                        <div class="mt-2 text-sm text-slate-600">
                            วันที่เลือก: {{ formatDateRange(dateStates.basic) }}
                        </div>
                    </template>

                    <template v-if="example.title === 'การกำหนดช่วงวันที่'">
                        <BcCalendarBetween
                            id="limited-calendar"
                            calendarId="limited-calendar-between"
                            label="ช่วงวันที่"
                            :min-date="new Date('2024-01-01')"
                            :max-date="new Date('2024-12-31')"
                            :data-value="dateStates.limited"
                            @input="
                                (dates) => handleDateChange(dates, 'limited')
                            "
                        />
                        <div class="mt-2 text-sm text-slate-600">
                            วันที่เลือก:
                            {{ formatDateRange(dateStates.limited) }}
                            <div class="mt-1 text-xs text-slate-500">
                                (จำกัดการเลือกเฉพาะปี 2024 เท่านั้น)
                            </div>
                        </div>
                    </template>

                    <template v-if="example.title === 'การแสดงผลแบบ Relative'">
                        <BcCalendarBetween
                            id="relative-calendar"
                            calendarId="relative-calendar-between"
                            label="ช่วงวันที่"
                            position="relative"
                            :data-value="dateStates.relative"
                            @input="
                                (dates) => handleDateChange(dates, 'relative')
                            "
                        />
                        <div class="mt-2 text-sm text-slate-600">
                            วันที่เลือก:
                            {{ formatDateRange(dateStates.relative) }}
                        </div>
                    </template>
                </div>
            </div>
        </section>
        <!--  Playgrounds Section -->
        <BcCalendarBetweenPlayground />

        <!-- Additional Tips Section -->
        <section class="mb-8">
            <h2 class="text-xl font-bold mb-4">คำแนะนำเพิ่มเติม</h2>
            <div class="space-y-4">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 class="text-lg font-bold mb-2 text-blue-800">
                        การใช้งานที่แนะนำ
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-blue-800">
                        <li>
                            ควรกำหนด calendarId
                            ที่ไม่ซ้ำกันเมื่อใช้หลายปฏิทินในหน้าเดียวกัน
                        </li>
                        <li>
                            การใช้ position="relative"
                            เหมาะกับกรณีที่มีพื้นที่จำกัดหรือต้องการแสดงปฏิทินใต้
                            input โดยตรง
                        </li>
                        <li>
                            ควรกำหนด min-date และ max-date
                            เมื่อต้องการจำกัดช่วงการเลือกวันที่
                        </li>
                        <li>
                            เมื่อใช้งานในฟอร์ม
                            ควรมีการตรวจสอบความถูกต้องของช่วงวันที่ที่เลือก
                        </li>
                    </ul>
                </div>

                <div
                    class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                >
                    <h3 class="text-lg font-bold mb-2 text-yellow-800">
                        ข้อควรระวัง
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-yellow-800">
                        <li>
                            การกำหนด z-index อาจจำเป็นเมื่อใช้
                            position="absolute" ในบาง layout
                        </li>
                        <li>
                            ควรจัดการ error handling
                            สำหรับกรณีที่วันที่ไม่อยู่ในช่วงที่กำหนด
                        </li>
                        <li>
                            ระวังการซ้อนทับกันของปฏิทินเมื่อใช้งานหลายตัวในหน้าเดียวกัน
                        </li>
                        <li>
                            ควรตรวจสอบความถูกต้องของช่วงวันที่
                            (วันเริ่มต้นต้องไม่มากกว่าวันสิ้นสุด)
                        </li>
                        <li>
                            ในกรณีที่ต้องการจำกัดจำนวนวันที่เลือกได้
                            ควรมีการตรวจสอบและแจ้งเตือนผู้ใช้
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

table {
    border: 1px solid var(--border);
}

th,
td {
    border: 1px solid var(--border);
}

code {
    background-color: #f1f5f9;
    padding: 0.1em 0.3em;
    border-radius: 0.25em;
    font-size: 0.9em;
    color: #475569;
}

.list-disc {
    list-style-type: disc;
    padding-left: 1rem;
}

.list-inside {
    list-style-position: inside;
}
</style>
