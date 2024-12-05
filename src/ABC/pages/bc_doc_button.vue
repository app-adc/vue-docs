<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import ButtonPlayground from '@/ABC/pages/children/ButtonPlayground.vue'
import { ref } from 'vue'

// Props ที่รองรับทั้งหมด
const propsData = [
    {
        prop: 'to',
        type: 'Route',
        required: false,
        default: '-',
        description: 'เส้นทางสำหรับการนำทาง (vue-router)',
    },
    {
        prop: 'icon',
        type: 'IconName',
        required: false,
        default: '-',
        description: 'ไอคอนที่จะแสดงในปุ่ม',
    },
    {
        prop: 'variant',
        type: 'ColorName',
        required: false,
        default: 'primary',
        description: 'รูปแบบของปุ่ม (primary, outline, etc.)',
    },
    {
        prop: 'color',
        type: 'ColorName',
        required: false,
        default: '-',
        description: 'สีที่กำหนดเอง (override default variant color)',
    },
    {
        prop: 'iconAlign',
        type: "'LEFT' | 'RIGHT'",
        required: false,
        default: 'LEFT',
        description: 'ตำแหน่งของไอคอน',
    },
    {
        prop: 'isLoading',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'สถานะกำลังโหลด',
    },
    {
        prop: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'ปิดการใช้งานปุ่ม',
    },
    {
        prop: 'size',
        type: "'sm' | 'md' | 'lg'",
        required: false,
        default: 'md',
        description: 'ขนาดของปุ่ม',
    },
]

// Events ที่รองรับ
const eventsData = [
    {
        event: '@click',
        payload: 'MouseEvent',
        description: 'เมื่อคลิกที่ปุ่ม',
    },
    {
        event: '@focus',
        payload: 'FocusEvent',
        description: 'เมื่อปุ่มได้รับ focus',
    },
    {
        event: '@blur',
        payload: 'FocusEvent',
        description: 'เมื่อปุ่มเสีย focus',
    },
]

// ตัวอย่างการใช้งาน
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'ปุ่มพื้นฐานในรูปแบบต่างๆ',
        code: `<BcButton>ปุ่มพื้นฐาน</BcButton>
<BcButton variant="secondary">ปุ่มรอง</BcButton>
<BcButton variant="outline">ปุ่มเส้นขอบ</BcButton>`,
    },
    {
        title: 'การใช้งานกับไอคอน',
        description: 'ปุ่มพร้อมไอคอนในตำแหน่งต่างๆ',
        code: `<BcButton icon="Send">ส่งข้อมูล</BcButton>
<BcButton icon="Save" iconAlign="RIGHT">บันทึก</BcButton>`,
    },
    {
        title: 'ขนาดต่างๆ',
        description: 'ปุ่มในขนาด sm, md และ lg',
        code: `<BcButton size="sm">ขนาดเล็ก</BcButton>
<BcButton size="md">ขนาดกลาง</BcButton>
<BcButton size="lg">ขนาดใหญ่</BcButton>`,
    },
    {
        title: 'สถานะต่างๆ',
        description: 'ปุ่มในสถานะโหลดและปิดการใช้งาน',
        code: `<BcButton isLoading>กำลังโหลด</BcButton>
<BcButton disabled>ปิดการใช้งาน</BcButton>`,
    },
]

// สถานะสำหรับตัวอย่าง
const clickCounts = ref<Record<string, number>>({
    basic: 0,
    withIcon: 0,
    sizes: 0,
    states: 0,
})

// ฟังก์ชันคัดลอกโค้ด
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}

// อัพเดตจำนวนคลิก
const incrementClickCount = (example: string) => {
    clickCounts.value[example]++
}
</script>

