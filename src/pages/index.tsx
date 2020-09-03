import React from 'react'
import { Container } from '@material-ui/core'
import { RepositoryList } from '../ui/repositories/RepositoryList'
import { Header } from '../ui/repositories/Header'
import { useSearchState } from '../ui/repositories/useSearchState'

export default function TopPage(): JSX.Element {
  const [{ userName }] = useSearchState()
  return (
    <div>
      <Header />
      <Container maxWidth={'md'} style={{ padding: '16px' }}>
        <RepositoryList userName={userName} />
      </Container>
    </div>
  )
}
