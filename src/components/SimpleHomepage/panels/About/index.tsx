import React, { forwardRef } from 'react'
import styles from './about.module.scss'

import LogoSvg from '@assets/svg/Trash.svg'
import SkewBox from './SkewBox'
import ReactSvg from '@assets/svg/tools/react-2.svg'
import TSSvg from '@assets/svg/tools/typescript.svg'
import BlenderSvg from '@assets/svg/tools/blender.svg'
import ExpoSvg from '@assets/svg/tools/expo-2.svg'
import PythonSvg from '@assets/svg/tools/python-2.svg'
import GQLSvg from '@assets/svg/tools/graphql.svg'
import DiscordSvg from '@assets/svg/tools/discord-fill.svg'
import GridBackground from './GridBackground'
import CharacterViewer from './CharacterViewer'

type Props = {}
type ToolType = {
  name: string
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  color: string
}

type ToolProps = {
  tool: ToolType
}

const Tool = ({ tool }: ToolProps) => {
  if (!tool) {
    return
  }

  const { name, icon: SvgIcon, color } = tool
  return (
    <div className={styles.tool}>
      <SvgIcon
        style={{ backgroundColor: color, boxShadow: `0px 0px .5rem ${color}` }}
      />
      {/* <h4>{name}</h4> */}
    </div>
  )
}

const CharacterInfo = () => {
  return (
    <div className={styles.tools}>
      <h2 className={styles.toolsTitle}>CHARACTER</h2>
      <SkewBox
        className={styles.toolsSkew}
        borderRadius={20}
        outlineCount={3}
        strokeWidth={8}
        skewDegrees={-20}
      >
        <h2>
          NAME: <h3>Henry Jones</h3>
        </h2>
      </SkewBox>
    </div>
  )
}
const Tools = () => {
  const toolsList: ToolType[] = [
    { name: 'React', icon: ReactSvg, color: '#61DBFB' },
    { name: 'Typescript', icon: TSSvg, color: '#3178C6' },
    { name: 'Blender', icon: BlenderSvg, color: '#EA7600' },
    { name: 'Expo', icon: ExpoSvg, color: '#fff' },
    { name: 'Python', icon: PythonSvg, color: '#ffde57' },
    { name: 'GQL', icon: GQLSvg, color: '#E10098' },
    { name: 'DiscordJS', icon: DiscordSvg, color: '#5865F2' },
  ]

  return (
    <div className={styles.tools}>
      <h2 className={styles.toolsTitle}>EQUIPMENT</h2>
      <SkewBox
        className={styles.toolsSkew}
        borderRadius={20}
        outlineCount={3}
        strokeWidth={6}
        skewDegrees={-20}
      >
        <div className={styles.toolsInventory}>
          {toolsList.map((tool, index) => {
            return <Tool tool={tool} key={index} />
          })}
        </div>
      </SkewBox>
    </div>
  )
}

const About = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  return (
    <div ref={ref} className={styles.stats}>
      <div className={styles.statsInfo}>
        <Tools />
        {/* <CharacterInfo /> */}
      </div>
      <div className={styles.statsCharacter}>
        <CharacterViewer />
      </div>
      <GridBackground />
    </div>
  )
})

export default About
