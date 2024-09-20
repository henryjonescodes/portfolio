import React, { createContext, useState, useEffect, useRef } from 'react'
import { LocationPinKeys } from './types'
import { locationData } from './map-viewer.contents'

interface MapContextProps {
  currentKey: LocationPinKeys | null
  setCurrentKey: (key: LocationPinKeys | null, isUserAction?: boolean) => void
  previousKey: LocationPinKeys | null
  locationData: typeof locationData
}

export const MapContext = createContext<MapContextProps | undefined>(undefined)

export const MapProvider = ({ children }: { children: React.ReactElement }) => {
  const [currentKey, setCurrentKeyState] = useState<LocationPinKeys | null>(
    'nyc'
  )
  const [previousKey, setPreviousKey] = useState<LocationPinKeys | null>(null)

  const [lastInteractionTime, setLastInteractionTime] = useState<number>(
    Date.now() - 30000
  )
  const [preventAutoCycle, setPreventAutoCycle] = useState<boolean>(false)
  const [autoCycleActive, setAutoCycleActive] = useState<boolean>(false)

  const autoCycleTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoCycleIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const preventAutoCycleTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const indexRef = useRef<number>(0)

  const stopKeys = Object.keys(locationData) as LocationPinKeys[]

  // Wrap setCurrentKey to handle user interactions
  const setCurrentKey = (
    key: LocationPinKeys | null,
    isUserAction: boolean = true
  ) => {
    setCurrentKeyState(key)

    if (isUserAction) {
      const now = Date.now()
      setLastInteractionTime(now)

      // If user takes action, stop auto cycling
      if (autoCycleActive) {
        setAutoCycleActive(false)
      }

      // Prevent auto cycling for 1 minute after user interaction
      setPreventAutoCycle(true)
      if (preventAutoCycleTimeoutRef.current) {
        clearTimeout(preventAutoCycleTimeoutRef.current)
      }
      preventAutoCycleTimeoutRef.current = setTimeout(() => {
        setPreventAutoCycle(false)
      }, 60000) // 1 minute
    }
  }

  useEffect(() => {
    if (currentKey !== null) {
      setPreviousKey(currentKey)
    }
  }, [currentKey])

  // Effect to handle inactivity and start auto cycling after 30s
  useEffect(() => {
    // If auto cycling is prevented, do not set the autoCycleTimeout
    if (preventAutoCycle) {
      // Clear any existing autoCycleTimeout
      if (autoCycleTimeoutRef.current) {
        clearTimeout(autoCycleTimeoutRef.current)
        autoCycleTimeoutRef.current = null
      }
      return
    }

    // Clear any existing autoCycleTimeout
    if (autoCycleTimeoutRef.current) {
      clearTimeout(autoCycleTimeoutRef.current)
    }

    // Set a timeout to start auto cycling after 30 seconds of inactivity
    autoCycleTimeoutRef.current = setTimeout(() => {
      setAutoCycleActive(true)
    }, 30000) // 30 seconds

    // Cleanup on effect cleanup
    return () => {
      if (autoCycleTimeoutRef.current) {
        clearTimeout(autoCycleTimeoutRef.current)
        autoCycleTimeoutRef.current = null
      }
    }
  }, [lastInteractionTime, preventAutoCycle])

  // Effect to handle auto cycling through keys every 10s
  useEffect(() => {
    if (autoCycleActive) {
      // Initialize indexRef.current
      let initialIndex: number
      if (currentKey !== null) {
        initialIndex = stopKeys.indexOf(currentKey) + 1
        if (initialIndex >= stopKeys.length) {
          initialIndex = 0
        }
      } else {
        // If currentKey is null, start from the first key
        initialIndex = 0
      }
      indexRef.current = initialIndex

      // Set the next key immediately
      setCurrentKey(stopKeys[indexRef.current])

      // Set interval to cycle through keys every 10 seconds
      autoCycleIntervalRef.current = setInterval(() => {
        indexRef.current = indexRef.current + 1
        if (indexRef.current >= stopKeys.length) {
          indexRef.current = 0
        }
        setCurrentKey(stopKeys[indexRef.current], false) // isUserAction defaults to false
      }, 8000) // 8 seconds
    }

    return () => {
      // Cleanup interval when autoCycleActive changes
      if (autoCycleIntervalRef.current) {
        clearInterval(autoCycleIntervalRef.current)
        autoCycleIntervalRef.current = null
      }
    }
  }, [autoCycleActive])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoCycleTimeoutRef.current) {
        clearTimeout(autoCycleTimeoutRef.current)
      }
      if (autoCycleIntervalRef.current) {
        clearInterval(autoCycleIntervalRef.current)
      }
      if (preventAutoCycleTimeoutRef.current) {
        clearTimeout(preventAutoCycleTimeoutRef.current)
      }
    }
  }, [])

  return (
    <MapContext.Provider
      value={{ currentKey, setCurrentKey, previousKey, locationData }}
    >
      {children}
    </MapContext.Provider>
  )
}
