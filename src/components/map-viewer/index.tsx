import React from 'react'
import Blurb from './components/Blurb'
import Map from './components/Map'
import styles from './map-viewer.module.scss'
import { MapProvider } from './MapContext'

const MapViewer = () => {
  return (
    <MapProvider>
      <div className={styles.locations}>
        <div className={styles.content}>
          <Blurb />
          <div className={styles.viewer}>
            <Map />
          </div>
        </div>
      </div>
    </MapProvider>
  )
}
export default MapViewer
