import { toCombineText } from 'adc-directive'

/**
 * ตรวจสอบว่าค่าเป็น empty string หรือไม่
 * @description array, object, map, set ที่มีข้อมูลเป็น empty จะถือว่าเป็น empty
 */
export const isEmpty = (value: unknown): boolean => {
    const _value = copyDeep(value)
    if (_value === null || _value === undefined) {
        return true
    }

    if (typeof _value === 'string') {
        return _value.trim().length === 0
    }

    if (Array.isArray(_value)) {
        return _value.length === 0
    }

    if (_value instanceof Map || _value instanceof Set) {
        return _value.size === 0
    }

    if (typeof _value === 'object') {
        return Object.keys(_value as object).length === 0
    }

    // Numbers (including 0) and booleans are never considered empty
    if (typeof _value === 'number' || typeof _value === 'boolean') {
        return false
    }

    // For any other types, consider them non-empty
    return false
}

/**
 * ตรวจสอบว่าเป็น plain object หรือไม่
 */
export const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.keys(value as object).length > 0

/**
 * ตรวจสอบว่าเป็นอีเมลหรือไม่
 * @param email - อีเมลที่ต้องการตรวจสอบ
 */
export const isEmail = (email: Readonly<unknown>): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(toCombineText([email]))
}

/**
 * ฟังก์ชันสร้างสำเนาเชิงลึกของข้อมูล (Deep Copy)
 * - รองรับข้อมูลประเภท object, array, primitive types
 * - ป้องกัน circular reference
 * - รองรับ Date, RegExp, Map, Set
 * - ประสิทธิภาพสูงด้วยการใช้ WeakMap สำหรับเก็บ reference
 *
 * @template T - ประเภทของข้อมูลที่จะทำสำเนา
 * @param {T} source - ข้อมูลต้นฉบับที่ต้องการทำสำเนา
 * @returns {T} สำเนาของข้อมูลที่ถูกคัดลอกแบบเชิงลึก
 */
export const copyDeep = <T>(source: T): T => {
    // WeakMap สำหรับเก็บ reference เพื่อป้องกัน circular reference
    const refs = new WeakMap()

    // ฟังก์ชันภายในสำหรับทำ deep copy แบบ recursive
    const copy = (value: any): any => {
        // กรณีเป็น primitive types หรือ null/undefined
        if (value === null || typeof value !== 'object') {
            return value
        }

        // ตรวจสอบ circular reference
        if (refs.has(value)) {
            return refs.get(value)
        }

        // จัดการกรณี Date object
        if (value instanceof Date) {
            return new Date(value)
        }

        // จัดการกรณี RegExp
        if (value instanceof RegExp) {
            return new RegExp(value.source, value.flags)
        }

        // จัดการกรณี Map
        if (value instanceof Map) {
            const mapCopy = new Map()
            refs.set(value, mapCopy)
            value.forEach((val, key) => {
                mapCopy.set(copy(key), copy(val))
            })
            return mapCopy
        }

        // จัดการกรณี Set
        if (value instanceof Set) {
            const setCopy = new Set()
            refs.set(value, setCopy)
            value.forEach((val) => {
                setCopy.add(copy(val))
            })
            return setCopy
        }

        // สร้าง object หรือ array ใหม่
        const cloned = Array.isArray(value) ? [] : {}

        // เก็บ reference ของ object ที่กำลังคัดลอก
        refs.set(value, cloned)

        // คัดลอก properties ทั้งหมดแบบ recursive
        return Object.keys(value).reduce((obj: any, key: string) => {
            obj[key] = copy(value[key])
            return obj
        }, cloned)
    }

    return copy(source)
}
