import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import Button from '@mui/material/Button';
import Alert from '@material-ui/lab/Alert'
import { LoadingButton } from '@mui/lab'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
      width: '100%'
    }
  },
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  }
}))

const ConfirmationModal = (props) => {
  const classes = useStyles()
  const { scrt,close,fetch,loading } = props
  return (
    <div className={classes.root}>
      <Alert variant="outlined" severity="warning" style={{marginButtom:'1rem'}}>Peringatan!!, generate merchant key baru akan mengakibatkan merchant key yang lama akan non-aktif, Klik Generate untuk tetap melanjutkan mengenerate merchant key baru, klik Batal untuk kalau tidak ingin mengenerate merchant key baru</Alert>
      <br/>
      <LoadingButton loadingIndicator="Generating..."  variant='contained' onClick={fetch} loading={loading} style={{marginButtom:'0.5rem'}}>Generate</LoadingButton>
      <br/>
      <br/>
      <Button variant='outlined' onClick={close} disabled={loading}> Batal </Button>
    </div>
  )
}

export default ConfirmationModal
