<script setup lang="ts">
import type { ColorName, IconName } from '@/ABC/bc-types'
import { colors } from '@/ABC/ui/bc-colors'
import type { LucideIcon } from 'lucide-vue-next'
import * as icons from 'lucide-vue-next'
import { computed } from 'vue'

export interface IconProps {
    name: IconName
    size?: number | string
    color?: ColorName
    hoverColor?: ColorName
    strokeWidth?: number
    class?: string
}

const props = withDefaults(defineProps<IconProps>(), {
    size: 24,
    strokeWidth: 2,
    color: 'primary',
    class: '',
    hoverColor: undefined,
})

const IconComponent = computed<LucideIcon>(() => {
    const icon = icons[props.name as keyof typeof icons] as LucideIcon
    if (!icon) {
        console.warn(`Icon "${props.name}" not found in lucide-vue-next`)
        return icons.HelpCircle as LucideIcon
    }
    return icon
})

// Compute the current color
const currentColor = computed(() => colors[props.color])

// Compute the hover color
const effectHoverColor = computed(() =>
    props.hoverColor ? colors[props.hoverColor] : colors[props.color]
)

// Compute dynamic styles including both color and hover states
const dynamicStyles = computed(() => ({
    '--icon-color': currentColor.value,
    '--icon-hover-color': effectHoverColor.value,
    transition: 'color 150ms ease-in-out',
}))
</script>

<template>
    <div :class="`bc-icon-wrapper ${props.class}`" :style="dynamicStyles">
        <component
            :is="IconComponent"
            :size="+size"
            :stroke-width="strokeWidth"
            class="text-inherit"
        />
    </div>
</template>

<style scoped>
.bc-icon-wrapper {
    display: inline-flex;
    color: var(--icon-color);
}

.bc-icon-wrapper:hover {
    color: var(--icon-hover-color);
}
</style>
