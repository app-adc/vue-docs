import { RouteRecordRaw } from 'vue-router'

const routeBc: RouteRecordRaw = {
    path: '/bc',
    meta: {
        group: 'BC',
        title: 'app components',
    },
    children: [
        {
            path: '/',
            component: () => import('@/ABC/pages/bc_doc_http.vue'),
        },
        {
            path: 'http-client',
            component: () => import('@/ABC/pages/bc_doc_http.vue'),
        },
        {
            path: 'icon',
            component: () => import('@/ABC/pages/bc_doc_icon.vue'),
        },
        {
            path: 'input',
            component: () => import('@/ABC/pages/bc_doc_input.vue'),
        },
        {
            path: 'input-currency',
            component: () => import('@/ABC/pages/bc_doc_input-currency.vue'),
        },
        {
            path: 'select',
            component: () => import('@/ABC/pages/bc_doc_select.vue'),
        },
        {
            path: 'pagination',
            component: () => import('@/ABC/pages/bc_doc_pagination.vue'),
        },
        {
            path: 'button',
            component: () => import('@/ABC/pages/bc_doc_button.vue'),
        },
        {
            path: 'checkbox',
            component: () => import('@/ABC/pages/bc_doc_checkbox.vue'),
        },
        {
            path: 'toggle',
            component: () => import('@/ABC/pages/bc_doc_toggle.vue'),
        },
        {
            path: 'modal',
            component: () => import('@/ABC/pages/bc_doc_modal.vue'),
        },
        {
            path: 'modal-alert',
            component: () => import('@/ABC/pages/bc_doc_modal_alert.vue'),
        },
        {
            path: 'toast',
            component: () => import('@/ABC/pages/bc_doc_toast.vue'),
        },
        {
            path: 'calendar-between',
            component: () => import('@/ABC/pages/bc_doc_calendarBetween.vue'),
        },
        {
            path: 'calendar',
            component: () => import('@/ABC/pages/bc_doc_calendar.vue'),
        },
        {
            path: 'input-file',
            component: () => import('@/ABC/pages/bc_doc_input_file_upload.vue'),
        },
        {
            path: 'time',
            component: () => import('@/ABC/pages/bc_doc_time.vue'),
        },
        {
            path: 'time-range',
            component: () => import('@/ABC/pages/bc_doc_time_range.vue'),
        },
        {
            path: 'adc-directives',
            component: () =>
                import('@/ABC/pages/directives/doc_adc_directives.vue'),
        },
        {
            path: 'upload-image-preview',
            component: () =>
                import('@/ABC/pages/bc_doc_upload_image_preview.vue'),
        },
        {
            path: 'rating',
            component: () => import('@/ABC/pages/bc_doc_rating.vue'),
        },
    ],
}

const routes: Array<RouteRecordRaw> = []
routes.push(routeBc)
export default routes
