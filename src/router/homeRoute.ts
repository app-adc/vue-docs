import { AppTitle } from '@/store/app'
import { RouteRecordRaw } from 'vue-router'

const homeRoute: Array<RouteRecordRaw> = [
    {
        path: '/', // เปลี่ยนจาก /Docs/
        name: 'Home',
        component: () => import('@/ABC/pages/bc_doc_http.vue'),
        meta: {
            title: `${AppTitle}Home`,
        },
    },
]

export default homeRoute
