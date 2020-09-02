import React from 'react'
import {
  AppBar,
  createStyles,
  fade,
  InputBase,
  Theme,
  Toolbar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSearchState } from './search-context'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      width: '100%',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
    },
  })
)

export function Header(): JSX.Element {
  const classes = useStyles()
  const [state, dispatch] = useSearchState()

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    dispatch({ type: 'ChangeUserName', userName: e.target.value })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.search}>
          <InputBase
            placeholder="Input user name…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={state.userName}
            onChange={handleChange}
          />
        </div>
      </Toolbar>
    </AppBar>
  )
}
