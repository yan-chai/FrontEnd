import { CookiesProvider } from "react-cookie"
import '../styles/globals.css'
import '../styles/landing.css'
import '../styles/log_and_reg.css'
import '../styles/home.css'

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

export default MyApp
