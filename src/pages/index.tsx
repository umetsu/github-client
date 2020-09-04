import React from 'react'
import { Container } from '@material-ui/core'
import { RepositoryList } from '../ui/repositories/RepositoryList'
import { Header } from '../ui/search/Header'
import { RepositoriesProvider } from '../ui/repositories-context'
import { SearchProvider } from '../ui/search/search-context'

export default function TopPage(): JSX.Element {
  return (
    <div>
      <RepositoriesProvider>
        <SearchProvider>
          <Header />
        </SearchProvider>
        <Container maxWidth={'md'} style={{ padding: '16px' }}>
          <RepositoryList />
        </Container>
      </RepositoriesProvider>
    </div>
  )
}
