<script setup lang="ts">
import type { IconName } from '@/ABC/bc-types'
import BcButton from '@/ABC/components/BcButton.vue'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import BcSelect from '@/ABC/components/BcSelect.vue'
import { computed, reactive, ref } from 'vue'

// ข้อมูลตัวอย่าง
type ExampleItem = {
    id: string
    name: string
    description: string
    icon?: IconName
}

const items = ref<ExampleItem[]>([
    { id: '1', name: 'Option 1', description: 'รายการที่ 1', icon: 'User' },
    { id: '2', name: 'Option 2', description: 'รายการที่ 2', icon: 'Settings' },
    { id: '3', name: 'Option 3', description: 'รายการที่ 3', icon: 'Mail' },
    { id: '4', name: 'Option 4', description: 'รายการที่ 4', icon: 'Heart' },
])

// Playground state
const playgroundState = reactive({
    value: null as string | null,
    label: 'เลือกรายการ',
    placeholder: 'กรุณาเลือกรายการ',
    isAutoComplete: false,
    isClear: true,
    disabled: false,
    required: false,
    showIcon: true,
    customTemplate: false,
})

// Click counter for demo
const clickCount = ref(0)

const handleSelectChange = (value: string | null) => {
    playgroundState.value = value
    clickCount.value++
}

// Generate code based on current settings
const generatedCode = computed(() => {
    const lines = ['<BcSelect']

    lines.push(`  id="example-select"`)
    lines.push(`  :dataValue="selectedValue"`)
    lines.push(`  :items="items"`)
    if (playgroundState.label) lines.push(`  label="${playgroundState.label}"`)
    if (playgroundState.placeholder)
        lines.push(`  placeholder="${playgroundState.placeholder}"`)
    lines.push(`  :reduceValue="item => item.id"`)
    lines.push(`  :reduceLabel="item => item.name"`)
    if (playgroundState.isAutoComplete) lines.push(`  :isAutoComplete="true"`)
    if (!playgroundState.isClear) lines.push(`  :isClear="false"`)
    if (playgroundState.disabled) lines.push(`  disabled`)
    if (playgroundState.required) {
        lines.push(`  :rule="value => !!value"`)
        lines.push(`  :error="() => 'กรุณาเลือกรายการ'"`)
    }

    // Custom template
    if (playgroundState.customTemplate) {
        lines.push(`>`)
        lines.push(`  <template #item="{ item }">`)
        lines.push(`    <div class="flex items-center gap-2">`)
        lines.push(`      <BcIcon :name="item.icon" size="20" />`)
        lines.push(`      <div>`)
        lines.push(`        <div>{{ item.name }}</div>`)
        lines.push(
            `        <div class="text-sm text-slate-500">{{ item.description }}</div>`
        )
        lines.push(`      </div>`)
        lines.push(`    </div>`)
        lines.push(`  </template>`)
        lines.push(`</BcSelect>`)
    } else {
        lines.push(`/>`)
    }

    return lines.join('\n')
})

// Copy code to clipboard
const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
}

// Format value for display
const selectedDisplay = computed(() => {
    if (!playgroundState.value) return '(ยังไม่ได้เลือก)'
    const selected = items.value.find(
        (item) => item.id === playgroundState.value
    )
    return selected ? selected.name : playgroundState.value
})
</script>

