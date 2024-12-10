<script setup lang="ts">
import type { ColorName } from '@/ABC/bc-types'
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcToggle from '@/ABC/components/BcToggle.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { reactive, ref } from 'vue'

// Props ที่รองรับทั้งหมด
const propsData = [
    {
        prop: 'modelValue',
        type: 'boolean',
        required: true,
        default: '-',
        description: 'สถานะของ toggle (เปิด/ปิด)',
    },
    {
        prop: 'color',
        type: 'ColorName',
        required: false,
        default: 'primary',
        description: 'สีของ toggle เมื่อเปิด',
    },
    {
        prop: 'id',
        type: 'string',
        required: false,
        default: '-',
        description: 'รหัสสำหรับอ้างอิง',
    },
    {
        prop: 'label',
        type: 'string',
        required: false,
        default: '-',
        description: 'ข้อความที่แสดงคู่กับ toggle',
    },
    {
        prop: 'labelAlign',
        type: "'left' | 'right'",
        required: false,
        default: 'right',
        description: 'ตำแหน่งของ label',
    },
    {
        prop: 'size',
        type: "'sm' | 'md' | 'lg'",
        required: false,
        default: 'md',
        description: 'ขนาดของ toggle',
    },
    {
        prop: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'ปิดการใช้งาน toggle',
    },
]

// Events ที่รองรับ
const eventsData = [
    {
        event: '@update:modelValue',
        payload: 'boolean',
        description: 'เมื่อมีการเปลี่ยนแปลงค่า toggle',
    },
    {
        event: '@change',
        payload: 'boolean',
        description: 'เมื่อมีการคลิกที่ toggle',
    },
]

const Sizes = ['sm', 'md', 'lg'] as const

// ข้อมูลสำหรับ Interactive Playground
const playgroundState = reactive({
    value: false,
    color: 'primary' as ColorName,
    label: 'Toggle Switch',
    labelAlign: 'right' as 'left' | 'right',
    size: 'md' as 'sm' | 'md' | 'lg',
    disabled: false,
})

// ตัวอย่างการใช้งาน
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'Toggle พื้นฐานพร้อม label',
        code: `<BcToggle
    v-model="isEnabled"
    label="เปิด/ปิดการใช้งาน"
/>`,
    },
    {
        title: 'การกำหนดสี',
        description: 'Toggle ที่กำหนดสีและขนาดเอง',
        code: `<BcToggle
    v-model="isEnabled"
    color="success"
    size="lg"
    label="เปิดใช้งานคุณสมบัติพิเศษ"
/>`,
    },
    {
        title: 'การจัดตำแหน่ง Label',
        description: 'Toggle ที่กำหนดตำแหน่ง label ด้านซ้าย',
        code: `<BcToggle
    v-model="isEnabled"
    label="โหมดกลางคืน"
    labelAlign="left"
/>`,
    },
]

// สถานะสำหรับตัวอย่าง
const exampleStates = ref({
    basic: false,
    colored: false,
    aligned: false,
})

// ฟังก์ชันคัดลอกโค้ด
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}

// สร้างโค้ดตัวอย่างตาม props ที่เลือก
const generateCode = () => {
    const lines = [
        '<BcToggle',
        `  v-model="value"`,
        `  label="${playgroundState.label}"`,
    ]

    if (playgroundState.color !== 'primary') {
        lines.push(`  color="${playgroundState.color}"`)
    }
    if (playgroundState.size !== 'md') {
        lines.push(`  size="${playgroundState.size}"`)
    }
    if (playgroundState.labelAlign !== 'right') {
        lines.push(`  labelAlign="${playgroundState.labelAlign}"`)
    }
    if (playgroundState.disabled) {
        lines.push(`  :disabled="true"`)
    }

    lines.push('/>')
    return lines.join('\n')
}

// สีที่สามารถเลือกได้
const colorOptions: ColorName[] = ['primary', 'success', 'warning', 'error']
</script>

