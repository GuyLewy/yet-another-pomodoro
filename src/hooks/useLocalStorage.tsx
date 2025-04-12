import { Dispatch, SetStateAction, useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function useLocalStorage<T extends Exclude<unknown, Function>>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        return JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue)) as T;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
