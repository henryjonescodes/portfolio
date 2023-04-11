import SiteNav from "components/dev-nav/SiteNav"
import css2 from "pages/pages.module.scss"
import css from "./home.module.scss"
import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import firebase from "firebaseApp"
import Button from "zonez-ui/button/Button"
const styles = css as any
const pageStyles = css2 as any

const Home = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const auth = getAuth(firebase)

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log("Logged in", user)
      })
      .catch((error) => {
        setEmail("")
        setPassword("")
        const errorCode = error.code
        const errorMessage = error.message
        console.log(error, errorCode, errorMessage)
      })
  }
  return (
    <div className={pageStyles.pageHome}>
      <SiteNav showToolbar={true} />
      <div className={styles.login}>
        <span>
          <h2>Email</h2>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email"
          />
        </span>
        <span>
          <h2>Password</h2>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password"
            onSubmit={() => {
              login()
            }}
          />
        </span>
        <Button
          onClick={() => {
            login()
          }}
          className={styles.loginButton}
        >
          Sign In
        </Button>
      </div>
    </div>
  )
}

export default Home