<template>
    <BcLayout
        title="Button Component"
        subtitle="คอมโพเนนต์ปุ่มกดที่รองรับการปรับแต่งรูปแบบได้หลากหลาย"
        icon="MousePointer"
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

        <!-- Interactive Playground -->
        <section class="mb-8">
            <ButtonPlayground />
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
                <div class="bg-slate-50 p-4 rounded-lg space-y-4">
                    <!-- Basic Example -->
                    <template v-if="example.title === 'การใช้งานพื้นฐาน'">
                        <div class="flex gap-4">
                            <BcButton @click="incrementClickCount('basic')"
                                >ปุ่มพื้นฐาน</BcButton
                            >
                            <BcButton
                                variant="secondary"
                                @click="incrementClickCount('basic')"
                                >ปุ่มรอง</BcButton
                            >
                            <BcButton
                                variant="outline"
                                @click="incrementClickCount('basic')"
                                >ปุ่มเส้นขอบ</BcButton
                            >
                        </div>
                        <div class="text-sm text-slate-600">
                            จำนวนคลิก: {{ clickCounts.basic }}
                        </div>
                    </template>

                    <!-- Icon Example -->
                    <template v-if="example.title === 'การใช้งานกับไอคอน'">
                        <div class="flex gap-4">
                            <BcButton
                                icon="Send"
                                @click="incrementClickCount('withIcon')"
                                >ส่งข้อมูล</BcButton
                            >
                            <BcButton
                                icon="Save"
                                iconAlign="RIGHT"
                                @click="incrementClickCount('withIcon')"
                                >บันทึก</BcButton
                            >
                        </div>
                        <div class="text-sm text-slate-600">
                            จำนวนคลิก: {{ clickCounts.withIcon }}
                        </div>
                    </template>

                    <!-- Sizes Example -->
                    <template v-if="example.title === 'ขนาดต่างๆ'">
                        <div class="flex items-center gap-4">
                            <BcButton
                                size="sm"
                                @click="incrementClickCount('sizes')"
                                >ขนาดเล็ก</BcButton
                            >
                            <BcButton
                                size="md"
                                @click="incrementClickCount('sizes')"
                                >ขนาดกลาง</BcButton
                            >
                            <BcButton
                                size="lg"
                                @click="incrementClickCount('sizes')"
                                >ขนาดใหญ่</BcButton
                            >
                        </div>
                        <div class="text-sm text-slate-600">
                            จำนวนคลิก: {{ clickCounts.sizes }}
                        </div>
                    </template>

                    <!-- States Example -->
                    <template v-if="example.title === 'สถานะต่างๆ'">
                        <div class="flex gap-4">
                            <BcButton isLoading>กำลังโหลด</BcButton>
                            <BcButton disabled>ปิดการใช้งาน</BcButton>
                        </div>
                    </template>
                </div>
            </div>
        </section>

        <!-- Common Use Cases -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="FileCode" size="24" color="primary" />
                <h2 class="text-xl font-bold">รูปแบบการใช้งานทั่วไป</h2>
            </div>

            <div class="space-y-6">
                <!-- Form Submission -->
                <div class="space-y-2">
                    <h3 class="font-bold text-lg">การใช้งานในฟอร์ม</h3>
                    <div class="bg-slate-100 p-4 rounded-lg">
                        <pre class="text-sm">
                        <code>&lt;form @submit.prevent="onSubmit"&gt;
                            &lt;BcButton
                                :isLoading="isSubmitting"
                                :disabled="!isValid"
                                type="submit"
                                icon="Save"
                            &gt;
                                บันทึกข้อมูล
                            &lt;/BcButton&gt;
                            &lt;/form&gt;
                            </code>
                        </pre>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-2">
                    <h3 class="font-bold text-lg">ปุ่มดำเนินการ</h3>
                    <div class="bg-slate-100 p-4 rounded-lg">
                        <pre class="text-sm">
                            <code>&lt;div class="flex gap-2"&gt;
                            &lt;BcButton variant="primary" icon="Save"&gt;บันทึก&lt;/BcButton&gt;
                            &lt;BcButton variant="outline" icon="X"&gt;ยกเลิก&lt;/BcButton&gt;
                            &lt;/div&gt;
                            </code>
                        </pre>
                    </div>
                </div>

                <!-- Navigation -->
                <div class="space-y-2">
                    <h3 class="font-bold text-lg">ปุ่มนำทาง</h3>
                    <div class="bg-slate-100 p-4 rounded-lg">
                        <pre class="text-sm">
                            <code>
                            &lt;BcButton 
                            :to="{ name: 'products', params: { id: productId }}"
                            icon="ChevronRight"
                            iconAlign="RIGHT"
                            &gt;
                            ดูรายละเอียด
                            &lt;/BcButton&gt;
                            </code>
                        </pre>
                    </div>
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
                            ใช้ข้อความที่สั้น กระชับ และสื่อความหมายชัดเจน
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            ใช้ variant ที่เหมาะสมกับการกระทำ
                            (primaryสำหรับการกระทำหลัก, outline
                            สำหรับการกระทำรอง)
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            แสดงสถานะ loading เมื่อมีการประมวลผลที่ใช้เวลา
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            ใช้ไอคอนที่สื่อความหมายชัดเจน
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
                            หลีกเลี่ยงการใช้ข้อความที่ยาวเกินไปในปุ่ม
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="AlertTriangle" size="16" />
                            ไม่ควรวางปุ่มที่มีผลกระทบรุนแรง (เช่น ลบข้อมูล)
                            ใกล้กับปุ่มทั่วไป
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="AlertTriangle" size="16" />
                            ระวังการใช้สีที่อาจทำให้ผู้ใช้สับสนเกี่ยวกับการทำงานของปุ่ม
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

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <div
                        class="bg-blue-50 p-4 rounded-lg border border-blue-200"
                    >
                        <h3 class="text-lg font-bold text-blue-800 mb-3">
                            การรองรับแป้นพิมพ์
                        </h3>
                        <ul class="space-y-2 text-blue-800">
                            <li class="flex items-center gap-2">
                                <BcIcon name="ChevronRight" size="16" />
                                สามารถใช้ Tab เพื่อเลื่อน focus ไปยังปุ่มต่างๆ
                            </li>
                            <li class="flex items-center gap-2">
                                <BcIcon name="ChevronRight" size="16" />
                                กด Enter หรือ Space เพื่อเรียกใช้งานปุ่ม
                            </li>
                            <li class="flex items-center gap-2">
                                <BcIcon name="ChevronRight" size="16" />
                                แสดง focus indicator ที่ชัดเจนเมื่อใช้แป้นพิมพ์
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="space-y-4">
                    <div
                        class="bg-blue-50 p-4 rounded-lg border border-blue-200"
                    >
                        <h3 class="text-lg font-bold text-blue-800 mb-3">
                            การรองรับ Screen Readers
                        </h3>
                        <ul class="space-y-2 text-blue-800">
                            <li class="flex items-center gap-2">
                                <BcIcon name="ChevronRight" size="16" />
                                มี ARIA labels สำหรับปุ่มที่มีไอคอน
                            </li>
                            <li class="flex items-center gap-2">
                                <BcIcon name="ChevronRight" size="16" />
                                แจ้งสถานะ loading และ disabled อย่างเหมาะสม
                            </li>
                            <li class="flex items-center gap-2">
                                <BcIcon name="ChevronRight" size="16" />
                                รองรับการอ่านข้อความภายในปุ่มอย่างถูกต้อง
                            </li>
                        </ul>
                    </div>
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
