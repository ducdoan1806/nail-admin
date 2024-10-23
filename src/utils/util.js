import { useCallback, useEffect, useRef } from "react";

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
  return value
    ? value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    : value;
};
export const isAuthenticated = () => {
  const authToken = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("authToken="));
  return !!authToken;
};
// Hàm để lấy giá trị cookie
export const getCookie = (name) => {
  let cookieStr = document.cookie;
  cookieStr.split("; ").forEach((item) => {
    if (item.search(name) !== -1) {
      cookieStr = item.split("=")[1];
    }
  });
  return cookieStr;
};
export const useOutside = (ref, func) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, func]);
};
