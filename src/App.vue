<script setup lang="ts">
import BcBackground from '@/ABC/components/background/BcBackground.vue'
</script>
<template>
    <div class="relative">
        <router-view />
        <BcBackground />
    </div>
</template>
<style lang="css">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
