import { AppProps } from "next/app"
import { QueryClientProvider } from "react-query"
import { queryClient } from "../services/queryClient"
import "../styles/global.scss"

function MyApp({ Component, pageProps }) {
  return <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
}

export default MyApp
