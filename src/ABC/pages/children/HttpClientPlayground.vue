<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import { computed, reactive, ref } from 'vue'
// import BcSelect from '@/ABC/components/BcSelect.vue'
import BcCheckBox from '@/ABC/components/BcCheckBox.vue'
import BcToast from '@/ABC/components/BcToast.vue'
import ADC from '@/ABC/ui/http/ADC'

// Toast state
const showToast = ref(false)
const toastMessage = ref('')

type PlaygroundState = {
    baseURL: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    query: string
    variables: string
    name: string
    contentType: 'application/json' | 'multipart/form-data'
    timeout: number
    retries: number
    storage: 'cache' | 'localStorage' | 'session' | undefined
    useToken: boolean
    useInterceptors: boolean
    useContextApi: boolean
}

// Playground state
const playgroundState = reactive<PlaygroundState>({
    baseURL: 'https://api.example.com/graphql',
    method: 'POST',
    query: `query GetUser($id: ID!) {
    user(id: $id) {
        id
        name
        email
    }
}`,
    variables: `{
    "id": "123"
}`,
    name: 'data.user',
    contentType: 'application/json',
    timeout: 8000,
    retries: 0,
    storage: 'cache' as 'cache' | 'localStorage' | 'session' | undefined,
    useToken: true,
    useInterceptors: false,
    useContextApi: false,
})

// Response state
const response = ref<any>(null)
const error = ref<string | null>(null)
const loading = ref(false)

type Option<T> = Array<{ value: T; label: string }>
// Method options
const methodOptions: Option<PlaygroundState['method']> = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'DELETE', label: 'DELETE' },
    { value: 'PATCH', label: 'PATCH' },
]

// Content Type options
const contentTypeOptions: Option<PlaygroundState['contentType']> = [
    { value: 'application/json', label: 'application/json' },
    { value: 'multipart/form-data', label: 'multipart/form-data' },
]

// Storage options
const storageOptions: Option<PlaygroundState['storage']> = [
    { value: undefined, label: 'None' },
    { value: 'cache', label: 'Cache' },
    { value: 'localStorage', label: 'Local Storage' },
    { value: 'session', label: 'Session Storage' },
]

// Example interceptor
const exampleInterceptor = (response: any) => {
    return {
        ...response,
        intercepted: true,
        timestamp: new Date().toISOString(),
    }
}

// Execute request
const executeRequest = async () => {
    loading.value = true
    error.value = null
    response.value = null

    try {
        const httpClient = new ADC<any, any>()

        // Build config
        const config = {
            baseURL: playgroundState.baseURL,
            method: playgroundState.method,
            contentType: playgroundState.contentType,
            timeout: playgroundState.timeout,
            retries: playgroundState.retries,
            storage: playgroundState.storage,
            name: playgroundState.name,
        } as any

        // Add optional properties
        if (playgroundState.query.trim()) {
            config.query = playgroundState.query
        }

        if (playgroundState.variables.trim()) {
            try {
                config.variables = JSON.parse(playgroundState.variables)
            } catch (e) {
                throw new Error('Invalid JSON in variables')
            }
        }

        if (playgroundState.useToken) {
            config.token = 'example-token'
        }

        if (playgroundState.useInterceptors) {
            config.interceptors = [exampleInterceptor]
        }

        if (playgroundState.useContextApi) {
            config.contextApi = 'errors.0.message'
        }

        // Execute request based on method
        const result = await (playgroundState.method === 'GET'
            ? httpClient.get(config)
            : httpClient.post(config))

        response.value = result
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Unknown error occurred'
    } finally {
        loading.value = false
    }
}

// Generate code based on current settings
const generatedCode = computed(() => {
    const lines = [
        'const httpClient = new ADC<RequestType, ResponseType>()',
        '',
        '// Configuration',
        'const config = {',
    ]

    // Add basic properties
    lines.push(`  baseURL: '${playgroundState.baseURL}',`)
    lines.push(`  method: '${playgroundState.method}',`)
    lines.push(`  contentType: '${playgroundState.contentType}',`)
    lines.push(`  timeout: ${playgroundState.timeout},`)
    lines.push(`  retries: ${playgroundState.retries},`)

    if (playgroundState.storage) {
        lines.push(`  storage: '${playgroundState.storage}',`)
    }

    if (playgroundState.name) {
        lines.push(`  name: '${playgroundState.name}',`)
    }

    // Add conditional properties
    if (playgroundState.query.trim()) {
        lines.push('  query: `')
        lines.push(playgroundState.query)
        lines.push('  `,')
    }

    if (playgroundState.variables.trim()) {
        lines.push('  variables: ')
        lines.push(playgroundState.variables + ',')
    }

    if (playgroundState.useToken) {
        lines.push("  token: 'your-token-here',")
    }

    if (playgroundState.useInterceptors) {
        lines.push('  interceptors: [')
        lines.push('    (response) => ({')
        lines.push('      ...response,')
        lines.push('      intercepted: true,')
        lines.push('      timestamp: new Date().toISOString()')
        lines.push('    })')
        lines.push('  ],')
    }

    if (playgroundState.useContextApi) {
        lines.push("  contextApi: 'errors.0.message',")
    }

    lines.push('}')
    lines.push('')
    lines.push('// Execute request')
    lines.push(
        `const response = await httpClient.${playgroundState.method.toLowerCase()}(config)`
    )

    return lines.join('\n')
})

// Copy code
const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
    toastMessage.value = 'คัดลอกโค้ดแล้ว!'
    showToast.value = true
}
</script>

