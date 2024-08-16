import React, { useContext } from 'react'
import styles from './map-components.module.scss'
import { MapContext } from '../MapContext'

const Blurb = () => {
  const { currentKey, previousKey, setCurrentKey, locationData } =
    useContext(MapContext)
  const keyToShow = currentKey !== null ? currentKey : previousKey
  const { title, prefix, description } =
    locationData[keyToShow ?? 'portland'] ?? {}

  return (
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
  )
}

export default Blurb
