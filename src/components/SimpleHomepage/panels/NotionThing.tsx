import React, { forwardRef, useEffect, useState } from 'react'
import styles from './simple-homepage-panels.module.scss'
import { NotionRenderer } from 'react-notion'
import Experience from '@components/Experience'
import NotionPage from '../components/notion-page'
type Props = {}

const NOTION_PAGE_ID = '3e718053fb1049d8ac0b360c09cfcccf'

const getProjectsFromNotion = async () => {
  const data = await fetch(
    `https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`
  ).then((res) => res.json())
  console.log('data?', data)
  return data
}
const About = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  const [map, setMap] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const blockMap = await getProjectsFromNotion()
      setMap(blockMap)
    }
    getData()
  }, [])

  return (
    <div ref={ref} className={styles.about}>
      {/* <Experience /> */}
      <NotionPage />
      {/* {!!map && <NotionRenderer blockMap={map} />} */}
    </div>
  )
})

export default About
