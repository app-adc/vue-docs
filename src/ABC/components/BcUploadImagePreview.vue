<script setup lang="ts">
import BcIcon from '@/ABC/components/BcIcon.vue'
import { computed, ref } from 'vue'

interface Props {
    /**
     * ค่ารูปภาพที่เลือก (base64 หรือ URL)
     */
    modelValue?: string | null
    /**
     * ปิดการใช้งาน
     */
    disabled?: boolean
    /**
     * ขนาดของ preview
     */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
    /**
     * ประเภทไฟล์ที่ยอมรับ
     */
    accept?: string[]
    /**
     * ข้อความที่แสดงตอนยังไม่มีการเลือกรูป
     */
    placeholder?: string
    /**
     * แสดงปุ่มลบ
     */
    clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    size: 'lg',
    accept: () => ['image/jpeg', 'image/png'],
    placeholder: 'อัพโหลดรูป',
    clearable: true,
})

// Events
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void
    (e: 'change', file: File): void
    (e: 'clear'): void
}>()

// State
const isDragging = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

// Computed
const containerSize = computed(
    () =>
        ({
            sm: 'w-24 h-24',
            md: 'w-32 h-32',
            lg: 'w-40 h-40',
            xl: 'w-48 h-48',
            xxl: 'w-56 h-56',
        }[props.size])
)

const containerClasses = computed(() => [
    containerSize.value,
    'relative rounded-lg border-2 border-dashed transition-all duration-200',
    isDragging.value ? 'border-primary bg-primary/5' : 'border-slate-300',
    !props.disabled && 'cursor-pointer hover:border-primary',
    props.disabled && 'opacity-50 cursor-not-allowed',
])

// Methods
const handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]

    if (!file || !props.accept.includes(file.type)) return

    const reader = new FileReader()
    reader.onload = () => {
        const result = reader.result as string
        emit('update:modelValue', result)
        emit('change', file)
    }
    reader.readAsDataURL(file)
}

const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    isDragging.value = false

    const file = e.dataTransfer?.files[0]
    if (!file || !props.accept.includes(file.type)) return

    const reader = new FileReader()
    reader.onload = () => {
        const result = reader.result as string
        emit('update:modelValue', result)
        emit('change', file)
    }
    reader.readAsDataURL(file)
}

const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    if (!props.disabled) {
        isDragging.value = true
    }
}

const handleDragLeave = () => {
    isDragging.value = false
}

const clearImage = () => {
    emit('update:modelValue', null)
    emit('clear')
    if (inputRef.value) {
        inputRef.value.value = ''
    }
}

const triggerFileInput = () => {
    if (!props.disabled && inputRef.value) {
        inputRef.value.click()
    }
}
</script>

<template>
    <div
        :class="containerClasses"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
        @click="triggerFileInput"
    >
        <!-- Preview Image -->
        <template v-if="modelValue">
            <div class="relative w-full h-full">
                <img
                    :src="modelValue"
                    alt="Preview"
                    class="w-full h-full object-cover rounded-lg"
                />

                <!-- Clear Button -->
                <button
                    v-if="clearable && !disabled"
                    @click.stop="clearImage"
                    class="absolute -top-2 -right-2 px-1 bg-white rounded-full shadow-lg hover:bg-slate-100"
                >
                    <BcIcon name="X" size="16" class="items-center py-1" />
                </button>
            </div>
        </template>

        <!-- Upload Placeholder -->
        <template v-else>
            <div
                class="flex flex-col items-center justify-center w-full h-full"
            >
                <input
                    ref="inputRef"
                    type="file"
                    class="hidden"
                    :accept="accept.join(',')"
                    @change="handleFileChange"
                    :disabled="disabled"
                />
                <BcIcon name="Image" size="24" class="mb-2 text-slate-400" />
                <span class="text-sm text-slate-600 text-center px-2">
                    {{ placeholder }}
                </span>
            </div>
        </template>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
