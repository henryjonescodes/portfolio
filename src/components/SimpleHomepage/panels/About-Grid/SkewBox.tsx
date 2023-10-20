import React, { useEffect, useRef, useState } from 'react'
import styles from './about.module.scss'
import { motion } from 'framer-motion'
import cn from 'classnames'

const DynamicSVG = ({
  outlineCount,
  offset = 0,
  skewDegrees = -20,
  color = '#f0f0f0',
  strokeWidth = 5,
  borderRadius = 10,
}: DynamicSvgProps) => {
  const svgRef = useRef(null)
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (svgRef.current) {
      const { width, height } = svgRef.current.getBoundingClientRect()
      setSvgDimensions({ width, height })
      console.log(width, height)
    }
  }, [])

  const pathData = `M${strokeWidth / 2},${borderRadius + strokeWidth / 2}
  Q${strokeWidth / 2},${strokeWidth / 2} ${borderRadius + strokeWidth / 2},${
    strokeWidth / 2
  }
  L${svgDimensions.width - borderRadius - strokeWidth / 2},${strokeWidth / 2}
  Q${svgDimensions.width - strokeWidth / 2},${strokeWidth / 2} ${
    svgDimensions.width - strokeWidth / 2
  },${borderRadius + strokeWidth / 2}
  L${svgDimensions.width - strokeWidth / 2},${
    svgDimensions.height - borderRadius - strokeWidth / 2
  }
  Q${svgDimensions.width - strokeWidth / 2},${
    svgDimensions.height - strokeWidth / 2
  } ${svgDimensions.width - borderRadius - strokeWidth / 2},${
    svgDimensions.height - strokeWidth / 2
  }
  L${borderRadius + strokeWidth / 2},${svgDimensions.height - strokeWidth / 2}
  Q${strokeWidth / 2},${svgDimensions.height - strokeWidth / 2} ${
    strokeWidth / 2
  },${svgDimensions.height - borderRadius - strokeWidth / 2}
  L${strokeWidth / 2},${borderRadius + strokeWidth / 2}`

  return (
    <div
      ref={svgRef}
      className={styles.dynamicSVG}
      style={{
        zIndex: outlineCount - offset,
        transform: `translateX(${
          (skewDegrees < 0 ? -1 : 1) * (strokeWidth * 0.8) * offset
        }px) translateY(${strokeWidth * 0.8 * offset}px)`,
      }}
    >
      <motion.svg
        style={{
          transform: `skew(${skewDegrees}deg, 0deg)`,
          borderRadius: `${borderRadius}px`,
          boxShadow: `0px 0px 1rem ${color}`,
        }}
        width={svgDimensions.width}
        height={svgDimensions.height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={pathData}
          stroke={color}
          fill={'transparent'}
          strokeWidth={strokeWidth}
        />
      </motion.svg>
    </div>
  )
}

type SkewBoxProps = {
  children: React.ReactNode
  className?: string
  skewDegrees?: number
  outlineCount?: number
  strokeWidth?: number
  borderRadius?: number
  inset?: boolean
}

type DynamicSvgProps = {
  offset?: number
  color?: string
} & Pick<
  SkewBoxProps,
  'borderRadius' | 'skewDegrees' | 'outlineCount' | 'strokeWidth'
>

const SkewBox = ({
  children,
  className,
  skewDegrees = -20,
  outlineCount = 3,
  borderRadius,
  strokeWidth,
  inset = false,
}: SkewBoxProps) => {
  const colorsArray = ['#bc13fe', '#ff0052', '#00f3ff', '#9e00ff']
  const outlines = []

  for (let i = 0; i < outlineCount; i++) {
    const colorIndex = i % colorsArray.length
    outlines.push(
      <DynamicSVG
        offset={i}
        skewDegrees={skewDegrees}
        color={colorsArray[colorIndex]}
        key={i}
        outlineCount={outlineCount}
        borderRadius={borderRadius}
        strokeWidth={strokeWidth}
      />
    )
  }
  return (
    <div
      className={cn({
        [styles.skewbox]: true,
        [className]: !!className,
      })}
    >
      <div className={styles.skewboxEffect}>
        {outlines}
        <div
          className={styles.skewboxBackground}
          style={{
            transform: `skew(${skewDegrees}deg, 0deg)`,
            zIndex: inset ? 0 : outlineCount,
          }}
        >
          <div
            className={styles.skewboxBackgroundInner}
            style={{
              borderRadius: `${borderRadius - 8}px`,
              margin: `${strokeWidth}px`,
            }}
          />
        </div>
      </div>
      {children}
    </div>
  )
}

export default SkewBox
