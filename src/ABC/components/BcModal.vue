<script setup lang="ts">
import { PropsModal } from '@/ABC/bc-types'
import BcIcon from '@/ABC/components/BcIcon.vue'
import type { CSSProperties } from 'vue'
import { computed, watch } from 'vue'

type Emits = {
    (e: 'update:modelValue', value: boolean): void
    (e: 'afterClose'): void
    (e: 'afterOpen'): void
}

// Props with defaults
const props = withDefaults(defineProps<PropsModal>(), {
    isClose: true,
    width: 340,
    ariaLabel: 'Modal Dialog',
    isClickOutSide: true,
})

const emit = defineEmits<Emits>()

// คำนวณ styles สำหรับ modal ที่สอดคล้องกับ CSSProperties
const styleWarper = computed(
    (): CSSProperties => ({
        width: `min(94vw, ${props.width}px)`,
        backgroundColor: 'white',
        borderRadius: 'var(--borderRadius)',
        boxShadow:
            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        ...(props.styleCustom as CSSProperties), // Type assertion เพื่อความปลอดภัย
    })
)

// จัดการ overlay scroll
watch(
    () => props.modelValue,
    (isOpen) => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    }
)

// ปิด modal
const closeModal = () => {
    emit('update:modelValue', false)
    emit('afterClose')
}

const clickOutSide = () => {
    if (!props.isClickOutSide) return
    emit('update:modelValue', false)
    emit('afterClose')
}

// เปิด modal
const onAfterOpen = () => {
    emit('afterOpen')
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="modelValue" class="modal-container">
                <!-- Backdrop -->
                <div class="modal-backdrop" @click="clickOutSide" />

                <!-- Modal Content -->
                <div
                    :id="id"
                    role="dialog"
                    :aria-label="ariaLabel"
                    class="z-[1000] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    @vue:mounted="onAfterOpen"
                >
                    <section
                        class="relative flex flex-col items-center justify-center gap-4 max-h-[90vhs] overflow-y-auto bg-white px-4 py-6"
                        :style="styleWarper"
                    >
                        <button
                            v-if="isClose"
                            class="absolute top-4 right-4"
                            @click="closeModal"
                            aria-label="Close modal"
                        >
                            <BcIcon name="X" size="20" color="icon" />
                        </button>

                        <!-- Body -->
                        <slot />

                        <!-- Footer -->
                        <div
                            v-if="$slots.footer"
                            class="mt-2 flex justify-between items-center gap-4 w-full"
                        >
                            <slot name="footer" />
                        </div>
                    </section>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
/* CSS remains the same */
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--backdrop);
}

/* Transition Animations */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>
