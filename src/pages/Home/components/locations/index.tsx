import React, { useEffect, useState } from 'react'
import styles from './locations.module.scss'
import MapViewer from '@components/map-viewer'
import { locationData, LocationPinKeys } from './locations.contents'

const Locations = () => {
  const [currentKey, setCurrentKey] = useState<LocationPinKeys>('paloAlto')
  const [previousKey, setPreviousKey] = useState<LocationPinKeys>(currentKey)

  useEffect(() => {
    if (currentKey !== null) {
      setPreviousKey(currentKey)
    }
  }, [currentKey])

  const keyToShow = currentKey !== null ? currentKey : previousKey

  const { title, prefix, description } = locationData[keyToShow] ?? {}

  return (
    <div className={styles.locations}>
      <div className={styles.content}>
        <div className={styles.blurb}>
          <span>
            <h3>{prefix}</h3>
            <h3
              onClick={() => {
                setCurrentKey(previousKey)
              }}
            >
              {title}
            </h3>
          </span>
          <p>{description}</p>
        </div>
        <div className={styles.viewer}>
          <MapViewer currentKey={currentKey} setCurrentKey={setCurrentKey} />
        </div>
      </div>
    </div>
  )
}
export default Locations
