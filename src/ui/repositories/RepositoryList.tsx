import React from 'react'
import { useSearchRepositoriesQuery } from '../../graphql/generated/types'
import { useRepositoriesState } from '../repositories-context'

export function RepositoryList(): JSX.Element {
  // 確定した入力情報をページ全体のContextから取得する
  const {
    state: { search },
  } = useRepositoriesState()

  const { loading, error, data } = useSearchRepositoriesQuery({
    variables: {
      userName: search.userName,
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
