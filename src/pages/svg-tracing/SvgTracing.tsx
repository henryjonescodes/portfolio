import React, { useEffect, useRef, useState } from "react"
import css from "./svg-tracing.module.scss"
import css2 from "pages/pages.module.scss"
import SiteNav from "components/dev-nav/SiteNav"

import { motion } from "framer-motion"

const pageStyles = css2 as any
const styles = css as any

type Props = {
  children?: React.ReactNode
  cornerRadius?: number
  strokeWidth?: number
}

const PathPractice = ({
  children,
  strokeWidth = 1,
  cornerRadius = 5,
}: Props) => {
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

    window.addEventListener("resize", handleResize)
  })

  return (
    <div className={styles.container} ref={containerRef}>
      <motion.svg
        className={styles.stroke}
        viewBox={viewboxString}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1,
          }}
          strokeWidth={strokeWidth}
          strokeDasharray="0 1"
          fill="none"
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
  )
}

const SvgTracing = () => {
  return (
    <div className={pageStyles.pageSvgTracing}>
      <SiteNav showToolbar={false} />
      <div className={styles.content}>
        <PathPractice>
          <h2>hello world</h2>
        </PathPractice>
      </div>
    </div>
  )
}

export default SvgTracing
