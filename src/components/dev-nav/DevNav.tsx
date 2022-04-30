import cn from "classnames"
import { useEffect, useState } from "react"
import { Link, To, useLocation } from "react-router-dom"

import Button from "@zui/button/Button"
import css from "./dev-nav.module.scss"
import React from "react"

const styles = css as any

type DevNavButtonProps = {
  href?: string
  buttonText?: string
  className?: string
  isSelected?: boolean
  onClick?: (e: any) => void
}

export type DevNavInputType = Omit<
  DevNavButtonProps,
  "splitPathName" | "className" | "isSelected"
> & {
  withHash?: boolean
}

type DevNavProps = {
  navItems?: DevNavInputType[]
  showToolbar?: boolean
  transition?: boolean
  className?: string
  buttonClassName?: string
  hiding?: boolean
  withHash?: boolean
  children?: React.ReactNode
}

export type DevNavPrefilledProps = Omit<
  DevNavProps,
  "navItems" | "className" | "buttonClassName" | "hiding" | "withHash"
>

export const DevNavButton = ({
  buttonText,
  href,
  className,
  isSelected,
  onClick,
}: DevNavButtonProps) => {
  const internalClassName = !!className ? className : ""
  const buttonObject = (
    <Button
      className={cn({
        [styles.selected]: isSelected,
        [internalClassName]: !!className,
      })}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  )

  if (!!href) {
    return (
      <Link to={href} style={{ textDecoration: "none" }}>
        {buttonObject}
      </Link>
    )
  }
  return <>{buttonObject}</>
}

const DevNav = ({
  navItems = undefined,
  showToolbar = true,
  transition = true,
  hiding = false,
  withHash = false,
  className,
  buttonClassName,
  children,
}: DevNavProps) => {
  const location = useLocation()
  const [show, setShow] = useState<boolean>(transition || !hiding)

  const internalClassName = !!className ? className : ""

  // Close toolbar on mount
  useEffect(() => {
    if (transition && hiding) {
      const timer = setTimeout(() => {
        if (showToolbar === false) {
          setShow(false)
        }
      }, 500)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [])

  if (!navItems) {
    return null
  }

  return (
    <>
      <span
        className={cn({
          [styles.devNav]: true,
          [styles.devNavAbsolute]: hiding,
          [styles.devNavHidden]: !show && hiding,
          [internalClassName]: !!className,
        })}
      >
        {navItems.map(({ buttonText, href, withHash = false }, index) => {
          const splitPathName = withHash
            ? location.hash.slice(1, location.hash.length)
            : location.pathname.slice(location.pathname.indexOf("/") + 1)

          const isSelected =
            !!href &&
            (withHash
              ? splitPathName ===
                (href?.slice(href?.indexOf("#") + 1).length === href.length
                  ? href?.slice(href?.indexOf("#") + 1)
                  : "0")
              : splitPathName === href.slice(href.indexOf("/") + 1))

          return (
            <DevNavButton
              key={index}
              buttonText={buttonText}
              href={href}
              isSelected={isSelected}
              className={buttonClassName}
            />
          )
        })}
        {children}
      </span>
      {hiding && (
        <span
          className={cn({
            [styles.floater]: true,
            [styles.floaterOpaque]: !show,
          })}
        >
          <Button
            onClick={() => {
              setShow(!show)
            }}
          >
            {show ? "hide" : "show"}
          </Button>
        </span>
      )}
    </>
  )
}

export default DevNav
