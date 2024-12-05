<script setup lang="ts">
import { computed, reactive, onMounted, watch } from 'vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import type { IconName } from '@/ABC/bc-types'

interface Item {
    page: number
    value: number
}

interface PropsPagination {
    dataValue: number
    total: number
    size?: number
}

const props = withDefaults(defineProps<PropsPagination>(), {
    size: 10,
})
const emit = defineEmits<{
    (e: 'change', page: number): void
}>()

// Map of pagination icons
const ICONS: Record<string, IconName> = {
    first: 'ChevronsLeft',
    prev: 'ChevronLeft',
    next: 'ChevronRight',
    last: 'ChevronsRight',
}

// Reactive state
const state = reactive({
    items: [] as Item[],
})

// Computed properties
const totalPage = computed(() =>
    Math.max(1, Math.ceil(props.total / props.size))
)
const isLastPage = computed(() => props.dataValue === totalPage.value - 1)

// Methods
const getPageRange = computed(() => {
    const range: Item[] = []
    const totalPages = totalPage.value
    const currentPage = props.dataValue + 1

    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, startPage + 4)

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4)
    }

    for (let i = startPage; i <= endPage; i++) {
        range.push({
            page: i,
            value: i - 1,
        })
    }

    return range
})

// Update items when dependencies change
const updateItems = () => {
    state.items = getPageRange.value
}

// Lifecycle hooks
onMounted(updateItems)

// Watchers
watch([() => props.dataValue, () => props.total], updateItems)
</script>

<template>
    <div class="pagination" v-if="total > size">
        <div class="relative flex items-center">
            <!-- First page -->
            <button
                class="_btn rounded-l-md border"
                :disabled="dataValue === 0"
                @click.prevent="emit('change', 0)"
                aria-label="First page"
            >
                <BcIcon :name="ICONS.first" size="20" color="icon" />
            </button>

            <!-- Previous page -->
            <button
                class="_btn -ml-px border"
                @click="emit('change', Math.max(0, dataValue - 1))"
                :disabled="dataValue === 0"
                aria-label="Previous page"
            >
                <BcIcon :name="ICONS.prev" size="20" color="icon" />
            </button>

            <!-- Page numbers -->
            <button
                v-for="page in state.items"
                :key="page.value"
                @click.prevent="emit('change', page.value)"
                class="_btn -ml-px"
                :aria-label="`Page ${page.page}`"
                :aria-current="dataValue === page.value"
            >
                {{ page.page }}
            </button>

            <!-- Next page -->
            <button
                class="_btn -ml-px"
                @click="emit('change', Math.min(totalPage - 1, dataValue + 1))"
                :disabled="isLastPage"
                aria-label="Next page"
            >
                <BcIcon :name="ICONS.next" size="20" color="icon" />
            </button>

            <!-- Last page -->
            <button
                @click.prevent="emit('change', totalPage - 1)"
                :disabled="isLastPage"
                class="_btn -ml-px rounded-r-md"
                aria-label="Last page"
            >
                <BcIcon :name="ICONS.last" size="20" color="icon" />
            </button>
        </div>
    </div>
</template>

<style lang="css" scoped>
._btn {
    --_size: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color);
    transition: all 150ms ease-in-out;
    font-weight: 500;
    background-color: #fff;
    font-size: 1rem;
    line-height: var(--_size);
    padding: 0.5rem;
    border-width: 1px;
    width: var(--_size);
    height: var(--_size);
}

._btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

[aria-label^='Page'] {
    font-weight: normal;
}

[aria-current='true'] {
    color: var(--primary);
    font-weight: 700;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
</style>
