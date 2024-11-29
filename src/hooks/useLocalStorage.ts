import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Custom serializer to handle special values
  const serialize = (value: T): string => {
    if (typeof value === 'object' && value !== null) {
      // Handle TimerConfig specifically
      const config = value as any;
      if ('repetitions' in config) {
        return JSON.stringify({
          ...config,
          repetitions: config.repetitions === Infinity ? 'unlimited' : config.repetitions
        });
      }
    }
    return JSON.stringify(value);
  };

  // Custom deserializer to handle special values
  const deserialize = (value: string): T => {
    const parsed = JSON.parse(value);
    if (typeof parsed === 'object' && parsed !== null) {
      // Handle TimerConfig specifically
      if ('repetitions' in parsed) {
        return {
          ...parsed,
          repetitions: parsed.repetitions === 'unlimited' ? 'unlimited' : Number(parsed.repetitions)
        } as T;
      }
    }
    return parsed;
  };

  // Get from local storage then parse stored json or return initialValue
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serialize(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}