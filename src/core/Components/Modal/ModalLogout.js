import React, { Component } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
// import Loader from '../../Components/Loader/Loader'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const Comp = ({ logout }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const handleYesButton = () => {
    // setAnchorEl(null)
    handleCloseModal()
    logout({})
  }
  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Card sx={style}>
        <CardHeader
          title='Logout Confirmation'
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
              Klik Yes untuk keluar
          </Typography>

        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            onClick={handleYesButton}
          >Yes
          </Button>
          <Button
            color='error'
            variant='contained'
            onClick={handleCloseModal}
          >No
          </Button>
        </CardActions>
      </Card>
    </Modal>)
}
export default Comp
