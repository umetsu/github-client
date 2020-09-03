import React from 'react'
import { Container } from '@material-ui/core'
import { RepositoryList } from '../ui/repositories/RepositoryList'
import { Header } from '../ui/repositories/Header'
import { RepositoriesProvider } from '../ui/repositories/context'

export default function TopPage(): JSX.Element {
  return (
    <RepositoriesProvider>
      <Header />
      <Container maxWidth={'md'} style={{ padding: '16px' }}>
        <RepositoryList />
      </Container>
    </RepositoriesProvider>
  )
}
