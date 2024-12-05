<script setup lang="ts">
import { PropsModal } from '@/ABC/bc-types'
import BcButton from '@/ABC/components/BcButton.vue'
import type { IconProps } from '@/ABC/components/BcIcon.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcModal from '@/ABC/components/BcModal.vue'
import { delayPromise } from '@/ABC/notUsed/function'
import { useAlert } from '@/ABC/ui/bc-composition'
import TimerManager from '@/ABC/ui/bc-timeout'
import { ci } from 'adc-directive'
import { computed, ref, watch } from 'vue'

const { getAlert, removeAlert } = useAlert()
const open = ref(false)
const isLoading = ref(false)
const propsModal = computed((): Omit<PropsModal, 'modelValue'> => {
    const { isClose, isClickOutSide } = getAlert.value || {}
    return {
        id: 'modal_alert',
        isClose,
        width: 360,
        ariaLabel: 'Modal Alert',
        isClickOutSide: isLoading.value ? false : isClickOutSide,
    }
})
const propsIcon = computed((): IconProps => {
    const color = ci(getAlert.value?.icon, (ic) => {
        switch (ic) {
            case 'BadgeCheck':
                return 'success'
            case 'BadgeAlert':
                return 'warning'
            case 'CircleX':
                return 'error'
            case 'BadgeHelp':
                return 'secondary'
            default:
                return 'primary'
        }
    })
    const icon = {
        name: getAlert.value?.icon || 'BadgeCheck',
        size: '32.5',
        color,
    } as IconProps

    return icon
})
const timerManager = ref(new TimerManager())

const afterOpen = () => {
    if (open.value) return
    open.value = true
    if (typeof getAlert.value?.afterOpen === 'function') {
        getAlert.value.afterOpen()
    }
    document.body.style.overflow = 'hidden'
    const timeout = getAlert.value?.timeout
    if (timeout) {
        timerManager.value.setTimeout(afterClose, timeout)
    }
}
const afterClose = () => {
    if (typeof getAlert.value?.afterClose === 'function') {
        getAlert.value.afterClose()
    }
    timerManager.value.clearAllTimeouts()
    removeAlert()
    open.value = false
    document.body.style.overflow = ''
}

const handleConfirm = async () => {
    if (getAlert.value?.next) {
        isLoading.value = true
        await delayPromise(100, getAlert.value!.next)
        isLoading.value = false
    }
    await delayPromise(100, afterClose)
}

watch([getAlert], ([isAlert]) => {
    if (isAlert && !open.value) {
        afterOpen()
    }
})
</script>

<template>
    <BcModal v-bind="propsModal" v-model="open" @after-close="afterClose">
        <div class="relative flex flex-col justify-center items-center">
            <BcIcon v-if="getAlert!.icon" v-bind="propsIcon" class="mb-3" />
            <div class="flex flex-col items-center justify-center mx-auto">
                <h3
                    v-for="(title, titleIndex) in getAlert?.titles"
                    :key="titleIndex"
                    class="text-base font-bold text-color"
                >
                    {{ title }}
                </h3>
            </div>
            <p
                v-for="(sub, subIndex) in getAlert?.subtitles"
                :key="subIndex"
                class="text-sm text-color mt-1"
            >
                {{ sub }}
            </p>
            <div
                :class="`  flex w-full items-center justify-${
                    getAlert!.btnCancel ? 'between' : 'center'
                } gap-4`"
            >
                <BcButton
                    v-if="getAlert?.btnCancel"
                    id="btn_alert_cancel"
                    variant="outline"
                    class="!w-[151px] mt-4"
                    :is-loading="isLoading"
                    @click="() => !isLoading && afterClose()"
                >
                    {{ getAlert?.btnCancel }}
                </BcButton>
                <BcButton
                    v-if="getAlert?.btnConfirm"
                    id="btn_alert_confirm"
                    variant="primary"
                    :class="`${
                        getAlert.btnCancel ? '!w-[151px]' : '!w-[151px]'
                    } mt-4`"
                    :is-loading="isLoading"
                    @click="handleConfirm"
                >
                    {{ getAlert?.btnConfirm }}
                </BcButton>
            </div>
        </div>
    </BcModal>
</template>
