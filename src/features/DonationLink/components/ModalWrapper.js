import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material'
import Modal from '@mui/material/Modal';
import DialogTitle from '@mui/material/DialogTitle';
import FormContent from './FormContent'
import ShowOrderCode from './ShowOrderCode'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';


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
    margin:'auto',
    width:'fit-content',
    minWidth:'100vw'
  },
  modContent:{
    width:'fit-content'
  }
})

function ModalWrapper (props) {
  const theme = useTheme()
  const classes = useStyles(theme)()
  const { buttonIcon,className,donationlinkSubmitForm, loadingSubmitForm, openModal, orderCode, buttonTriggerLabel, donationlinkOpenModal, donationlinkCloseModal } = props
  const [modalStyle] = React.useState(getModalStyle)

  const handleOpen = () => {
    donationlinkOpenModal({})
  }

  const handleClose = () => {
    donationlinkCloseModal()
  }
 
  return (
    <>
      <button className={className} type='button' onClick={handleOpen}>
       {buttonIcon ? (buttonIcon): <></>}{buttonTriggerLabel && buttonTriggerLabel}
        {!buttonTriggerLabel && 'Buat Donation Link Baru'}
      </button>

      <Dialog
        className={classes.modal}
        open={openModal}
        // open={true}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        maxWidth='lg'
        fullWidth={true}
      >
        <DialogTitle onClose={handleClose}>Buat Link Donasi</DialogTitle>
        <DialogContent className={classes.modContent} >  
          <FormContent handleClose={handleClose} onSubmitForm={donationlinkSubmitForm} loadingOnSubmitForm={loadingSubmitForm}/>
          <div className="card-footer">
            Donation link: Fitur untuk melakukan donasi atau pengumpulan dana dengan menggunakan link.
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default ModalWrapper
