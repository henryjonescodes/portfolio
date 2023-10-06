import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

import React, { useEffect, useState } from 'react'
import { NotionRenderer } from 'react-notion'

const NOTION_PAGE_ID = '3e718053fb1049d8ac0b360c09cfcccf'

const getStaticProps = async () => {
  const data = await fetch(
    `https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`
  ).then((res) => res.json())
  console.log('data?', data)
  return data
}

const NotionPage = () => {
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

  return <NotionRenderer blockMap={map} />
}

export default NotionPage
