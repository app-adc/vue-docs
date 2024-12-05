<script setup lang="ts">
import type { IconName } from '@/ABC/bc-types'
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import { computed, onMounted, ref, watch } from 'vue'

/**
 * ประเภทข้อมูลสำหรับไฟล์
 */
type FileState = {
    id: string | number | null
    file: File | string
    image: string
    isActive: boolean
}

/**
 * Props สำหรับ BcFileUpload component
 */
type PropsBcFileUpload = {
    /**
     * ID สำหรับอ้างอิงใน DOM
     */
    id?: string
    /**
     * ค่าของ input - อาร์เรย์ของไฟล์
     */
    dataValue?: FileState[]
    /**
     * ป้ายกำกับ input
     */
    label?: string
    /**
     * ข้อความที่แสดงเมื่อยังไม่มีการเลือกไฟล์
     */
    placeholder?: string
    /**
     * ประเภทไฟล์ที่ยอมรับ
     */
    accept?: string[]
    /**
     * อนุญาตให้เลือกไฟล์หลายไฟล์
     */
    multiple?: boolean
    /**
     * ฟังก์ชันตรวจสอบความถูกต้อง
     */
    rule?: (value: FileState[]) => boolean
    /**
     * ฟังก์ชันสำหรับข้อความแสดงข้อผิดพลาด
     */
    error?: (value: FileState[]) => string
    /**
     * ไอคอนที่กำหนดเอง
     */
    icon?: IconName
    /**
     * ปิดการใช้งาน
     */
    disabled?: boolean
    /**
     * แสดง input สำหรับเลือกไฟล์
     */
    showInput?: boolean
}

const props = withDefaults(defineProps<PropsBcFileUpload>(), {
    accept: () => ['.pdf', '.jpeg', '.png'],
    label: '',
    placeholder: 'เลือกไฟล์ (.PDF, .JPEG, .PNG)',
    multiple: true,
    disabled: false,
    showInput: true,
    icon: 'File',
})

const emit = defineEmits<{
    (e: 'change', value: FileState[]): void
}>()

// Refs
const inputRef = ref<HTMLInputElement | null>(null)
const wrapperRef = ref<HTMLDivElement | null>(null)
const files = ref<FileState[]>([])
const isFocus = ref(false)

// Computed
const activeFiles = computed(() => files.value.filter((f) => f.isActive))

const isInvalid = computed((): boolean => {
    if (!props.rule) return false
    return !props.rule(files.value)
})

const errorMessage = computed((): string => {
    if (!props.error) return 'กรุณาเลือกไฟล์'
    return props.error(files.value)
})

// Methods
function handleFileRemove(file: FileState) {
    file.isActive = false
    emit('change', files.value)
}

function handleFileSelect(e: Event) {
    const target = e.target as HTMLInputElement
    const selectedFiles = target.files

    if (selectedFiles) {
        Array.from(selectedFiles).forEach((file) => {
            const fileState: FileState = {
                id: null,
                file,
                image: URL.createObjectURL(file),
                isActive: true,
            }
            files.value.push(fileState)
        })

        emit('change', files.value)
    }
}

function handlePreview(url: string): void {
    window.open(url)
}

function formatFileName(file: FileState): { name: string } {
    const name =
        typeof file.file === 'string'
            ? file.file.substring(file.file.lastIndexOf('/') + 1)
            : file.file.name
    return { name }
}

// Watchers
watch(
    () => props.dataValue,
    (newValue) => {
        if (newValue) files.value = [...newValue]
    },
    { immediate: true }
)

// Lifecycle
onMounted(() => {
    // Initialize if needed
})
</script>

<template>
    <div role="form-container">
        <label v-if="label" :for="id" role="form-label" class="font-bold">
            {{ label }}
            <span v-if="rule" class="text-error">*</span>
        </label>

        <div
            ref="wrapperRef"
            role="form-wrapper"
            v-show="showInput"
            class="mt-1"
        >
            <div
                role="form-input-container"
                class="relative flex items-center border rounded-md h-10"
                :class="[
                    isInvalid && isFocus ? 'border-error' : 'border-border',
                    disabled
                        ? 'bg-disabled cursor-not-allowed'
                        : 'cursor-pointer bg-white',
                ]"
            >
                <input
                    ref="inputRef"
                    type="file"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    :multiple="multiple"
                    :accept="accept.join(',')"
                    :disabled="disabled"
                    @focus="isFocus = true"
                    @blur="isFocus = false"
                    @input="handleFileSelect"
                    :data-cy="id"
                />

                <div class="flex items-center justify-between w-full py-2">
                    <span class="text-sm text-slate-400 pl-4">{{
                        placeholder
                    }}</span>
                    <div class="bg-secondary p-[6px] rounded-sm">
                        <BcIcon
                            :name="icon"
                            size="20"
                            :color="isInvalid ? 'error' : 'primary'"
                        />
                    </div>
                </div>
            </div>

            <span
                v-if="isInvalid && isFocus"
                role="form-text-error"
                class="text-sm text-error mt-1"
            >
                {{ errorMessage }}
            </span>
        </div>

        <div v-if="activeFiles.length > 0" class="mt-3 space-y-2">
            <div
                v-for="(file, index) in activeFiles"
                :key="index"
                class="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
            >
                <button
                    class="text-sm text-primary underline hover:opacity-80"
                    @click="handlePreview(file.image)"
                >
                    {{ formatFileName(file).name }}
                </button>

                <BcButton
                    v-if="!disabled"
                    variant="link"
                    icon="X"
                    @click="handleFileRemove(file)"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(input[type='file']) {
    cursor: pointer;
}

:deep(input[type='file']:disabled) {
    cursor: not-allowed;
}

@keyframes shake {
    0%,
    100% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(4px);
    }
    75% {
        transform: translateX(-4px);
    }
}

[role='form-container']:has([aria-invalid='true']) {
    animation: shake 0.3s;
}
</style>
