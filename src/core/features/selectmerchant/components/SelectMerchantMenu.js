import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import ListItemIcon from '@mui/material/ListItemIcon'
import StorefrontIcon from '@mui/icons-material/Storefront'
import _ from 'lodash'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: '100%'
//   }
// }))

// const options = [
//   'Plink Market',
//   'Syahoni',
//   'Tokopedia',
//   'Elevenia'
// ]
export default function SimpleListMenu (props) {
  const { userMerchants, merchant, myprofileChangeMerchant } = props
  // const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState(_.findIndex(userMerchants, { id: merchant.id }))

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
    myprofileChangeMerchant({ merchant: userMerchants[index] })
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <List component='nav' aria-label='Device settings'>
        <ListItemButton
          aria-haspopup='true'
          aria-controls='lock-menu'
          aria-label='when device is locked'
          onClick={handleClickListItem}
        >
          <ListItemIcon>
            <StorefrontIcon color='menuDrawerIcon' />
          </ListItemIcon>
          <ListItemText primary={(userMerchants||[]).length > 0 ? 'Merchant:' : 'Merchant: -' } secondary={(userMerchants[selectedIndex] || {}).merchant_name} />
        </ListItemButton>
      </List>
      {(userMerchants||[]).length>0 &&
        <Menu
          id='lock-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {(userMerchants||[]).map((option, index) => (
            <MenuItem
              key={option.id}
              // disabled={index === 0}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option.merchant_name}
            </MenuItem>
          ))}
        </Menu>
      }
    </div>
  )
}
