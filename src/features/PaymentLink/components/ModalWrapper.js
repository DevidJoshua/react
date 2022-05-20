import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { useTheme, useMediaQuery } from '@mui/material'
import FormContent from './FormContent'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import CopyIcon from '@mui/icons-material/ContentCopy'
import CloseIcon from '@mui/icons-material/Close'
import { over } from 'lodash'
import AddLinkIcon from '@mui/icons-material/AddLink'

function getModalStyle () {
  const top = 50
  const left = 50
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = (theme) => makeStyles({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: 'fit-content',
    minWidth: '100vw',
    overflow: 'scroll'
  },
  modContent: {
    width: 'fit-content'
  }
})

const ModalWrapper = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)()
  const { openIdModal, buttonIcon, className, paymentlinkSubmitForm, closeIdCodeModal, loadingSubmitForm, openModal, buttonTriggerLabel, paymentlinkOpenModal, paymentlinkCloseModal, userId, merchantId, deviceId, idCode, setPayload, resetPayload, payload } = props
  const [modalStyle] = React.useState(getModalStyle)

  const handleOnCloseIdModal = () => {
    closeIdCodeModal()
  }

  const handleOpen = () => {
    paymentlinkOpenModal({})
  }

  const handleClose = () => {
    paymentlinkCloseModal()
  }
  document.body.style.overflow = null

  return (
    <>
      <Button sx={{ marginRight: '2rem', marginBottom: '0.5rem', marginTop: '0.5rem' }} onClick={handleOpen} variant='outlined' startIcon={<AddLinkIcon />}>{buttonTriggerLabel}</Button>
      <Dialog
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        maxWidth='lg'
        fullWidth
      >
        <DialogTitle onClose={handleClose}>Buat Payment Link</DialogTitle>
        <DialogContent className={classes.modContent}>
          <FormContent userId={userId} merchantId={merchantId} deviceId={deviceId} handleClose={handleClose} onSubmitForm={paymentlinkSubmitForm} loadingOnSubmitForm={loadingSubmitForm} idCode={idCode} setPayload={setPayload} resetPayload={resetPayload} payload={payload} />
        </DialogContent>
      </Dialog>

      <Modal
        open={openIdModal}
        onClose={() => handleOnCloseIdModal()}
        aria-describedby='modal-modal-description'
        disableBackdropClick
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, flexDirection: 'row' }}>
          <Typography id='modal-modal-title' variant='h6' textAlign='center' component='h5'>Nomor Identifikasi</Typography>
          <Typography id='modal-modal-title' variant='h6' fontWeight={700} textAlign='center' component='h1' fontSize={20}>{idCode}</Typography>
          <Stack direction='row' justifyContent='center' spacing={2} mt={2}>
            <Button variant='outlined' color='error' startIcon={<CloseIcon />} onClick={handleOnCloseIdModal}>Tutup</Button>
            <Button variant='contained' endIcon={<CopyIcon />} onClick={() => { navigator.clipboard.writeText(idCode).then(() => alert('Copied'), (err) => alert('Couldn\'t ', err)) }}>Salin</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
export default ModalWrapper