<template>
    <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="flex items-center gap-3 mb-6">
            <BcIcon name="PenTool" size="24" color="primary" />
            <div>
                <h2 class="text-xl font-bold">Interactive Playground</h2>
                <p class="text-sm text-slate-600 mt-1">
                    ทดลองปรับแต่งค่า properties ต่างๆ และทดสอบการทำงานของ ADC
                </p>
            </div>
        </div>

        <!-- Controls Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Basic Settings -->
            <div class="space-y-4">
                <BcInput
                    id="baseUrl"
                    label="Base URL"
                    :data-value="playgroundState.baseURL"
                    @input="(v) => (playgroundState.baseURL = v || '')"
                />

                <!-- Method Selection -->
                <div class="space-y-2">
                    <label class="text-sm font-medium">Method</label>
                    <div class="flex gap-2 flex-wrap">
                        <BcButton
                            v-for="method in methodOptions"
                            :key="method.value"
                            variant="outline"
                            :color="
                                playgroundState.method === method.value
                                    ? 'primary'
                                    : 'outline'
                            "
                            @click="playgroundState.method = method.value"
                            size="sm"
                        >
                            {{ method.label }}
                        </BcButton>
                    </div>
                </div>

                <!-- Content Type Selection -->
                <div class="space-y-2">
                    <label class="text-sm font-medium">Content Type</label>
                    <div class="flex gap-2">
                        <BcButton
                            v-for="type in contentTypeOptions"
                            :key="type.value"
                            variant="outline"
                            :color="
                                playgroundState.contentType === type.value
                                    ? 'primary'
                                    : 'outline'
                            "
                            @click="playgroundState.contentType = type.value"
                            size="sm"
                        >
                            {{ type.label }}
                        </BcButton>
                    </div>
                </div>

                <!-- Query -->
                <div class="space-y-2">
                    <label class="text-sm font-medium">Query</label>
                    <textarea
                        v-model="playgroundState.query"
                        rows="5"
                        class="w-full p-2 border rounded-lg font-mono text-sm"
                    ></textarea>
                </div>

                <!-- Variables -->
                <div class="space-y-2">
                    <label class="text-sm font-medium">Variables</label>
                    <textarea
                        v-model="playgroundState.variables"
                        rows="3"
                        class="w-full p-2 border rounded-lg font-mono text-sm"
                    ></textarea>
                </div>
            </div>

            <!-- Advanced Settings -->
            <div class="space-y-4">
                <BcInput
                    id="response-name"
                    label="Response Name Path"
                    :data-value="playgroundState.name"
                    @input="(v) => (playgroundState.name = v || '')"
                    placeholder="e.g. data.user"
                />

                <BcInput
                    id="timeout"
                    label="Timeout (ms)"
                    :data-value="String(playgroundState.timeout)"
                    @input="
                        (v) => (playgroundState.timeout = Number(v) || 8000)
                    "
                />

                <BcInput
                    id="retries"
                    label="Retries"
                    :data-value="String(playgroundState.retries)"
                    @input="(v) => (playgroundState.retries = Number(v) || 0)"
                />

                <!-- Storage Type -->
                <div class="space-y-2">
                    <label class="text-sm font-medium">Storage Type</label>
                    <select
                        v-model="playgroundState.storage"
                        class="w-full p-2 border rounded-lg"
                    >
                        <option
                            v-for="storage in storageOptions"
                            :key="storage.value || 'none'"
                            :value="storage.value"
                        >
                            {{ storage.label }}
                        </option>
                    </select>
                </div>

                <!-- Options -->
                <div class="space-y-2 pt-4">
                    <BcCheckBox
                        v-model="playgroundState.useToken"
                        label="Use Bearer Token"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="playgroundState.useInterceptors"
                        label="Add Example Interceptor"
                        size="lg"
                    />
                    <BcCheckBox
                        v-model="playgroundState.useContextApi"
                        label="Use Context API"
                        size="lg"
                    />
                </div>

                <!-- Execute Button -->
                <BcButton
                    class="w-full mt-4"
                    :isLoading="loading"
                    @click="executeRequest"
                    icon="Bug"
                >
                    ทดสอบ Request
                </BcButton>
            </div>
        </div>

        <!-- Generated Code -->
        <div class="mt-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold">Generated Code</h3>
                <BcButton
                    @click="handleCopyCode"
                    variant="outline"
                    size="sm"
                    icon="Copy"
                >
                    คัดลอกโค้ด
                </BcButton>
            </div>
            <pre
                class="bg-slate-800 text-slate-50 p-4 rounded-lg overflow-x-auto"
                >{{ generatedCode }}</pre
            >
        </div>

        <!-- Response Section -->
        <div v-if="response || error || loading" class="mt-6">
            <h3 class="text-lg font-bold mb-4">Response</h3>

            <!-- Loading State -->
            <div v-if="loading" class="p-4 bg-slate-50 rounded-lg">
                <div class="flex items-center justify-center">
                    <BcIcon name="Loader" size="24" class="animate-spin" />
                    <span class="ml-2">กำลังทำงาน...</span>
                </div>
            </div>

            <!-- Error State -->
            <div
                v-else-if="error"
                class="p-4 bg-red-50 rounded-lg text-red-600"
            >
                <div class="flex items-start gap-2">
                    <BcIcon name="AlertTriangle" size="20" />
                    <div>
                        <strong class="font-medium">Error:</strong>
                        <p>{{ error }}</p>
                    </div>
                </div>
            </div>

            <!-- Success State -->
            <div v-else-if="response" class="p-4 bg-slate-50 rounded-lg">
                <pre class="text-sm overflow-x-auto">{{
                    JSON.stringify(response, null, 2)
                }}</pre>
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

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
