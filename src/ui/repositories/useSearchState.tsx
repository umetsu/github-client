import { atom, useRecoilState } from 'recoil'

type State = {
  userName: string
}

const searchState = atom<State>({
  key: 'searchState', // unique ID (with respect to other atoms/selectors)
  default: { userName: '' }, // default value (aka initial value)
})

type Dispatch = {
  changeUserName: (userName: string) => void
}

export function useSearchState(): [State, Dispatch] {
  const [state, setState] = useRecoilState(searchState)

  const dispatch: Dispatch = {
    changeUserName: (userName) =>
      setState((s) => ({ ...s, userName: userName })),
  }

  return [state, dispatch]
}
