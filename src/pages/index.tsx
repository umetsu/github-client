import React from 'react'
import { Container } from '@material-ui/core'
import { RepositoryList } from '../components/repositories/RepositoryList'
import { Header } from '../components/search-form/Header'
import { SearchProvider } from '../components/search-form/search-context'

export default function TopPage(): JSX.Element {
  return (
    <SearchProvider>
      <Header />
      <Container maxWidth={'md'} style={{ padding: '16px' }}>
        <RepositoryList />
      </Container>
    </SearchProvider>
  )
}
