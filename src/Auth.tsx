import firebase from "firebaseApp"
import { User, getAuth } from "firebase/auth"
import React, { createContext, useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

type AuthContextType = { currentUser: User | null }

export const AuthContext = createContext<AuthContextType>({ currentUser: null })

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const auth = getAuth(firebase)

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser)
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
