'use client'

import { useEffect, useMemo } from "react";

export const useCheckConnection = () => {
  const isClient = useMemo(() => typeof window === 'object', [])
  let isConnect = true

  useEffect(() => {
    if (!isClient) return

    const handleSetConnectionStatus = (status: boolean) => {
      isConnect = status
    }

    window.addEventListener('online', () => handleSetConnectionStatus(true));
    window.addEventListener('offline', () => handleSetConnectionStatus(false));

    return () => {
      window.removeEventListener('online', () => handleSetConnectionStatus(true))
      window.removeEventListener('offline', () => handleSetConnectionStatus(false))
    }
  },[])

  return isConnect
}