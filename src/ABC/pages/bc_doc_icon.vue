<script setup lang="ts">
import type { ColorName, IconName } from '@/ABC/bc-types'
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue' // เพิ่ม BcInput
import BcToast from '@/ABC/components/BcToast.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { colors } from '@/ABC/ui/bc-colors'
import { icons } from '@/ABC/ui/bc-icons'
import { computed, reactive, ref } from 'vue' // เพิ่ม computed

const showToast = ref(false)
const toastMessage = ref('')

// ฟังก์ชันคัดลอกชื่อไอคอน
const copyIconName = (iconName: string) => {
    navigator.clipboard.writeText(iconName)
    toastMessage.value = `คัดลอก ${iconName} แล้ว`
    showToast.value = true
}

// Props ที่รองรับทั้งหมด
const propsData = [
    {
        prop: 'name',
        type: 'IconName',
        required: true,
        default: '-',
        description: 'ชื่อไอคอนที่ต้องการแสดง',
    },
    {
        prop: 'size',
        type: 'number | string',
        required: false,
        default: '24',
        description: 'ขนาดของไอคอน',
    },
    {
        prop: 'color',
        type: 'ColorName',
        required: false,
        default: 'primary',
        description: 'สีของไอคอน',
    },
    {
        prop: 'hoverColor',
        type: 'ColorName',
        required: false,
        default: 'undefined',
        description: 'สีของไอคอนเมื่อ hover',
    },
    {
        prop: 'strokeWidth',
        type: 'number',
        required: false,
        default: '2',
        description: 'ความหนาของเส้นไอคอน',
    },
    {
        prop: 'class',
        type: 'string',
        required: false,
        default: "''",
        description: 'Custom CSS classes',
    },
]

// ข้อมูลสำหรับ Interactive Playground
const playgroundState = reactive({
    name: 'Heart' as IconName,
    size: 24,
    color: 'primary' as ColorName,
    hoverColor: undefined as ColorName | undefined,
    strokeWidth: 2,
})

// แปลง icons object เป็น array สำหรับแสดงในตัวอย่าง
const iconList = Object.keys(icons) as IconName[]
const colorOptions = Object.keys(colors) as ColorName[]

// ฟังก์ชันสร้างโค้ดตัวอย่าง
const generateCode = () => {
    const lines = ['<BcIcon']
    lines.push(`  name="${playgroundState.name}"`)

    if (playgroundState.size !== 24) {
        lines.push(`  size={${playgroundState.size}}`)
    }

    if (playgroundState.color !== 'primary') {
        lines.push(`  color="${playgroundState.color}"`)
    }

    if (playgroundState.hoverColor) {
        lines.push(`  hoverColor="${playgroundState.hoverColor}"`)
    }

    if (playgroundState.strokeWidth !== 2) {
        lines.push(`  strokeWidth={${playgroundState.strokeWidth}}`)
    }

    lines.push('/>')
    return lines.join('\n')
}

// คัดลอกโค้ด
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
}

