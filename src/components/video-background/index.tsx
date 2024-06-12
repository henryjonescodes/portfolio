import React from 'react'
import styles from './video-background.module.scss'
import cn from 'classnames'

interface VideoBackgroundProps {
  videoSrc: string
  className?: string
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  className,
}) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <video autoPlay loop muted className={styles.video}>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
export default VideoBackground
