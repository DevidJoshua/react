import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
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
import loadable from '@loadable/component'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { isMobile } from 'react-device-detect'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import Grid  from '@mui/material/Grid'
import _ from 'lodash'
import { isLoggedIn, getSession, checkIfPublicUrl } from '../../../Utils/Utils'
// import HeaderCon from '../containers/HeaderCon'
import AppConfig from 'core/Config/AppConfig'
import ModalLogout from 'core/Components/Modal/ModalLogout'
import ModalCommon from '../../../Containers/Modal/index'

const HeaderCon = loadable(() => import('../containers/HeaderCon'))
const SidebarCon = loadable(() => import('../containers/SidebarCon'))
const drawerWidth = 240


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
)
const useStyles = (theme) => makeStyles({
  trialSection:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    color:'black',
    width:'100%',
    background:`linear-gradient(to right, #ffefba, #ffffff)`,
    padding:'1rem',
    marginBottom:'2rem'
  }
})

function LayoutComp ({
  toggleDrawerFlag,
  isLogIn,
  setToggleDrawer,
  children,
  doLogout,
  isRequesting,
  sidemenu,
  profile,
  plan,
  routeActive,
  userPrivileges
}) {
  const theme = useTheme()
  var history = useHistory()
  React.useEffect(() => {
    // Your code here
    // componentDidMount
  }, [])

  const handleDrawerClose = () => {
    setToggleDrawer({ toggleDrawer: false })
  }

  if (window.TapTalkLive !== undefined) {
    window.TapTalkLive.init(AppConfig.taptalkSecretKey)
  }
  const handleGetstartedBtn = ()=>{
    if(window.location.hostname === 'dashboard-staging.plink.co.id'){
      window.location.href = 'https://dashboard.plink.co.id/get-started'
    }else{
      window.location.href = '/get-started'
    }
  }
  const classes = useStyles(theme)()

  return (
    <Box sx={isMobile ? { flexGrow: 1 } : { display: 'flex' }}>
      <CssBaseline />
      {(isLoggedIn(isLogIn) === true && !checkIfPublicUrl()) && <HeaderCon />}
      
      {(isLoggedIn(isLogIn) === true && !checkIfPublicUrl()) && <SidebarCon sidemenu={sidemenu} />}
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {!isMobile && <DrawerHeader />}
        {((userPrivileges.includes('getstrtd') && window.location.pathname !== '/get-started' && (profile.user_merchants || []).length > 0 && (_.isNil(plan) || (plan||'').toLowerCase() === 'trial')) &&
            <Grid className={classes.trialSection}>
                <p style={{margin:0}}>Anda masih dalam mode trial. Mohon lengkapi dokumen anda</p>
                <Button size='small' variant='contained' style={{marginLeft:'1rem'}} onClick={handleGetstartedBtn}>Lengkapi Dokumen</Button>
            </Grid> 
          )}
        {children}
        <ModalCommon />
      </Box>
    </Box>
  )
}

export default LayoutComp
