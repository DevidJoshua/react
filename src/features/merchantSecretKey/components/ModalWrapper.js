import React from 'react'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import FormContent from './FormContent'
import { LoadingButton } from '@mui/lab'
import ConfirmationModal from './ConfirmationModal'

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
    // border: '2px solid #000',
    borderRadius:'0.5rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down('md')]: {
      width:'80%'
    },
    [theme.breakpoints.up('md')]: {
      width:'80%'
    },
    [theme.breakpoints.up('lg')]: {
      width:'60%'
    },
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
  const {isOpenModal,openModal,serviceReference,closeModal,loading,scrt,buttonTriggerLabel,fetch,merchantId} = props
  console.log("propsssssss=====>",props)

  const [modalStyle] = React.useState(getModalStyle)

  const handleFetch = () => {
    fetch({merchantId,serviceReference})
  }

  const handleClose = () => {
    console.log("handle close")
    closeModal()
  }
  

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {scrt === '' || scrt === undefined 
      ? <ConfirmationModal loading={loading} fetch={handleFetch} close={handleClose}/>
      : <FormContent scrt={scrt || ''} onClose={handleClose}/>}
    </div>
  )

  return (
    <>
      <LoadingButton  loadingIndicator="Generating..."  variant='contained' onClick={openModal} loading={loading} >{buttonTriggerLabel}</LoadingButton>
      <Modal
        className={classes.modal}
        open={isOpenModal}
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
