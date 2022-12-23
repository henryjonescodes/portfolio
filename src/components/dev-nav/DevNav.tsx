import React, { useEffect, useState } from "react"
import css from "./dev-nav.module.scss"
import { Link } from "react-router-dom"
import Button from "../../zonez-ui/button/Button"
import { useLocation } from "react-router-dom"
import cn from "classnames"

const styles = css as any

const DevNav = ({ showToolBar = false }: { showToolBar?: boolean }) => {
  const location = useLocation()
  const [show, setShow] = useState<boolean>(true)

  // Close toolbar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showToolBar === false) {
        setShow(false)
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    console.log(location.pathname.split("/")[1])
  }, [location])

  return (
    <>
      <span
        className={cn({
          [styles.devNav]: true,
          [styles.devNavHidden]: !show,
        })}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            className={cn({
              [styles.selected]: location.pathname.split("/")[1] === "",
            })}
          >
            Home
          </Button>
        </Link>
        <Link to="/three-js" style={{ textDecoration: "none" }}>
          <Button
            className={cn({
              [styles.selected]: location.pathname.split("/")[1] === "three-js",
            })}
          >
            Three Scroller
          </Button>
        </Link>
        <Link to="/title-motion" style={{ textDecoration: "none" }}>
          <Button
            className={cn({
              [styles.selected]:
                location.pathname.split("/")[1] === "title-motion",
            })}
          >
            Title Motion
          </Button>
        </Link>
        <Link to="/drip-text" style={{ textDecoration: "none" }}>
          <Button
            className={cn({
              [styles.selected]:
                location.pathname.split("/")[1] === "drip-text",
            })}
          >
            Drip Text
          </Button>
        </Link>
      </span>
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
    </>
  )
}

export default DevNav
