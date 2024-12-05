<script setup lang="ts">
import AppBaseLayout from '@/ABC/pages/bc_doc_layout.vue'
import BcSelect from '@/ABC/components/BcSelect.vue'
import { reactive } from 'vue'
interface User {
    id: string
    name: string
    email: string
}

type State = {
    selectedId: string
}

const users: User[] = [
    { id: '1', name: 'John Doe', email: '' },
    { id: '2', name: 'Max 007', email: '' },
    { id: '3', name: 'Pure 888', email: '' },
]

const state = reactive<State>({
    selectedId: '',
})

function handelSelected(user: User) {
    console.log(user)
    state.selectedId = user.id
}
</script>

<template>
    <AppBaseLayout title="Select">
        <h1>value: {{ state.selectedId }}</h1>
        // Component จะรู้ type ของ item โดยอัตโนมัติ
        <BcSelect
            id="select-user"
            :data-value="state.selectedId"
            :items="users"
            :reduce-value="(v) => v.id"
            :reduce-label="(v) => v.name"
            :is-clear="false"
            @selected="handelSelected"
            :rule="() => !!state.selectedId"
            :error="() => 'กรุณาเลือกผู้ใช้งาน'"
        />
    </AppBaseLayout>
</template>

<style lang="css" scoped></style>
