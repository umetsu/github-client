import React from 'react'
import { render } from '../testUtils'
import TopPage from '../../src/pages'
import { SearchRepositoriesDocument } from '../../src/graphql/generated/types'

test('トップページのレンダリング', async () => {
  const { getByText, findByText } = render(<TopPage />, {
    mocks: [
      {
        request: {
          query: SearchRepositoriesDocument,
          variables: { userName: 'umetsu' },
        },
        result: {
          data: {
            viewer: {
              login: 'umetsu',
            },
            repositoryOwner: {
              repositories: {
                nodes: [
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
                ],
              },
            },
          },
        },
      },
    ],
  })

  expect(getByText(/loading/i)).toBeInTheDocument()
  expect(await findByText(/umetsu/i)).toBeInTheDocument()
})
