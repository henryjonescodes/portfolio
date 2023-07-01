import { useWindowDimensions } from '../context/WindowDimensionsContext'
import React, { useEffect, useState } from 'react'

type useFullScreenViewBoxType = {
    viewBoxString: string | undefined
}

const useFullScreenViewBox = ():useFullScreenViewBoxType => {

  const [viewBoxString, setViewBoxString] = useState<string|undefined>(undefined)
  const { width, height } = useWindowDimensions();
  
  useEffect(() => {
    setViewBoxString(`0 0 ${width} ${height}`)
  }, [ width, height])

  return {viewBoxString}
}

export default useFullScreenViewBox
