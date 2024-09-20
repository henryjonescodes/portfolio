import React, { useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './map-components.module.scss'
import { MapContext } from '../MapContext'
import { LocationPinKeys } from '../types'

const MapSlider = () => {
  const { currentKey, setCurrentKey, locationData } = useContext(MapContext)
  const [selectedStop, setSelectedStop] = useState<number | null>(null)
  const [requestedStop, setRequestedStop] = useState<number | null>(null)
  const [bulgingIndex, setBulgingIndex] = useState<number | null>(null)

  const stopKeys = Object.keys(locationData) as LocationPinKeys[]
  const numStops = stopKeys.length

  useEffect(() => {
    const index = currentKey !== null ? stopKeys.indexOf(currentKey) : -1

    if (index !== -1) {
      // Only animate when moving between POIs
      if (selectedStop !== null) {
        triggerCascadingAnimation(index)
      }
      setSelectedStop(index)
    } else {
      setSelectedStop(null)
    }
  }, [currentKey])

  const handleClick = (index: number) => {
    console.log('click - slider')
    setCurrentKey(stopKeys[index])
    triggerCascadingAnimation(index)
  }

  const triggerCascadingAnimation = (newIndex: number) => {
    setRequestedStop(newIndex)
    setSelectedStop(null)

    const start = selectedStop !== null ? selectedStop : 0
    const end = newIndex
    const startIndex = start * 10
    const endIndex = end * 10

    const steps = Math.abs(endIndex - startIndex)
    const direction = endIndex > startIndex ? 1 : -1

    const totalDuration = 600
    const interval = totalDuration / steps

    for (let i = 0; i <= steps; i++) {
      setTimeout(() => {
        setBulgingIndex(startIndex + i * direction)
      }, i * interval)
    }

    setTimeout(() => {
      setSelectedStop(newIndex)
      setBulgingIndex(null)
      setRequestedStop(null)
    }, totalDuration)
  }

  const renderLines = () => {
    const lines: React.ReactNode[] = []
    let lineIndex = 0

    stopKeys.forEach((key, i) => {
      lines.push(
        <div
          key={`stop-${i}`}
          className={cn(styles.stop, {
            [styles.selected]: selectedStop === i,
            [styles.requested]: requestedStop === i,
            [styles.bulging]: selectedStop !== i && bulgingIndex === lineIndex,
          })}
          onClick={() => handleClick(i)}
        />
      )
      lineIndex++

      if (i < stopKeys.length - 1) {
        for (let j = 0; j < 9; j++) {
          lines.push(
            <div
              key={`line-${i}-${j}`}
              className={cn(styles.line, {
                [styles.bulging]: bulgingIndex === lineIndex,
              })}
            />
          )
          lineIndex++
        }
      }
    })

    return lines
  }

  return <div className={styles.slider}>{renderLines()}</div>
}

export default MapSlider
