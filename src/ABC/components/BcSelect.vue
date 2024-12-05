<script setup lang="ts" generic="T">
import type { PropsInput } from '@/ABC/bc-types'
import { toHasKey } from 'adc-directive'
import { computed, ref, watchEffect } from 'vue'
import BcForm from './BcForm.vue'

interface Props extends Omit<PropsInput, 'dataValue'> {
    dataValue: string | number | null
    items: ReadonlyArray<T>
    isAutoComplete?: boolean
    reduceValue: (item: T) => string
    reduceLabel: (item: T) => string
}

interface Emits {
    (event: 'input', value: string | null, el: HTMLInputElement | null): void
    (event: 'selected', item: T): void
    (event: 'enter', e: HTMLInputElement): void
    (event: 'focus', e: HTMLInputElement): void
    (event: 'blur', e: HTMLInputElement): void
}

const props = withDefaults(defineProps<Props>(), {
    isAutoComplete: false,
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

// Handle input changes
const handleInput = (e: Event): void => {
    const target = e.target as HTMLInputElement
    inputValue.value = target.value
    emit('input', target.value, inputElement.value)

    if (!isSearch.value || !isFocused.value) {
        isSearch.value = true
        isFocused.value = true
    }
}

// Handle item selection
const handleSelect = (item: T): void => {
    const label = props.reduceLabel(item)
    inputValue.value = label
    emit('selected', item)
    emit('input', props.reduceValue(item), inputElement.value)

    isFocused.value = false
    isSearch.value = false
}

// Handle keyboard navigation
const handleKeyDown = (e: KeyboardEvent): void => {
    const items = filteredItems.value

    switch (e.key) {
        case 'ArrowDown':
            tabIndex.value = Math.min(tabIndex.value + 1, items.length - 1)
            break
        case 'ArrowUp':
            tabIndex.value = Math.max(tabIndex.value - 1, 0)
            break
        case 'Enter':
            if (tabIndex.value >= 0 && items[tabIndex.value]) {
                handleSelect(items[tabIndex.value])
                if (inputElement.value) {
                    emit('enter', inputElement.value)
                }
            }
            break
        case 'Escape':
            isFocused.value = false
            isSearch.value = false
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
        // หากไม่ใช่ autoComplete mode ให้กลับไปใช้ค่าที่เลือกไว้ล่าสุด
        if (!props.isAutoComplete) {
            const selectedItem = props.items?.find(
                (item) => props.reduceValue(item) === props.dataValue
            )
            if (selectedItem) {
                inputValue.value = props.reduceLabel(selectedItem)
            } else {
                inputValue.value = ''
            }
        }

        isFocused.value = false
        isSearch.value = false

        if (e.target instanceof HTMLInputElement) {
            emit('blur', e.target)
        }
    }, 200)
}

// Handle clear
const handleClear = (): void => {
    inputValue.value = ''

    if (props.items.length > 0) {
        // ใช้ reduce functions เพื่อหา key ที่ถูกต้อง
        const firstItem = { ...props.items[0] }
        // ทดลองเรียก reduce function กับ item แรกเพื่อดูว่าจะ reduce field ไหน
        const currentValue = props.reduceValue(firstItem)

        // หา key ที่ให้ค่าตรงกับ currentValue
        for (const key in firstItem) {
            if (firstItem[key] === currentValue) {
                firstItem[key] = '' as unknown as T[Extract<keyof T, string>] // set ค่าเป็น empty string
                break
            }
        }

        emit('input', null, inputElement.value)
        emit('selected', firstItem as T)
    } else {
        emit('input', null, inputElement.value)
    }

    isFocused.value = false
    isSearch.value = false
    tabIndex.value = -1
}

const getPlaceholder = computed((): string => {
    const text = props.placeholder
        ? props.placeholder
        : props.label
        ? `ระบุ${props.label}`
        : ''
    return props.isLoading ? 'กำลังโหลดข้อมูล...' : text
})

// Watch for external value changes
watchEffect(() => {
    if (props.dataValue) {
        const selected = props.items?.find(
            (item) => props.reduceValue(item) === props.dataValue
        )
        if (selected) {
            inputValue.value = props.reduceLabel(selected)
        } else if (props.isAutoComplete) {
            inputValue.value = String(props.dataValue)
        }
    } else {
        inputValue.value = ''
    }
})
</script>

<template>
    <BcForm v-bind="props" @clear="handleClear">
        <div class="relative w-full">
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
                        :aria-current="dataValue === reduceValue(item)"
                        @click="handleSelect(item)"
                        @mousemove="tabIndex = index"
                    >
                        <slot
                            name="item"
                            :item="item"
                            :label="reduceLabel(item)"
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

[role='option-item'][aria-current='true'] {
    background: var(--primary);
    color: white;
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
