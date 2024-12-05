<script setup lang="ts">
import Alert from '@/ABC/components/background/Alert.vue'
import Loader from '@/ABC/components/background/Loader.vue'
</script>

<template>
    <section id="bc-background">
        <Alert />

        <Loader text="กำลังโหลดข้อมูล..." />
    </section>
</template>
