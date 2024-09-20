import grid from '@assets/png/backgrounds/grid.png'
import USA from '@assets/svg/backgrounds/usa.svg'
import Corner from '@assets/svg/icons/corner.svg'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext } from 'react'
import styles from './map-components.module.scss'
import { MapContext } from '../MapContext'
import MapSlider from './MapSlider'
import Pin from './Pin'
import { LocationPinKeys } from '../types'

const Map = () => {
  const { currentKey, setCurrentKey, locationData } = useContext(MapContext)
  const { mapTitle: title, mapHighlights: highlights } =
    locationData[currentKey ?? 'portland'] ?? {}

  const stopKeys = Object.keys(locationData) as LocationPinKeys[]

  return (
    <div className={styles.mapViewer}>
      <motion.div
        className={cn(
          styles.mapViewerContents,
          locationData[currentKey]?.className
        )}
        onClick={() => {
          setCurrentKey(null)
        }}
      >
        <motion.div className={styles.map} layout>
          <motion.div className={styles.pins}>
            <AnimatePresence>
              {!!currentKey && (
                <motion.div className={styles.details} layout>
                  <motion.span>
                    <motion.h4>{title ?? ''}</motion.h4>
                  </motion.span>
                  {highlights?.map((highlight, index) => (
                    <motion.span key={index}>
                      <highlight.icon />
                      <motion.h5>{highlight.text}</motion.h5>
                    </motion.span>
                  ))}
                  <motion.div>
                    <Corner />
                    <Corner />
                    <Corner />
                    <Corner />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            {stopKeys.map((key) => (
              <Pin
                key={key}
                className={locationData[key].pinClassName} // Use the className from locationData
                selected={currentKey === key}
                minimized={!!currentKey && currentKey !== key}
                onClick={() => {
                  setCurrentKey(key)
                }}
              />
            ))}
          </motion.div>
          <USA className={styles.usa} />
          <motion.img src={grid} className={styles.grid} />
        </motion.div>
      </motion.div>
      <MapSlider />
    </div>
  )
}

export default Map
