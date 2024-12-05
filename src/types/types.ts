import { ColorName, IconName } from '@/ABC/bc-types'

export type Car = {
    carBrand: string | null
    carModel: string | null
    nickname: string | null
}
export type Filter<T> = {
    totalElements: number
    content: Array<T>
}
/*-------------x----------------forResponse Endpoint-----------------x---------------*/

/*------------------------------for route---------------------------------*/

export const EnumRouter = {
    authLogin: 'authLogin',
    authRegister: 'authRegister',
    authForgetPassword: 'authForgetPassword',

    customerList: 'customerList',
    customerCreate: 'customerCreate',
    customerEdit: 'customerEdit',

    couponList: 'couponList',
    couponCreate: 'couponCreate',
    couponEdit: 'couponEdit',

    companyList: 'companyList',
    companyCreate: 'companyCreate',
    companyEdit: 'companyEdit',

    branchList: 'branchList',
    branchCreate: 'branchCreate',
    branchEdit: 'branchEdit',

    employeeList: 'employeeList',
    employeeEdit: 'employeeEdit',

    serviceList: 'serviceList',
    serviceCreate: 'serviceCreate',
    serviceEdit: 'serviceEdit',

    exampleTest: 'exampleTest',
    exampleSelect: 'exampleSelect',
    exampleIcon: 'exampleIcon',

    crmList: 'crmList',
    crmEdit: 'crmEdit',

    // customer
    customerOrderInfo: 'customerOrderInfo',
    customerOrderReviews: 'customerOrderReviews',
    customerOrderBranch: 'customerOrderBranch',

    REDIRECT: 'REDIRECT',

    // shop
    shopOrderInfo: 'shopOrderInfo',
}
export type KeyRouter = keyof typeof EnumRouter
export type AlertModal = {
    show: boolean
    isButtons?: boolean
    title?: string | string[]
    text?: string | string[]
    icon?: IconName
    color: ColorName
    isClose?: boolean
    isClickOutSide?: boolean
    buttonType?: 'CONFIRM' | 'TWINS' | 'CANCEL'
    textConfirm?: string
    textCancel?: string
}

export const enumStatus = {
    WAITING_FOR_SERVICE: 'รอเข้ารับบริการ',
    PROCESSING_SERVICE: 'กำลังดำเนินการรับบริการ',
    WAITING_FOR_REVIEW: 'รอรีวิวจากลูกค้า',
    COMPLETED: 'เสร็จสิ้น',
    CANCELED: 'ยกเลิก',
} as const
