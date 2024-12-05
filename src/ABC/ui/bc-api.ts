import { isObject } from '@/ABC/ui/bc-functional'
import ADC from '@/ABC/ui/http/ADC'
import type { RequestConfig } from '@/ABC/ui/http/bc-type-http'
import { useAuthStore } from '@/store/auth-store'
import { reactive, ref } from 'vue'
import { validatePayloadEmptyToNull } from './bc-form'
export type TypeFnApi = <Res>() => Promise<Res>
type DataState<Req extends object, Res extends object> = ReturnType<
    typeof getDataStateApi<Req, Res>
>

export const BASE_URL = (import.meta.env.VITE_BASE_URL as string) || ''

export const fetchApi = <Req extends object, Res extends object>(
    config: RequestConfig<Req, Res>
) => {
    const state = getDataStateApi<Req, Res>(config)

    // const api = new ADC<Req, Res>()

    const handleProcess = async (req?: Req) => {
        if (req) {
            state.request.value = { ...state.request.value, ...req }
        }
        await handleProcessAPI<Req, Res>(config, state, state.api)
        if (state.api.HttpError?.message) {
            state.error.value = state.api.HttpError.message
            return
        }
        if (state.error.value) return
    }

    const resetAndFetchData = async (): Promise<void> => {
        state.resetByDefault()
        await handleProcess()
    }

    return { ...state, handleProcess, resetAndFetchData }
}

export const getDataStateApi = <Req extends object, Res extends object>(
    config: RequestConfig<Req, Res>
) => {
    // config ที่เป็น default จะถูก merge กับ config ที่ส่งเข้ามา
    const authStore = useAuthStore()
    config.token = config.token || authStore.getToken // data external config จากด้านนอก
    config.baseURL = config.baseURL || BASE_URL // data external config จากด้านนอก

    const api = new ADC<Req, Res>()

    const data = reactive<Res>(config?.initialData || ({} as Res))
    const error = ref<string>('')
    const pending = ref(false)
    const init = ref(false) // เมื่อเรียกใช้งานเสร็จสิ้น

    // const _rt = { ...config } as Req
    const request = ref<Req>({ ...config.variables } as Req)

    function setRequest(next: (value: Req) => Req): void {
        request.value = Object.assign({}, request.value, next(request.value))
    }

    function resetByDefault() {
        setRequest(() => config.variables || ({} as Req))
        Object.assign(data, config.initialData)
        error.value = ''
        pending.value = false
    }

    return {
        api,
        data,
        pending,
        error,
        init,
        resetByDefault,
        setRequest,
        request,
    }
}

async function handleProcessAPI<Req extends object, Res extends object>(
    config: RequestConfig<Req, Res>,
    state: DataState<Req, Res>,
    api: ADC<Req, Res>
) {
    state.error.value = '' // clear error ไม่งั้นจะแสดงข้อความ error ที่เก่าอยู่
    state.pending.value = true

    try {
        const req = Object.assign({}, config, {
            variables: isObject(state.request.value)
                ? validatePayloadEmptyToNull({ ...state.request.value })
                : state.request.value,
        })
        const response = (await api.request(req)) as any

        Object.assign(state.data, response)
    } catch (_error: any) {
        console.error('handleProcessAPI catch =>', _error)
        state.error.value = _error.message
    } finally {
        state.pending.value = false
        state.init.value = true
    }
}

export async function fetchUpload<T>(
    url: string,
    formData: FormData,
    typeRes: 'json' | 'text' = 'json'
): Promise<T> {
    const authStore = useAuthStore()
    const URL = import.meta.env.VITE_ENDPOINT_ROOT + url
    const token = authStore.getToken

    const headers = new Headers()
    headers.append('Authorization', 'Bearer ' + token)

    const requestOptions = {
        method: 'POST',
        headers,
        body: formData,
    }

    const response = await fetch(URL, requestOptions)
        .then((response) =>
            typeRes === 'json' ? response.json() : response.text()
        )
        .catch((error) => console.error(error))

    return response as T
}
