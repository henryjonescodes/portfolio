import React from 'react'
import styles from './cmyk.module.scss'

interface CMYKColor {
  rgb: string
  spacing?: string
}

interface ColorBoxProps {
  colors: CMYKColor[]
  gap?: number
}

const ColorBox: React.FC<ColorBoxProps> = ({ colors, gap = 20 }) => {
  if (!colors) {
    return
  }
  const totalHeight = gap * colors.length

  return (
    <div className={styles.cmyk}>
      {colors.map((color, index) => {
        const top = index * 20
        return (
          <div
            className={styles.panel}
            key={index}
            style={{
              top: `calc(100vh - ${totalHeight}px + ${top}px)`,
              zIndex: index,
              background: color.rgb,
            }}
          />
        )
      })}
    </div>
  )
}

const CMYK = () => {
  const colors: CMYKColor[] = [
    { rgb: 'rgb(0, 0, 0)' },
    { rgb: 'rgb(255, 255, 0)' },
    { rgb: 'rgb(255, 0, 255)' },
    { rgb: 'rgb(0, 255, 255)' },
  ]

  return <ColorBox colors={colors} />
}

export default CMYK
