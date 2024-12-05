import { colors } from '@/ABC/ui/bc-colors'
import { icons } from '@/ABC/ui/bc-icons'
import type { RegexKey } from '@/ABC/ui/bc-regexp'
import { CSSProperties } from 'vue'

export type IconName = keyof typeof icons
export type ColorName = keyof typeof colors
/*------------------------------Form---------------------------------*/

export type TypeInputValue = string | number | null | File | undefined
export type TimeValue = string | null

type SwPrefix<T extends string> = T extends '' ? '' : `.${T}`
export type NestedKeys<T> = (
    T extends object
        ? {
              [K in Exclude<keyof T, symbol>]: `${K}${SwPrefix<
                  NestedKeys<T[K]>
              >}`
          }[Exclude<keyof T, symbol>]
        : ''
) extends infer D
    ? Extract<D, string>
    : never

export type PropsModal = {
    /**
     * สถานะการแสดง modal
     */
    modelValue: boolean
    /**
     * ID ของ modal สำหรับ accessibility
     */
    id: string
    /**
     * ปรับแต่ง style ของ modal content
     */
    styleCustom?: CSSProperties
    /**
     * หัวข้อของ modal
     */
    isClose?: boolean
    /**
     * กำหนดความกว้างของ modal
     * @default '340px'
     */
    width?: number
    /**
     * label สำหรับ accessibility
     */
    ariaLabel?: string
    isClickOutSide?: boolean
}

export type PropsInput = {
    id: string
    dataValue: TypeInputValue
    label?: string
    placeholder?: string // placeholder
    rule?: (arg: string) => boolean
    error?: (arg: string) => string
    icon?: IconName
    isClear?: boolean
    isLoading?: boolean
    isDebounce?: boolean
    durationDebounce?: number
    formats?: RegexKey[]
    form?: string // runValidate
    disabled?: boolean
}
