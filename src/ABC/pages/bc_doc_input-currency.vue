<script setup lang="ts">
import BcInputCurrency from '@/ABC/components/BcInputCurrency.vue'
import AppBaseLayout from '@/ABC/pages/bc_doc_layout.vue'
import { computed, ref } from 'vue'

const state = ref('0')
const classes = computed(() => ({
    'text-primary': true,
    'font-bold': true,
}))
</script>

<template>
    <AppBaseLayout title="InputCurrency">
        <h1>State : {{ state }}</h1>
        <h2
            :class="classes"
            class="pointer-events-none cursor-not-allowed hidden"
        >
            {{ state }}
        </h2>
        <BcInputCurrency
            id="price"
            label="ราคา"
            :data-value="state"
            :decimal="2"
            :rule="(val) => +val > 1000"
            @input="(val) => (state = val)"
        />
    </AppBaseLayout>
</template>

<style lang="css" scoped></style>
