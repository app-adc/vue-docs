<script setup lang="ts">
import type { ColorName } from '@/ABC/bc-types'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import { computed, ref, watch } from 'vue'

// Types
type CheckboxSettings = {
    label: string
    checked: boolean
    disabled: boolean
    color: ColorName
    size: 'sm' | 'md' | 'lg'
    align: 'left' | 'right'
}

// Color options
const colorOptions: ColorName[] = [
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
]

// Size options
const sizeOptions = ['sm', 'md', 'lg'] as const

// Initial settings
const settings = ref<CheckboxSettings>({
    label: 'Checkbox Label',
    checked: false,
    disabled: false,
    color: 'primary',
    size: 'md',
    align: 'right',
})

// Generated code
const generatedCode = computed(() => {
    const props = [
        `v-model="checked"`,
        `label="${settings.value.label}"`,
        settings.value.color !== 'primary' && `color="${settings.value.color}"`,
        settings.value.size !== 'md' && `size="${settings.value.size}"`,
        settings.value.align !== 'right' && `align="${settings.value.align}"`,
        settings.value.disabled && 'disabled',
    ].filter(Boolean)

    return `<BcCheckBox\n  ${props.join('\n  ')}\n/>`
})

// Handle code copy
const copyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
}

// Watch for changes to update preview
watch(
    settings,
    (newSettings) => {
        console.log('Settings updated:', newSettings)
    },
    { deep: true }
)
</script>

<template>
    <div class="bg-white rounded-xl shadow-lg p-6">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-6">
            <BcIcon name="Layout" size="24" color="primary" />
            <h2 class="text-xl font-bold">Interactive Playground</h2>
        </div>

        <!-- Main content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Controls -->
            <div class="space-y-4">
                <!-- Label input -->
                <div>
                    <label class="text-sm font-medium text-slate-700"
                        >Label Text</label
                    >
                    <input
                        v-model="settings.label"
                        type="text"
                        class="mt-1 w-full rounded-md border border-slate-300 p-2"
                    />
                </div>

                <!-- Color select -->
                <div>
                    <label class="text-sm font-medium text-slate-700"
                        >Color</label
                    >
                    <select
                        v-model="settings.color"
                        class="mt-1 w-full rounded-md border border-slate-300 p-2"
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

                <!-- Size select -->
                <div>
                    <label class="text-sm font-medium text-slate-700"
                        >Size</label
                    >
                    <select
                        v-model="settings.size"
                        class="mt-1 w-full rounded-md border border-slate-300 p-2"
                    >
                        <option
                            v-for="size in sizeOptions"
                            :key="size"
                            :value="size"
                        >
                            {{ size }}
                        </option>
                    </select>
                </div>

                <!-- Alignment select -->
                <div>
                    <label class="text-sm font-medium text-slate-700"
                        >Label Alignment</label
                    >
                    <select
                        v-model="settings.align"
                        class="mt-1 w-full rounded-md border border-slate-300 p-2"
                    >
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                    </select>
                </div>

                <!-- Disabled toggle -->
                <div class="flex items-center gap-4">
                    <BcCheckBox
                        v-model="settings.disabled"
                        label="Disabled"
                        size="sm"
                    />
                </div>
            </div>

            <!-- Preview -->
            <div class="space-y-6">
                <!-- Live preview -->
                <div class="p-6 bg-slate-50 rounded-lg border border-slate-200">
                    <div class="flex items-center justify-center h-32">
                        <BcCheckBox
                            v-model="settings.checked"
                            v-bind="settings"
                        />
                    </div>
                </div>

                <!-- Code preview -->
                <div class="relative bg-slate-800 rounded-lg p-4">
                    <button
                        @click="copyCode"
                        class="absolute top-2 right-2 p-2 text-white hover:bg-slate-700 rounded"
                    >
                        <BcIcon name="Copy" size="20" color="white" />
                    </button>
                    <pre
                        class="text-sm text-slate-200 overflow-x-auto whitespace-pre-wrap"
                        >{{ generatedCode }}</pre
                    >
                </div>

                <!-- Tips -->
                <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div class="flex gap-2">
                        <BcIcon
                            name="Info"
                            size="20"
                            class="flex-shrink-0"
                            color="primary"
                        />
                        <p class="text-sm text-blue-700">
                            ทดลองปรับแต่งค่าต่างๆ
                            ด้านบนเพื่อดูผลลัพธ์และรับโค้ดที่พร้อมใช้งาน
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
