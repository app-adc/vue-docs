<script setup lang="ts"></script>

<template>
    <div class="absolute inset-0 flex items-center justify-center">
        <div class="loading-spinner" />
    </div>
</template>

<style lang="css" scoped>
.loading-spinner {
    @apply h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600;
}
</style>
