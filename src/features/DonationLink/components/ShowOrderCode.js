import React from 'react'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material'
import { green } from '@mui/material/colors'
import Button from '@mui/material/Button'

const useStyles = (theme) => makeStyles({
  root: {
    // display: 'flex',
    // alignItems: 'center'
    '& > *': {
      marginTop: theme.spacing(1),
      width: '100%'
      //   width: '25ch'
    }
  },
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
  },
  buttonSuccess: {
    width: '100%',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  }
})

const ShowOrderCode = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)()
  const { closeModal } = props
  const { orderCode } = props
  return (
    <div className={classes.root}>
      <p id='spring-modal-description' style={{ textAlign: 'center' }}>Nomor Pesanan Anda</p>
      <h2 id='spring-modal-title' style={{ textAlign: 'center' }}>{orderCode}</h2>
      {/* <div className='form-group text-center'>
        <small className='text-muted'>Nomor Pesanan Anda</small>
        <h3>{orderCode}</h3>
      </div>
      <div className='form-group'>
        <button type='button' className='btn btn-primary btn-lg btn-block'>Ok</button>
      </div> */}
      <Button
        variant='contained'
        color='secondary'
        onClick={closeModal}
        // disabled={loadingSubmitForm}
        className={classes.buttonSuccess}
      >
            Ok
      </Button>
    </div>
  )
}

export default ShowOrderCode
