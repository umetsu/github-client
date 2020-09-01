import React from 'react'
import { Container } from '@material-ui/core'
import { useSearchRepositoriesQuery } from '../graphql/generated/types'

export default function TopPage(): JSX.Element {
  const { loading, error, data } = useSearchRepositoriesQuery({
    variables: {
      userName: 'umetsu',
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <Container maxWidth={'md'} style={{ padding: '16px' }}>
      <>{data?.viewer.login}</>
    </Container>
  )
}
