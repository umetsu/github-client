import React from 'react'
import { useSearchRepositoriesQuery } from '../../graphql/generated/types'

type Props = {
  userName: string
}

export function RepositoryList({ userName }: Props): JSX.Element {
  const { loading, error, data } = useSearchRepositoriesQuery({
    variables: {
      userName: userName,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <>
      {data?.repositoryOwner?.repositories.nodes
        ?.filter(notNull)
        .map((repo) => (
          <div key={repo.id}>{repo.name}</div>
        ))}
    </>
  )
}

function notNull<T>(item: T | null): item is T {
  return item !== null
}