<template>
    <BcLayout
        title="สวิตช์เปิด/ปิด (Toggle)"
        subtitle="คอมโพเนนต์สำหรับควบคุมการเปิด/ปิดฟังก์ชันต่างๆ"
        icon="ToggleLeft"
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
                            <th
                                class="border border-slate-300 p-3 text-left w-1/4"
                            >
                                Event
                            </th>
                            <th
                                class="border border-slate-300 p-3 text-left w-1/4"
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

        <!-- Interactive Playground -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="PenTool" size="24" color="primary" />
                <div>
                    <h2 class="text-xl font-bold">Interactive Playground</h2>
                    <p class="text-sm text-slate-600 mt-1">
                        ทดลองปรับแต่งค่า props ต่างๆ และดูผลลัพธ์ที่เกิดขึ้นกับ
                        toggle
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- ส่วนแสดงผล -->
                <div class="space-y-6">
                    <div class="bg-slate-50 p-6 rounded-lg">
                        <BcToggle
                            v-model="playgroundState.value"
                            :color="playgroundState.color"
                            :label="playgroundState.label"
                            :label-align="playgroundState.labelAlign"
                            :size="playgroundState.size"
                            :disabled="playgroundState.disabled"
                        />
                    </div>
                    <div class="bg-slate-100 p-4 rounded-lg">
                        <pre class="text-sm">{{ generateCode() }}</pre>
                        <BcButton
                            @click="copyCode(generateCode())"
                            variant="outline"
                            size="sm"
                            class="mt-2"
                            icon="Copy"
                        >
                            คัดลอกโค้ด
                        </BcButton>
                    </div>
                </div>

                <!-- ส่วนควบคุม -->
                <div class="space-y-4">
                    <!-- สี -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">สี</label>
                        <div class="flex gap-2">
                            <button
                                v-for="color in colorOptions"
                                :key="color"
                                class="w-8 h-8 rounded-full border-2"
                                :class="{
                                    [`bg-${color}`]: true,
                                    'border-blue-500':
                                        playgroundState.color === color,
                                    'border-transparent':
                                        playgroundState.color !== color,
                                }"
                                @click="playgroundState.color = color"
                            />
                        </div>
                    </div>

                    <!-- ขนาด -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">ขนาด</label>
                        <div class="flex gap-2">
                            <BcButton
                                v-for="size in Sizes"
                                :key="size"
                                variant="outline"
                                :color="
                                    playgroundState.size === size
                                        ? 'primary'
                                        : 'outline'
                                "
                                @click="playgroundState.size = size"
                                size="sm"
                            >
                                {{ size.toUpperCase() }}
                            </BcButton>
                        </div>
                    </div>

                    <!-- Label -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">ข้อความ Label</label>
                        <input
                            v-model="playgroundState.label"
                            class="w-full p-2 border rounded-lg"
                            placeholder="ใส่ข้อความ label"
                        />
                    </div>

                    <!-- ตำแหน่ง Label -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">ตำแหน่ง Label</label>
                        <div class="flex gap-2">
                            <BcButton
                                variant="outline"
                                :color="
                                    playgroundState.labelAlign === 'left'
                                        ? 'primary'
                                        : 'outline'
                                "
                                @click="playgroundState.labelAlign = 'left'"
                                size="sm"
                            >
                                ซ้าย
                            </BcButton>
                            <BcButton
                                variant="outline"
                                :color="
                                    playgroundState.labelAlign === 'right'
                                        ? 'primary'
                                        : 'outline'
                                "
                                @click="playgroundState.labelAlign = 'right'"
                                size="sm"
                            >
                                ขวา
                            </BcButton>
                        </div>
                    </div>

                    <!-- Disabled -->
                    <div class="pt-2">
                        <BcToggle
                            v-model="playgroundState.disabled"
                            label="ปิดการใช้งาน"
                        />
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
                <div class="bg-white p-4 rounded-lg border border-slate-200">
                    <!-- Basic Example -->
                    <template v-if="example.title === 'การใช้งานพื้นฐาน'">
                        <div class="space-y-4">
                            <BcToggle
                                v-model="exampleStates.basic"
                                label="เปิด/ปิดการใช้งาน"
                            />
                            <p class="text-sm text-slate-600">
                                สถานะปัจจุบัน:
                                {{ exampleStates.basic ? 'เปิด' : 'ปิด' }}
                            </p>
                        </div>
                    </template>

                    <!-- Colored Example -->
                    <template v-if="example.title === 'การกำหนดสี'">
                        <div class="space-y-4">
                            <BcToggle
                                v-model="exampleStates.colored"
                                color="success"
                                size="lg"
                                label="เปิดใช้งานคุณสมบัติพิเศษ"
                            />
                            <p class="text-sm text-slate-600">
                                ตัวอย่างการใช้สี success และขนาด large
                            </p>
                        </div>
                    </template>

                    <!-- Label Alignment Example -->
                    <template v-if="example.title === 'การจัดตำแหน่ง Label'">
                        <div class="space-y-4">
                            <BcToggle
                                v-model="exampleStates.aligned"
                                label="โหมดกลางคืน"
                                labelAlign="left"
                            />
                            <p class="text-sm text-slate-600">
                                ตัวอย่างการจัดตำแหน่ง label ด้านซ้าย
                            </p>
                        </div>
                    </template>
                </div>
            </div>
        </section>

        <!-- Best Practices -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="SpellCheck" size="24" color="primary" />
                <h2 class="text-xl font-bold">แนวทางการใช้งานที่แนะนำ</h2>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Do's -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3
                        class="text-lg font-bold text-green-800 mb-3 flex items-center gap-2"
                    >
                        <BcIcon name="Check" color="success" />
                        ควรปฏิบัติ
                    </h3>
                    <ul class="space-y-2 text-green-800">
                        <li class="flex items-start gap-2">
                            <BcIcon name="ChevronRight" size="16" />
                            ใช้ label ที่ชัดเจนและเข้าใจง่าย
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon name="ChevronRight" size="16" />
                            เลือกใช้สีที่สื่อความหมายเหมาะสมกับการกระทำ
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon name="ChevronRight" size="16" />
                            จัดวาง toggle ในตำแหน่งที่ผู้ใช้เข้าถึงได้ง่าย
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon name="ChevronRight" size="16" />
                            แสดงสถานะปัจจุบันของ toggle อย่างชัดเจน
                        </li>
                    </ul>
                </div>

                <!-- Don'ts -->
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3
                        class="text-lg font-bold text-red-800 mb-3 flex items-center gap-2"
                    >
                        <BcIcon name="X" color="error" />
                        ไม่ควรปฏิบัติ
                    </h3>
                    <ul class="space-y-2 text-red-800">
                        <li class="flex items-start gap-2">
                            <BcIcon name="ChevronRight" size="16" />
                            ใช้ toggle
                            สำหรับการกระทำที่ต้องการการยืนยันหลายขั้นตอน
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon name="ChevronRight" size="16" />
                            ใช้ข้อความ label ที่กำกวมหรือไม่ชัดเจน
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon name="ChevronRight" size="16" />
                            วางตำแหน่ง toggle ในจุดที่ผู้ใช้อาจกดโดยไม่ตั้งใจ
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon name="ChevronRight" size="16" />
                            ใช้สีที่ไม่สื่อความหมายหรือขัดกับมาตรฐานการใช้งาน
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
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 class="text-lg font-bold text-blue-800 mb-3">
                        คุณสมบัติที่รองรับ
                    </h3>
                    <ul class="space-y-2 text-blue-800">
                        <li class="flex items-start gap-2">
                            <BcIcon name="ChevronRight" size="16" />
                            รองรับการใช้งานผ่านแป้นพิมพ์ (Keyboard Navigation)
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon name="ChevronRight" size="16" />
                            มี ARIA attributes สำหรับ Screen Readers
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon name="ChevronRight" size="16" />
                            แสดง Focus indicators ที่ชัดเจน
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon name="ChevronRight" size="16" />
                            สามารถปรับขนาดตามความต้องการของผู้ใช้
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

/* Tooltip styles */
[data-tooltip] {
    position: relative;
    cursor: help;
}

[data-tooltip]:before {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
}

[data-tooltip]:hover:before {
    opacity: 1;
    visibility: visible;
}
</style>
