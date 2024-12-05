<script setup lang="ts">
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import HttpClientPlayground from '@/ABC/pages/children/HttpClientPlayground.vue'
import HttpExamples from '@/ABC/pages/children/HttpExamples.vue'

// Props ที่รองรับของ ADC
const propsData = [
    {
        prop: 'query',
        type: 'string',
        required: false,
        default: '-',
        description:
            'GraphQL query ถ้ามี query แปลว่าเป็น graphql ถ้าไม่มีแปลว่าเป็น rest api',
    },
    {
        prop: 'variables',
        type: 'object',
        required: false,
        default: '{}',
        description: 'ตัวแปรสำหรับ query หรือ body rest api',
    },
    {
        prop: 'baseURL',
        type: 'string',
        required: false,
        default: "''",
        description: 'URL เฉพาะสำหรับ request นี้',
    },
    {
        prop: 'method',
        type: "'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'",
        required: false,
        default: "'POST'",
        description: 'HTTP method',
    },
    {
        prop: 'headers',
        type: 'Record<string, string>',
        required: false,
        default: '{}',
        description: 'HTTP headers เพิ่มเติม',
    },
    {
        prop: 'contentType',
        type: "'application/json' | 'multipart/form-data'",
        required: false,
        default: "'application/json'",
        description: 'ประเภทของข้อมูลที่จะส่ง',
    },
    {
        prop: 'name',
        type: 'string',
        required: false,
        default: "''",
        description: 'key สำหรับดึงข้อมูลจาก response เช่น "data.employee"',
    },
    {
        prop: 'token',
        type: 'string',
        required: false,
        default: '-',
        description: 'token สำหรับ bearer authentication',
    },
    {
        prop: 'timeout',
        type: 'number',
        required: false,
        default: '8000',
        description: 'เวลา timeout (milliseconds)',
    },
    {
        prop: 'retries',
        type: 'number',
        required: false,
        default: '0',
        description: 'จำนวนครั้งที่จะลองใหม่เมื่อเกิดข้อผิดพลาด',
    },
    {
        prop: 'interceptors',
        type: 'Array<Interceptor<Res>>',
        required: false,
        default: '[]',
        description: 'ฟังก์ชันสำหรับแปลงข้อมูล response ก่อน return',
    },
    {
        prop: 'contextApi',
        type: 'string',
        required: false,
        default: '-',
        description:
            'key สำหรับเก็บข้อมูล context จาก response เช่น errors.0.message',
    },
    {
        prop: 'storage',
        type: "'cache' | 'localStorage' | 'session'",
        required: false,
        default: '-',
        description: 'ประเภทการเก็บข้อมูล cache',
    },
    {
        prop: 'timeToLive',
        type: 'number | (() => number)',
        required: false,
        default: '15 (minutes)',
        description: 'เวลาที่ข้อมูลจะถูกเก็บไว้ใน storage',
    },
]

// Methods ที่รองรับ
const methodsData = [
    {
        method: 'post',
        params: 'RequestConfig<Req, Res>',
        returns: 'Promise<Res>',
        description: 'ส่ง HTTP POST request',
    },
    {
        method: 'get',
        params: 'RequestConfig<Req, Res>',
        returns: 'Promise<Res>',
        description: 'ส่ง HTTP GET request',
    },
    {
        method: 'clearStorage',
        params: "'cache' | 'localStorage' | 'session'",
        returns: 'void',
        description:
            'ล้างข้อมูลใน storage ตามประเภทที่ระบุ หรือทั้งหมดถ้าไม่ระบุ',
    },
]
</script>

<template>
    <BcLayout
        title="ADC"
        subtitle="คลาสสำหรับจัดการการเรียก HTTP API แบบมีประสิทธิภาพ พร้อมระบบ caching และจัดการข้อผิดพลาด"
        icon="Globe"
    >
        <!-- Props Table -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="ListFilter" size="24" color="primary" />
                <h2 class="text-xl font-bold">Properties ที่รองรับ</h2>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-slate-800 text-white">
                            <th class="border p-3 text-left w-1/6">Property</th>
                            <th class="border p-3 text-left w-1/4">Type</th>
                            <th class="border p-3 text-left w-1/6">Default</th>
                            <th class="border p-3 text-left">คำอธิบาย</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prop in propsData" :key="prop.prop">
                            <td class="border p-3 font-mono text-sm">
                                {{ prop.prop }}
                            </td>
                            <td
                                class="border p-3 font-mono text-sm text-blue-600"
                            >
                                {{ prop.type }}
                            </td>
                            <td class="border p-3 font-mono text-sm">
                                {{ prop.default }}
                            </td>
                            <td class="border p-3">{{ prop.description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Methods Table -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Hash" size="24" color="primary" />
                <h2 class="text-xl font-bold">Methods ที่รองรับ</h2>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-slate-800 text-white">
                            <th class="border p-3 text-left w-1/6">Method</th>
                            <th class="border p-3 text-left w-1/4">
                                Parameters
                            </th>
                            <th class="border p-3 text-left w-1/6">Returns</th>
                            <th class="border p-3 text-left">คำอธิบาย</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="method in methodsData" :key="method.method">
                            <td class="border p-3 font-mono text-sm">
                                {{ method.method }}
                            </td>
                            <td
                                class="border p-3 font-mono text-sm text-blue-600"
                            >
                                {{ method.params }}
                            </td>
                            <td class="border p-3 font-mono text-sm">
                                {{ method.returns }}
                            </td>
                            <td class="border p-3">{{ method.description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Interactive Playground -->
        <HttpClientPlayground />

        <!-- Examples -->
        <HttpExamples />
    </BcLayout>
</template>

<style scoped>
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}

code {
    font-family: ui-monospace, monospace;
}

.bg-slate-800 :deep(.bg-white) {
    --tw-bg-opacity: 0.9;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-slate-800 :deep(.bg-white:hover) {
    --tw-bg-opacity: 1;
}
</style>
