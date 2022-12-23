import React from "react"
import css from "./button.module.scss"
import cn from "classnames"

const styles = css as any
type Props = {
  children: React.ReactNode
  className?: string
  onClick?: (e: any) => void
}

const Button = ({ children, onClick, className }: Props) => {
  const internalClassName = !!className ? className : ""

  return (
    <div
      onClick={onClick}
      className={cn({
        [styles.button]: true,
        [internalClassName]: !!className,
      })}
    >
      {children}
    </div>
  )
}

export default Button
