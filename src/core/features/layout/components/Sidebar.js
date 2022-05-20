import * as React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MuiDrawer from '@mui/material/Drawer'
import { styled, useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { isMobile } from 'react-device-detect'
import SendIcon from '@mui/icons-material/Send'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import { useHistory } from 'react-router-dom'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { SelectMerchantMenuCon } from '../../selectmerchant/'
import { getPage } from '../../../Utils/Pages'
import AppConfig from '../../../Config/AppConfig'
import { getEnvMode, setEnvMode } from 'core/Utils/Utils'
import images from 'core/Themes/Images'
import ParentMenu from './ParentMenu'
import Tooltip from '@mui/material/Tooltip'

const basePath = AppConfig.basePath

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
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

function SwipeableTemporaryDrawer ({ isMerchantExists,toggleDrawerFlag, setToggleDrawer, sidemenu, userPrivileges, setHomePageUrl, homePageUrl, routeActive, appPatch, userMerchantCode, currentMerchant }) {
  var history = useHistory()
  const handleDrawerClose = () => {
    setToggleDrawer({ toggleDrawer: !toggleDrawerFlag })
  }
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setToggleDrawer({ toggleDrawer: open })
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mode, setMode] = React.useState(getEnvMode())
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (e, value) => {
    setAnchorEl(null)
    if (value) {
      setMode(value)
      setEnvMode(value)
      // redirect
      if (value === 'production') window.location.href = AppConfig.reactAppBaseUrlProduction
      else window.location.href = AppConfig.reactAppBaseUrlStaging
    }
  }

  const getMenuLiSingle = ({ route, title, liClass, icon, toggleDrawerFlag }) => {
    const page = getPage(route) || {}
    const path = (page.path || '')
    const baseRoute = `${basePath}${path}`
    if (!userPrivileges.includes(page.privName || path)) return null
    if (!homePageUrl) setHomePageUrl({ homePageUrl: path })
    console.log('test')
    return (
      <Tooltip title={title} disableHoverListener={toggleDrawerFlag} disableFocusListener={toggleDrawerFlag} disableTouchListener={toggleDrawerFlag}>
        <ListItem
          button
          key={route}
          onClick={() => {
            appPatch({ routeActive: baseRoute, pageTitle: title })
            history.push(baseRoute)
          }}
          selected={(routeActive || '').startsWith(baseRoute)}

        >
          <ListItemIcon>
            {icon || <SendIcon />}
          </ListItemIcon>
          <ListItemText primary={<T id={page.title || title} />} />
        </ListItem>
      </Tooltip>
    )
  }

  const theme = useTheme()
  const sideMenuArray = sidemenu.map((v, i) => {
    if (!v.submenu && v.route) {
      return getMenuLiSingle({ route: v.route, title: v.title, liClass: v.iconClassName || 'nav-icon fas fa-tachometer-alt', icon: v.icon, toggleDrawerFlag })
    }
    if (!userPrivileges.includes(v.userPrivilegeCode)) return null
    return (
      <ParentMenu
        toggleDrawerFlag={toggleDrawerFlag}
        key={i}
        title={v.title}
        submenu={v.submenu}
        homePageUrl={homePageUrl}
        setHomePageUrl={setHomePageUrl}
        userMerchantCode={userMerchantCode}
        userPrivileges={userPrivileges}
        routeActive={routeActive}
        appPatch={appPatch}
        icon={v.icon}
      />
    )
  })

  React.useEffect(()=>{
    setToggleDrawer({ toggleDrawer: false })
  },[])
  return (
    <>
      {isMobile && (
        <SwipeableDrawer
          id='plink-drawer'
          anchor='left'
          open={toggleDrawerFlag}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <DrawerHeader>
            <img style={{ height: 30 }} src={images.LogoRp} />
            <Button
              style={{ width: 120, fontSize: '13px', color: 'white' }}
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              size='small'
              endIcon={<KeyboardArrowDownIcon />}
            >
              {mode}
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={(event) => handleClose(event, null)}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem onClick={(event) => handleClose(event, 'staging')}>Staging</MenuItem>
              <MenuItem onClick={(event) => handleClose(event, 'production')}>Production</MenuItem>
            </Menu>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon color='menuDrawerIcon' /> : <ChevronLeftIcon color='menuDrawerIcon' />}
            </IconButton>
          </DrawerHeader>
          <Divider color='menuDrawerIcon' />
          {userPrivileges.includes('6') &&
            <SelectMerchantMenuCon />}
          <Divider color='menuDrawerIcon' />
          <Box
            role='presentation'
            // onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {sideMenuArray}
              {
                userPrivileges.includes('main-menu-user-management') &&
                  <ParentMenu
                    icon={(<ContactPageIcon color='menuDrawerIcon' />)}
                    title='User Management'
                    submenu={[{ route: '/user', title: 'User' }, { route: '/role', title: 'Role' }, { route: '/privilege', title: 'Privilege' }]}
                    homePageUrl={homePageUrl}
                    setHomePageUrl={setHomePageUrl}
                    userMerchantCode={userMerchantCode}
                    userPrivileges={userPrivileges}
                    routeActive={routeActive}
                    appPatch={appPatch}
                  />
              }
            </List>
          </Box>
        </SwipeableDrawer>
      )}
      {!isMobile && (
        <Drawer id='plink-drawer' anchor='left' variant='permanent' open={toggleDrawerFlag} onClose={toggleDrawer(false)}>
          <DrawerHeader>
            <img style={{ height: 30 }} src={images.LogoRp} />
            <Button
              style={{ width: 120, fontSize: '13px', color: 'white' }}
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={userPrivileges.includes('admin') ? null : handleClick}
              size='small'
              endIcon={!userPrivileges.includes('admin') ? (<KeyboardArrowDownIcon />) : null}
            >
              {userPrivileges.includes('admin') ? 'Admin' : mode}
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={(event) => handleClose(event, null)}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem onClick={(event) => handleClose(event, 'staging')}>Staging</MenuItem>
              <MenuItem onClick={(event) => handleClose(event, 'production')}>Production</MenuItem>
            </Menu>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon color='menuDrawerIcon' /> : <ChevronLeftIcon color='menuDrawerIcon' />}
            </IconButton>
          </DrawerHeader>
          <Divider color='menuDrawerIcon' />
          {userPrivileges.includes('6') &&
            <SelectMerchantMenuCon />}
          <Divider color='menuDrawerIcon' />
          {/* {currentMerchant.plan === 'TRIAL' && (
            <>
              <List>
                <ListItemButton
                  selected={(routeActive || '').startsWith('/get-started')}
                  onClick={() => {
                    appPatch({ routeActive: '/get-started', pageTitle: 'Get Started' })
                    history.push('/get-started')
                  }}
                >
                  <ListItemIcon>
                    <SportsScoreIcon />
                  </ListItemIcon>
                  <ListItemText primary='Get Started' />
                </ListItemButton>
              </List>
              <Divider />
            </>)} */}
          <Box>
            <List>
              {sideMenuArray}
              {
                userPrivileges.includes('main-menu-user-management') &&
                  <ParentMenu
                    icon={(<ContactPageIcon color='menuDrawerIcon' />)}
                    title='User Management'
                    submenu={[{ route: '/user', title: 'User' }, { route: '/role', title: 'Role' }, { route: '/privilege', title: 'Privilege' }]}
                    homePageUrl={homePageUrl}
                    setHomePageUrl={setHomePageUrl}
                    userMerchantCode={userMerchantCode}
                    userPrivileges={userPrivileges}
                    routeActive={routeActive}
                    appPatch={appPatch}
                  />
              }
            </List>
          </Box>
        </Drawer>
      )}
    </>
  )
}
export default injectIntl(SwipeableTemporaryDrawer)
