<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcToast from '@/ABC/components/BcToast.vue'
import { ref } from 'vue'

// Toast state
const showToast = ref(false)
const toastMessage = ref('')

// ตัวอย่างการใช้งาน
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'การเรียกใช้ ADC แบบพื้นฐานด้วย POST request',
        code: `import { ADC } from '@/ABC/ui/bc-http'

// สร้าง instance ของ ADC
const httpClient = new ADC<RequestType, ResponseType>()

// ตั้งค่า configuration
const config = {
    baseURL: 'https://api.example.com/users',
    method: 'POST',
    variables: {
        name: 'John Doe',
        email: 'john@example.com'
    }
}

// ส่ง request
const response = await httpClient.post(config)`,
    },
    {
        title: 'การใช้งานกับ GraphQL',
        description: 'การใช้ ADC สำหรับ GraphQL query พร้อม variables',
        code: `const httpClient = new ADC<RequestType, ResponseType>()

const config = {
    baseURL: 'https://api.example.com/graphql',
    query: \`
        query GetUser($id: ID!) {
            user(id: $id) {
                id
                name
                email
            }
        }
    \`,
    variables: {
        id: "123"
    },
    name: 'data.user' // ระบุ path ของข้อมูลที่ต้องการ
}

const user = await httpClient.post(config)`,
    },
    {
        title: 'การใช้งานกับ Cache',
        description: 'การใช้ระบบ cache เพื่อเก็บข้อมูลและลดการเรียก API',
        code: `const httpClient = new ADC<RequestType, ResponseType>()

const config = {
    baseURL: 'https://api.example.com/data',
    storage: 'cache', // เลือกใช้ cache storage
    timeToLive: 15 * 60 * 1000, // cache หมดอายุใน 15 นาที
    name: 'data.result'
}

// ข้อมูลจะถูกเก็บใน cache และใช้ซ้ำถ้ายังไม่หมดอายุ
const data = await httpClient.get(config)

// ล้าง cache ทั้งหมด
httpClient.clearStorage('cache')`,
    },
    {
        title: 'การใช้ Interceptors',
        description: 'การแปลงข้อมูล response ก่อนส่งคืนด้วย interceptors',
        code: `const httpClient = new ADC<RequestType, ResponseType>()

// สร้าง interceptor function
const addTimestampInterceptor = (response: any) => {
    return {
        ...response,
        timestamp: new Date().toISOString()
    }
}

const formatDataInterceptor = (response: any) => {
    return {
        ...response,
        formattedData: response.data.map((item: any) => ({
            ...item,
            fullName: \`\${item.firstName} \${item.lastName}\`
        }))
    }
}

const config = {
    baseURL: 'https://api.example.com/users',
    interceptors: [
        addTimestampInterceptor,
        formatDataInterceptor
    ]
}

const response = await httpClient.get(config)`,
    },
    {
        title: 'การจัดการ Error',
        description: 'การใช้ contextApi เพื่อจัดการข้อผิดพลาดและ retry',
        code: `const httpClient = new ADC<RequestType, ResponseType>()

const config = {
    baseURL: 'https://api.example.com/data',
    retries: 3, // ลองใหม่ 3 ครั้งถ้าเกิดข้อผิดพลาด
    timeout: 5000, // timeout 5 วินาที
    contextApi: 'errors.0.message' // เก็บข้อความ error จาก response
}

try {
    const response = await httpClient.post(config)
} catch (error) {
    if (httpClient.HttpError) {
        console.error(\`Error: \${httpClient.context}\`)
        
        if (httpClient.HttpError.status === 401) {
            // จัดการกรณี unauthorized
            handleUnauthorized()
        }
    }
}`,
    },
    {
        title: 'การใช้งานกับ Authentication',
        description: 'การเพิ่ม token สำหรับ authenticated requests',
        code: `const httpClient = new ADC<RequestType, ResponseType>()

const config = {
    baseURL: 'https://api.example.com/protected',
    token: 'your-jwt-token', // จะถูกเพิ่มเป็น Bearer token ใน headers
    headers: {
        'Custom-Header': 'custom-value'
    }
}

const response = await httpClient.get(config)

// headers ที่จะถูกส่งไป:
// Authorization: Bearer your-jwt-token
// Custom-Header: custom-value`,
    },
]

// คัดลอกโค้ด
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toastMessage.value = 'คัดลอกโค้ดแล้ว!'
    showToast.value = true
}
</script>

<template>
    <section class="space-y-6">
        <div class="flex items-center gap-3 mb-6">
            <BcIcon name="BookOpen" size="24" color="primary" />
            <h2 class="text-xl font-bold">ตัวอย่างการใช้งาน</h2>
        </div>

        <div
            v-for="example in examples"
            :key="example.title"
            class="bg-white rounded-xl shadow-lg p-6"
        >
            <h3 class="text-lg font-bold mb-2">{{ example.title }}</h3>
            <p class="text-slate-600 mb-4">{{ example.description }}</p>

            <!-- Code Example -->
            <div class="relative bg-slate-800 rounded-lg p-4">
                <BcButton
                    @click="() => copyCode(example.code)"
                    variant="white"
                    icon="Copy"
                    class="!absolute top-3 right-3"
                    size="sm"
                />
                <pre
                    class="text-sm text-slate-200 overflow-x-auto"
                ><code>{{ example.code }}</code></pre>
            </div>
        </div>

        <!-- Toast Notification -->
        <BcToast
            v-model="showToast"
            :message="toastMessage"
            variant="success"
            position="top-right"
            :duration="2000"
        />
    </section>
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

section {
    scroll-margin-top: 6rem;
}
</style>
