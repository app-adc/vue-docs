<script setup lang="ts">
import type { IconName } from '@/ABC/bc-types'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcMultiselect from '@/ABC/components/BcMultiSelect.vue'
import { computed, ref } from 'vue'

interface User {
    id: string
    name: string
    email: string
    role: string
    icon: IconName
}

// Sample data
const users = ref<User[]>([
    {
        id: '1',
        name: 'สมชาย ใจดี',
        email: 'somchai@example.com',
        role: 'Admin',
        icon: 'UserCog',
    },
    {
        id: '2',
        name: 'สมหญิง รักสวย',
        email: 'somying@example.com',
        role: 'Manager',
        icon: 'UserCheck',
    },
    {
        id: '3',
        name: 'สมศักดิ์ มั่นคง',
        email: 'somsak@example.com',
        role: 'Developer',
        icon: 'Code',
    },
    {
        id: '4',
        name: 'สมใจ สุขสันต์',
        email: 'somjai@example.com',
        role: 'Designer',
        icon: 'Palette',
    },
    {
        id: '5',
        name: 'วิชัย ชาญฉลาด',
        email: 'wichai@example.com',
        role: 'Developer',
        icon: 'Code',
    },
    {
        id: '6',
        name: 'สุดา แสนดี',
        email: 'suda@example.com',
        role: 'Tester',
        icon: 'Bug',
    },
    {
        id: '7',
        name: 'นภา มีสุข',
        email: 'napa@example.com',
        role: 'Manager',
        icon: 'UserCheck',
    },
    {
        id: '8',
        name: 'ประเสริฐ ก้าวหน้า',
        email: 'prasert@example.com',
        role: 'Developer',
        icon: 'Code',
    },
])

// Playground controls
const selectedUsers = ref<string[]>([])
const maxLimit = ref<number>(0) // 0 = unlimited
const disabled = ref(false)
const isLoading = ref(false)

// Computed
const maxValue = computed(() =>
    maxLimit.value > 0 ? maxLimit.value : undefined
)

const selectedCount = computed(() => selectedUsers.value.length)
const selectedItems = computed(() =>
    users.value.filter((u) => selectedUsers.value.includes(u.id))
)

// Methods
const handleSelected = (items: User[]) => {
    console.log('Selected items:', items)
}

const clearAll = () => {
    selectedUsers.value = []
}

const selectAll = () => {
    const limit = maxValue.value || users.value.length
    selectedUsers.value = users.value.slice(0, limit).map((u) => u.id)
}

const simulateLoading = () => {
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
    }, 2000)
}

// Color variants for tags
const roleColors: Record<string, string> = {
    Admin: 'bg-gradient-to-r from-purple-500 to-purple-600',
    Manager: 'bg-gradient-to-r from-green-500 to-green-600',
    Developer: 'bg-gradient-to-r from-blue-500 to-blue-600',
    Designer: 'bg-gradient-to-r from-pink-500 to-pink-600',
    Tester: 'bg-gradient-to-r from-orange-500 to-orange-600',
}

const getRoleColor = (role: string) =>
    roleColors[role] || 'bg-gradient-to-r from-gray-500 to-gray-600'
</script>

