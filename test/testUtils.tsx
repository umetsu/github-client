import {
  render as rtlRender,
  RenderOptions as RtlRenderOptions,
} from '@testing-library/react'
import React, { ComponentType } from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { theme } from '../src/theme'

function Providers({ children }: { children: React.ReactElement }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

type RenderOptions = RtlRenderOptions

function customRender(ui: React.ReactElement, options: RenderOptions = {}) {
  return {
    ...rtlRender(ui, { wrapper: Providers as ComponentType, ...options }),
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
