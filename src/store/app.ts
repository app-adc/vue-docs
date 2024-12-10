import { defineStore } from 'pinia'

type Event = 'CLOSE_LIFF'
interface Window {
    width: number
    height: number
}
interface State {
    window: Window
    events: string[]
    from: {
        fullPath: string
    }
}

const dfState = (): State => ({
    window: {
        width: 0,
        height: 0,
    },
    events: [],
    from: {
        fullPath: '', //page ก่อนหน้า
    },
})

export const AppTitle = 'Docs | '

export const storeApp = defineStore('storeApp', {
    state: () => dfState(),
    actions: {
        setWindow(window: any) {
            this.window = Object.assign(this.window, window)
        },
        checkEvent(event: Event) {
            return this.events.indexOf(event) !== -1
        },
        addEvent(event: string) {
            if (this.events.indexOf(event) === -1) {
                this.events.push(event)
            }
        },

        removeEvent(event: Event) {
            if (this.events.indexOf(event) !== -1) {
                this.events.splice(this.events.indexOf(event), 1)
            }
        },
        setRouteFrom(fullPath: string) {
            this.from.fullPath = fullPath
        },
    },

    getters: {
        getWindow: (state) => state.window,
        getEvents: (state) => state.events,
        getFromFullPath: (state) => state.from.fullPath,
    },
})
