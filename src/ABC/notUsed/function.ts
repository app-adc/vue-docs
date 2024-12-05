import { RegexKey, regexPatterns } from '@/ABC/ui/bc-regexp'

/**
 * คำนวณค่าเฉลี่ยของ array ตาม property ที่กำหนด
 * @param array - array ที่ต้องการคำนวณ
 * @param iteratee - ฟังก์ชันที่ใช้ดึงค่าที่ต้องการคำนวณ
 * @returns ค่าเฉลี่ย
 */
export function toNumberByAverage<T>(
    array: ReadonlyArray<T>,
    iteratee: (item: T) => number
): number {
    if (!array.length) return 0

    const sum = array.reduce((acc, item) => acc + iteratee(item), 0)
    return sum / array.length
}

/**
 * จัดกลุ่ม array ตาม property ที่กำหนด
 * @param array - array ที่ต้องการจัดกลุ่ม
 * @param iteratee - ฟังก์ชันที่ใช้ดึงค่าที่ใช้จัดกลุ่ม
 * @returns object ที่จัดกลุ่มแล้ว
 */
export function toPayloadByGroup<T>(
    array: ReadonlyArray<T>,
    iteratee: (item: T) => string | number
): Record<string, T[]> {
    return array.reduce((acc: Record<string, T[]>, item) => {
        const key = String(iteratee(item))
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(item)
        return acc
    }, {})
}

/**
 * รวมผลรวมของ array ตาม property ที่กำหนด
 * @param array - array ที่ต้องการหาผลรวม
 * @param iteratee - ฟังก์ชันที่ใช้ดึงค่าที่ต้องการหาผลรวม
 * @returns ผลรวม
 */
export function toNumberBySum<T>(
    array: ReadonlyArray<T>,
    iteratee: (item: T) => number
): number {
    return array.reduce((sum, item) => sum + iteratee(item), 0)
}

/**
 * สร้าง object จาก array โดยใช้ key ที่กำหนด
 * @param array - array ที่ต้องการแปลง
 * @param iteratee - ฟังก์ชันที่ใช้ดึงค่า key
 * @returns object ที่ใช้ key จาก iteratee
 * @description ถ้า key=>value ซ้ำ จะใช้ key=>valueล่าสุด
 */
export function toPayloadByKey<T>(
    array: ReadonlyArray<T>,
    iteratee: (item: T) => string | number
): Record<string, T> {
    return array.reduce((acc: Record<string, T>, item) => {
        acc[String(iteratee(item))] = item
        return acc
    }, {})
}

/**
 *
 * @param array
 * @param iteratee
 * @returns number
 * @description หาค่ามากสุดของ array ตาม property ที่กำหนด
 */
export function toNumberByMax<T>(
    array: ReadonlyArray<T>,
    iteratee: (item: T) => number
): number {
    if (!array.length) return 0
    return Math.max(...array.map(iteratee))
}

/**
 *
 * @param array
 * @param iteratee
 * @returns number
 * @description หาค่าน้อยสุดของ array ตาม property ที่กำหนด
 */
export function toNumberByMin<T>(
    array: ReadonlyArray<T>,
    iteratee: (item: T) => number
): number {
    if (!array.length) return 0
    return Math.min(...array.map(iteratee))
}

/**
 * หาค่าสูงสุดจาก array ตาม property ที่กำหนด
 * @param array - array ที่ต้องการหาค่าสูงสุด
 * @param iteratee - ฟังก์ชันที่ใช้ดึงค่าที่ต้องการเปรียบเทียบ
 * @returns payload ค่าสูงสุดของ array | undefined
 */
export const payloadByMax = <T>(
    array: ReadonlyArray<T>,
    iteratee: (item: T) => number
): T | undefined => {
    if (!array.length) return undefined

    return array.reduce((max, item) => {
        return iteratee(item) > iteratee(max) ? item : max
    }, array[0])
}

