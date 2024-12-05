import { AppTitle } from '@/store/app'
import { RouteRecordRaw } from 'vue-router'

const general: Array<RouteRecordRaw> = [
    {
        path: '/BcDocs/',
        name: 'Home',
        component: () => import('@/ABC/pages/bc_doc_http.vue'),
        meta: {
            title: `${AppTitle} | Home`,
        },
    },
]

export default general
