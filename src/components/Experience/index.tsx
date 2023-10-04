import React, { useEffect, useState } from 'react'
import styles from './experience.module.scss'

import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

import { NotionRenderer } from 'react-notion'

const NOTION_PAGE_ID = 'e467e2cae3d04303ad82df8cd1d6aec4'

const getStaticProps = async () => {
  const data = await fetch(
    `https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`
  ).then((res) => res.json())
  console.log('data?', data)
  return data
}

const NotionEmbed = ({ blockMap }: { blockMap: any }) => {
  return (
    <div style={{ maxWidth: 768 }}>
      <NotionRenderer blockMap={blockMap} />
    </div>
  )
}

const Experience = () => {
  const [map, setMap] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const blockMap = await getStaticProps()
      setMap(blockMap)
    }
    getData()
  }, [])

  if (!map) {
    return null
  }

  console.log('we bhave map', map)
  return (
    <div className={styles.wrapper}>
      <NotionRenderer blockMap={map} />
    </div>
  )
}

export default Experience
