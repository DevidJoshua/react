import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Modal from '@mui/material/Modal'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import AppConfig from 'core/Config/AppConfig'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Stack from '@mui/material/Stack'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import TablepaginationActions from '../../features/TablePagination/redux'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

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

function Header ({ loading, apiVersion, formSchema, redirectAfterUpsert, fileArray, payload, serviceName, tablepaginationSubmitForm, tablepaginationResetForm, pageTitle, toggleDrawerFlag, setToggleDrawer, logout }) {
  var history = useHistory()
  const isLoading = typeof loading !== 'undefined' && loading
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = () => {
    setToggleDrawer({ toggleDrawer: true })
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    setAnchorEl(null)
    handleOpenModal()
  }
  const handleMyProfile = () => {
    setAnchorEl(null)
    history.push('/my-profile')
  }
  const handleCancel = () => {
    setAnchorEl(null)
    handleOpenModal()
  }
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const handleYesButton = () => {
    // setAnchorEl(null)
    handleCloseModal()
    // logout({})
    tablepaginationResetForm({ serviceName, exceptDefaultFormValue: true })
  }
  const handleSave = () => {
    // setAnchorEl(null)
    handleCloseModal()
    // logout({})
    tablepaginationSubmitForm({
      payload,
      serviceName,
      history,
      fileArray,
      redirectAfterUpsert,
      formSchema,
      apiVersion
    })
  }

  return (
    <>
      <AppBar position='fixed' open={toggleDrawerFlag}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              mr: 2,
              ...(toggleDrawerFlag && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
            Simpan perubahan?
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button variant='contained' color='error' disabled={isLoading} onClick={handleCancel} startIcon={<DeleteIcon />}>Batal</Button>
            <Button variant='contained' color='success' disabled={isLoading} onClick={handleSave} endIcon={<SendIcon />}>Simpan</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Card sx={style}>
          <CardHeader
            title='Confirmation'
          />
          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              Konfirmasi Batal Ubah Data
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
      </Modal>
    </>
  )
}

export default connect(
  (state, ownProps) => {
    var serviceName = state.tablepagination.activeForm
    var payload = (state.tablepagination.payload || {})[serviceName] || {}
    var apiVersion = (state.tablepagination.apiVersion || {})[serviceName] || {}
    var loading = (state.tablepagination.loading || {})[serviceName]
    var formSchema = (state.tablepagination.formSchema || {})[serviceName] || {}
    var redirectAfterUpsert = (state.tablepagination.redirectAfterUpsert || {})[serviceName]
    var fileArray = (state.tablepagination.fileArray || {})[serviceName] || {}
    return { loading, formSchema, serviceName, payload, fileArray, redirectAfterUpsert, apiVersion }
  },
  dispatch => ({ tablepaginationSubmitForm: data => dispatch(TablepaginationActions.tablepaginationSubmitForm(data)) })
)(injectIntl((props) => {
  var history = useHistory()
  return <Header history={history} {...props} />
}))
