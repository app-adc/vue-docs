import { copyDeep, isEmpty, isObject } from '@/ABC/ui/bc-functional'

export const runValidate = (target: string): Array<HTMLElement | string> => {
    let errors: Array<HTMLElement | string> = []

    //validate แบบใหม่
    const name = `[aria-invalid="true"][data-form="${target}"]`
    const elements = document.querySelectorAll(name)

    elements.forEach((el) => {
        const element = el as HTMLElement
        element.ariaChecked = 'true'
        errors.push(element)
    })

    // adc validate แบบเก่า
    const inputElement = document.querySelectorAll(
        `[data_invalid][form="${target}"]`
    )
    inputElement.forEach((el) => {
        const input = el as HTMLElement
        //[data_invalid='true'] แปลว่า component มี rule error จริง
        if (el.getAttribute('data_invalid') === 'true') {
            // aria-checked='true'
            input.ariaChecked = 'true'
            // เสมือนให้ Component rule error เป็น isFocus = true
            errors.push(input.id)
        }
    })

    const element = errors[0]
    if (element && element instanceof HTMLElement) {
        const input = element.querySelector('input')
        let msg =
            element.getAttribute('aria-errormessage')! || 'กรอกข้อมูลให้ครบถ้วน'

        if (input) input.focus()
        alert(msg)
    } else if (element && typeof element === 'string') {
        const _inp = document.getElementById(element) as HTMLElement
        if (_inp) {
            let msg =
                _inp.getAttribute('data_error_message')! ||
                'กรอกข้อมูลให้ครบถ้วน'
            _inp.focus()
            alert(msg)
        }
    }
    return errors

    //เนื่องจากการทำงานของ validate แบบใหม่ และ แบบเก่า มีความแตกต่างกัน การ return ของ errors จึงต้องเป็น Array<HTMLElement | string> ถ้า type === string แสดงว่าเป็นการ validate แบบเก่า (string คือ id ของ inputElement)

    // ไม่สามารถไปใช้แบบใหม่ได้ทั้งหมด เพราะมีการใช้งานกันอยู่แล้วไม่สามารถแก้ไขโครงสร้างเดิมได้เพราะเกี่ยวพันหลาย app รวมถึงการทำ unit test ด้วย
}

/**
 * แปลงค่า empty string เป็น null ใน object
 * @param obj - Object ที่ต้องการแปลงค่า
 * @returns Object ใหม่ที่แปลงค่า empty string เป็น null แล้ว
 */
export function validatePayloadEmptyToNull<T>(obj: T): T {
    // ถ้าเป็น empty string ให้ return null

    const data = copyDeep(obj)
    if (isEmpty(data)) return null as T

    // ถ้าเป็น array ให้ทำการ map แต่ละ item

    if (Array.isArray(data)) {
        data.map((item) => validatePayloadEmptyToNull(item)) as T
        // return data.map((item) =>
        //     isObject(item) ? validatePayloadEmptyToNull(item) : item
        // ) as T
        // ถ้าเป็น array ให้ส่งกลับค่าเดิม ไม่เปลี่ยน null ใน array
        // return data
    }
    // ถ้าเป็น object ให้ทำการแปลงค่าใน properties
    if (isObject(data)) {
        return Object.entries(data).reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: validatePayloadEmptyToNull(value),
            }),
            {}
        ) as T
    }

    // ถ้าเป็น type อื่นๆ ให้ return ค่าเดิม
    return data
}
