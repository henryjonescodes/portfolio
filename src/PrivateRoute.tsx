import React, { useContext } from "react"
import { Route, RouteProps, redirect } from "react-router-dom"
import { AuthContext } from "Auth"

type Props = {
  element: JSX.Element
} & RouteProps

const PrivateRoute = ({ element, ...rest }: Props) => {
  const { currentUser } = useContext(AuthContext)

  // if (!currentUser) {
  //   redirect("/")
  // }
  // if (!element) {
  //   return null
  // }
  return <Route {...rest} element={element} />
}

export default PrivateRoute
