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
import FormControlLabel from '@mui/material/FormControlLabel'
import { Checkbox } from '@mui/material'
import { formValidation } from 'core/Utils/Utils'
import MerchantCategoryIcon from './MerchantCategoryIcon'
import tnc from '../../../data/tnc'

const style = {
  labelWrapper:{
    margin:0,
    marginLeft:8,
    marginTop:'0.5rem'
  },
  input:{
    margin:0,
    marginTop:'1.5rem'
  },
  textareaReadOnly:{
    overflow:'auto',
    width:'100%',
    height:'40rem',
    border:'solid 1px'
  },
}


function Comp (props) {
  const { getStartedMerchantCategory,step6KycFormData,reloadStep,submitData,stepSubmitLoading } = props

  const initialFormData = {
    tnc:step6KycFormData?.tncAgreeDisagree || ""
  }

  const formRules = {
    tnc:['required'],
  }

  const [dataForm,setDataForm] = React.useState(initialFormData)
  const [isSubmit,setIsSubmit] = React.useState(false)

  const handleOnChangeForm = (name, value) => {
    setDataForm({
      ...dataForm,
      [name]: value
    })
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
        const data = Object.entries(dataForm).filter(r=>r[0] !== 'signature_data')
        let res = data.some(r=> formValidation('',dataForm[r[0]],formRules[r[0]]).error)
        //check if signatureRef is set
        setButtonStates({submit:res,cancel:res})
  },[dataForm])

  React.useEffect(()=>{
    setIsSubmit(false)
    setButtonStates({submit:true,cancel:true})
  },[])
  return (
    <Paper elevation={4} style={{padding:'2rem'}}>
      <Typography variant='h6' color='textSecondary'>
          Pemilik Bisnis <MerchantCategoryIcon merchantCategory={getStartedMerchantCategory}/>
      </Typography>
      <br/>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1 }
        }}

        noValidate
        autoComplete='off'
      >
        <div>
          <div style={style.textareaReadOnly} dangerouslySetInnerHTML={{__html:tnc.individual}}></div>
          <br/>
          <Typography variant='body2' color='textSecondary'> <b>Note:</b> Pastikan tanda tangan tidak terpotong dan sesuai dengan KTP. </Typography>
          <br/>
          <FormControlLabel value='tnc' control={<Checkbox  name='tnc' id="tnc" checked={dataForm.tnc === 'agree' ? true : false } onChange={e=>handleOnChangeForm('tnc',e.target.checked ? 'agree' : '')}/>} label='Setuju dengan ketentuan Prismalink' />
        </div>
        <Stack style={{ marginLeft: 8,marginTop:'2rem' }} spacing={2} direction='row'>
            <Button variant='contained' color='primary' size="large" onClick={handleSubmit} disabled={buttonStates.submit || stepSubmitLoading}>{stepSubmitLoading ? `Saving` : `Save`}</Button>
            <Button variant='outlined' color='error' size="large" onClick={handleCancel} disabled={buttonStates.cancel || stepSubmitLoading}>Cancel</Button>
        </Stack>
      </Box>
    </Paper>
  )
}
export default connect((state, ownProps) => {
  return ({
    step6KycFormData:state.getstarted.step6KycFormData,
    stepSubmitLoading:state.getstarted.stepSubmitLoadingStep6
  })
}, dispatch => ({

}))(Comp)