<template>
    <div class="bg-white rounded-xl shadow-lg p-8 max-w-5xl mx-auto">
        <div class="flex items-center gap-3 mb-6">
            <BcIcon name="Bug" size="32" color="primary" />
            <h2 class="text-2xl font-bold">Multiselect Playground</h2>
        </div>

        <!-- Controls -->
        <div class="bg-slate-50 rounded-lg p-6 mb-6 space-y-4">
            <h3 class="font-bold text-lg mb-4">การตั้งค่า</h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Max Limit -->
                <div>
                    <label class="block text-sm font-medium mb-2">
                        จำกัดจำนวนสูงสุด (0 = ไม่จำกัด)
                    </label>
                    <input
                        v-model.number="maxLimit"
                        type="number"
                        min="0"
                        max="10"
                        class="w-full px-3 py-2 border rounded-lg"
                    />
                </div>

                <!-- Disabled -->
                <div>
                    <label class="block text-sm font-medium mb-2">สถานะ</label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                            v-model="disabled"
                            type="checkbox"
                            class="w-4 h-4"
                        />
                        <span>ปิดการใช้งาน</span>
                    </label>
                </div>

                <!-- Actions -->
                <div>
                    <label class="block text-sm font-medium mb-2"
                        >การจัดการ</label
                    >
                    <div class="flex gap-2">
                        <button
                            @click="selectAll"
                            class="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                        >
                            เลือกทั้งหมด
                        </button>
                        <button
                            @click="clearAll"
                            class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                        >
                            ล้างทั้งหมด
                        </button>
                        <button
                            @click="simulateLoading"
                            class="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
                        >
                            โหลด
                        </button>
                    </div>
                </div>
            </div>

            <!-- Info Display -->
            <div class="flex items-center gap-4 pt-4 border-t">
                <div class="text-sm">
                    <span class="font-medium">เลือกแล้ว:</span>
                    <span
                        class="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded font-bold"
                    >
                        {{ selectedCount }}{{ maxValue ? `/${maxValue}` : '' }}
                    </span>
                </div>
                <div
                    v-if="maxValue && selectedCount >= maxValue"
                    class="text-sm text-red-600 font-medium"
                >
                    ⚠️ ถึงจำนวนสูงสุดแล้ว
                </div>
            </div>
        </div>

        <!-- Example 1: Basic -->
        <div class="mb-8">
            <h3 class="font-bold text-lg mb-4">1. การใช้งานพื้นฐาน</h3>
            <BcMultiselect
                id="basic-multiselect"
                v-model:data-value="selectedUsers"
                :items="users"
                :reduce-value="(user) => user.id"
                :reduce-label="(user) => user.name"
                :max="maxValue"
                :disabled="disabled"
                :is-loading="isLoading"
                label="เลือกผู้ใช้"
                placeholder="เลือกผู้ใช้ที่ต้องการ"
                @selected="handleSelected"
            />
        </div>

        <!-- Example 2: Custom Template -->
        <div class="mb-8">
            <h3 class="font-bold text-lg mb-4">2. Custom Item Template</h3>
            <BcMultiselect
                id="custom-multiselect"
                v-model:data-value="selectedUsers"
                :items="users"
                :reduce-value="(user) => user.id"
                :reduce-label="(user) => user.name"
                :max="maxValue"
                :disabled="disabled"
                label="เลือกผู้ใช้ (แบบกำหนดเอง)"
            >
                <template #item="{ item, label, selected }">
                    <div class="flex items-center justify-between w-full py-1">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-md"
                            >
                                {{ label.charAt(0) }}
                            </div>
                            <div>
                                <div class="font-medium">{{ label }}</div>
                                <div class="text-xs text-gray-500">
                                    {{ item.email }}
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span
                                class="text-xs px-2 py-1 rounded-full"
                                :class="getRoleColor(item.role) + ' text-white'"
                            >
                                {{ item.role }}
                            </span>
                            <span
                                v-if="selected"
                                class="text-green-600 font-bold text-lg"
                                >✓</span
                            >
                        </div>
                    </div>
                </template>
            </BcMultiselect>
        </div>

        <!-- Example 3: With Icons -->
        <div class="mb-8">
            <h3 class="font-bold text-lg mb-4">3. พร้อม Icons</h3>
            <BcMultiselect
                id="icon-multiselect"
                v-model:data-value="selectedUsers"
                :items="users"
                :reduce-value="(user) => user.id"
                :reduce-label="(user) => user.name"
                :max="maxValue"
                :disabled="disabled"
                label="เลือกผู้ใช้ (พร้อม Icon)"
            >
                <template #item="{ item, label, selected }">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center gap-2">
                            <BcIcon
                                :name="item.icon"
                                size="20"
                                :color="selected ? 'primary' : 'icon'"
                            />
                            <span>{{ label }}</span>
                            <span class="text-xs text-gray-500"
                                >- {{ item.role }}</span
                            >
                        </div>
                        <span v-if="selected" class="text-blue-600 font-bold"
                            >✓</span
                        >
                    </div>
                </template>
            </BcMultiselect>
        </div>

        <!-- Selected Items Display -->
        <div v-if="selectedItems.length > 0" class="bg-slate-50 rounded-lg p-6">
            <h3 class="font-bold text-lg mb-4">รายการที่เลือก</h3>
            <div class="space-y-2">
                <div
                    v-for="user in selectedItems"
                    :key="user.id"
                    class="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold"
                        >
                            {{ user.name.charAt(0) }}
                        </div>
                        <div>
                            <div class="font-medium">{{ user.name }}</div>
                            <div class="text-sm text-gray-500">
                                {{ user.email }}
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span
                            class="text-sm px-3 py-1 rounded-full"
                            :class="getRoleColor(user.role) + ' text-white'"
                        >
                            {{ user.role }}
                        </span>
                        <BcIcon :name="user.icon" size="20" color="icon" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Debug Info -->
        <details class="mt-8 bg-slate-800 text-white rounded-lg p-4">
            <summary class="cursor-pointer font-bold">
                Debug Info (คลิกเพื่อดู)
            </summary>
            <pre class="mt-4 text-sm overflow-x-auto">{{
                {
                    selectedUsers,
                    selectedCount,
                    maxValue,
                    disabled,
                    isLoading,
                    selectedItems: selectedItems.map((u) => ({
                        id: u.id,
                        name: u.name,
                    })),
                }
            }}</pre>
        </details>
    </div>
</template>

<style scoped>
input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
