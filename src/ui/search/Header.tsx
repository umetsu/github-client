import React from 'react'
import {
  AppBar,
  Button,
  createStyles,
  fade,
  InputBase,
  Theme,
  Toolbar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useRepositoriesState } from '../repositories-context'
import { useSearchState } from './search-context'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      dispalay: 'flex',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
    },
    inputRoot: {
      color: 'inherit',
      flex: 1,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
    },
  })
)

export function Header(): JSX.Element {
  const classes = useStyles()
  const { dispatch: pageDispatch } = useRepositoriesState()
  const {
    state: { userName },
    dispatch,
  } = useSearchState()

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const userName = e.target.value
    dispatch({ type: 'ChangeUserName', userName })
  }

  function handleClick() {
    pageDispatch({ type: 'DecideUserName', userName })
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
            inputProps={{ 'aria-label': 'user-name' }}
            value={userName}
            onChange={handleChange}
          />
          <Button variant={'contained'} onClick={handleClick}>
            Search
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}
