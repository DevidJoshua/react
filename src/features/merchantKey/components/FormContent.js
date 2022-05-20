import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'
import _ from 'lodash'

const useStyles = (theme) => makeStyles({
  root: {
    // display: 'flex',
    // alignItems: 'center',
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

const FormData = (props) => {
  const { errorSubmitForm, onSubmitForm, loadingSubmitForm, merchantId } = props
  console.log('errorSubmitForm===', errorSubmitForm)
  const theme = useTheme()
  const classes = useStyles(theme)()
  const [values, setValues] = React.useState({
    merchant_id: merchantId
  })
  // const [loading, setLoading] = React.useState(false)
  const [success] = React.useState(true)
  //   const [success, setSuccess] = React.useState(false)
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  })

  const handleChange = (prop) => (event, value) => {
    // setValues({ ...values, [prop]: value })
    setValues({ ...values, [prop]: value || event.target.value })
    // setValues({ ...values, [prop]: event.target.value })
  }
  const handleSubmit = (e) => {
    console.log('values==>', values)
    if (values.merchant_id && isValid()) {
      // setLoading(true)
      // submit form
      onSubmitForm(values)
    }
  }
  const isValid = () => {
    if (values.merchant_id === undefined || !values.merchant_id) return false
    else return true
  }
  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <p id='spring-modal-description' style={{ textAlign: 'center' }}>Anda akan membuat key id yang baru</p>
      <h2 id='spring-modal-title' style={{ textAlign: 'center' }}>Klik button "Buat"</h2>
      {!_.isEmpty(errorSubmitForm) && errorSubmitForm.map((v, i) => (<Alert key={i} severity='error'>{v.message}</Alert>))}
      <div className={classes.wrapper}>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleSubmit}
          disabled={loadingSubmitForm}
          className={buttonClassname}
        >
            Buat
        </Button>
        {loadingSubmitForm && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </form>
  )
}

export default FormData
