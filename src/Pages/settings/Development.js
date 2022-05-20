import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { MerchantSecretKeyModalCon } from '../../features/merchantSecretKey'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import ScienceIcon from '@mui/icons-material/Science'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import ContentWrapper from 'core/Components/Layout/ContentWrapper'
import AppConfig from 'core/Config/AppConfig'
import { Table, Filter, Multiselect } from 'core/features/TablePagination'
import MerchanKeyManifest from 'Pages/MerchantKey/Manifest'
import { MerchantkeyModalCon } from 'features/merchantKey'
import MerchantKeyActions from 'features/merchantKey/redux'
import MerchantSecretKeyActions from 'features/merchantSecretKey/redux'

import Modal from '@mui/material/Modal'
import KeyIcon from '@mui/icons-material/Key'
import HttpIcon from '@mui/icons-material/Http'
import Grid3x3Icon from '@mui/icons-material/Grid3x3'
import TablePaginationActions from '../../core/features/TablePagination/redux'
import LiveHelpIcon from '@mui/icons-material/LiveHelp';


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

function Comp (props) {
  const { loadingUpdateCurrentCallbackUrl,resetMerchantSecretKey,isReloading, tablePaginationSetReload,merchantkeyUpdateCurrentCallbackUrl, keyId,keyIdGenerated, backendCallbackUrl, frontendCallbackUrl, merchantId, merchantCode, merchantkeyFetchCurrentMerchantKey } = props
  console.log('props=======>', props)
  const [open, setOpen] = React.useState(false)
  const [backendCallbackUrlValue, setBackendCallbackUrlValue] = useState(backendCallbackUrl)
  const [frontendCallbackUrlValue, setFrontendCallbackUrlValue] = useState(frontendCallbackUrl)
  const [keyIdValue,setKeyIdValue] = useState(keyId)

  const resetForm = () => {
    resetMerchantSecretKey({})
    setBackendCallbackUrlValue(backendCallbackUrl)
    setFrontendCallbackUrlValue(frontendCallbackUrl)
  }
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  useEffect(() => {
    // Update the document title using the browser API
    merchantkeyFetchCurrentMerchantKey({})
    // return () => {}
  }, [isReloading])
  useEffect(() => {
    resetForm()
  }, [backendCallbackUrl, frontendCallbackUrl])
  useEffect(() => {
    resetForm()
    if (!loadingUpdateCurrentCallbackUrl && open) {
      handleClose()
    }
  }, [loadingUpdateCurrentCallbackUrl])

  useEffect(()=>{
    tablePaginationSetReload({serviceName:'settingsDevelopment',isReload:false})
  },[])
  return (
    <ContentWrapper
      pageTitle='Setting Development'
      breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: 'Setting Development', link: null, isActive: true }]}
      contentHeaderTitle='Setting Development'
      isNeedLoggedin
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={
                    <Typography variant='h6' color='textSecondary'>
                    Integration Parameter
                    </Typography>
                  }
                />
                <CardContent>
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <nav aria-label='main mailbox folders'>
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <IntegrationInstructionsIcon />
                            </ListItemIcon>
                            <a target='_blank' rel='noopener noreferrer' href='https://docs.google.com/document/d/1_GTgzzzeFEEl2eiTHSLE4xNE6OAn63b1gTQmvYa7qVE/edit?usp=sharing'>Download Integration Document</a>
                          </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <ScienceIcon />
                            </ListItemIcon>
                            <a target='_blank' rel='noopener noreferrer' href='https://drive.google.com/file/d/12KeURz8gULCFVmsgnaIwXN6Xr1L_nC_a/view?usp=sharing'>Download Postman Collection</a>
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <LiveHelpIcon />
                            </ListItemIcon>
                            <a target='_blank' rel='noopener noreferrer' href='https://docs.google.com/document/d/14cOcHEFLDMy9SkkE_Tg8yeUsjtSFZEUiBZp6joyTMnU/edit?usp=sharing'>FAQ</a>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </nav>
                  </Box>
                  <br/>
                  <Box
                    component='form'
                    sx={{
                      '& .MuiTextField-root': { m: 1 }
                    }}
                    noValidate
                    autoComplete='off'
                  >
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor='merchant_id'>Merchant Id</InputLabel>
                      <OutlinedInput
                        size='small'
                        id='merchant_id'
                        value={merchantCode}
                        startAdornment={<InputAdornment position='start'><Grid3x3Icon /></InputAdornment>}
                        label='Merchant Id'
                        disabled
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor='key_id'>Key Id</InputLabel>
                      <OutlinedInput
                        size='small'
                        id='key_id'
                        value={keyId}
                        startAdornment={<InputAdornment position='start'><KeyIcon /></InputAdornment>}
                        label='Key Id'
                        disabled
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor='backend_callback_url'>Backend Callback Url</InputLabel>
                      <OutlinedInput
                        size='small'
                        id='backend_callback_url'
                        value={backendCallbackUrlValue}
                        onChange={(event) => setBackendCallbackUrlValue(event.target.value)}
                        startAdornment={<InputAdornment position='start'><HttpIcon /></InputAdornment>}
                        label='Backend Callback Url'
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor='frontend_callback_url'>Frontend Callback Url</InputLabel>
                      <OutlinedInput
                        size='small'
                        id='frontend_callback_url'
                        value={frontendCallbackUrlValue}
                        onChange={(event) => setFrontendCallbackUrlValue(event.target.value)}
                        startAdornment={<InputAdornment position='start'><HttpIcon /></InputAdornment>}
                        label='Frontend Callback Url'
                      />
                    </FormControl>
                  </Box>
                </CardContent>
                <CardActions>
                  <ButtonGroup disableElevation variant='contained'>
                    <Button
                      disabled={
                        backendCallbackUrl === backendCallbackUrlValue &&
                        frontendCallbackUrl === frontendCallbackUrlValue
                        // &&  keyIdValue === keyIdGenerated
                      }
                      onClick={handleOpen}
                    >Save
                    </Button>
                    <Button
                      disabled={
                        backendCallbackUrl === backendCallbackUrlValue &&
                        frontendCallbackUrl === frontendCallbackUrlValue
                        // && keyIdValue === keyIdGenerated

                      }
                      onClick={(e) => { resetForm() }}
                    >Cancel
                    </Button>
                  </ButtonGroup>
                  <div>
                    <MerchantSecretKeyModalCon buttonTriggerLabel='Generate Secret Key' serviceReference='settingsDevelopment'/>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Card sx={style}>
          <CardHeader
            title='Confirmation'
          />
          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              Apakah anda yakin untuk ganti callback url ?
            </Typography>

          </CardContent>
          <CardActions>
            <Button
              variant='contained'
              onClick={() => merchantkeyUpdateCurrentCallbackUrl({ merchantId: '' + merchantId, backendCallbackUrl: backendCallbackUrlValue, frontendCallbackUrl: frontendCallbackUrlValue })}
            >Yes
            </Button>
            <Button
              color='error'
              variant='contained'
              onClick={handleClose}
            >No
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </ContentWrapper>
  )
}
export default connect((state, ownProps) => {
  let keyIdGenerated = state.merchantsecretkey.key_id
  let keyId =  state.myprofile.integration_params.key_id
  keyId = keyIdGenerated === null ? keyId : keyIdGenerated
  keyIdGenerated = keyIdGenerated === null ? state.myprofile.integration_params.key_id : keyIdGenerated
  return ({
    merchantId: state.myprofile.merchant.id,
    merchantCode: state.myprofile.merchant.merchant_code,
    backendCallbackUrl: state.myprofile.integration_params.backend_callback_url,
    frontendCallbackUrl: state.myprofile.integration_params.frontend_callback_url,
    keyId,
    keyIdGenerated,
    loadingUpdateCurrentCallbackUrl: state.merchantkey.loadingUpdateCurrentCallbackUrl,
    isReloading: state.tablepagination.reloadDetail['settingsDevelopment'],

  })
}, dispatch => ({
  resetMerchantSecretKey: data => dispatch(MerchantSecretKeyActions.resetMerchantSecretKey(data)),
  tablePaginationSetReload: data => dispatch(TablePaginationActions.setReloadDetail(data)),
  merchantkeyFetchCurrentMerchantKey: data => dispatch(MerchantKeyActions.merchantkeyFetchCurrentMerchantKey(data)),
  merchantkeyUpdateCurrentCallbackUrl: data => dispatch(MerchantKeyActions.merchantkeyUpdateCurrentCallbackUrl(data))
}))(Comp)
