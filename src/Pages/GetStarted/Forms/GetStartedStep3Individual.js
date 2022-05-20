import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { formValidation } from 'core/Utils/Utils'
import MerchantCategoryIcon from './MerchantCategoryIcon'

const style = {
  labelWrapper:{ 
    margin:0,
    marginLeft:8,
    marginTop:'0.5rem' 
  },
  input:{
    margin:0,
    marginTop:'1.5rem'
  }
}

const potensiVaTrx = [
  { label: '< 100', value: 1 },
  { label: '101 - 500', value: 2 },
  { label: '501 - 1000', value: 3 },
  { label: '1001 - 5000', value: 4 },
  { label: '5001 - 10000', value: 5 },
  { label: '10001 - 50000', value: 6 },
  { label: '> 50000', value: 7 }
]

function Comp (props) {
  const { getStartedMerchantCategory,step3KycFormData,reloadStep,submitData,stepSubmitLoading } = props

  const initialFormData = {
    name_business_owner:step3KycFormData?.nameBusinessOwner || "",
    email_business_owner:step3KycFormData?.emailBusinessOwner || "",
    phone_business_owner:step3KycFormData?.phoneNoBusinessOwner || "",
    va_potential_business_owner:step3KycFormData?.monthlyPotentialTrxVa || ""
  }

  const formRules = {
    name_business_owner:['required'],
    email_business_owner:['required','email'],
    phone_business_owner:['required'],
    va_potential_business_owner:['required'],
  }

  const [dataForm,setDataForm] = React.useState(initialFormData)
  const [isSubmit,setIsSubmit] = React.useState(false)
  const [errorIsExist,setErrorExist] = React.useState(false)

  const handleOnChangeForm = (name, value) => {
    setDataForm({
      ...dataForm,
      [name]: value
    })
  }

  const generateFormErrorMsg = (label,data,rules) =>{
    const dataValidation  = formValidation(label,data,rules)
    if(!dataValidation.error || !isSubmit) return {}
    return { error:dataValidation.error, helperText:dataValidation.msg }
  }

  const [buttonStates,setButtonStates] = React.useState({
    submit:true,
    cancel:false
  })

  const handleSubmit = () =>{
    setIsSubmit(true) 
    submitData({...dataForm,reloadStep,merchantCategory:getStartedMerchantCategory})
  }

  const handleCancel = () =>{
    reloadStep()
  }
  
  const handleOnFocus = () =>{
    setIsSubmit(true) 
  }
  

  React.useEffect(()=>{ 
    setIsSubmit(false) 
  },[])

  React.useEffect(()=>{ 
     //validates all data
     const data = Object.entries(dataForm)
     let res = data.some(r=>formValidation('',(String) (dataForm[r[0]]),formRules[r[0]]).error)
     console.log('erorr=====>',res)
     //check if signatureRef is set
     setErrorExist(res)
  },[dataForm])


  React.useEffect(()=>{ 
    //check if initial same with actual value
    const data = Object.entries(dataForm)
    let res = data.some(r=> dataForm[r[0]] !== initialFormData[r[0]])
    setButtonStates({submit:!res,cancel:!res})
  },[dataForm])


  return (
    <Paper elevation={4} style={{padding:'2rem'}}>
      <Typography variant='h6' color='textSecondary'>
          Pemilik Bisnis <MerchantCategoryIcon merchantCategory={getStartedMerchantCategory}/> 
      </Typography>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1 }
        }}
        noValidate
        autoComplete='off'
      >
        <div>
          <TextField onFocus={handleOnFocus} variant="outlined" value={dataForm.name_business_owner} disabled={stepSubmitLoading}  style={style.input} onChange={event=>handleOnChangeForm(event.target.id,event.target.value)} value={dataForm.name_business_owner} fullWidth size='large' id='name_business_owner' label='Nama Pemilik Bisnis' helperText='' {...generateFormErrorMsg('Nama Pemilik Bisnis',dataForm.name_business_owner,formRules.name_business_owner)}/><br />
          <TextField onFocus={handleOnFocus} variant="outlined" value={dataForm.email_business_owner} disabled={stepSubmitLoading}  style={style.input} onChange={event=>handleOnChangeForm(event.target.id,event.target.value)} value={dataForm.email_business_owner} fullWidth size='large' id='email_business_owner' label='Email Pemilik Bisnis' helperText='' {...generateFormErrorMsg('Email Pemilik Bisnis',dataForm.email_business_owner,formRules.email_business_owner)}/><br />
          <TextField onFocus={handleOnFocus} variant="outlined" value={dataForm.phone_business_owner} disabled={stepSubmitLoading}  style={style.input} onChange={event=>handleOnChangeForm(event.target.id,event.target.value)} value={dataForm.phone_business_owner} fullWidth size='large' id='phone_business_owner' label='No Telepon Pemilik Bisnis' helperText='' {...generateFormErrorMsg('No Telepon Pemilik Bisnis',dataForm.phone_business_owner,formRules.phone_business_owner)}/><br />
          <FormControl disabled={stepSubmitLoading}  fullWidth style={style.input} variant="outlined"  error={generateFormErrorMsg('Potensi Transaksi VA Bulanan',(dataForm.va_potential_business_owner || '').toString(),['required']).error}>
            <InputLabel id="input_potential_va_monthly">Potensi Transaksi VA Bulanan</InputLabel>
            <Select
              onFocus={handleOnFocus}
              labelId="input_potential_va_monthly"
              id="va_potential_business_owner"
              value={dataForm.va_potential_business_owner}
              label="Potensi Transaksi VA Bulanan"
              onChange={event=>handleOnChangeForm('va_potential_business_owner',(String) (event.target.value))}
            >
              {potensiVaTrx.map(row=><MenuItem value={row.value}>{row.label}</MenuItem>)}
            </Select>
            <FormHelperText>{generateFormErrorMsg('Potensi Transaksi VA Bulanan',(String) (dataForm.va_potential_business_owner),formRules.va_potential_business_owner).helperText}</FormHelperText>
          </FormControl>
          <Stack style={{ marginLeft: 8,marginTop:'2rem' }} spacing={2} direction='row'>
              <Button variant='contained' color='primary' size="large" onClick={handleSubmit} disabled={buttonStates.submit || errorIsExist || stepSubmitLoading}>{stepSubmitLoading ? `Saving` : `Save`}</Button>
              <Button variant='outlined' color='error' size="large" onClick={handleCancel} disabled={buttonStates.cancel || errorIsExist || stepSubmitLoading}>Cancel</Button>
          </Stack>
        </div>
      </Box>
    </Paper>
  )
}
export default connect((state, ownProps) => {
  return ({
    step3KycFormData:state.getstarted.step3KycFormData,
    stepSubmitLoading:state.getstarted.stepSubmitLoadingStep3
  })
}, dispatch => ({
  
}))(Comp)
