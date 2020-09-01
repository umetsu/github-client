import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { Container } from '@material-ui/core'
import { theme } from '../theme'

export default function TopPage(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={'md'} style={{ padding: '16px' }}>
        <>Hello Next.js</>
      </Container>
    </ThemeProvider>
  )
}