/**
 * หาค่าสูงสุดจาก array ตาม property ที่กำหนด
 * @param array - array ที่ต้องการหาค่าสูงสุด
 * @param iteratee - ฟังก์ชันที่ใช้ดึงค่าที่ต้องการเปรียบเทียบ
 * @returns payload ค่าน้อยสุดของ array | undefined
 */
export const payloadByMin = <T>(
    array: ReadonlyArray<T>,
    iteratee: (item: T) => number
): T | undefined => {
    if (!array.length) return undefined

    return array.reduce((max, item) => {
        return iteratee(item) < iteratee(max) ? item : max
    }, array[0])
}

/**
 * ฟังก์ชันตรวจสอบรูปแบบวันที่ว่าถูกต้องตามที่กำหนดหรือไม่
 * @param {string} dateStr - สตริงวันที่ที่ต้องการตรวจสอบ
 * @param {string} format - รูปแบบวันที่ที่ต้องการ (ค่าเริ่มต้น: 'YYYY-MM-DD')
 * @returns {boolean} คืนค่า true ถ้าวันที่ตรงตามรูปแบบ, false ถ้าไม่ตรง
 */
export const checkFormatDate = (
    dateStr: string,
    format = 'YYYY-MM-DD'
): boolean => {
    // ตรวจสอบข้อมูลเบื้องต้น
    if (!dateStr || typeof dateStr !== 'string') {
        return false
    }
    let data = dateStr
    let regExp = /[^0-9\-\/\.]/
    // ตัดเวลาออก
    if (data.split(regExp).length > 1) {
        data = data.split(regExp)[0]
    }
    // กำหนดรูปแบบ regex สำหรับส่วนประกอบต่างๆ ของวันที่
    const patterns = {
        YYYY: '^\\d{4}$', // ปี 4 หลัก
        YY: '^\\d{2}$', // ปี 2 หลัก
        MM: '^(0[1-9]|1[0-2])$', // เดือน 01-12
        DD: '^(0[1-9]|[12]\\d|3[01])$', // วันที่ 01-31
        M: '^([1-9]|1[0-2])$', // เดือน 1-12
        D: '^([1-9]|[12]\\d|3[01])$', // วันที่ 1-31
    }

    // แยกส่วนของวันที่และรูปแบบด้วยตัวคั่น (-/.)
    const dateParts = data.split(/[-/.]/)
    const formatParts = format.toLocaleUpperCase().split(/[-/.]/)

    // ตรวจสอบว่าจำนวนส่วนประกอบตรงกันหรือไม่
    if (dateParts.length !== formatParts.length) {
        return false
    }

    // ตรวจสอบแต่ละส่วนว่าตรงตามรูปแบบที่กำหนดหรือไม่
    for (let i = 0; i < formatParts.length; i++) {
        const part = dateParts[i]
        const formatPart = formatParts[i]
        const pattern = patterns[formatPart as keyof typeof patterns]

        // ถ้าไม่มีรูปแบบที่ตรงกันหรือข้อมูลไม่ตรงตาม regex
        if (!pattern || !new RegExp(pattern).test(part)) {
            return false
        }

        // ตรวจสอบเพิ่มเติมสำหรับวันที่ โดยคำนึงถึงเดือนและปี
        if (formatPart === 'DD' || formatPart === 'D') {
            const year = parseInt(
                dateParts[formatParts.indexOf('YYYY')] ||
                    dateParts[formatParts.indexOf('YY')]
            )
            const month = parseInt(
                dateParts[formatParts.indexOf('MM')] ||
                    dateParts[formatParts.indexOf('M')]
            )
            const day = parseInt(part)

            // ตรวจสอบจำนวนวันในแต่ละเดือน
            const daysInMonth = new Date(year, month, 0).getDate()
            if (day > daysInMonth) {
                return false
            }
        }
    }

    return true
}

