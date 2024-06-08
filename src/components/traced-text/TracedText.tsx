import cn from 'classnames'
import React, { FC, useEffect, useRef } from 'react'
import styles from './tracedtext.module.scss'

type AnimationMode = 'individual' | 'individualPath' | 'together'

interface TracedTextProps {
  SvgText: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  mode?: AnimationMode
  staggerChildren?: number
  animationDuration?: number
}
const TracedText: FC<TracedTextProps> = ({
  SvgText,
  mode = 'individual',
  staggerChildren = 0.5,
  animationDuration = 2.0,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current) {
      const svgElement = wrapperRef.current.querySelector('svg')
      if (svgElement) {
        const paths = svgElement.querySelectorAll<SVGPathElement>('path')

        // <svg/> styles
        svgElement.style.animationDuration = `${animationDuration}s`
        if (mode === 'individual') {
          svgElement.style.animationDelay = `${paths.length * staggerChildren}s`
        }

        // <path/> styles
        paths.forEach((path, index) => {
          const pathLength = path.getTotalLength()
          path.style.strokeDasharray = `${pathLength}`
          path.style.strokeDashoffset = `${pathLength}`
          path.style.animationDuration = `${animationDuration}s`

          if (mode !== 'together') {
            const delay = (paths.length - index) * staggerChildren
            path.style.animationDelay = `${delay}s`
          }
        })
      }
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={cn({
        [styles.wrapper]: true,
        [styles.wrapperFillIndividual]: mode !== 'together',
        [styles.wrapperFillTogether]: mode === 'together',
      })}
    >
      <SvgText preserveAspectRatio="xMinYMin meet" width="100%" height="auto" />
    </div>
  )
}

export default TracedText
