<script setup lang="ts">
import type { PropsInput } from '@/ABC/bc-types'
import BcIcon from '@/ABC/components/BcIcon.vue'
import LoadingSpinner from '@/ABC/components/LoadingSpinner.vue'
import { toCombineText } from 'adc-directive'
import { computed, ref } from 'vue'

type PropsForm = PropsInput
const props = withDefaults(defineProps<PropsForm>(), {})
const emit = defineEmits<{
    clear: []
}>()

const isFocus = ref(false)
const handleFocus = () => {
    isFocus.value = true
}

const errorMessage = computed((): string =>
    props.error
        ? props.error(props.dataValue ? String(props.dataValue) : '')
        : 'กรุณากรอกข้อมูล'
)
const isInvalid = computed(
    (): boolean =>
        typeof props.rule == 'function' &&
        !props.rule(props.dataValue ? String(props.dataValue) : '')
)

const classEventForm = computed(() =>
    toCombineText([
        `flex gap-1 flex-col relative w-full bg-inherit mb-4`,
        props.disabled && 'cursor-default pointer-events-none',
    ])
)
</script>
<!--
        :aria-invalid="isInvalid" // ถ้ามี rule error จะเป็น true
        :aria-checked="isFocus" // เอาไว้แสดง message error
        :data-form="props.form" // validate form for rule error
        :aria-errormessage="errorMessage" // message error
     -->

<template>
    <!-- class="flex gap-1 flex-col relative w-full bg-inherit mb-4" -->
    <div
        :class="classEventForm"
        role="container"
        :aria-invalid="isInvalid"
        :aria-checked="isFocus"
        :data-form="props.form || ''"
        :aria-errormessage="errorMessage"
        @click="handleFocus"
        :data-id="props.id"
    >
        <label
            v-if="props.label"
            :for="props.id"
            class="flex items-center gap-1 !text-base !text-color !font-bold !leading-normal !mb-1"
        >
            {{ label }}
            <span v-if="props.rule" class="text-red-500">*</span>
        </label>
        <div class="relative">
            <slot />
            <BcIcon
                v-if="
                    props.isClear &&
                    props.dataValue &&
                    !props.disabled &&
                    !props.isLoading
                "
                name="XCircle"
                size="20"
                data-icon="clear"
                @click="emit('clear')"
                class="absolute top-1/2 right-2 cursor-pointer transition-all duration-300 z-[9] -translate-y-1/2"
            />

            <BcIcon
                v-if="props.icon"
                :name="props.icon"
                size="20"
                role="icon"
                color="icon"
                class="absolute top-1/2 left-2 z-[9] -translate-y-1/2 pointer-events-none"
            />
            <LoadingSpinner v-if="props.isLoading" />
        </div>
        <span v-if="isInvalid" role="text-error">
            {{ errorMessage }}
        </span>
    </div>
</template>
<style lang="css" scoped>
/*------------------------------Form---------------------------------*/
/*จำเป็นต้องใช้ css เพราะ focus input อยู่นอก container*/
[role='container']:has(input:focus) :is([data-icon='clear'], [role='icon']) {
    stroke: var(--primary) !important;
}

[role='text-error'] {
    display: none;
    font-size: 0.8rem;
    color: var(--error);
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    text-align: left;
}

[role='container'][aria-invalid='true'][aria-checked='true']
    [role='text-error'] {
    display: block;
}

[role='container'] :is(input, button) {
    height: var(--h_input);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    padding: 0px 1rem;
    border: 1px solid var(--border);
    outline: none;
    font-size: 1rem;
    line-height: 1;
    color: var(--color);
}

[role='container'] :is(input):focus {
    border: 1.3px solid var(--primary);
}

[role='container'] :is(input):disabled {
    cursor: default;
    background-color: var(--disabled);
    pointer-events: none;
}

/*-------------x----------------Form-----------------x---------------*/

/*------------------------------input---------------------------------*/

[role='container'][aria-invalid='true'][aria-checked='true']
    :is(input:not(:focus)) {
    /*aria-checked มีผลตอนใช้ useRunValidate_ */
    animation: shake 0.2s;
    border: 1.3px solid var(--error);
}

[role='container'][aria-invalid='true'] :is(input:focus) {
    border: 1.3px solid var(--error);
}

/* Animation Invalid input*/
@keyframes shake {
    0%,
    100% {
        transform: translateX(0);
    }
    20%,
    40%,
    60%,
    80% {
        transform: translateX(-1.5%);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translateX(1.5%);
    }
}
</style>