/**
 * สร้าง Promise ที่จะ resolve หลังจากเวลาที่กำหนด พร้อมรองรับ callback function
 *
 * @template T - ประเภทข้อมูลที่จะส่งคืน (return type)
 * @template P - ประเภทข้อมูลที่จะส่งให้ callback function
 *
 * @param ms - ระยะเวลาที่ต้องการหน่วง (มิลลิวินาที)
 * @param callbackFn - ฟังก์ชันที่จะทำงานหลังจาก delay
 * @param value - ค่าที่จะส่งให้ callback function (optional)
 *
 * @returns Promise<T | undefined> - Promise ที่จะ resolve หลังจากเวลาที่กำหนดพร้อมค่าที่ได้จาก callback
 *
 * @example
 * // การใช้งานพื้นฐาน
 * await delayPromise(1000, () => console.log('Done!'))
 *
 * // การใช้งานพร้อมส่งค่าให้ callback และรับค่ากลับ
 * const result = await delayPromise(
 *   1000,
 *   (x: number) => x * 2,
 *   5
 * ) // result = 10
 *
 * // การใช้งานใน Vue Composition API
 * const loading = ref(true)
 * await delayPromise(1000, () => {
 *   loading.value = false
 * })
 *
 * // การใช้งานกับ async callback
 * const data = await delayPromise(1000, async () => {
 *   const response = await fetch('...')
 *   return response.json()
 * })
 */
export async function delayPromise<T = void, P = void>(
    ms: number,
    callbackFn?: (value?: P) => T | Promise<T>,
    value?: P
): Promise<T | undefined> {
    // รอให้ครบเวลาที่กำหนด
    await new Promise<void>((resolve) => {
        setTimeout(resolve, ms)
    })

    try {
        // ถ้ามี callback function ให้เรียกใช้และส่งค่ากลับ
        if (callbackFn) {
            // รองรับทั้ง sync และ async callback
            return await callbackFn(value)
        }

        // ถ้าไม่มี callback ให้ return undefined
        return undefined
    } catch (error) {
        // จัดการ error จาก callback function
        console.error('Error in delay callback:', error)
        throw error // ส่ง error ต่อเพื่อให้ผู้ใช้จัดการได้
    }
}

/**
 * สร้าง RegExp จากรูปแบบที่กำหนด
 * @param patterns รายการรูปแบบที่ต้องการ (th, en, space, number)
 * @param flag รูปแบบ flag สำหรับ RegExp (default: 'gi')
 * @returns RegExp ที่รวมรูปแบบทั้งหมด flag
 *
 * g: เหมาะสำหรับการค้นหาทั้งหมดในข้อความ
 *
 * i: เหมาะสำหรับการค้นหาโดยไม่สนใจตัวพิมพ์เล็ก/ใหญ่
 *
 * m: เหมาะสำหรับการทำงานกับข้อความหลายบรรทัด
 *
 * u: เหมาะสำหรับการทำงานกับ Unicode โดยเฉพาะภาษาไทย
 */
export const toRegExp = (
    patterns: Array<RegexKey | RegExp>,
    flags: string = 'g'
): RegExp => {
    const combinedPattern = patterns
        .map((pattern) => {
            if (pattern instanceof RegExp) {
                return pattern.source
            }
            return regexPatterns[pattern as RegexKey].source
        })
        .join('|')

    // สร้าง RegExp พร้อม flag ที่กำหนด
    return new RegExp(combinedPattern, flags)
}

/**
 * Replaces text based on specified regexp patterns
 * @param options Configuration options for text replacement
 * @returns Processed text with only allowed characters
 * @throws Error if invalid format key is provided
 */
export function replaceTextByRegExp(
    text: string,
    patterns: Array<RegexKey | RegExp>,
    flags: string = 'g'
): string {
    if (patterns.length === 0) return text

    // Early return for empty text
    if (!text) return ''

    try {
        // Create composite regex pattern
        const pattern = toRegExp(patterns, flags)

        // Match all allowed characters and join them
        const matches = text.match(pattern) || []
        return matches.join('')
    } catch (error) {
        console.error('Error in replaceTextByRegExp:', error)
        return text // Return original text in case of error
    }
}
