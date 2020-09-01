import React from 'react'
import { render } from '../testUtils'
import TopPage from '../../src/pages'

test('トップページのレンダリング', () => {
  const { getByText } = render(<TopPage />)

  expect(getByText(/hello next.js/i)).toBeInTheDocument()
})
