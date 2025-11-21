"use client";
import { useQueryStates, parseAsString } from "nuqs";
import { useMemo, useCallback } from "react";

type DefaultValues = Record<string, string>;

export function useSearchParamsState<T extends DefaultValues>({
  baseKey,
  defaultValues,
}: {
  baseKey?: string;
  defaultValues: T;
}) {
  const parsedSchema = useMemo(() => {
    return Object.fromEntries(
      Object.entries(defaultValues).map(([key, value]) => {
        const fullKey = baseKey ? `${baseKey}[${key}]` : key;
        return [fullKey, parseAsString.withDefault(String(value))];
      })
    );
  }, [baseKey, defaultValues]);

  const [query, setQuery] = useQueryStates(parsedSchema, {
    throttleMs: 500,
  });

  // Memoize params to prevent unnecessary re-renders
  const params = useMemo(() => {
    return Object.fromEntries(
      Object.entries(defaultValues).map(([key]) => {
        const fullKey = baseKey ? `${baseKey}[${key}]` : key;
        return [key, query[fullKey]];
      })
    ) as T;
  }, [query, defaultValues, baseKey]);

  // Support both single and multiple parameter updates
  const setParam = useCallback(
    <K extends keyof T>(
      keyOrUpdates: K | Partial<T> | ((prev: T) => Partial<T>),
      value?: T[K]
    ) => {
      // Handle functional updater: setParam(prev => ({ ...prev, key: 'value' }))
      if (typeof keyOrUpdates === 'function') {
        const updates = keyOrUpdates(params);
        const fullUpdates = Object.fromEntries(
          Object.entries(updates).map(([key, val]) => {
            const fullKey = baseKey ? `${baseKey}[${key}]` : key;
            return [fullKey, val];
          })
        );
        setQuery(fullUpdates);
        return;
      }

      // Handle object updates: setParam({ key1: 'value1', key2: 'value2' })
      if (typeof keyOrUpdates === 'object' && value === undefined) {
        const fullUpdates = Object.fromEntries(
          Object.entries(keyOrUpdates).map(([key, val]) => {
            const fullKey = baseKey ? `${baseKey}[${key}]` : key;
            return [fullKey, val];
          })
        );
        setQuery(fullUpdates);
        return;
      }

      // Handle single key-value: setParam('key', 'value')
      const fullKey = baseKey ? `${baseKey}[${String(keyOrUpdates)}]` : String(keyOrUpdates);
      setQuery({ [fullKey]: value });
    },
    [baseKey, setQuery, params]
  );

  // Memoize reset function
  const resetParams = useCallback(() => {
    const resetObject = Object.fromEntries(
      Object.entries(defaultValues).map(([key, value]) => {
        const fullKey = baseKey ? `${baseKey}[${key}]` : key;
        return [fullKey, value];
      })
    );
    setQuery(resetObject);
  }, [baseKey, defaultValues, setQuery]);

  return { params, setParam, resetParams };
}

// Usage Examples:
/*
const { params, setParam, resetParams } = useSearchParamsState({
  baseKey: 'filters',
  defaultValues: {
    search: '',
    category: 'all',
    status: 'active',
  }
});

// Single parameter update
setParam('search', 'hello');

// Multiple parameters at once (object syntax)
setParam({
  search: 'new search',
  category: 'books'
});

// Functional updater for computed updates
setParam(prev => ({
  search: prev.search + ' more',
  status: 'inactive'
}));

// Reset all params to defaults
resetParams();

// Access current params
console.log(params.search);
console.log(params.category);
*/