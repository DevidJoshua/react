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
import listBanks from '../../../data/banks.json'

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


function Comp (props) {
  const { getStartedMerchantCategory,step5KycFormData,reloadStep,submitData,stepSubmitLoading } = props

  const initialFormData = {
    bank_account_name:step5KycFormData?.bankAccountName || "",
    bank_account_branch:step5KycFormData?.bankAccountBankBranch || "",
    bank_account_no:step5KycFormData?.bankAccountNo || "",
    bank_account_bankname:step5KycFormData?.bankAccountBankName || ""
  }

  const formRules = {
    bank_account_name:['required'],
    bank_account_branch:['required'],
    bank_account_no:['required'],
    bank_account_bankname:['required'],
  }

  const [dataForm,setDataForm] = React.useState(initialFormData)
  const [isSubmit,setIsSubmit] = React.useState(false)

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
    submitData({...dataForm,reloadStep})
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
    let res = data.some(r=> formValidation('',dataForm[r[0]],formRules[r[0]]).error)
    console.log('iserror====>',res)
    //check if signatureRef is set
    setButtonStates({submit:res,cancel:res})
  },[dataForm])

  React.useEffect(()=>{
    //check is data same with database
    const data = Object.entries(dataForm)
    let res = data.some(r=> dataForm[r[0]] === initialFormData[r[0]])
    console.log('iserror====>',res)
    setButtonStates({submit:res,cancel:res})
  },[])

  return (
    <Paper elevation={4} style={{padding:'2rem'}}>
      <Typography variant='h6' color='textSecondary'>
          Bank Penerima Dana <MerchantCategoryIcon merchantCategory={getStartedMerchantCategory}/> 
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
          <FormControl disabled={stepSubmitLoading}  fullWidth style={style.input} variant="outlined"  error={generateFormErrorMsg('Nama Bank',(dataForm.bank_account_bankname || '').toString(),['required']).error}>
            <InputLabel id="input_potential_va_monthly">Nama Bank </InputLabel>
            <Select
              onFocus={handleOnFocus}
              labelId="input_bank_account_bankname"
              id="bank_account_bankname"
              value={dataForm.bank_account_bankname}
              label="Nama Bank"
              onChange={event=>handleOnChangeForm('bank_account_bankname',(String) (event.target.value))}
            >
              {listBanks.map(row=><MenuItem value={row.value}>{row.label}</MenuItem>)}
            </Select>
            <FormHelperText>{generateFormErrorMsg('Nama Bank',(String) (dataForm.bank_account_bankname),formRules.bank_account_bankname).helperText}</FormHelperText>
          </FormControl>

          <TextField 
              onFocus={handleOnFocus} 
              variant="outlined" 
              value={dataForm.bank_account_branch} 
              disabled={stepSubmitLoading}  
              style={style.input} 
              onChange={event=>handleOnChangeForm(event.target.id,event.target.value)} 
              fullWidth 
              size='large' 
              id='bank_account_branch' 
              label='Cabang' 
              helperText='' {...generateFormErrorMsg('Cabang',dataForm.bank_account_branch,formRules.bank_account_branch)}
          />
          <br />
          <TextField onFocus={handleOnFocus} variant="outlined" value={dataForm.bank_account_no} disabled={stepSubmitLoading}  style={style.input} onChange={event=>handleOnChangeForm(event.target.id,event.target.value)}  fullWidth size='large' id='bank_account_no' label='No Rekening' helperText='' {...generateFormErrorMsg('No Rekening',dataForm.bank_account_no,formRules.bank_account_no)}/><br />
          <TextField onFocus={handleOnFocus} variant="outlined" value={dataForm.bank_account_name} disabled={stepSubmitLoading}  style={style.input} onChange={event=>handleOnChangeForm(event.target.id,event.target.value)}  fullWidth size='large' id='bank_account_name' label='Nama Pemilik Rekening' helperText='' {...generateFormErrorMsg('Nama Pemilik Rekening',dataForm.bank_account_name,formRules.bank_account_name)}/><br />
          
          <Stack style={{ marginLeft: 8,marginTop:'2rem' }} spacing={2} direction='row'>
              <Button variant='contained' color='primary' size="large" onClick={handleSubmit} disabled={buttonStates.submit || stepSubmitLoading}>{stepSubmitLoading ? `Saving` : `Save`}</Button>
              <Button variant='outlined' color='error' size="large" onClick={handleCancel} disabled={buttonStates.cancel || stepSubmitLoading}>Cancel</Button>
          </Stack>
        </div>
      </Box>
    </Paper>
  )
}
export default connect((state, ownProps) => {
  return ({
    step5KycFormData:state.getstarted.step5KycFormData,
    stepSubmitLoading:state.getstarted.stepSubmitLoadingStep5
  })
}, dispatch => ({
  
}))(Comp)
