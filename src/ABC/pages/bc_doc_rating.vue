<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import BcRating from '@/ABC/components/BcRating.vue'
import BcToast from '@/ABC/components/BcToast.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { computed, reactive, ref } from 'vue'
import BcSelect from '../components/BcSelect.vue'

// Toast state
const showToast = ref(false)
const toastMessage = ref('')

// Playground state
const playgroundState = reactive({
    value: 0,
    size: 24,
    maxRating: 5,
    label: 'คะแนนการใช้งาน',
    labelPosition: 'top' as 'top' | 'bottom',
    showScore: true,
    disabled: false,
    allowHalf: false,
})

// Documentation data
const propsData = [
    {
        prop: 'dataValue', // เปลี่ยนจาก modelValue เป็น dataValue
        type: 'number',
        required: true,
        default: '0',
        description: 'คะแนนที่เลือก (0-5)',
    },
    {
        prop: 'maxRating',
        type: 'number',
        required: false,
        default: '5',
        description: 'จำนวนดาวทั้งหมด',
    },
    {
        prop: 'size',
        type: 'number',
        required: false,
        default: '24',
        description: 'ขนาดของดาว (pixel)',
    },
    {
        prop: 'label',
        type: 'string',
        required: false,
        default: 'undefined',
        description: 'ข้อความกำกับ',
    },
    {
        prop: 'labelPosition',
        type: "'top' | 'bottom'",
        required: false,
        default: "'top'",
        description: 'ตำแหน่งของ label',
    },
    {
        prop: 'showScore',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'แสดงคะแนนตัวเลข',
    },
    {
        prop: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'ปิดการใช้งาน',
    },
    {
        prop: 'allowHalf',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'อนุญาตให้เลือกคะแนนแบบ .5',
    },
]

// Events documentation
const eventsData = [
    {
        event: '@input', // เปลี่ยนจาก @update:modelValue เป็น @input
        payload: 'number',
        description: 'อัพเดตค่าคะแนนที่เลือก',
    },
]

// Examples
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'แสดงดาวให้คะแนนแบบพื้นฐาน',
        code: `<BcRating 
    :data-value="rating"
    @input="value => rating = value"
    label="ให้คะแนน"
/>`,
    },
    {
        title: 'แสดงคะแนนและปรับขนาด',
        description: 'แสดงคะแนนตัวเลขและปรับขนาดของดาว',
        code: `<BcRating 
    :data-value="rating"
    @input="value => rating = value"
    :size="32"
    show-score
    label="ให้คะแนน"
/>`,
    },
    {
        title: 'อนุญาตให้เลือกครึ่งดาว',
        description: 'สามารถเลือกคะแนนแบบ .5 ได้',
        code: `<BcRating 
    :data-value="rating"
    @input="value => rating = value"
    allow-half
    show-score
    label="ให้คะแนน"
/>`,
    },
]

// Example states
const exampleRatings = ref({
    basic: 0,
    withScore: 0,
    halfStar: 0,
})

// Generate code based on current settings
const generatedCode = computed(() => {
    const lines = ['<BcRating']

    lines.push(`  :data-value="rating"`)
    lines.push(`  @input="value => rating = value"`)
    if (playgroundState.label) lines.push(`  label="${playgroundState.label}"`)
    if (playgroundState.size !== 24)
        lines.push(`  :size="${playgroundState.size}"`)
    if (playgroundState.maxRating !== 5)
        lines.push(`  :maxRating="${playgroundState.maxRating}"`)
    if (playgroundState.labelPosition !== 'top')
        lines.push(`  labelPosition="${playgroundState.labelPosition}"`)
    if (playgroundState.showScore) lines.push(`  showScore`)
    if (playgroundState.allowHalf) lines.push(`  allowHalf`)
    if (playgroundState.disabled) lines.push(`  disabled`)

    lines.push('/>')

    return lines.join('\n')
})

// Handle copy code
const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
    toastMessage.value = 'คัดลอกโค้ดแล้ว!'
    showToast.value = true
}

const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toastMessage.value = 'คัดลอกโค้ดแล้ว!'
    showToast.value = true
}

// Playground methods
const handleRatingChange = (value: number) => {
    playgroundState.value = value
}

// Size options for select

// Label position options
const positionOptions = [
    { label: 'บน', value: 'top' },
    { label: 'ล่าง', value: 'bottom' },
]

// Max rating options
</script>

