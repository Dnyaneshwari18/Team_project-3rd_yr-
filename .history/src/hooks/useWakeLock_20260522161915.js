import { useRef } from "react";

export function useWakeLock() {
  const wakeLockRef = useRef(null);

  async function enableWakeLock() {
    try {
      if ("wakeLock" in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
        console.log("Wake lock enabled");
      } else {
        console.log("Wake lock not supported in this browser");
      }
    } catch (error) {
      console.log("Wake lock failed:", error);
    }
  }

  async function disableWakeLock() {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        console.log("Wake lock released");
      }
    } catch (error) {
      console.log("Wake lock release failed:", error);
    }
  }

  return {
    enableWakeLock,
    disableWakeLock,
  };
}