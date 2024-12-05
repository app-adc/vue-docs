<script lang="ts" setup>
import { ColorName, IconName } from '@/ABC/bc-types'
import BcIcon from '@/ABC/components/BcIcon.vue'
import LoadingSpinner from '@/ABC/components/LoadingSpinner.vue'
import { KeyRouter } from '@/types/types'
import { toCombineText } from 'adc-directive'
import { computed, nextTick, onMounted } from 'vue'
import { RouteLocationRaw, RouteRecordRaw, useRouter } from 'vue-router'

// กำหนดประเภทของ Route
type Route = (RouteRecordRaw & { name?: KeyRouter }) | RouteLocationRaw

/**
 * Props ทั้งหมดของ Button component
 * @interface PropsButton
 */
interface PropsButton {
    to?: Route // สำหรับการ navigate (vue-router)
    icon?: IconName // ไอคอนที่จะแสดงในปุ่ม
    variant?: ColorName // รูปแบบของปุ่ม (primary, outline, etc.)
    color?: ColorName // สีที่กำหนดเอง (override default variant color)
    iconAlign?: 'LEFT' | 'RIGHT' // ตำแหน่งของไอคอน
    isLoading?: boolean // สถานะกำลังโหลด
    disabled?: boolean // ปิดการใช้งานปุ่ม
    size?: 'sm' | 'md' | 'lg' // ขนาดของปุ่ม
    class?: string
}

// กำหนดค่าเริ่มต้นของ props
const props = withDefaults(defineProps<PropsButton>(), {
    variant: 'primary',
    color: undefined,
    iconAlign: 'LEFT',
    isLoading: false,
    disabled: false,
    size: 'md',
    class: '',
})

// กำหนด events ที่ปุ่มสามารถ emit ได้
const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
    (e: 'focus', event: FocusEvent): void
    (e: 'blur', event: FocusEvent): void
}>()

const router = useRouter()

// กำหนดขนาดของไอคอนตามขนาดของปุ่ม
const iconSize = computed(
    () =>
        ({
            sm: 16,
            md: 20,
            lg: 24,
        }[props.size])
)

// คำนวณสีของ text และ icon ตาม variant และ color props
const currentColor = computed((): ColorName => {
    if (props.variant === 'secondary') {
        return 'primary'
    } else if (props.variant === 'outline') {
        return props.color || 'primary'
    } else if (props.variant === 'link' || props.variant === 'white') {
        return props.color || 'primary'
    }
    return 'white'
})

// คำนวณ classes ทั้งหมดของปุ่ม
const buttonClasses = computed(() => {
    // กำหนด styles ตาม variant
    const variantStyles: Record<ColorName, string> = {
        primary: `bg-primary hover:brightness-90`,
        secondary: `bg-secondary hover:brightness-90`,
        tertiary: `bg-tertiary hover:brightness-90`,
        table: `bg-table hover:brightness-90`,
        icon: `bg-icon hover:brightness-90`,
        success: `bg-success hover:brightness-90`,
        error: `bg-error hover:brightness-90`,
        warning: `bg-warning hover:brightness-90`,
        white: `bg-white`,
        link: `bg-inherit`,
        outline: `border border-${props.color || 'primary'} hover:bg-${
            props.color || 'primary'
        }`,
    }

    return toCombineText([
        '_button',
        `_size-${props.size}`,
        props.isLoading && '_loading',
        props.disabled && '_disabled',
        props.iconAlign === 'RIGHT' && '_icon-right',
        variantStyles[props.variant],
        props.class,
    ])
})

const textClasses = computed(() => [
    'relative leading-none',
    props.variant === 'link' && 'underline',
    props.variant === 'outline'
        ? `text-${props.color || 'primary'} hover-white`
        : `text-${currentColor.value}`,
])

// จัดการ click event
const handleClick = (event: MouseEvent): void => {
    if (props.disabled || props.isLoading) return
    emit('click', event)
    if (props.to) {
        router.push(props.to)
    }
}

onMounted(async () => {
    await nextTick()
})
</script>

<template>
    <button
        :class="buttonClasses"
        @click="handleClick"
        :disabled="disabled"
        type="button"
        :data-variant="variant"
        :v-bind="$attrs"
    >
        <BcIcon
            v-if="icon"
            :name="icon"
            :size="iconSize"
            :color="currentColor"
            class="_icon"
        />
        <LoadingSpinner v-if="isLoading" />
        <span v-if="$slots.default" :class="textClasses">
            <slot />
        </span>
    </button>
</template>

<style lang="css" scoped>
/* สไตล์พื้นฐานของปุ่ม */
._button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: var(--font_primary);
    border-radius: var(--borderRadius);
    cursor: pointer;
    transition: all 150ms ease-in-out;
    padding: 0 var(--_padding, 1rem);
    height: var(--h_input);
}

/* ขนาดต่างๆ ของปุ่ม */
._size-sm {
    --_padding: 0.75rem;
    height: 2rem;
    font-size: 0.875rem;
}

._size-md {
    --_padding: 1rem;
    height: var(--h_input);
    font-size: 1rem;
}

._size-lg {
    --_padding: 1.5rem;
    height: 3.5rem;
    font-size: 1.125rem;
}

/* สถานะของปุ่ม */
._disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

._loading {
    pointer-events: none;
}

/* การจัดการไอคอน */
._icon-right {
    flex-direction: row-reverse;
}

/* แก้ไข hover styles */
._button:hover .hover-white {
    color: white;
}

/* ลบ styles เดิมออก */
[data-variant='outline']:hover {
    border-color: transparent;
}

[data-variant='outline'] {
    position: relative;
    z-index: 1;
}

[data-variant='outline']::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    transition: background-color 150ms ease-in-out;
    z-index: -1;
    border-radius: inherit;
}

[data-variant='outline']:hover::before {
    background-color: var(--primary);
}

/* icon styles */
._icon {
    flex-shrink: 0;
    transition: color 150ms ease-in-out;
}

[data-variant='outline']:hover ._icon {
    color: white !important;
}

/* เมื่อกดแล้วให้กลับไปสีเดิม */
[data-variant='outline']:active::before {
    background-color: transparent;
}

[data-variant='outline']:active .hover-white {
    color: var(--primary);
}

[data-variant='outline']:active ._icon {
    color: var(--primary) !important;
}
</style>
