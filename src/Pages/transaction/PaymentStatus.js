import React from 'react'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Fab from '@material-ui/core/Fab'
import NavigationIcon from '@material-ui/icons/Navigation'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { PaymentPageStatusPaymentCon } from '../../features/PaymentLink'

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}))
function Comp (props) {
  const { history, errorCheckStatusPayment, paymentStatus, openSnackBarStatusPayment, transactionCheckStatusPayment, transactionId, transactionSetOpenSnackBarStatusPayment } = props
  const classes = useStyles()
  const handleClose = () => {
    transactionSetOpenSnackBarStatusPayment({ open: false })
  }
  const handleOnClick = () => {
    transactionCheckStatusPayment({ id: transactionId })
  }
  if (paymentStatus === 'paid') {
    // redirect to payment success
    return history.push('/payment-step3')
  }
  return (
    <>
      {(errorCheckStatusPayment && errorCheckStatusPayment.length > 0) &&
        <Snackbar open={openSnackBarStatusPayment} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error'>
            <ul>
              {errorCheckStatusPayment.map((v, i) => (<li key={i}>{v.message}</li>))}
            </ul>
          </Alert>
        </Snackbar>}
      {!(errorCheckStatusPayment && errorCheckStatusPayment.length > 0) &&
        <Snackbar open={openSnackBarStatusPayment} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success'>
            Status Pembayaran: {paymentStatus}
          </Alert>
        </Snackbar>}
      <Fab color='primary' variant='extended' onClick={handleOnClick}>
        <NavigationIcon className={classes.extendedIcon} />
        Check Status
      </Fab>
    </>
  )
}
export default PaymentPageStatusPaymentCon(withRouter(Comp))
