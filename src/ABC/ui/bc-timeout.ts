// วิธีที่ 1: ใช้อาเรย์เก็บ timeout IDs
export default class TimerManager {
    private timeouts: NodeJS.Timeout[] = []

    public setTimeout(callback: () => void, delay: number): void {
        const timeoutId = setTimeout(callback, delay)
        this.timeouts.push(timeoutId)
    }

    public clearAllTimeouts(): void {
        this.timeouts.forEach((timeoutId: NodeJS.Timeout) => {
            clearTimeout(timeoutId)
        })
        this.timeouts = []
    }
}
