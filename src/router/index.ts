import bcRoute from '@/ABC/bc-route'
import { createRouter, createWebHashHistory } from 'vue-router'

import homeRoute from '@/router/homeRoute'
import { storeApp } from '@/store/app'

const routes = [...bcRoute, ...homeRoute]

const router = createRouter({
    history: createWebHashHistory(), // เปลี่ยนเป็น createWebHashHistory
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash, //# for tag a
                behavior: 'smooth',
            }
        } else return { top: 0 }
    },
})

router.beforeEach((to, from, next) => {
    document.title = `BcDocs | ${to.meta.title}`
    let appStore = storeApp()
    appStore.setRouteFrom(from.fullPath)
    to.meta.back = from.fullPath

    // if (to.query?.event) {
    //     appStore.addEvent(to.query.event as string)
    // }
    next()
})

export default router
