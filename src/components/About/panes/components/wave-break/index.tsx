import React, { DetailedHTMLProps } from 'react'
import styles from './wave-break.module.scss'
import cn from 'classnames'

type SharedProps = {
  segments?: number
  scale?: number
  depth?: number
  height?: number
  filled?: boolean
  fillHeight?: number
  stroke?: string
  strokeWidth?: number
}

type WaveProps = {
  zIndex?: number
  color?: string
} & SharedProps &
  Omit<
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'children'
  >

type WaveSectionProps = {
  count?: number
  spacingPx?: number
  colors?: string[]
} & SharedProps

const generatePathString = (
  segments: number,
  scale: number,
  height: number,
  depth: number,
  filled: boolean
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
      } else if (filled) {
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

const Wave = ({
  segments = 3,
  scale = 12,
  zIndex = 0,
  depth = 0.4,
  filled = true,
  fillHeight = 100,
  color,
  stroke = null,
  strokeWidth = 0,
  ...rest
}: WaveProps) => {
  const viewBoxString = `0 ${-scale * depth} 100 100`
  const pathString = generatePathString(
    segments,
    scale,
    fillHeight,
    depth,
    filled
  )

  console.log(color, stroke, strokeWidth)

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
      <svg
        viewBox={viewBoxString}
        style={{
          fill: filled ? color : 'transparent',
          stroke: !!stroke ? stroke : color,
          strokeWidth,
        }}
      >
        <path d={pathString} />
      </svg>
    </div>
  )
}

const cmyk: string[] = ['#00ffff', '#ff00ff', '#ffff00', 'black']

const WaveBreak = ({
  count = 8,
  colors = cmyk,
  spacingPx = 30,
  ...rest
}: WaveSectionProps) => {
  const waves = []
  let colorIndex = 0
  for (let i = 0; i < count; i += 1) {
    const _spacing = `${spacingPx * i}px`
    if (colorIndex >= colors.length) {
      colorIndex = 0
    }

    waves.push(
      <Wave
        zIndex={i}
        color={colors[colorIndex]}
        style={{ top: _spacing }}
        {...rest}
      />
    )
    colorIndex = colorIndex + 1
  }
  return <div className={styles.wrapper}>{waves}</div>
}

export default WaveBreak
