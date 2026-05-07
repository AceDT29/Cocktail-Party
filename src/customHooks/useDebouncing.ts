import { useRef } from "react"

export function useDebounce<T extends (...args: any[]) => any>({ fn, wait = 800 }: { fn: T, wait: number }) {
    const debouncingInterval = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleDebounce = (...args: Parameters<T>) => {
        if (debouncingInterval.current) {
            clearTimeout(debouncingInterval.current)

        }
        debouncingInterval.current = setTimeout(() => {
            fn(...args);
            debouncingInterval.current = null;
        }, wait)
    }

    return handleDebounce
}
