import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import ContentWrapper from 'core/Components/Layout/ContentWrapper'
import AppConfig from 'core/Config/AppConfig'
import SimulorActions from 'features/Simulator/redux'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { makeStyles } from '@material-ui/core/styles'
import ModalqrisCon from 'features/Simulator/containers/ModalqrisCon'
import OverlayOnPaying from 'features/Simulator/components/OverlayOnPaying'
import _ from 'lodash'
const useStyles = makeStyles((theme) => ({
    cardHeader:{
      background:`linear-gradient(to right bottom, ${theme.palette.primary.main},${theme.palette.info.main})`,
    },
    titleHeader:{
      color:'#fff',
      fontWeight:500
    }
}))


function Comp (props) {
  const {  reload,loadingVa,loadingQr,doPayVirtualAccount,isOpenQr,statusVa,statusQr} = props
  const initialVa = {vaNumber:''}
  const classes = useStyles()

  const [payloadVa,setPayloadVa] = React.useState(initialVa)

  const handleChangeVa = props => event =>{
    setPayloadVa({...payloadVa,[props]:event.target.value})
  }
  
  const handleSubmitVa = () =>{
    doPayVirtualAccount(payloadVa)
  }

  const formValidation = (obj,customValidation = null) =>{
    var isValid = false
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if(obj[key] === undefined || obj[key] === undefined==='null' || obj[key] === ''){
              isValid = false
            }else{
              isValid = true
            }
        }
    }
    return !isValid
  }
  React.useEffect(()=>{
      setPayloadVa(initialVa)
  },[reload])

  return (
    <>
      <OverlayOnPaying open={loadingQr||loadingVa}/>
      <ContentWrapper
        pageTitle='Simulator'
        breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: 'Simulator', link: null, isActive: true }]}
        contentHeaderTitle='Simulator'
        isNeedLoggedin
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid container item spacing={3}>
              <Grid item xs={12} sm={12} md={6}lg={6} xl={6}>
                <Card elevation={12} >
                  <CardHeader
                    className={classes.cardHeader}
                    title={
                      <Typography  variant='h6' className={classes.titleHeader}>Virtual Account</Typography>
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
                      <FormControl size='small' fullWidth>
                        <TextField size='small' value={payloadVa.vaNumber} onChange={handleChangeVa('vaNumber')} fullWidth label="No. VA" sx={{margin:0}} />
                        {/* <CurrencyTextField
                            sx={{margin:0,marginTop:'0.5rem'}}
                            fullWidth
                            variant='outlined'
                            currencySymbol='Rp'
                            outputFormat='number'
                            textAlign='left'
                            decimalCharacter=','
                            digitGroupSeparator='.'
                            label="Nominal Pembayaran"
                            minimumValue={'0'}
                            // decimalPlaces={'0'}
                        /> */}
                      </FormControl>
                    </Box>
                  </CardContent>
                  <CardActions sx={{marginLeft:2}}>
                    <ButtonGroup disableElevation variant='contained'>
                      <Button
                      disabled={loadingVa || formValidation(payloadVa)}
                      onClick={handleSubmitVa}
                      >{ loadingVa ? `Membayar...` : `Bayar`}
                      </Button>
                    </ButtonGroup>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={6}lg={6} xl={6}>
                <Card elevation={6}>
                  <CardHeader
                    className={classes.cardHeader}
                    title={
                      <Typography variant='h6' className={classes.titleHeader}>QRIS</Typography>
                    }
                  />
                  <CardContent>
                      <Box
                        component='form'
                        sx={{
                          '& .MuiTextField-root': { m: 1 },
                          display:'flex',
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        noValidate
                        autoComplete='off'
                      >
                        <ModalqrisCon/>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </ContentWrapper>
    </>
  )
}
export default connect((state, ownProps) => {
  return ({
    loadingVa: state.simulator.isloadingVa,
    loadingQr: state.simulator.isloadingQr,
    isOpenQr:state.simulator.isOpenModalQr,
    statusVa:state.simulator.statusVa,
    statusQr:state.simulator.statusQr,
    reload:state.simulator.reload
  })
}, dispatch => ({
  doPayVirtualAccount: data => dispatch(SimulorActions.doPayVirtualAccount(data)),
}))(Comp)
