import React, { useEffect, useState } from "react"
import css from "./dev-nav.module.scss"
import { Link } from "react-router-dom"
import Button from "../../zonez-ui/button/Button"
import { useLocation } from "react-router-dom"
import cn from "classnames"

const styles = css as any

const DevNav = () => {
  const location = useLocation()
  const [show, setShow] = useState<boolean>(false)

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
          <Button>Home</Button>
        </Link>
        <Link to="/three-js" style={{ textDecoration: "none" }}>
          <Button>Three Scroller</Button>
        </Link>
        <Link to="/drip-text" style={{ textDecoration: "none" }}>
          <Button>Drip Text</Button>
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
