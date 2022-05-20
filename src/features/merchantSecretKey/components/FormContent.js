import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import _ from 'lodash'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import KeyIcon from '@mui/icons-material/Key'
import { lime } from '@mui/material/colors'
import copy from 'copy-to-clipboard';

const useStyles = (theme) => makeStyles({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
      width: '100%',
      background:'white',
      border:'none'
    }
  }
})
const FormData = (props) => {
  const { loading,fetchScr,scrt,onClose } = props
  const theme = useTheme()
  const classes = useStyles(theme)()

  const [isCopy,setIsCopy] = React.useState(false)
  
  const onCopy = (e) =>{
    setIsCopy(true)
    copy(scrt, { debug: true });
    setTimeout(()=>{ setIsCopy(false) },5000)
  }

  return (
    <Grid container >
       <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
          <Grid container xs={12}> 
            <Grid item xs={11}>
              <Typography variant='h6'>Secret Key Anda</Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton color="primary" aria-label="upload picture" component="span" onClick={onClose}>
                <CloseIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <br/>
          <TextField
            focused
            fullWidth
            label=' '
            hiddenLabel
            InputProps={{
              readOnly: true,
              startAdornment:<KeyIcon/>,
              endAdornment:<Button onClick={onCopy} variant='outlined' startIcon={isCopy ? <CheckIcon/> : <ContentCopyIcon/>}>{isCopy ? 'Copied' : 'Copy' }</Button>
            }}
            value={scrt}
          />
          <br/>
          <Alert variant="outlined" severity="warning">Pastikan untuk mengcopy Secret Key sekarang. <Typography variant='bold'>Anda tidak bisa melihatnya lagi</Typography></Alert>
        </FormControl>
        
    </Grid>
  )
}

export default FormData
