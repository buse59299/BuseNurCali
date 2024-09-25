import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react"
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </SessionProvider>
  )
}