import React from 'react'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import FormContent from './FormContent'
import ShowOrderCode from './ShowOrderCode'

// function rand () {
//   return Math.round(Math.random() * 20) - 10
// }

function getModalStyle () {
  const top = 50
  const left = 50
  //   const top = 50 + rand()
  //   const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = (theme) => makeStyles({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

function ModalWrapper (props) {
  const theme = useTheme()
  const classes = useStyles(theme)()
  const { errorSubmitForm, merchantId, merchantkeySubmitForm, loadingSubmitForm, openModal, orderCode, buttonTriggerLabel, merchantkeyOpenModal, merchantkeyCloseModal } = props
  const [modalStyle] = React.useState(getModalStyle)
  const handleOpen = () => {
    merchantkeyOpenModal({})
  }

  const handleClose = () => {
    merchantkeyCloseModal()
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {/* <ShowOrderCode closeModal={handleClose} orderCode={'223456'} /> */}
      {orderCode && <ShowOrderCode closeModal={handleClose} orderCode={orderCode} />}
      {!orderCode && <FormContent errorSubmitForm={errorSubmitForm} merchantId={merchantId} onSubmitForm={merchantkeySubmitForm} loadingSubmitForm={loadingSubmitForm} />}
    </div>
  )
  return (
    <>
      <Button variant='contained' onClick={handleOpen}>
        {buttonTriggerLabel && buttonTriggerLabel}
        {!buttonTriggerLabel && 'Buat Baru Payment Link'}
      </Button>
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </>
  )
}
export default ModalWrapper
