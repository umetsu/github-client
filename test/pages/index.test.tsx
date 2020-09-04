import React from 'react'
import { render } from '../testUtils'
import TopPage from '../../src/pages'
import { SearchRepositoriesDocument } from '../../src/graphql/generated/types'
import user from '@testing-library/user-event'

type Repository = {
  createdAt: string
  name: string
  description: null
  id: string
  isPrivate: boolean
  url: string
  primaryLanguage: { color: string; name: string; id: string }
  updatedAt: string
}

const repositories: Repository[] = [
  {
    id: 'MDEwOlJlcG9zaXRvcnkyOTE5MzA0NTE=',
    name: 'github-client',
    description: null,
    url: 'https://github.com/umetsu/github-client',
    primaryLanguage: {
      id: 'MDg6TGFuZ3VhZ2UyODc=',
      name: 'TypeScript',
      color: '#2b7489',
    },
    isPrivate: false,
    createdAt: '2020-09-01T07:40:12Z',
    updatedAt: '2020-09-01T07:40:17Z',
  },
]

function mock(userName: string, repositories: ReadonlyArray<Repository> = []) {
  return {
    request: {
      query: SearchRepositoriesDocument,
      variables: { userName: userName },
    },
    result: {
      data: {
        repositoryOwner: {
          repositories: {
            nodes: repositories,
          },
        },
      },
    },
  }
}

test('トップページのレンダリング', async () => {
  const { getByLabelText, getByText, findByText } = render(<TopPage />, {
    mocks: [mock(''), mock('umetsu', repositories)],
  })

  await user.type(getByLabelText(/user-name/), 'umetsu')
  user.click(getByText(/search/i))

  expect(getByText(/loading/i)).toBeInTheDocument()
  expect(await findByText(/github-client/i)).toBeInTheDocument()
})
