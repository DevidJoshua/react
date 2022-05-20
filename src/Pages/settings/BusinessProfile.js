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
  const { loadingUpdateCurrentCallbackUrl,isReloading, tablePaginationSetReload,merchantkeyUpdateCurrentCallbackUrl, keyId, backendCallbackUrl, frontendCallbackUrl, merchantId, merchantCode, merchantkeyFetchCurrentMerchantKey } = props
  console.log('props=======>', props)
  const [open, setOpen] = React.useState(false)
  const [backendCallbackUrlValue, setBackendCallbackUrlValue] = useState(backendCallbackUrl)
  const [frontendCallbackUrlValue, setFrontendCallbackUrlValue] = useState(frontendCallbackUrl)
  const resetForm = () => {
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
                    Business Profile
                    </Typography>
                  }
                />
                <CardContent>
                  <Box
                    component='form'
                    sx={{
                      '& .MuiTextField-root': { m: 1 }
                    }}
                    noValidate
                    autoComplete='off'
                  >
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor='merchant_name'>Nama Brand</InputLabel>
                      <OutlinedInput
                        size='small'
                        id='merchant_name'
                        // value={merchantCode}
                        // startAdornment={<InputAdornment position='start'><Grid3x3Icon /></InputAdornment>}
                        label='Business Name'
                        disabled
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor='business_address'>Alamat</InputLabel>
                      <OutlinedInput
                        size='small'
                        id='business_address'
                        // value={keyId}
                        // startAdornment={<InputAdornment position='start'><KeyIcon /></InputAdornment>}
                        label='Business Address'
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor='phone_number'>Nomor HP</InputLabel>
                      <OutlinedInput
                        size='small'
                        id='phone_number'
                        // value={backendCallbackUrlValue}
                        // onChange={(event) => setBackendCallbackUrlValue(event.target.value)}
                        // startAdornment={<InputAdornment position='start'><HttpIcon /></InputAdornment>}
                        label='Phone Number'
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor='full_name'>Nama Pemilik</InputLabel>
                      <OutlinedInput
                        size='small'
                        id='full_name'
                        // value={backendCallbackUrlValue}
                        // onChange={(event) => setBackendCallbackUrlValue(event.target.value)}
                        // startAdornment={<InputAdornment position='start'><HttpIcon /></InputAdornment>}
                        label='Nama Pemilik'
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor='website'>Website atau Media Sosial</InputLabel>
                      <OutlinedInput
                        size='small'
                        id='website'
                        // value={backendCallbackUrlValue}
                        // onChange={(event) => setBackendCallbackUrlValue(event.target.value)}
                        // startAdornment={<InputAdornment position='start'><HttpIcon /></InputAdornment>}
                        label='Website atau Media Sosial'
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
                      }
                      onClick={handleOpen}
                    >Save
                    </Button>
                    <Button
                      disabled={
                        backendCallbackUrl === backendCallbackUrlValue &&
                    frontendCallbackUrl === frontendCallbackUrlValue
                      }
                      onClick={(e) => { resetForm() }}
                    >Cancel
                    </Button>
                  </ButtonGroup>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ContentWrapper>
  )
}
export default connect((state, ownProps) => ({
  merchantId: state.myprofile.merchant.id,
  merchantCode: state.myprofile.merchant.merchant_code,
  backendCallbackUrl: state.myprofile.integration_params.backend_callback_url,
  frontendCallbackUrl: state.myprofile.integration_params.frontend_callback_url,
  keyId: state.myprofile.integration_params.key_id,
  loadingUpdateCurrentCallbackUrl: state.merchantkey.loadingUpdateCurrentCallbackUrl,
  isReloading: state.tablepagination.reloadDetail['settingsDevelopment'],
}), dispatch => ({
  tablePaginationSetReload: data => dispatch(TablePaginationActions.setReloadDetail(data)),
  merchantkeyFetchCurrentMerchantKey: data => dispatch(MerchantKeyActions.merchantkeyFetchCurrentMerchantKey(data)),
  merchantkeyUpdateCurrentCallbackUrl: data => dispatch(MerchantKeyActions.merchantkeyUpdateCurrentCallbackUrl(data))
}))(Comp)
