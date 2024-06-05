/**
 * A custom hook that debounces a value.
 * 
 * @template T
 * @param {T} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {T} - The debounced value.
 * 
 * @example
 * const debouncedValue = useDebounce(value, 500);
 */
import { useState, useEffect } from "react";
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
export default useDebounce;
