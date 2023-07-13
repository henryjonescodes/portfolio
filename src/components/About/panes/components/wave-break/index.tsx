import React, { DetailedHTMLProps } from 'react'
import styles from './wave-break.module.scss'
import cn from 'classnames'

const generatePathString = (
  segments: number,
  scale: number,
  height: number,
  depth: number
) => {
  let pathString = 'M 0 0 C'
  let positive = false
  const limit = segments * scale * 3

  for (let i = scale; i <= limit; i += scale) {
    // When we reach the end of a curve, revers the pos/neg flag and add
    // the destination of the curve
    if (i % (scale * 3) === 0) {
      positive = !positive
      pathString = `${pathString} ${i} 0`

      // if this isn't the end, add a new curve
      // else finish the shape
      if (i < limit) {
        pathString = `${pathString} C`
      } else {
        pathString = `${pathString} L ${i} ${height} L 0 ${height}`
      }
    } else {
      const _scale = positive ? scale : -scale
      const _y = _scale * depth
      pathString = `${pathString} ${i} ${_y}`
    }
  }
  return pathString
}
type WaveProps = {
  zIndex?: number
  segments?: number
  scale?: number
  depth?: number
  height?: 100
  color?: string
} & Omit<
  DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'children'
>

const Wave = ({
  segments = 9,
  scale = 5,
  height = 100,
  zIndex = 0,
  depth = 0.8,
  color,
  ...rest
}: WaveProps) => {
  const viewBoxString = `0 ${-scale * depth} 100 100`
  const pathString = generatePathString(segments, scale, height, depth)

  return (
    <div
      className={cn({
        [styles.wave]: true,
        [rest.className]: !!rest?.className,
      })}
      style={{
        ...rest?.style,
        zIndex,
      }}
      {...rest}
    >
      <svg viewBox={viewBoxString} style={{ fill: color }}>
        <path d={pathString} />
      </svg>
    </div>
  )
}

type Props = {
  count?: number
  spacingPx?: number
  colors?: string[]
}

const cmyk: string[] = ['#00ffff', '#ff00ff', '#ffff00', '#00000']

const WaveBreak = ({ count = 4, colors = cmyk, spacingPx = 40 }: Props) => {
  const waves = []
  let colorIndex = 0
  for (let i = 0; i < count; i++) {
    const _spacing = `${spacingPx * i}px`
    if (colorIndex >= colors.length) {
      colorIndex = 0
    }

    waves.push(
      <Wave zIndex={i} color={colors[colorIndex]} style={{ top: _spacing }} />
    )
    colorIndex = colorIndex + 1
  }
  return (
    <div className={styles.wrapper}>
      {waves}
      {/* <Wave color={'#ff0000'} />
      <Wave zIndex={1} color={'#00ff00'} style={{ top: '50px' }} />
      <Wave zIndex={1} color={'#ffff00'} style={{ top: '80px' }} />
      <Wave zIndex={1} color={'#00ffff'} style={{ top: '100px' }} /> */}
    </div>
  )
}

export default WaveBreak
