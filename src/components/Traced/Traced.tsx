import React, { useEffect, useRef, useState } from 'react'
import css from './traced.module.scss'

import { MotionValue, motion, useMotionValue } from 'framer-motion'
import cn from 'classnames'
const styles = css as any

type TracedProps = {
  children?: React.ReactNode
  className?: string
  cornerRadius?: number
  strokeWidth?: number
  color?: string
}

type TracedWithProgressProps = TracedProps & {
  progress: MotionValue
}
type TracedComponentProps = TracedProps & {
  contentClassName?: string
}

export const TracedWithProgress = ({
  children,
  className,
  strokeWidth = 1,
  cornerRadius = 5,
  color = '#7600b6',
  progress,
}: TracedWithProgressProps) => {
  const containerRef = useRef<any>(null)
  const [pathLength, setPathLength] = useState<number>(0)
  const viewboxString = `0 0 100 100`

  useEffect(() => {
    const timer = setTimeout(() => {
      setPathLength(
        (containerRef?.current?.clientWidth /
          containerRef?.current?.clientHeight) *
          100
      )
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Update path length on resize
  useEffect(() => {
    const handleResize = () => {
      setPathLength(
        (containerRef?.current?.clientWidth /
          containerRef?.current?.clientHeight) *
          100
      )
      console.log(containerRef?.current?.clientHeight)
    }

    window.addEventListener('resize', handleResize)
  })

  return (
    <div className={className}>
      <div className={styles.container} ref={containerRef}>
        <motion.svg
          className={styles.stroke}
          style={{ stroke: color }}
          viewBox={viewboxString}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            style={{ pathLength: progress }}
            strokeWidth={strokeWidth}
            strokeDasharray="0 1"
            fill="none"
            // Creates a css-like border with svg stroke that
            d={`
            M0,${cornerRadius - 1}
            V${100 - cornerRadius} 
            Q 0 100 ${cornerRadius} 100 
            H${pathLength - cornerRadius} 
            Q ${pathLength} 100 ${pathLength} ${100 - cornerRadius}
            V${cornerRadius}
            Q ${pathLength} 0 ${pathLength - cornerRadius} 0
            H ${cornerRadius}
            Q 0 0 0 ${cornerRadius}
            `}
          />
        </motion.svg>
        {children}
      </div>
    </div>
  )
}

const Traced = ({
  children,
  className,
  strokeWidth = 1,
  cornerRadius = 5,
  color = '#7600b6',
}: TracedProps) => {
  const containerRef = useRef<any>(null)
  const [pathLength, setPathLength] = useState<number>(0)
  const viewboxString = `0 0 100 100`

  useEffect(() => {
    const timer = setTimeout(() => {
      setPathLength(
        (containerRef?.current?.clientWidth /
          containerRef?.current?.clientHeight) *
          100
      )
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Update path length on resize
  useEffect(() => {
    const handleResize = () => {
      setPathLength(
        (containerRef?.current?.clientWidth /
          containerRef?.current?.clientHeight) *
          100
      )
      console.log(containerRef?.current?.clientHeight)
    }

    window.addEventListener('resize', handleResize)
  })

  return (
    <div className={className}>
      <div className={styles.container} ref={containerRef}>
        <motion.svg
          className={styles.stroke}
          style={{ stroke: color }}
          viewBox={viewboxString}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
              repeatDelay: 1,
            }}
            strokeWidth={strokeWidth}
            strokeDasharray="0 1"
            fill="none"
            // Creates a css-like border with svg stroke that
            d={`
            M0,${cornerRadius - 1}
            V${100 - cornerRadius} 
            Q 0 100 ${cornerRadius} 100 
            H${pathLength - cornerRadius} 
            Q ${pathLength} 100 ${pathLength} ${100 - cornerRadius}
            V${cornerRadius}
            Q ${pathLength} 0 ${pathLength - cornerRadius} 0
            H ${cornerRadius}
            Q 0 0 0 ${cornerRadius}
            `}
          />
        </motion.svg>
        {children}
      </div>
    </div>
  )
}

const Div = ({ children, contentClassName, ...rest }: TracedComponentProps) => {
  return (
    <Traced {...rest}>
      <div
        className={cn({
          [styles.content]: true,
          [contentClassName ?? '']: true,
        })}
      >
        {children}
      </div>
    </Traced>
  )
}

const Span = ({
  children,
  contentClassName,
  ...rest
}: TracedComponentProps) => {
  return (
    <Traced {...rest}>
      <span
        className={cn({
          [styles.content]: true,
          [contentClassName ?? '']: true,
        })}
      >
        {children}
      </span>
    </Traced>
  )
}

Div.displayName = 'div'
Traced.div = Div
Span.displayName = 'span'
Traced.span = Span

export default Traced
