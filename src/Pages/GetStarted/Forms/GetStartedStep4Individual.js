import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { formValidation } from 'core/Utils/Utils'
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import _ from 'lodash'
import { isNil } from 'ramda'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import MerchantCategoryIcon from './MerchantCategoryIcon'

const style = {
  labelWrapper:{
    margin:0,
    marginTop:'0.5rem',
    marginBottom:'0.5rem'
  },
  input:{
    margin:0,
    marginTop:'1rem'
  }
}

const Input = styled('input')({
  display: 'none'
})

function Comp (props) {
  const { getStartedMerchantCategory,stepSubmitLoading,submitData,step4KycFormData,reloadStep,uploadKycDocument,uploadingStates } = props
  const initialFormData = {
    no_ktp_owner:step4KycFormData?.noKtpOwner || null,
    no_npwp_owner:step4KycFormData?.noNpwpOwner || null,
    file_ktp_owner:step4KycFormData?.fileKtpOwner,
    file_selfiektp_owner:step4KycFormData?.fileSelfieKtpOwner,
    file_npwp_owner:step4KycFormData?.fileNpwpOwner
  }

  const formRules = {
    no_ktp_owner:['required'],
    no_npwp_owner:['required'],
    file_ktp_owner:['required'],
    file_selfiektp_owner:['required'],
    file_npwp_owner:['required']
  }

  const [dataForm,setDataForm] = React.useState(initialFormData)
  const [isSubmit,setIsSubmit] = React.useState(false)
  const handleOnChangeForm = (name, value) => { setDataForm({ ...dataForm, [name]: value }) }

  const handleUploadFile = (event) =>{
    const fileInput = new FormData()
    const options = {
      params:'documentRequest',
      rules: ['maxSize:5242880'] //in kilobytes = 5 MB
    }
    fileInput.append('documentRequest',event.target.files[0],event.target.files[0].name)
    fileInput.append('byParams',event.target.name)
    uploadKycDocument({stateUpload:event.target.name,fileInput,options,label:event.target.name})
  }

  const generateFormErrorMsg = (label,data,rules) =>{
    const dataValidation  = formValidation(label,data,rules)
    if(!dataValidation.error || !isSubmit) return {}
    return { error:dataValidation.error, helperText:dataValidation.msg }
  }

  const [buttonStates,setButtonStates] = React.useState({
    submit:true,
    cancel:true
  })

  const handleSubmit = () =>{
    setIsSubmit(true)
    submitData({...dataForm,reloadStep,merchantCategory:getStartedMerchantCategory})
  }
  const handleCancel = () =>{ reloadStep() }
  React.useEffect(()=>{
    setIsSubmit(true)
  },[])
  React.useEffect(()=>{
    var btnSt = {submit:true,cancel:true}
    for(let key in dataForm){
        if(dataForm[key] !== initialFormData[key]){
          console.log('data errror======>',key)
          btnSt = {submit:false,cancel:false}
          break;
        }
    }

    for(let key in dataForm){
      if(formValidation('',dataForm[key],formRules[key]).error){
        btnSt = {submit:true,cancel:true}
      }
    }
    setButtonStates(btnSt)
  },[dataForm])
  React.useEffect(()=>{
      const ktp = document.getElementById('nomor_ktp').value
      const npwp = document.getElementById('nomor_npwp').value
      var st = {...initialFormData}
      if(!_.isNil(npwp) && _.isNil(initialFormData.no_npwp_owner)){ st['no_npwp_owner'] = npwp }
      if(!_.isNil(ktp) && _.isNil(initialFormData.no_ktp_owner)){ st['no_ktp_owner'] = ktp }
      setDataForm(st)
  },[step4KycFormData])
  const buttonColor = data => _.isNil(data) || _.isEmpty(data)? 'success' : 'secondary'

  return (
    <Paper elevation={4} style={{padding:'2rem'}}>
      <Typography variant='h6' color='textSecondary'>
          Pemilik Bisnis <MerchantCategoryIcon merchantCategory={getStartedMerchantCategory}/>
      </Typography>
      <Box component='form' sx={{ '& .MuiTextField-root': { m: 1 } }} noValidate autoComplete='off' >
        <div>
          <br />
          <Typography variant='body2' color='textSecondary'> Upload KTP Pemilik Bisnis </Typography>
          <label style={style.labelWrapper} htmlFor='contained-button-file'>
            <Stack spacing={2} flexWrap="wrap" direction='row'>
                <Input
                  disabled={stepSubmitLoading}
                  style={{marginLeft:0}}
                  accept='image/*'
                  id='contained-button-file'
                  name='ktp'
                  type='file'
                  onChange={handleUploadFile}
                />
                <Button disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.file_ktp_owner)}  size="small" component="span" startIcon={<UploadFileIcon/>}> { _.isNil(dataForm.file_ktp_owner) ? 'Upload' : 'Update' }</Button>
                {generateFormErrorMsg('File image KTP',dataForm.file_ktp_owner,['required']).error && <Alert severity="error">{generateFormErrorMsg('File image KTP',dataForm.file_ktp_owner,['required']).helperText}</Alert>}
            </Stack>
            <FormHelperText></FormHelperText>
          </label>
          <Typography variant='body2' color='danger'> Max. file size: 5 MB. </Typography>
          <TextField value={dataForm.no_ktp_owner} disabled={stepSubmitLoading} style={style.input} fullWidth  id='nomor_ktp' label='Nomor KTP Pemilik Bisnis' onChange={event=>{ handleOnChangeForm('no_ktp_owner',event.target.value) }}   {...generateFormErrorMsg('Nomor KTP Pemilik Bisnis',dataForm.no_ktp_owner,['required'])} />
          <br />
          <br />
          <Typography variant='body2' color='textSecondary'> Foto Diri memegang KTP </Typography>
          <label style={style.labelWrapper} htmlFor='contained-button-file2'>
              <Stack spacing={2} direction='row' flexWrap="wrap" >
                  <Input
                      disabled={stepSubmitLoading}
                      style={{marginLeft:0}}
                      accept='image/*'
                      id='contained-button-file2'
                      name='selfiektp'
                      type='file'
                      onChange={handleUploadFile}
                    />
                  <Button  disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.file_selfiektp_owner)}  size="small" component='span' startIcon={<UploadFileIcon/>}>{ _.isNil(dataForm.file_selfiektp_owner) ? 'Upload' : 'Update' }</Button>
                  {generateFormErrorMsg('File Selfie image KTP',dataForm.file_selfiektp_owner,['required']).error && <Alert severity="error">{generateFormErrorMsg('File Selfie image KTP',dataForm.file_selfiektp_owner,['required']).helperText}</Alert>}
              </Stack>
          </label>
          <Typography variant='body2' color='textSecondary'> Max. file size: 5 MB. Catatan : Foto diri sambil memegang KTP. Pastikan gambar KTP tetap terlihat jelas. </Typography>
          <br />
          <label style={style.labelWrapper} htmlFor='contained-button-file3'>
              <Stack spacing={2} direction='row' flexWrap="wrap" >
                  <Input
                    disabled={stepSubmitLoading}
                    style={{marginLeft:0}}
                    accept='image/*'
                    id='contained-button-file3'
                    name='npwp'
                    type='file'
                    onChange={handleUploadFile}
                  />
                  <Button disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.file_npwp_owner)}  size="small" component='span' startIcon={<UploadFileIcon/>}>{ _.isNil(dataForm.file_npwp_owner) ? 'Upload' : 'Update' }</Button>
                  {generateFormErrorMsg('File image NPWP',dataForm.file_npwp_owner,['required']).error && <Alert severity="error">{generateFormErrorMsg('File image NPWP',dataForm.file_npwp_owner,['required']).helperText}</Alert>}
              </Stack>
          </label>
          <Typography variant='body2' color='textSecondary'> Max. file size: 5 MB. </Typography>

          <TextField defaultValue={dataForm.no_npwp_owner} disabled={stepSubmitLoading} style={style.input} fullWidth id='nomor_npwp' label='Nomor NPWP Usaha' onChange={event=>{ handleOnChangeForm('no_npwp_owner',event.target.value) }}   {...generateFormErrorMsg('Nomor NPWP Pemilik Bisnis',dataForm.no_npwp_owner,['required'])}/>
          <br/>
          <Stack style={{ marginLeft: 8,marginTop:'2rem' }} spacing={2} direction='row'>
              <Button variant='contained' color='primary' size="large" onClick={handleSubmit} disabled={stepSubmitLoading || buttonStates.submit}>{stepSubmitLoading ? `Saving` : `Save`}</Button>
              <Button variant='outlined' color='error' size="large" onClick={handleCancel} disabled={stepSubmitLoading || buttonStates.cancel}>Cancel</Button>
          </Stack>
          <br/>
          <ImageList sx={{ width: '100%', marginTop:'2rem'}}>
            {/* Document item */}
            {!_.isNil(dataForm.file_ktp_owner) &&
            <ImageListItem key={0} variant="standard" hei>
              <img
                src={`${dataForm.file_ktp_owner}?${new Date().getTime()}` || 'https://via.placeholder.com/150x100?text=KTP+tidak+ditemukan'}
                alt="ktp"
                loading="lazy"
              />
              <ImageListItemBar
                title={'KTP'}
              />
            </ImageListItem>}
            {!_.isNil(dataForm.file_selfiektp_owner) &&
            <ImageListItem key={1}>
              <img
                src={`${dataForm.file_selfiektp_owner}?${new Date().getTime()}` || 'https://via.placeholder.com/150x100?text=Selfie+KTP+tidak+ditemukan'}
                alt="ktp selfie"
                loading="lazy"
              />
              <ImageListItemBar
                title={'KTP Selfie'}
              />
            </ImageListItem>}
           {!_.isNil(dataForm.file_npwp_owner) && <ImageListItem key={2}>
              <img
                src={`${dataForm.file_npwp_owner}?${new Date().getTime()}` || 'https://via.placeholder.com/150x100?text=NPWP+tidak+ditemukan'}
                alt="npwp"
                loading="lazy"
              />
              <ImageListItemBar
                title={'NPWP'}
              />
            </ImageListItem>}
            {/* Document item end */}
          </ImageList>
          <br/>

        </div>
      </Box>
    </Paper>
  )
}
export default connect((state, ownProps) => ({
  step4KycFormData:state.getstarted.step4KycFormData,
  uploadingStates:state.getstarted.uploadingStates,
  stepSubmitLoading:state.getstarted.stepSubmitLoadingStep4
}), dispatch => ({
}))(Comp)
