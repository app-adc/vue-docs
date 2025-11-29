<script setup lang="ts" generic="T">
import type { PropsInput } from '@/ABC/bc-types'
import { toHasKey } from 'adc-directive'
import { computed, ref, watchEffect } from 'vue'
import BcForm from './BcForm.vue'
import BcIcon from './BcIcon.vue'

interface Props extends Omit<PropsInput, 'dataValue'> {
    dataValue: Array<string | number> | null
    items: ReadonlyArray<T>
    reduceValue: (item: T) => string | number | null
    reduceLabel: (item: T) => string
    max?: number // จำนวนสูงสุดที่เลือกได้
}

interface Emits {
    (
        event: 'input',
        value: Array<string | number> | null,
        el: HTMLInputElement | null
    ): void
    (event: 'selected', items: Array<T>): void
    (event: 'enter', e: HTMLInputElement): void
    (event: 'focus', e: HTMLInputElement): void
    (event: 'blur', e: HTMLInputElement): void
}

const props = withDefaults(defineProps<Props>(), {
    isLoading: false,
    disabled: false,
    isClear: true,
})

const emit = defineEmits<Emits>()

// State
const inputElement = ref<HTMLInputElement | null>(null)
const inputValue = ref<string>('')
const isFocused = ref<boolean>(false)
const isSearch = ref<boolean>(false)
const tabIndex = ref<number>(-1)
const selectedValues = ref<Array<string | number>>([])

// Selected items based on selectedValues
const selectedItems = computed((): Array<T> => {
    if (!selectedValues.value.length) return []
    return props.items.filter((item) =>
        selectedValues.value.includes(
            props.reduceValue(item) as string | number
        )
    )
})

// Filtered items based on search
const filteredItems = computed((): ReadonlyArray<T> => {
    if (!isSearch.value || !inputValue.value) {
        return props.items
    }

    const keywords = inputValue.value.split(/[ ,|]+/)
    return props.items
        .filter((item) => {
            return keywords.every((keyword) =>
                toHasKey(props.reduceLabel(item)).includes(toHasKey(keyword))
            )
        })
        .slice(0, 200)
})

// Check if item is selected
const isSelected = (item: T): boolean => {
    const value = props.reduceValue(item)
    return value !== null && selectedValues.value.includes(value)
}

// Handle input changes
const handleInput = (e: Event): void => {
    const target = e.target as HTMLInputElement
    inputValue.value = target.value

    if (!isSearch.value || !isFocused.value) {
        isSearch.value = true
        isFocused.value = true
    }
}

// Handle item selection/deselection
const handleSelect = (item: T): void => {
    const value = props.reduceValue(item)
    if (value === null) return

    const index = selectedValues.value.indexOf(value)

    if (index > -1) {
        // Remove if already selected
        selectedValues.value.splice(index, 1)
    } else {
        // Add if not selected and not exceeding max limit
        if (!props.max || selectedValues.value.length < props.max) {
            selectedValues.value.push(value)
        }
    }

    inputValue.value = ''
    isSearch.value = false

    emit(
        'input',
        selectedValues.value.length ? [...selectedValues.value] : null,
        inputElement.value
    )
    emit('selected', selectedItems.value)
}

// Remove selected item
const removeItem = (value: string | number): void => {
    const index = selectedValues.value.indexOf(value)
    if (index > -1) {
        selectedValues.value.splice(index, 1)
        emit(
            'input',
            selectedValues.value.length ? [...selectedValues.value] : null,
            inputElement.value
        )
        emit('selected', selectedItems.value)
    }
}

// Handle keyboard navigation
const handleKeyDown = (e: KeyboardEvent): void => {
    const items = filteredItems.value

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault()
            tabIndex.value = Math.min(tabIndex.value + 1, items.length - 1)
            break
        case 'ArrowUp':
            e.preventDefault()
            tabIndex.value = Math.max(tabIndex.value - 1, 0)
            break
        case 'Enter':
            e.preventDefault()
            if (tabIndex.value >= 0 && items[tabIndex.value] !== undefined) {
                handleSelect(items[tabIndex.value] as T)
                if (inputElement.value) {
                    emit('enter', inputElement.value)
                }
            }
            break
        case 'Escape':
            isFocused.value = false
            isSearch.value = false
            inputValue.value = ''
            break
        case 'Backspace':
            if (!inputValue.value && selectedValues.value.length > 0) {
                removeItem(
                    selectedValues.value[selectedValues.value.length - 1] as
                        | string
                        | number
                )
            }
            break
    }
}

// Handle focus event
const handleFocus = (e: FocusEvent): void => {
    isFocused.value = true
    if (e.target instanceof HTMLInputElement) {
        emit('focus', e.target)
    }
}

// Handle blur event
const handleBlur = (e: FocusEvent): void => {
    setTimeout(() => {
        inputValue.value = ''
        isFocused.value = false
        isSearch.value = false

        if (e.target instanceof HTMLInputElement) {
            emit('blur', e.target)
        }
    }, 200)
}

