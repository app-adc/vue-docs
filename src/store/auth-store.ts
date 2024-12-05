// auth-store.ts
// สร้าง store สำหรับจัดการข้อมูลการยืนยันตัวตนโดยใช้ Pinia
import type { Auth } from '@/actions/auth/type-auth'
import { addDate } from 'adc-directive'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const initialData = (): Auth => ({
    access_token: '',
    user: {
        fullName: '',
        username: '',
        email: '',
        roles: [],
        userId: undefined,
    },
    refresh_token: '',
})

export const useAuthStore = defineStore(
    'auth',
    () => {
        // State - สถานะของข้อมูลผู้ใช้
        const state = ref<Auth>(initialData())
        const expires_at = ref<number>(0) // วินาทีที่ token หมดอายุ

        // Constants - ค่าคงที่ 7 วัน
        // ฟังก์ชันสำหรับคำนวณเวลาที่ token หมดอายุ
        const TOKEN_EXPIRES = 7 //วินาที ระยะเวลา token 7 หมดอายุ
        const getTime = () => addDate(new Date(), TOKEN_EXPIRES).getTime()

        // Getters - ฟังก์ชันสำหรับดึงข้อมูล
        // ตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
        const isAuthenticated = computed((): boolean => {
            if (!state.value.access_token || expires_at.value < 1) return false

            // ตรวจสอบว่า token ยังไม่หมดอายุ โดยคำนึงถึงเวลา buffer
            return Date.now() < expires_at.value - TOKEN_EXPIRES * 86400
        })

        // คำนวณเวลาที่เหลือก่อน token หมดอายุ
        const tokenExpiresIn = computed((): number => {
            if (!expires_at.value) return 0
            return Math.max(0, expires_at.value - Date.now())
        })

        // ตรวจสอบว่าผู้ใช้มีบทบาทที่กำหนดหรือไม่
        const getRole = computed(() => {
            return state.value.user.roles[0]
        })

        // ตรวจสอบว่าผู้ใช้เป็นผู้จัดการฝ่ายการค้าหรือไม่
        const isCommercialManager = computed((): boolean =>
            state.value.user.roles.includes('COMMERCIAL_MANAGER')
        )

        // ตรวจสอบว่าผู้ใช้เป็นฝ่ายบริการลูกค้าหรือไม่
        const isClientService = computed(() =>
            state.value.user.roles.includes('CLIENT_SERVICE')
        )

        const getToken = computed(() => state.value.access_token)
        const getState = computed(() => state.value)

        // Actions - ฟังก์ชันสำหรับจัดการข้อมูล
        // บันทึกข้อมูลผู้ใช้หลังจากล็อกอินสำเร็จ
        function setAuth(authData: Readonly<Auth>) {
            if (!authData) return
            state.value = Object.assign({}, authData)
            expires_at.value = getTime()
        }

        // อัพเดท token ใหม่
        function updateToken(access_token: string) {
            state.value.access_token = access_token
            expires_at.value = getTime()
        }

        // ล้างข้อมูลผู้ใช้ทั้งหมด
        function clearAuth() {
            state.value = initialData()
            expires_at.value = 0
        }

        // ฟังก์ชันสำหรับรีเฟรช token
        // async function refreshToken() {
        // }

        // ฟังก์ชันสำหรับล็อกเอาท์
        async function logout() {
            try {
                // เรียก API logout ถ้าจำเป็น
                clearAuth()
                localStorage.clear()
                sessionStorage.clear()

                return true
            } catch (error) {
                console.error('Logout error:', error)
                return false
            }
        }

        return {
            state,
            expires_at,
            // ส่งออก Getters
            getState, // ดึงข้อมูลผู้ใช้
            getToken, // ดึง token ปัจจุบัน
            isAuthenticated, // ตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
            tokenExpiresIn, // วินาทีที่เหลือก่อน token หมดอายุ
            getRole, // ตรวจสอบว่าผู้ใช้มีบทบาทที่กำหนดหรือไม่
            isCommercialManager, // ตรวจสอบว่าผู้ใช้เป็นผู้จัดการฝ่ายการค้าหรือไม่
            isClientService, // ตรวจสอบว่าผู้ใช้เป็นฝ่ายบริการลูกค้าหรือไม่

            // ส่งออก Actions
            setAuth, // บันทึกข้อมูลผู้ใช้หลังจากล็อกอินสำเร็จ
            updateToken, // อัพเดท token ใหม่
            clearAuth, // ล้างข้อมูลผู้ใช้ทั้งหมด
            logout, // ฟังก์ชันสำหรับล็อกเอาท์
            // refreshToken, // ฟังก์ชันสำหรับรีเฟรช token
        }
    },
    {
        // การตั้งค่าการเก็บข้อมูลใน localStorage
        persist: [
            {
                key: 'auth-autocare-o2o',
                storage: localStorage,
                pick: ['state', 'expires_at'],
            },
        ],
    }
)
