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

type Props = {}
type ToolType = {
  name: string
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

type ToolProps = {
  tool: ToolType
}

const Tool = ({ tool }: ToolProps) => {
  if (!tool) {
    return
  }

  const { name, icon: SvgIcon } = tool
  return (
    <div className={styles.tool}>
      <SvgIcon />
      <h4>{name}</h4>
    </div>
  )
}

const CharacterInfo = () => {
  return (
    <div className={styles.tools}>
      <h2 className={styles.toolsTitle}>CHARACTER</h2>
      <SkewBox
        className={styles.toolsSkew}
        borderRadius={40}
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
    { name: 'React', icon: ReactSvg },
    { name: 'Typescript', icon: TSSvg },
    { name: 'Blender', icon: BlenderSvg },
    { name: 'Expo', icon: ExpoSvg },
    { name: 'Python', icon: PythonSvg },
    { name: 'GQL', icon: GQLSvg },
    { name: 'DiscordJS', icon: DiscordSvg },
  ]

  return (
    <div className={styles.tools}>
      <h2 className={styles.toolsTitle}>EQUIPMENT</h2>
      <SkewBox
        className={styles.toolsSkew}
        borderRadius={40}
        outlineCount={3}
        strokeWidth={8}
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
      {/* <CharacterInfo /> */}
      <Tools />
    </div>
  )
})

export default About
