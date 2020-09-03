import { AppProps } from 'next/app'
import React from 'react'
import '../styles/global.css'
import { ApolloProvider } from '@apollo/client'
import { theme } from '../theme'
import { ThemeProvider } from '@material-ui/styles'
import { client } from '../graphql/client'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </ApolloProvider>
  )
}
