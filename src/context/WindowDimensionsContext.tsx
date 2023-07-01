import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from 'react'

interface WindowSize {
  width: number
  height: number
}

interface WindowDimensionsContextType {
  windowSize: WindowSize
}

const WindowDimensionsContext = createContext<WindowDimensionsContextType>(
  {} as WindowDimensionsContextType
)

export const useWindowDimensions = (): WindowSize =>
  useContext(WindowDimensionsContext).windowSize

const WindowDimensionsProvider = ({ children }: PropsWithChildren) => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const contextValue: WindowDimensionsContextType = {
    windowSize,
  }

  return (
    <WindowDimensionsContext.Provider value={contextValue}>
      {children}
    </WindowDimensionsContext.Provider>
  )
}

export default WindowDimensionsProvider
