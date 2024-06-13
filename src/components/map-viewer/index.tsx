import React from 'react'
import styles from './map-viewer.module.scss'
import grid from '@assets/png/backgrounds/grid.png'
import USA from '@assets/svg/backgrounds/usa.svg'
import Corner from '@assets/svg/icons/corner.svg'
import {
  locationData,
  LocationPinKeys,
} from '@pages/Home/components/locations/locations.contents'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import Pin from './Pin'

type Props = {
  currentKey: LocationPinKeys
  setCurrentKey: React.Dispatch<React.SetStateAction<LocationPinKeys | null>>
}

const MapViewer = ({ currentKey, setCurrentKey }: Props) => {
  const { mapTitle: title, mapHighlights: highlights } =
    locationData[currentKey] ?? {}

  return (
    <motion.div
      layout
      className={cn({
        [styles.mapViewer]: true,
        [styles.portland]: currentKey === 'portland',
        [styles.paloAlto]: currentKey === 'paloAlto',
        [styles.nyc]: currentKey === 'nyc',
        [styles.schenectady]: currentKey === 'schenectady',
      })}
      onClick={() => {
        setCurrentKey(null)
      }}
    >
      <motion.div className={styles.map} layout>
        <motion.div className={styles.pins} layout>
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
          <Pin
            className={styles.portlandPin}
            selected={currentKey === 'portland'}
            minimized={!!currentKey && currentKey !== 'portland'}
            onClick={() => {
              setCurrentKey('portland')
            }}
          />
          <Pin
            className={styles.paloAltoPin}
            selected={currentKey === 'paloAlto'}
            minimized={!!currentKey && currentKey !== 'paloAlto'}
            onClick={() => {
              setCurrentKey('paloAlto')
            }}
          />
          <Pin
            className={styles.nycPin}
            selected={currentKey === 'nyc'}
            minimized={!!currentKey && currentKey !== 'nyc'}
            onClick={() => {
              setCurrentKey('nyc')
            }}
          />
          <Pin
            className={styles.schenectadyPin}
            selected={currentKey === 'schenectady'}
            minimized={!!currentKey && currentKey !== 'schenectady'}
            onClick={() => {
              setCurrentKey('schenectady')
            }}
          />
        </motion.div>
        <USA className={styles.usa} />
        <motion.img src={grid} className={styles.grid} />
      </motion.div>
    </motion.div>
  )
}

export default MapViewer
