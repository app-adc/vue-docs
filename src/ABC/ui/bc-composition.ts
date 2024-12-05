import { delayPromise } from '@/ABC/notUsed/function'
import { calculateExpiryTime } from '@/ABC/ui/http/bc-composition-http'
import { GroupKeyForStorage } from '@/ABC/ui/http/bc-type-http'
import GlobalPageStorage from '@/ABC/ui/http/GlobalPageStorage'
import { addDate } from 'adc-directive'
import { computed, ref } from 'vue'

export const useGlobalStorage = (groupKey: GroupKeyForStorage) => {
    const store = ref(GlobalPageStorage.getInstance())
    const set = (data: any, timeToLive?: number) => {
        const minute = 600 // 600นาที = 10 ชั่วโมง
        const time = calculateExpiryTime(timeToLive, minute)

        store.value.set(groupKey, data, time)
    }

    const get = computed((): any => store.value.get(groupKey)?.data)

    const remove = () => {
        store.value.remove(groupKey.group)
    }

    return { get, set, remove }
}
export type ResAlert = {
    titles?: string[]
    subtitles?: string[]
    icon?: 'BadgeCheck' | 'BadgeHelp' | 'BadgeAlert' | 'CircleX'
    isClose?: boolean
    isClickOutSide?: boolean
    btnConfirm?: string
    btnCancel?: string
    next?: () => void
    afterClose?: () => void
    afterOpen?: () => void
    timeout?: number
}

export const useAlert = () => {
    const { get, set, remove } = useGlobalStorage({
        group: 'ALERT_IN_APP',
        key: 'isAlert',
    })
    const initState: ResAlert = {
        titles: [],
        subtitles: [],
        icon: undefined,
        isClose: true,
        isClickOutSide: true,
        btnConfirm: '',
        btnCancel: '',
        next: undefined,
        afterClose: undefined,
        afterOpen: undefined,
        timeout: undefined,
    }
    const activeAlert = async (alert: ResAlert) => {
        remove()
        await delayPromise(150, () =>
            set(
                {
                    ...initState,
                    ...alert,
                },
                addDate(new Date(), 1).getTime()
            )
        )
    }

    const getAlert = computed((): Required<ResAlert> | null => {
        const alert = get.value
        if (alert) {
            return {
                ...initState,
                ...alert,
            }
        } else return null
    })

    return { getAlert, activeAlert, removeAlert: remove }
}

export const useLoader = () => {
    const { get, set, remove } = useGlobalStorage({
        group: 'LOADER_IN_APP',
        key: 'isLoader',
    })

    const startLoader = async () => {
        stopLoader()
        document.body.setAttribute('data-loader', 'true')
        await delayPromise(400, () => {
            const data = document.body.getAttribute('data-loader')

            if (data) {
                document.body.style.overflow = 'hidden'
                set(true, addDate(new Date(), 1).getTime())
            }
        })
    }
    const stopLoader = async () => {
        document.body.removeAttribute('data-loader')
        document.body.style.overflow = ''
        remove()
    }

    const getLoader = computed((): boolean => get.value === true)

    return { getLoader, startLoader, stopLoader }
}
