import { useCallback, useRef } from "react";

export const useDebounced = (callback, delay) => {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};
export const convertToVietnamTime = (utcDateString) => {
  const utcDate = new Date(utcDateString);
  return new Date(utcDate.getTime() + 7 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16)
    .replace("T", " ");
};
export const convertToVND = (value) => {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
