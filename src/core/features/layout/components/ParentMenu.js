import * as React from 'react'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import { useHistory } from 'react-router-dom'
import { getPage } from '../../../Utils/Pages'
import AppConfig from '../../../Config/AppConfig'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import Tooltip from '@mui/material/Tooltip'
import CircleIcon from '@mui/icons-material/Circle'

const basePath = AppConfig.basePath

function ParentMenu ({
  title,
  submenu,
  homePageUrl,
  setHomePageUrl,
  userMerchantCode,
  userPrivileges,
  routeActive,
  appPatch,
  icon,
  toggleDrawerFlag
}) {
  var history = useHistory()
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      <Tooltip title={title} disableHoverListener={toggleDrawerFlag} disableFocusListener={toggleDrawerFlag} disableTouchListener={toggleDrawerFlag}>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            {icon && icon}
            {!icon && <SendIcon color='menuDrawerIcon' />}
          </ListItemIcon>
          <ListItemText primary={title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Tooltip>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {submenu.map((v2, i) => {
            const page = getPage(v2.route) || {}
            const path = (page.path || '').replace(':merchantId', userMerchantCode || '*')
            const baseRoute = `${basePath}${path}`
            if (!userPrivileges.includes(page.privName || path)) return null
            if (!homePageUrl) setHomePageUrl({ homePageUrl: path })
            return (
              <Tooltip key={i} title={page.title || v2.title} disableHoverListener={toggleDrawerFlag} disableFocusListener={toggleDrawerFlag} disableTouchListener={toggleDrawerFlag}>
                <ListItem
                  button
                  key={i}
                  sx={{ pl: 4 }}
                  selected={(routeActive || '').startsWith(baseRoute)}
                  onClick={() => {
                    appPatch({ routeActive: baseRoute, pageTitle: title })
                    history.push(baseRoute)
                  }}
                >
                  <ListItemIcon>
                    <CircleIcon fontSize='small' color='menuDrawerIcon' />
                  </ListItemIcon>
                  <ListItemText primary={<T id={page.title || v2.title} />} />
                </ListItem>
              </Tooltip>
            )
          })}
        </List>
      </Collapse>
    </>
  )
}

export default injectIntl(ParentMenu)
