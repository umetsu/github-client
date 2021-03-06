/**
 * ページ全体で共有するStateを管理する
 */
import React from 'react'

type State = {
  // 入力が確定した検索情報を保持
  search: { userName: string }
}
const initialState: State = { search: { userName: '' } }

type Action = { type: 'DecideUserName'; userName: string }
type Dispatch = (action: Action) => void

const StateContext = React.createContext<State | undefined>(undefined)
const DispatchContext = React.createContext<Dispatch | undefined>(undefined)

export function RepositoriesProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'DecideUserName': {
      return { ...state, search: { userName: action.userName } }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function useRepositoriesState(): { state: State; dispatch: Dispatch } {
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)
  if (state === undefined || dispatch == undefined) {
    throw new Error(
      'useRepositoriesState must be used within a RepositoriesProvider'
    )
  }

  return { state, dispatch }
}
