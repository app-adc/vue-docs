<script setup lang="ts">
import loaderSVG from '@/ABC/svg/loader.svg'
import { useLoader } from '@/ABC/ui/bc-composition'
type PropsLoader = {
    text?: string
    className?: string
}
const props = withDefaults(defineProps<PropsLoader>(), {
    text: 'Processing...',
    className: 'w-[100px] md:w-[150px]',
})
const { getLoader } = useLoader()
</script>

<template>
    <div
        id="bc-loader"
        v-if="getLoader"
        class="z-[9999] fixed inset-0 bg-backdrop grid place-items-center"
    >
        <div class="flex flex-col justify-center items-center animate-pulse">
            <img :src="loaderSVG" alt="loading..." :class="className" />
            <p class="text-icon text-2xl md:text-3xl">{{ props.text }}</p>
        </div>
    </div>
</template>
