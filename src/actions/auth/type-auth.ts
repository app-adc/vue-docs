//----------------------   Auth   --------------------------//

export type Role = keyof typeof ROLES
export type Permission = (typeof ROLES)[Role][number]

//view, active,  path,
export const ROLES = {
    COMMERCIAL_MANAGER: [
        'path:admin',
        'path:admin-employee',
        'view:menu-employee',
        'view:button-export-service',
        'view:button-export-import-customer',
        'view:button-export-import-coupon',
        'view:button-export-import-company',
        'view:button-export-import-branch',
        'view:button-export-import-employee',
        'view:button-export-crm',
    ],
    CLIENT_SERVICE: ['path:admin'],
} as const

// Union type สำหรับ Role จาก values ของ AuthRoles

// Interface หลักสำหรับข้อมูล Authentication
export type Auth = {
    access_token: string
    user: {
        fullName: string
        username: string
        email: string
        roles: Role[]
        userId?: number
    }
    refresh_token: string
}
//---------------------x   Auth   x-------------------------//
