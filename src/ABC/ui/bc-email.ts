// ประเภทข้อมูลสำหรับผลลัพธ์การตรวจสอบอีเมล
type ValidationEmailResult = {
    isValid: boolean
    message: string
}

/**
 * ฟังก์ชันตรวจสอบอีเมลแบบพื้นฐานด้วย regex
 * @param email - อีเมลที่ต้องการตรวจสอบ
 * @returns boolean ที่บ่งบอกว่าอีเมลถูกต้องหรือไม่
 */

/**
 * ฟังก์ชันตรวจสอบอีเมลแบบละเอียดพร้อมข้อความแจ้งเตือน
 * @param email - อีเมลที่ต้องการตรวจสอบ
 * @param options - ตัวเลือกการตรวจสอบเพิ่มเติม
 * @returns ValidationEmailResult ผลลัพธ์การตรวจสอบและข้อความ
 */
export const validateEmail = (
    email: string,
    options: {
        allowEmpty?: boolean // อนุญาตให้เป็นค่าว่างได้หรือไม่
        maxLength?: number // ความยาวสูงสุดที่ยอมรับ
        allowedDomains?: string[] // โดเมนที่อนุญาต
        blockDisposable?: boolean // บล็อกอีเมลชั่วคราวหรือไม่
    } = {}
): ValidationEmailResult => {
    // ค่าเริ่มต้นของตัวเลือก
    const {
        allowEmpty = false,
        maxLength = 254, // ตามมาตรฐาน RFC 5321
        allowedDomains = [],
        blockDisposable = false,
    } = options

    // ตรวจสอบค่าว่าง
    if (!email) {
        return {
            isValid: allowEmpty,
            message: allowEmpty ? '' : 'กรุณากรอกอีเมล',
        }
    }

    // ตรวจสอบความยาวอีเมล
    if (email.length > maxLength) {
        return {
            isValid: false,
            message: `อีเมลต้องไม่เกิน ${maxLength} ตัวอักษร`,
        }
    }

    // ตรวจสอบรูปแบบอีเมลด้วย regex ตามมาตรฐาน RFC 5322
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: 'รูปแบบอีเมลไม่ถูกต้อง',
        }
    }

    // ตรวจสอบโดเมนที่อนุญาต (ถ้ามีการระบุ)
    if (allowedDomains.length > 0) {
        const domain = email.split('@')[1]
        if (!allowedDomains.includes(domain)) {
            return {
                isValid: false,
                message: `อีเมลต้องลงท้ายด้วย ${allowedDomains.join(' หรือ ')}`,
            }
        }
    }

    // ตรวจสอบและบล็อกอีเมลชั่วคราว
    if (blockDisposable) {
        const disposableDomains = [
            'fake.com',
            'hack.com',
            'block.org',
            // เพิ่มโดเมนอีเมลชั่วคราวอื่นๆ ตามต้องการ
        ]
        const domain = email.split('@')[1]
        if (disposableDomains.includes(domain)) {
            return {
                isValid: false,
                message: 'ไม่อนุญาตให้ใช้อีเมลชั่วคราว',
            }
        }
    }

    // ผ่านการตรวจสอบทั้งหมด
    return {
        isValid: true,
        message: '',
    }
}

/**
 * ตัวอย่างการใช้งานใน Vue Component:
 *
 * import { ref, computed } from 'vue';
 * import { validateEmail } from '@/utils/validators';
 *
 * // ใน setup:
 * const email = ref('');
 * const emailError = ref('');
 *
 * // ตรวจสอบอีเมลพร้อมตัวเลือกเพิ่มเติม
 * const validateEmailInput = () => {
 *   const result = validateEmail(email.value, {
 *     allowEmpty: false, // ไม่อนุญาตให้เป็นค่าว่าง
 *     maxLength: 100,    // จำกัดความยาวสูงสุด 100 ตัวอักษร
 *     allowedDomains: ['company.com'],  // อนุญาตเฉพาะอีเมลจากโดเมนที่กำหนด
 *     blockDisposable: true  // บล็อกอีเมลชั่วคราว
 *   });
 *
 *   emailError.value = result.message;
 *   return result.isValid;
 * };
 */
