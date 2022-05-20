import React from 'react'
import { withStyles, makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material'

import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'

const useStyles = (theme) => makeStyles({
  wrapper: {
    // margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
})

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex'
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none'
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(Switch)

export default function OnOffSwitcher (props) {
  const { loadingSubmitOnOff } = props
  const theme = useTheme()
  const classes = useStyles(theme)()
  const [state, setState] = React.useState({
    checkedC: true
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  return (
    <div className={classes.wrapper}>
      <FormGroup>
        <Typography component='div'>
          <Grid component='label' container alignItems='center' spacing={1}>
            <Grid item>Off</Grid>
            <Grid item>
              <AntSwitch checked={state.checkedC} onChange={handleChange} name='checkedC' />
            </Grid>
            <Grid item>On</Grid>
          </Grid>
        </Typography>
      </FormGroup>
      {loadingSubmitOnOff && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  )
}