// ค้นหาไอคอน
const searchTerm = ref('')
const filteredIcons = computed(() => {
    if (!searchTerm.value) return iconList
    return iconList.filter((icon) =>
        icon.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
})

// handlers สำหรับ BcInput
const handleSearchInput = (value: string | null) => {
    searchTerm.value = value || ''
}
</script>

<template>
    <BcLayout
        title="Icon Component"
        subtitle="คอมโพเนนต์สำหรับแสดงไอคอนที่รองรับการปรับแต่งรูปแบบได้หลากหลาย"
        icon="Palette"
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

        <!-- Interactive Playground -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="PenTool" size="24" color="primary" />
                <div>
                    <h2 class="text-xl font-bold">Interactive Playground</h2>
                    <p class="text-sm text-slate-600 mt-1">
                        ทดลองปรับแต่งค่า props ต่างๆ
                        และดูผลลัพธ์ที่เกิดขึ้นกับไอคอน
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Preview Section -->
                <div class="space-y-6">
                    <div
                        class="bg-slate-50 h-40 rounded-lg flex items-center justify-center"
                    >
                        <BcIcon
                            v-bind="playgroundState"
                            class="transition-all duration-200"
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

                <!-- Controls Section -->
                <div class="space-y-4">
                    <!-- Icon Selection -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">เลือกไอคอน</label>
                        <select
                            v-model="playgroundState.name"
                            class="w-full p-2 border rounded-lg"
                        >
                            <option
                                v-for="icon in iconList"
                                :key="icon"
                                :value="icon"
                            >
                                {{ icon }}
                            </option>
                        </select>
                    </div>

                    <!-- Size Control -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">ขนาด</label>
                        <input
                            v-model.number="playgroundState.size"
                            type="range"
                            min="12"
                            max="48"
                            step="2"
                            class="w-full"
                        />
                        <div class="text-sm text-slate-600">
                            {{ playgroundState.size }}px
                        </div>
                    </div>

                    <!-- Color Selection -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">สี</label>
                        <select
                            v-model="playgroundState.color"
                            class="w-full p-2 border rounded-lg"
                        >
                            <option
                                v-for="color in colorOptions"
                                :key="color"
                                :value="color"
                            >
                                {{ color }}
                            </option>
                        </select>
                    </div>

                    <!-- Hover Color Selection -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium">สี Hover</label>
                        <select
                            v-model="playgroundState.hoverColor"
                            class="w-full p-2 border rounded-lg"
                        >
                            <option value="">ไม่กำหนด</option>
                            <option
                                v-for="color in colorOptions"
                                :key="color"
                                :value="color"
                            >
                                {{ color }}
                            </option>
                        </select>
                    </div>

                    <!-- Stroke Width Control -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium"
                            >ความหนาของเส้น</label
                        >
                        <input
                            v-model.number="playgroundState.strokeWidth"
                            type="range"
                            min="1"
                            max="4"
                            step="0.5"
                            class="w-full"
                        />
                        <div class="text-sm text-slate-600">
                            {{ playgroundState.strokeWidth }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Icon Gallery -->
        <section class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between gap-3 mb-6">
                <div class="flex items-center gap-3">
                    <BcIcon name="Layout" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ไอคอนที่มีให้ใช้งาน</h2>
                </div>
                <div class="relative w-3/4">
                    <BcInput
                        id="icon-search"
                        :data-value="searchTerm"
                        placeholder="ค้นหาไอคอน..."
                        icon="Search"
                        @input="handleSearchInput"
                    />
                </div>
            </div>

            <!-- Icon Grid -->
            <div
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
                <div
                    v-for="icon in filteredIcons"
                    :key="icon"
                    class="flex flex-col items-center p-4 border rounded-lg hover:border-primary hover:bg-slate-50 transition-all cursor-pointer group"
                    @click="
                        () => {
                            playgroundState.name = icon
                            copyIconName(icon)
                        }
                    "
                >
                    <div class="relative">
                        <BcIcon
                            :name="icon"
                            size="24"
                            class="mb-2 group-hover:scale-110 transition-transform"
                        />
                    </div>
                    <span class="text-xs text-center truncate w-full">{{
                        icon
                    }}</span>
                </div>
            </div>
        </section>

        <!-- Tips -->
        <section class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Info" size="24" color="primary" />
                <h2 class="text-xl font-bold">คำแนะนำการใช้งาน</h2>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 class="font-bold text-blue-800 mb-2">
                        การใช้งานที่แนะนำ
                    </h3>
                    <ul class="space-y-2 text-blue-700">
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            เลือกขนาดไอคอนให้เหมาะสมกับพื้นที่การใช้งาน
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            ใช้สีที่สอดคล้องกับ theme ของแอปพลิเคชัน
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="Check" size="16" />
                            ใช้ความหนาของเส้นที่เหมาะสมกับขนาดไอคอน
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
                            หลีกเลี่ยงการใช้ไอคอนขนาดเล็กเกินไปจนอ่านยาก
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="AlertTriangle" size="16" />
                            ระวังการใช้สีที่มี contrast ต่ำเกินไป
                        </li>
                        <li class="flex items-center gap-2">
                            <BcIcon name="AlertTriangle" size="16" />
                            ไม่ควรใช้ความหนาของเส้นมากเกินไปกับไอคอนขนาดเล็ก
                        </li>
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

/* Styling for range inputs */
input[type='range'] {
    appearance: none;
    -webkit-appearance: none;
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
    background: var(--primary);
    transform: scale(1.1);
}

input[type='range']::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border: 0;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    transition: all 0.15s ease-in-out;
}

input[type='range']::-moz-range-thumb:hover {
    background: var(--primary);
    transform: scale(1.1);
}

/* Transition for icon hover */
.icon-preview {
    transition: transform 0.2s ease-in-out;
}

.icon-preview:hover {
    transform: scale(1.1);
}

/* Select styling */
select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
}

/* Grid layout improvements */
.grid {
    grid-gap: 1rem;
}

/* Animation for copied feedback */
@keyframes copied {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-4px);
    }
}

.copied {
    animation: copied 0.5s ease-in-out;
}
</style>
