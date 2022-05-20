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
import { isMobile } from 'react-device-detect'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import AppConfig from 'core/Config/AppConfig'
import { useHistory,Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { palette } from '@mui/system';
import _ from 'lodash'
import Grid  from '@mui/material/Grid'
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

const useStyles = (theme) => makeStyles({
  trialSection:{
    display:'flex',
    justifyContent:'center',
    width:'100%',
    background:'#fff',
    alignItems:'center',
    color:'black',
    padding:'1rem'
  }
})

function Header ({ pageTitle, toggleDrawerFlag, setToggleDrawer, logout,plan }) {
  var history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  const theme = useTheme()
  const classes = useStyles(theme)()

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
  const handleMyAccount = () => {
    setAnchorEl(null)
    history.push('/my-account')
  }
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const handleYesButton = () => {
    // setAnchorEl(null)
    handleCloseModal()
    logout({})
  }
  const handleGetstartedBtn = ()=>{
    if(window.location.hostname !== 'dashboard.plink.co.id'){
      window.location.href = 'https://dashboard.plink.co.id/get-started'
    }else{
      window.location.href = '/get-started'
    }
  }

  
  
  return (
    <>
      {isMobile &&
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
            >
              
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <T id={(pageTitle || AppConfig.appName)} />
            </Typography>
            <Button>Get Started</Button>
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleMyProfile}>My Profile</MenuItem>
                <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>}
      {!isMobile &&
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
              <T id={(pageTitle || AppConfig.appName)} />
            </Typography>
            <div>
            
            </div>
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleMyProfile}>My Profile</MenuItem>
                <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>}
       
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
      </Modal>
    </>
  )
}
export default injectIntl(Header)