<template>
    <BcLayout
        title="Rating (ดาวให้คะแนน)"
        subtitle="คอมโพเนนต์สำหรับแสดงและรับคะแนนในรูปแบบดาว พร้อมการแสดงผลที่ยืดหยุ่น"
        icon="Star"
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
                        <tr class="bg-table text-slate-700">
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

        <!-- Interactive Playground -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="PenTool" size="24" color="primary" />
                <div>
                    <h2 class="text-xl font-bold">ทดลองใช้งาน Rating</h2>
                    <p class="text-sm text-slate-600 mt-1">
                        ทดลองปรับแต่งค่า props ต่างๆ และดูผลลัพธ์ที่เกิดขึ้น
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Preview Section -->
                <div class="space-y-6">
                    <div class="p-6 bg-slate-50 rounded-lg">
                        <div class="flex items-center justify-center h-32">
                            <BcRating
                                :data-value="playgroundState.value"
                                @input="handleRatingChange"
                                :size="playgroundState.size"
                                :max-rating="playgroundState.maxRating"
                                :label="playgroundState.label"
                                :label-position="playgroundState.labelPosition"
                                :show-score="playgroundState.showScore"
                                :allow-half="playgroundState.allowHalf"
                                :disabled="playgroundState.disabled"
                            />
                        </div>
                    </div>

                    <!-- Code preview -->
                    <div class="relative bg-slate-800 rounded-lg p-4">
                        <BcButton
                            @click="handleCopyCode"
                            variant="white"
                            icon="Copy"
                            class="!absolute top-3 right-3"
                            size="sm"
                        />
                        <pre class="text-sm text-slate-200 overflow-x-auto">{{
                            generatedCode
                        }}</pre>
                    </div>
                </div>

                <!-- Controls Section -->
                <div class="space-y-4">
                    <!-- Size -->
                    <div>
                        <!-- <label class="text-sm font-medium">ขนาดของดาว</label> -->
                        <BcInput
                            label="ขนาดของดาว"
                            id="size"
                            :data-value="playgroundState.size"
                            placeholder="ใส่ขนาดของดาว"
                            :formats="['number']"
                            @input="value => playgroundState.size = +value!"
                        />
                    </div>

                    <!-- Max Rating -->
                    <div>
                        <BcInput
                            id="maxRating"
                            label="จำนวนดาวทั้งหมด"
                            @input="value => playgroundState.maxRating = +value!"
                            :data-value="playgroundState.maxRating"
                            placeholder="ใส่จำนวนดาวทั้งหมด"
                            :formats="['number']"
                        />
                    </div>

                    <!-- Label -->
                    <div>
                        <BcInput
                            id="label"
                            label="ข้อความกำกับ (Label)"
                            :data-value="playgroundState.label"
                            @input="
                                (value) => (playgroundState.label = value || '')
                            "
                            placeholder="ใส่ข้อความ Label"
                        />
                    </div>

                    <!-- Label Position -->
                    <div>
                        <BcSelect
                            label="ตำแหน่งของ Label"
                            id="labelPosition"
                            :items="positionOptions"
                            :data-value="playgroundState.labelPosition"
                            :reduceValue="(item) => item.value"
                            :reduceLabel="(item) => item.label"
                            @selected="
                                (value) =>
                                    (playgroundState.labelPosition =
                                        value.value as 'top' | 'bottom')
                            "
                        />
                    </div>

                    <!-- Toggles -->
                    <div class="flex flex-col gap-3 pt-4">
                        <BcCheckBox
                            v-model="playgroundState.showScore"
                            label="แสดงคะแนนตัวเลข"
                        />
                        <BcCheckBox
                            v-model="playgroundState.allowHalf"
                            label="อนุญาตให้เลือกครึ่งดาว"
                        />
                        <BcCheckBox
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

                <!-- Code Example -->
                <div class="relative bg-slate-800 rounded-lg p-4 mb-6">
                    <button
                        @click="copyCode(example.code)"
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
                        <BcRating
                            :data-value="exampleRatings.basic"
                            @input="(value) => (exampleRatings.basic = value)"
                            label="ให้คะแนน"
                        />
                    </template>

                    <template v-if="example.title === 'แสดงคะแนนและปรับขนาด'">
                        <BcRating
                            :data-value="exampleRatings.withScore"
                            @input="
                                (value) => (exampleRatings.withScore = value)
                            "
                            :size="32"
                            show-score
                            label="ให้คะแนน"
                        />
                    </template>

                    <template v-if="example.title === 'อนุญาตให้เลือกครึ่งดาว'">
                        <BcRating
                            :data-value="exampleRatings.halfStar"
                            @input="
                                (value) => (exampleRatings.halfStar = value)
                            "
                            allow-half
                            show-score
                            label="ให้คะแนน"
                        />
                    </template>
                </div>
            </div>
        </section>

        <!-- Best Practices -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Lightbulb" size="24" color="primary" />
                <h2 class="text-xl font-bold">แนวทางการใช้งานที่แนะนำ</h2>
            </div>

            <div class="space-y-4">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 class="text-lg font-bold mb-2 text-blue-800">
                        คำแนะนำการใช้งาน
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-blue-800">
                        <li>
                            ควรมี label ที่ชัดเจนเพื่อบอกว่ากำลังให้คะแนนอะไร
                        </li>
                        <li>ควรพิจารณาการแสดงคะแนนตัวเลขตามความเหมาะสม</li>
                        <li>ควรใช้ขนาดที่เหมาะสมกับพื้นที่แสดงผล</li>
                        <li>
                            พิจารณาการใช้ half star
                            ตามความละเอียดของคะแนนที่ต้องการ
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
                        <li>ไม่ควรใช้จำนวนดาวมากเกินไปจนทำให้ผู้ใช้สับสน</li>
                        <li>
                            ระวังการใช้งานบน mobile ที่อาจต้องการขนาดที่ใหญ่ขึ้น
                        </li>
                        <li>ควรมี feedback ที่ชัดเจนเมื่อผู้ใช้ให้คะแนน</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Toast Notification -->
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

.list-disc {
    list-style-type: disc;
    padding-left: 1rem;
}

.list-inside {
    list-style-position: inside;
}

.bg-slate-800 :deep(.bg-white) {
    --tw-bg-opacity: 0.9;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-slate-800 :deep(.bg-white:hover) {
    --tw-bg-opacity: 1;
}
</style>
