<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import type { IconName } from '@/ABC/bc-types'

type ToastVariant = 'success' | 'error' | 'warning' | 'info'
type Position =
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center'

type ToastProps = {
    /**
     * Controls toast visibility
     */
    modelValue: boolean
    /**
     * Toast message content
     */
    message: string
    /**
     * Toast variant/type
     * @default 'info'
     */
    variant?: ToastVariant
    /**
     * Auto-dismiss duration in milliseconds
     * @default 3000
     */
    duration?: number
    /**
     * Toast position on screen
     * @default 'top-right'
     */
    position?: Position
    /**
     * Show close button
     * @default true
     */
    dismissible?: boolean
}

const props = withDefaults(defineProps<ToastProps>(), {
    variant: 'success',
    duration: 2000,
    position: 'top-right',
    dismissible: true,
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'close'): void
}>()

// State
const isVisible = ref(false)
const timer = ref<number>()

// Computed
const toastIcon = computed((): IconName => {
    switch (props.variant) {
        case 'success':
            return 'Check'
        case 'error':
            return 'XCircle'
        case 'warning':
            return 'TriangleAlert'
        default:
            return 'Info'
    }
})

const toastClasses = computed(() => ({
    'bc-toast': true,
    [`bc-toast--${props.variant}`]: true,
    [`bc-toast--${props.position}`]: true,
    'bc-toast--show': isVisible.value,
}))

const iconColor = computed(() => {
    switch (props.variant) {
        case 'success':
            return 'success'
        case 'error':
            return 'error'
        case 'warning':
            return 'warning'
        default:
            return 'primary'
    }
})

// Methods
const startTimer = () => {
    if (props.duration) {
        timer.value = window.setTimeout(() => {
            closeToast()
        }, props.duration)
    }
}

const clearTimer = () => {
    if (timer.value) {
        clearTimeout(timer.value)
    }
}

const closeToast = () => {
    isVisible.value = false
    clearTimer()
    emit('update:modelValue', false)
    emit('close')
}

// Lifecycle
onMounted(() => {
    if (props.modelValue) {
        isVisible.value = true
        startTimer()
    }
})

onUnmounted(() => {
    clearTimer()
})

// Watch
watch(
    () => props.modelValue,
    (newVal) => {
        if (newVal) {
            isVisible.value = true
            startTimer()
        } else {
            isVisible.value = false
            clearTimer()
        }
    }
)
</script>

<template>
    <Transition name="toast">
        <div
            v-if="isVisible"
            :class="toastClasses"
            role="alert"
            aria-live="polite"
        >
            <div class="bc-toast__content">
                <BcIcon
                    :name="toastIcon"
                    :color="iconColor"
                    size="20"
                    class="bc-toast__icon"
                />
                <span class="bc-toast__message">{{ message }}</span>
            </div>
            <button
                v-if="dismissible"
                class="bc-toast__close"
                @click="closeToast"
                aria-label="Close toast"
            >
                <BcIcon name="X" size="16" />
            </button>
        </div>
    </Transition>
</template>

<style scoped>
.bc-toast {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    max-width: 400px;
    padding: 0.75rem 1rem;
    background: white;
    border-radius: var(--borderRadius);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    z-index: 9999;
}

.bc-toast__content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.bc-toast__message {
    font-size: 0.875rem;
    color: var(--color);
}

.bc-toast__close {
    padding: 0.25rem;
    margin-left: 0.5rem;
    border-radius: var(--borderRadius);
    color: var(--icon);
    transition: all 150ms ease-in-out;
}

.bc-toast__close:hover {
    background-color: var(--disabled);
}

/* Variants */
.bc-toast--success {
    border-left: 4px solid var(--success);
}

.bc-toast--error {
    border-left: 4px solid var(--error);
}

.bc-toast--warning {
    border-left: 4px solid var(--warning);
}

.bc-toast--info {
    border-left: 4px solid var(--primary);
}

/* Positions */
.bc-toast--top-right {
    top: 1rem;
    right: 1rem;
}

.bc-toast--top-left {
    top: 1rem;
    left: 1rem;
}

.bc-toast--bottom-right {
    bottom: 1rem;
    right: 1rem;
}

.bc-toast--bottom-left {
    bottom: 1rem;
    left: 1rem;
}

.bc-toast--top-center {
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
}

.bc-toast--bottom-center {
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
}

/* Transitions */
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(-1rem);
}
</style>
