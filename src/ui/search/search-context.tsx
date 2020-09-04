/**
 * 検索条件に関するStateを管理する
 */
import React from 'react'

type State = { userName: string }
const initialState: State = { userName: '' }

type Action = { type: 'ChangeUserName'; userName: string }
type Dispatch = (action: Action) => void

const StateContext = React.createContext<State | undefined>(undefined)
const DispatchContext = React.createContext<Dispatch | undefined>(undefined)

export function SearchProvider({
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
    case 'ChangeUserName': {
      return { ...state, userName: action.userName }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function useSearchState(): { state: State; dispatch: Dispatch } {
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)
  if (state === undefined || dispatch == undefined) {
    throw new Error('useSearchState must be used within a SearchProvider')
  }

  return { state, dispatch }
}
