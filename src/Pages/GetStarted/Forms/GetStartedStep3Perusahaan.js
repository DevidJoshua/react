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
import _ from 'lodash'

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
  const { step3KycFormData,reloadStep,submitData,stepSubmitLoading,getStartedMerchantCategory } = props

  const initialFormData = {
    nama_pimpinan_perusahaan:step3KycFormData?.companyPresidentName || "",
    email_pimpinan_perusahaan:step3KycFormData?.companyPresidentEmail || "",
    notelp_pimpinan_perusahaan:step3KycFormData?.companyPresidentPhone || "",
    potensi_transaksi_va_bulanan:step3KycFormData?.monthlyPotentialTrxVa || ""
  }

  const formRules = {
    nama_pimpinan_perusahaan:['required'],
    email_pimpinan_perusahaan:['required','email'],
    notelp_pimpinan_perusahaan:['required'],
    potensi_transaksi_va_bulanan:['required'],
  }

  const [dataForm,setDataForm] = React.useState(initialFormData)
  const [isSubmit,setIsSubmit] = React.useState(false)
  const [errorExists,setErrorExist] = React.useState(false)

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
          Informasi Pemilik Bisnis <MerchantCategoryIcon merchantCategory={getStartedMerchantCategory}/> 
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
          <TextField 
            onFocus={handleOnFocus} 
            variant="outlined" 
            value={dataForm.nama_pimpinan_perusahaan} 
            disabled={stepSubmitLoading}  
            style={style.input} 
            onChange={event=>handleOnChangeForm(event.target.id,event.target.value)} 
            fullWidth 
            size='large' 
            id='nama_pimpinan_perusahaan' 
            label='Nama Pimpinan Perusahaan' 
            helperText='' 
            {...generateFormErrorMsg('Nama Pimpinan Perusahaan',dataForm.nama_pimpinan_perusahaan,formRules.nama_pimpinan_perusahaan)}
           />
           <br/>
          <TextField 
            onFocus={handleOnFocus} 
            variant="outlined" 
            value={dataForm.email_pimpinan_perusahaan} 
            disabled={stepSubmitLoading}  
            style={style.input} 
            onChange={event=>handleOnChangeForm(event.target.id,event.target.value)} 
            fullWidth 
            size='large' 
            id='email_pimpinan_perusahaan' 
            label='Email Pimpinan Perusahaan' 
            helperText='' {...generateFormErrorMsg('Email Pimpinan Perusahaan',dataForm.email_pimpinan_perusahaan,formRules.email_pimpinan_perusahaan)}
          />
          <br/>
          <TextField 
            onFocus={handleOnFocus} 
            variant="outlined" 
            value={dataForm.notelp_pimpinan_perusahaan} 
            disabled={stepSubmitLoading}  
            style={style.input} 
            onChange={event=>handleOnChangeForm(event.target.id,event.target.value)} 
            fullWidth 
            size='large' 
            id='notelp_pimpinan_perusahaan' 
            label='No Telpon Pimpinan 
            Perusahaan' helperText='' 
            {...generateFormErrorMsg('No Telpon Pimpinan Perusahaan',dataForm.notelp_pimpinan_perusahaan,formRules.notelp_pimpinan_perusahaan)}
          />
          <br/>
          
          <FormControl disabled={stepSubmitLoading}  fullWidth style={style.input} variant="outlined"  error={generateFormErrorMsg('Potensi Transaksi VA Bulanan',(dataForm.potensi_transaksi_va_bulanan || '').toString(),['required']).error}>
            <InputLabel id="input_potential_va_monthly">Potensi Transaksi VA Bulanan</InputLabel>
            <Select
              onFocus={handleOnFocus}
              labelId="input_potential_va_monthly"
              id="potensi_transaksi_va_bulanan"
              value={dataForm.potensi_transaksi_va_bulanan}
              label="Potensi Transaksi VA Bulanan"
              onChange={event=>handleOnChangeForm('potensi_transaksi_va_bulanan',(String) (event.target.value))}
            >
              {potensiVaTrx.map(row=><MenuItem value={row.value}>{row.label}</MenuItem>)}
            </Select>
            <FormHelperText>{generateFormErrorMsg('Potensi Transaksi VA Bulanan',(String) (dataForm.potensi_transaksi_va_bulanan),formRules.potensi_transaksi_va_bulanan).helperText}</FormHelperText>
          </FormControl>
          <Stack style={{ marginLeft: 8,marginTop:'2rem' }} spacing={2} direction='row'>
              <Button variant='contained' color='primary' size="large" onClick={handleSubmit} disabled={buttonStates.submit || errorExists || stepSubmitLoading}>{stepSubmitLoading ? `Saving` : `Save`}</Button>
              <Button variant='outlined' color='error' size="large" onClick={handleCancel} disabled={buttonStates.cancel || errorExists || stepSubmitLoading}>Cancel</Button>
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
