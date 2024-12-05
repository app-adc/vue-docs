import bcRoute from '@/ABC/bc-route'
import general from '@/router/generalRoute'
import { createRouter, createWebHistory } from 'vue-router'

import { storeApp } from '@/store/app'

const routes = [...bcRoute, ...general]

const router = createRouter({
    history: createWebHistory('/BcDocs/'), // แก้จาก createWebHistory() เป็น createWebHistory('/BcDocs/')
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