// Handle clear all
const handleClear = (): void => {
    selectedValues.value = []
    inputValue.value = ''
    isFocused.value = false
    isSearch.value = false
    tabIndex.value = -1

    emit('input', null, inputElement.value)
    emit('selected', [])
}

const getPlaceholder = computed((): string => {
    if (props.isLoading) return 'กำลังโหลดข้อมูล...'
    if (selectedValues.value.length > 0) return ''

    const text = props.placeholder
        ? props.placeholder
        : props.label
        ? `เลือก${props.label}`
        : ''
    return text
})

// Watch for external value changes
watchEffect(() => {
    if (props.dataValue && Array.isArray(props.dataValue)) {
        selectedValues.value = [...props.dataValue]
    } else {
        selectedValues.value = []
    }
})
</script>

<template>
    <BcForm
        :id="id"
        :data-value="inputValue"
        :label="label"
        :placeholder="placeholder"
        :rule="rule"
        :icon="icon"
        :disabled="disabled"
        :is-loading="isLoading"
        :is-clear="isClear"
        @clear="handleClear"
    >
        <div class="relative w-full">
            <!-- Selected items tags -->
            <div
                class="flex flex-wrap gap-1 mb-1"
                v-if="selectedItems.length > 0"
            >
                <div
                    v-for="(item, index) in selectedItems"
                    :key="index"
                    class="flex items-center gap-1 px-2 py-1 bg-primary text-white rounded"
                >
                    <span class="w-full px-6 text-base">{{
                        reduceLabel(item)
                    }}</span>
                    <!-- <button
                        type="button"
                        @click.stop="
                            removeItem(reduceValue(item) as string | number)
                        "
                        :disabled="disabled"
                        class="hover:text-blue-900 disabled:opacity-50 !border-0"
                    >
                        ✕
                    </button> -->
                    <BcIcon
                        name="X"
                        @click.stop="
                            removeItem(reduceValue(item) as string | number)
                        "
                        color="white"
                        class="cursor-pointer"
                        size="16"
                    />
                </div>
            </div>

            <input
                ref="inputElement"
                :id="id"
                :value="inputValue"
                class="w-full disabled:bg-[#F9FAFB]"
                :class="{ '!pl-9': icon }"
                :placeholder="getPlaceholder"
                :disabled="disabled"
                @input="handleInput"
                @keydown="handleKeyDown"
                @focus="handleFocus"
                @blur="handleBlur"
                autocomplete="off"
            />
            <i
                role="icon-arrow"
                :aria-expanded="isFocused"
                class="pointer-events-none"
            />

            <!-- Dropdown -->
            <ul v-if="isFocused" role="options-container">
                <template v-if="filteredItems.length">
                    <li
                        v-for="(item, index) in filteredItems"
                        :key="index"
                        role="option-item"
                        :aria-checked="index === tabIndex"
                        :aria-selected="isSelected(item)"
                        @click="handleSelect(item)"
                        @mousemove="tabIndex = index"
                    >
                        <slot
                            name="item"
                            :item="item"
                            :label="reduceLabel(item)"
                            :selected="isSelected(item)"
                        >
                            {{ reduceLabel(item) }}
                        </slot>
                    </li>
                </template>
                <li v-else role="option-item-not-found">ไม่พบข้อมูล</li>

                <!-- Actions slot -->
                <div role="option-item-actions">
                    <slot name="actions" />
                </div>
            </ul>
        </div>
    </BcForm>
</template>

<style scoped>
/* จัดการ style ของ dropdown */
[role='options-container'] {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: var(--list-Y, 280px);
    overflow-y: auto;
    background: white;
    border: 1px solid var(--border);
    border-radius: var(--borderRadius);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    z-index: 50;
}

[role='option-item'] {
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 150ms ease-in-out;
}

[role='option-item']:hover,
[role='option-item'][aria-checked='true'] {
    background: var(--secondary);
}

[role='option-item'][aria-selected='true'] {
    background: rgba(59, 130, 246, 0.1);
    font-weight: 500;
}

[role='option-item-not-found'] {
    padding: 0.5rem 1rem;
    text-align: center;
    color: var(--border);
}

[role='icon-arrow'] {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0.75rem;
    height: 0.75rem;
    border: solid var(--icon);
    border-width: 0 2px 2px 0;
    transform-origin: center;
    transform: translateY(-50%) rotate(45deg);
    transition: transform 150ms ease-in-out;
}

[role='icon-arrow'][aria-expanded='true'] {
    transform: translateY(-25%) rotate(-135deg);
}

[role='option-item-actions'] {
    border-top: 1px solid var(--border);
    padding: 0.5rem;
}

@media (min-width: 768px) {
    :root {
        --list-Y: 300px;
    }
}
</style>