<template>
    <div class="space-y-8">
        <!-- Preview Section -->
        <section class="bg-white rounded-xl shadow p-6">
            <div class="flex items-center gap-2 mb-4">
                <BcIcon name="Eye" size="24" color="primary" />
                <h2 class="text-xl font-bold">ดูตัวอย่าง</h2>
            </div>

            <div class="space-y-4">
                <div class="p-6 bg-slate-50 rounded-lg">
                    <BcSelect
                        id="playground-select"
                        v-bind="playgroundState"
                        :data-value="playgroundState.value"
                        :items="items"
                        :reduce-value="(item) => item.id"
                        :reduce-label="(item) => item.name"
                        :rule="
                            playgroundState.required
                                ? (value) => !!value
                                : undefined
                        "
                        :error="
                            playgroundState.required
                                ? () => 'กรุณาเลือกรายการ'
                                : undefined
                        "
                        @input="handleSelectChange"
                    >
                        <template
                            v-if="playgroundState.customTemplate"
                            #item="{ item }"
                        >
                            <div class="flex items-center gap-2">
                                <BcIcon :name="'Box'" size="20" />
                                <div>
                                    <div>{{ item.name }}</div>
                                    <div class="text-sm text-slate-500">
                                        {{ item.description }}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </BcSelect>
                </div>

                <div class="p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
                    <div class="flex items-center gap-2">
                        <BcIcon name="Info" size="16" />
                        <span> ค่าที่เลือก: {{ selectedDisplay }} </span>
                    </div>
                    <div class="mt-2 text-xs text-slate-500">
                        จำนวนครั้งที่เลือก: {{ clickCount }}
                    </div>
                </div>
            </div>
        </section>

        <!-- Controls -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Settings -->
            <section class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center gap-2 mb-6">
                    <BcIcon name="Settings" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ตั้งค่าพื้นฐาน</h2>
                </div>

                <div class="space-y-4">
                    <!-- Label -->
                    <BcInput
                        id="label-input"
                        label="Label"
                        :data-value="playgroundState.label"
                        @input="(v) => (playgroundState.label = v || '')"
                        placeholder="ใส่ข้อความ Label"
                    />

                    <!-- Placeholder -->
                    <BcInput
                        id="placeholder-input"
                        label="Placeholder"
                        :data-value="playgroundState.placeholder"
                        @input="(v) => (playgroundState.placeholder = v || '')"
                        placeholder="ใส่ข้อความ Placeholder"
                    />
                </div>
            </section>

            <!-- Additional Settings -->
            <section class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center gap-2 mb-6">
                    <BcIcon name="Sliders" size="24" color="primary" />
                    <h2 class="text-xl font-bold">ตั้งค่าเพิ่มเติม</h2>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <BcCheckBox
                        v-model="playgroundState.isAutoComplete"
                        label="เปิดใช้ Autocomplete"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="playgroundState.isClear"
                        label="แสดงปุ่มล้างข้อมูล"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="playgroundState.required"
                        label="บังคับให้เลือก"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="playgroundState.customTemplate"
                        label="ใช้ Template แบบกำหนดเอง"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="playgroundState.disabled"
                        label="ปิดการใช้งาน"
                        size="lg"
                    />
                </div>
            </section>
        </div>

        <!-- Generated Code -->
        <section class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between gap-3 mb-4">
                <div class="flex items-center gap-2">
                    <BcIcon name="Code" size="24" color="primary" />
                    <h2 class="text-xl font-bold">โค้ดตัวอย่าง</h2>
                </div>
                <BcButton
                    @click="handleCopyCode"
                    variant="outline"
                    size="sm"
                    icon="Copy"
                >
                    คัดลอกโค้ด
                </BcButton>
            </div>
            <pre
                class="bg-slate-800 text-slate-50 p-4 rounded-lg overflow-x-auto"
                >{{ generatedCode }}</pre
            >
        </section>

        <!-- Features Section -->
        <section class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center gap-2 mb-6">
                <BcIcon name="Star" size="24" color="primary" />
                <h2 class="text-xl font-bold">ความสามารถที่รองรับ</h2>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-slate-50 p-4 rounded-lg">
                    <h3
                        class="font-medium text-slate-800 mb-2 flex items-center gap-2"
                    >
                        <BcIcon name="Search" size="20" />
                        การค้นหาอัตโนมัติ
                    </h3>
                    <p class="text-sm text-slate-600">
                        รองรับการค้นหาข้อมูลแบบอัตโนมัติ พร้อมการกรองข้อมูลแบบ
                        real-time
                    </p>
                </div>

                <div class="bg-slate-50 p-4 rounded-lg">
                    <h3
                        class="font-medium text-slate-800 mb-2 flex items-center gap-2"
                    >
                        <BcIcon name="KeyRound" size="20" />
                        การนำทางด้วยคีย์บอร์ด
                    </h3>
                    <p class="text-sm text-slate-600">
                        รองรับการใช้งานผ่านคีย์บอร์ด เช่น ปุ่มลูกศร และ Enter
                    </p>
                </div>

                <div class="bg-slate-50 p-4 rounded-lg">
                    <h3
                        class="font-medium text-slate-800 mb-2 flex items-center gap-2"
                    >
                        <BcIcon name="Layout" size="20" />
                        การปรับแต่ง Template
                    </h3>
                    <p class="text-sm text-slate-600">
                        สามารถกำหนดรูปแบบการแสดงผลของแต่ละรายการได้อย่างอิสระ
                    </p>
                </div>

                <div class="bg-slate-50 p-4 rounded-lg">
                    <h3
                        class="font-medium text-slate-800 mb-2 flex items-center gap-2"
                    >
                        <BcIcon name="ShieldCheck" size="20" />
                        การตรวจสอบความถูกต้อง
                    </h3>
                    <p class="text-sm text-slate-600">
                        รองรับการตรวจสอบความถูกต้องของข้อมูลที่เลือก
                        พร้อมแสดงข้อความแจ้งเตือน
                    </p>
                </div>
            </div>
        </section>

        <!-- Implementation Tips -->
        <section class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center gap-2 mb-6">
                <BcIcon name="Lightbulb" size="24" color="primary" />
                <h2 class="text-xl font-bold">เคล็ดลับการใช้งาน</h2>
            </div>

            <div class="grid gap-4">
                <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <BcIcon
                        name="Info"
                        size="20"
                        class="text-blue-600 flex-shrink-0"
                    />
                    <div>
                        <h3 class="font-medium text-blue-800">
                            การใช้ Generic Types
                        </h3>
                        <p class="text-sm text-blue-700 mt-1">
                            ใช้ Generic Type
                            เพื่อกำหนดประเภทข้อมูลที่ถูกต้องและได้รับการตรวจสอบ
                            type safety
                        </p>
                    </div>
                </div>

                <div class="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <BcIcon
                        name="Check"
                        size="20"
                        class="text-green-600 flex-shrink-0"
                    />
                    <div>
                        <h3 class="font-medium text-green-800">
                            การจัดการข้อมูล
                        </h3>
                        <p class="text-sm text-green-700 mt-1">
                            ใช้ reduce functions
                            เพื่อแปลงข้อมูลให้อยู่ในรูปแบบที่ต้องการและแยกการแสดงผลออกจากค่าที่ใช้งานจริง
                        </p>
                    </div>
                </div>

                <div class="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                    <BcIcon
                        name="AlertTriangle"
                        size="20"
                        class="text-yellow-600 flex-shrink-0"
                    />
                    <div>
                        <h3 class="font-medium text-yellow-800">
                            การจัดการ Performance
                        </h3>
                        <p class="text-sm text-yellow-700 mt-1">
                            ควรจำกัดจำนวนผลลัพธ์การค้นหาและใช้ debounce
                            เมื่อมีการค้นหาแบบ real-time
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}

.bg-slate-800 :deep(.bg-white) {
    --tw-bg-opacity: 0.9;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-slate-800 :deep(.bg-white:hover) {
    --tw-bg-opacity: 1;
}
</style>
