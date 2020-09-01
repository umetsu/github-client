import {
  render as rtlRender,
  RenderOptions as RtlRenderOptions,
} from '@testing-library/react'
import React, { ComponentType } from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { theme } from '../src/theme'
import { MockedProvider } from '@apollo/client/testing'
import { MockedResponse } from '@apollo/client/utilities/testing/mocking/mockLink'

type RenderOptions = RtlRenderOptions & {
  mocks?: ReadonlyArray<MockedResponse>
}

function customRender(
  ui: React.ReactElement,
  { mocks, ...options }: RenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactElement }) {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MockedProvider>
    )
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper as ComponentType, ...options }),
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
