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
    doc_no_ktp_direktur:step4KycFormData?.noKtpDirector|| null,
    doc_no_npwp_usaha:step4KycFormData?.companyBusinessNpwpNo || null,
    doc_no_tdp:step4KycFormData?.companyTdpNo || null,
    doc_no_siup:step4KycFormData?.companySiupNo || null,

    doc_ktp_direktur:step4KycFormData?.fileDirectorKTP|| null,
    doc_npwp_usaha:step4KycFormData?.fileBusinessNpWp || null,
    doc_akta_pendirian_perubahan:step4KycFormData?.fileAktapp || null,
    doc_sk_menkeh:step4KycFormData?.fileSkmenkeh || null,
    doc_sk_domisili:step4KycFormData?.fileSkdom || null,
    doc_srt_tdp:step4KycFormData?.filetdp || null,
    doc_siup:step4KycFormData?.filesiup || null,
    doc_srt_pp:step4KycFormData?.filespp || null,
    doc_company_profile:step4KycFormData?.fileprofile || null,
    doc_logo_perusahaan:step4KycFormData?.filelogo || null,
  }
  const formRules = {
    doc_no_ktp_direktur:['required'],
    doc_no_npwp_usaha:['required'],
    doc_no_tdp:['required'],
    doc_no_siup:['required'],
    doc_ktp_direktur:['required'],
    doc_npwp_usaha:['required'],
    doc_akta_pendirian_perubahan:['required'],
    doc_sk_menkeh:['required'],
    doc_sk_domisili:['required'],
    doc_srt_tdp:['required'],
    doc_siup:['required'],
    doc_srt_pp:['required'],
    doc_company_profile:['required'],
    doc_logo_perusahaan:['required'],
  }
  const [docsPreview,setDocPreview] = React.useState(step4KycFormData.docsPreview||[])
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
    setDocPreview(step4KycFormData.docsPreview || [])
    const fileUpdate = {
      doc_ktp_direktur:step4KycFormData?.fileDirectorKTP|| null,
      doc_npwp_usaha:step4KycFormData?.fileBusinessNpWp || null,
      doc_akta_pendirian_perubahan:step4KycFormData?.fileAktapp || null,
      doc_sk_menkeh:step4KycFormData?.fileSkmenkeh || null,
      doc_sk_domisili:step4KycFormData?.fileSkdom || null,
      doc_srt_tdp:step4KycFormData?.filetdp || null,
      doc_siup:step4KycFormData?.filesiup || null,
      doc_srt_pp:step4KycFormData?.filespp || null,
      doc_company_profile:step4KycFormData?.fileprofile || null,
      doc_logo_perusahaan:step4KycFormData?.filelogo || null,
    }
    setDataForm({...dataForm,...fileUpdate})
  },[step4KycFormData])
  const buttonColor = data => _.isNil(data) || _.isEmpty(data)? 'success' : 'secondary'
  return (
    <Paper elevation={4} style={{padding:'2rem'}}>
      <Typography variant='h6' color='textSecondary'>
          Pemilik Bisnis <MerchantCategoryIcon merchantCategory={getStartedMerchantCategory}/>
      </Typography>
      <br />
      <Box component='form' sx={{ '& .MuiTextField-root': { m: 1 } }} noValidate autoComplete='off' >
        <div>
          <Typography variant='body2' color='textSecondary' fontWeight={'bold'}> Upload KTP Direktur Perusahaan </Typography>
          <label style={style.labelWrapper} htmlFor='contained-button-file1'>
            <Stack spacing={2} flexWrap="wrap" direction='row'>
                <Input
                  disabled={stepSubmitLoading}
                  style={{marginLeft:0}}
                  accept='image/*'
                  id='contained-button-file1'
                  name='DirectorKTP'
                  type='file'
                  onChange={handleUploadFile}
                />
                <Button disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.doc_ktp_direktur)}  size="small" component="span" startIcon={<UploadFileIcon/>}> { _.isNil(dataForm.doc_ktp_direktur) ? 'Upload' : 'Update' }</Button>
                {generateFormErrorMsg('File KTP Direktur Perusahaan',dataForm.doc_ktp_direktur,['required']).error && <Alert severity="error">{generateFormErrorMsg('File KTP',dataForm.doc_ktp_direktur,['required']).helperText}</Alert>}
            </Stack>
            <FormHelperText></FormHelperText>
          </label>
          <Typography variant='body2' color='danger' marginLeft={'1rem'}> Max. file size: 5 MB. </Typography>
          <TextField value={dataForm.doc_no_ktp_direktur} disabled={stepSubmitLoading} style={style.input} fullWidth  id='nomor_ktp' label='Nomor KTP Direktur Perusahaan' onChange={event=>{ handleOnChangeForm('doc_no_ktp_direktur',event.target.value) }}   {...generateFormErrorMsg('Nomor KTP Direktur Perusahaan',dataForm.doc_no_ktp_direktur,['required'])} />
          <br />
          <br />
          <br />
          <Typography variant='body2' color='textSecondary' fontWeight={'bold'}> NPWP Usaha </Typography>
          <label style={style.labelWrapper} htmlFor='contained-button-file2'>
              <Stack spacing={2} direction='row' flexWrap="wrap" >
                  <Input
                    disabled={stepSubmitLoading}
                    style={{marginLeft:0}}
                    accept='image/*'
                    id='contained-button-file2'
                    name='BusinessNpWp'
                    type='file'
                    onChange={handleUploadFile}
                  />
                  <Button disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.doc_npwp_usaha)}  size="small" component='span' startIcon={<UploadFileIcon/>}>{ _.isNil(dataForm.doc_npwp_usaha) ? 'Upload' : 'Update' }</Button>
                  {generateFormErrorMsg('File NPWP Usaha',dataForm.doc_npwp_usaha,['required']).error && <Alert severity="error">{generateFormErrorMsg('File NPWP Usaha',dataForm.doc_npwp_usaha,['required']).helperText}</Alert>}
              </Stack>
          </label>
          <Typography variant='body2' color='textSecondary' marginLeft={'1rem'}> Max. file size: 5 MB. </Typography>
          <TextField defaultValue={dataForm.doc_no_npwp_usaha} disabled={stepSubmitLoading} style={style.input} fullWidth id='nomor_npwp' label='Nomor NPWP Usaha' onChange={event=>{ handleOnChangeForm('doc_no_npwp_usaha',event.target.value) }}   {...generateFormErrorMsg('Nomor NPWP Usaha',dataForm.doc_no_npwp_usaha,['required'])}/>
          <br/>
          <br />
          <Typography variant='body2' color='textSecondary' fontWeight={'bold'}> Akta Pendirian & Perubahan </Typography>
          <label style={style.labelWrapper} htmlFor='contained-button-file3'>
              <Stack spacing={2} direction='row' flexWrap="wrap" >
                  <Input
                    disabled={stepSubmitLoading}
                    style={{marginLeft:0}}
                    accept='image/*'
                    id='contained-button-file3'
                    name='Aktapp'
                    type='file'
                    onChange={handleUploadFile}
                  />
                  <Button disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.doc_akta_pendirian_perubahan)}  size="small" component='span' startIcon={<UploadFileIcon/>}>{ _.isNil(dataForm.doc_akta_pendirian_perubahan) ? 'Upload' : 'Update' }</Button>
                  {generateFormErrorMsg('File Akta Pendirian & Perubahan',dataForm.doc_akta_pendirian_perubahan,['required']).error && <Alert severity="error">{generateFormErrorMsg('File Akta Pendirian & Perubahan',dataForm.doc_akta_pendirian_perubahan,['required']).helperText}</Alert>}
              </Stack>
          </label>
          <Typography variant='body2' color='textSecondary' marginLeft={'1rem'}> <b>Note:</b> Unggah akta perubahan jika ada </Typography>
          <br/>
          <br />
          <Typography variant='body2' color='textSecondary' fontWeight={'bold'}> Surat Keputusan Menteri Kehakiman (SK Menkeh) </Typography>
          <label style={style.labelWrapper} htmlFor='contained-button-file4'>
              <Stack spacing={2} direction='row' flexWrap="wrap" >
                  <Input
                    disabled={stepSubmitLoading}
                    style={{marginLeft:0}}
                    accept='image/*'
                    id='contained-button-file4'
                    name='Skmenkeh'
                    type='file'
                    onChange={handleUploadFile}
                  />
                  <Button disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.doc_sk_menkeh)}  size="small" component='span' startIcon={<UploadFileIcon/>}>{ _.isNil(dataForm.doc_sk_menkeh) ? 'Upload' : 'Update' }</Button>
                  {generateFormErrorMsg('File SK Menkeh',dataForm.doc_sk_menkeh,['required']).error && <Alert severity="error">{generateFormErrorMsg('File SK Menkeh',dataForm.doc_sk_menkeh,['required']).helperText}</Alert>}
              </Stack>
          </label>
          <Typography variant='body2' color='textSecondary' marginLeft={'1rem'}> Max. file size: 40 MB. </Typography>
          <br/>
          <br />
          <Typography variant='body2' color='textSecondary' fontWeight={'bold'}> Surat Keterangan Domisili </Typography>
          <label style={style.labelWrapper} htmlFor='contained-button-file5'>
              <Stack spacing={2} direction='row' flexWrap="wrap" >
                  <Input
                    disabled={stepSubmitLoading}
                    style={{marginLeft:0}}
                    accept='image/*'
                    id='contained-button-file5'
                    name='Skdom'
                    type='file'
                    onChange={handleUploadFile}
                  />
                  <Button disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.doc_sk_domisili)}  size="small" component='span' startIcon={<UploadFileIcon/>}>{ _.isNil(dataForm.doc_sk_domisili) ? 'Upload' : 'Update' }</Button>
                  {generateFormErrorMsg('File Surat Keterangan Domisili',dataForm.doc_sk_domisili,['required']).error && <Alert severity="error">{generateFormErrorMsg('File Surat Keterangan Domisili',dataForm.doc_sk_domisili,['required']).helperText}</Alert>}
              </Stack>
          </label>
          <Typography variant='body2' color='textSecondary' marginLeft={'1rem'}> Max. file size: 40 MB. </Typography>
          <br/>
          <br />
          <Typography variant='body2' color='textSecondary' fontWeight={'bold'}> Surat Tanda Daftar Perusahaan </Typography>
          <label style={style.labelWrapper} htmlFor='contained-button-file6'>
              <Stack spacing={2} direction='row' flexWrap="wrap" >
                  <Input
                    disabled={stepSubmitLoading}
                    style={{marginLeft:0}}
                    accept='image/*'
                    id='contained-button-file6'
                    name='tdp'
                    type='file'
                    onChange={handleUploadFile}
                  />
                  <Button disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.doc_srt_tdp)}  size="small" component='span' startIcon={<UploadFileIcon/>}>{ _.isNil(dataForm.doc_srt_tdp) ? 'Upload' : 'Update' }</Button>
                  {generateFormErrorMsg('File TDP',dataForm.doc_srt_tdp,['required']).error && <Alert severity="error">{generateFormErrorMsg('File TDP',dataForm.doc_srt_tdp,['required']).helperText}</Alert>}
              </Stack>
          </label>
          <Typography variant='body2' color='textSecondary' marginLeft={'1rem'}> Max. file size: 40 MB. </Typography>
          <TextField defaultValue={dataForm.doc_no_tdp} disabled={stepSubmitLoading} style={style.input} fullWidth id='nomor_tdp' label='Nomor TDP' onChange={event=>{ handleOnChangeForm('doc_no_tdp',event.target.value) }}   {...generateFormErrorMsg('Nomor TDP',dataForm.doc_no_tdp,['required'])}/>
          <br/>
          <br />
          <Typography variant='body2' color='textSecondary' fontWeight={'bold'}> Nomor Izin Usaha Perdagangan </Typography>
          <label style={style.labelWrapper} htmlFor='contained-button-file7'>
              <Stack spacing={2} direction='row' flexWrap="wrap" >
                  <Input
                    disabled={stepSubmitLoading}
                    style={{marginLeft:0}}
                    accept='image/*'
                    id='contained-button-file7'
                    name='siup'
                    type='file'
                    onChange={handleUploadFile}
                  />
                  <Button disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.doc_siup)}  size="small" component='span' startIcon={<UploadFileIcon/>}>{ _.isNil(dataForm.doc_siup) ? 'Upload' : 'Update' }</Button>
                  {generateFormErrorMsg('File SIUP',dataForm.doc_siup,['required']).error && <Alert severity="error">{generateFormErrorMsg('File SIUP',dataForm.doc_siup,['required']).helperText}</Alert>}
              </Stack>
          </label>
          <Typography variant='body2' color='textSecondary' marginLeft={'1rem'}> Max. file size: 40 MB. </Typography>
          <TextField defaultValue={dataForm.doc_no_siup} disabled={stepSubmitLoading} style={style.input} fullWidth id='nomor_siup' label='Nomor SIUP' onChange={event=>{ handleOnChangeForm('doc_no_siup',event.target.value) }}   {...generateFormErrorMsg('Nomor SIUP',dataForm.doc_no_siup,['required'])}/>
          <br/>
          <br />
          <Typography variant='body2' color='textSecondary' fontWeight={'bold'}> Surat Perijinan Pendukung </Typography>
          <label style={style.labelWrapper} htmlFor='contained-button-file8'>
              <Stack spacing={2} direction='row' flexWrap="wrap" >
                  <Input
                    disabled={stepSubmitLoading}
                    style={{marginLeft:0}}
                    accept='image/*'
                    id='contained-button-file8'
                    name='spp'
                    type='file'
                    onChange={handleUploadFile}
                  />
                  <Button disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.doc_srt_pp)}  size="small" component='span' startIcon={<UploadFileIcon/>}>{ _.isNil(dataForm.doc_srt_pp) ? 'Upload' : 'Update' }</Button>
                  {generateFormErrorMsg('File Perijinan Pendukung',dataForm.doc_srt_pp,['required']).error && <Alert severity="error">{generateFormErrorMsg('File Perijinan Pendukung',dataForm.doc_srt_pp,['required']).helperText}</Alert>}
              </Stack>
          </label>
          <Typography variant='body2' color='textSecondary' marginLeft={'1rem'}> Max. file size: 40 MB. </Typography>
          <br/>
          <Typography variant='body2' color='textSecondary' fontWeight={'bold'}> Company Profile </Typography>
          <label style={style.labelWrapper} htmlFor='contained-button-file9'>
              <Stack spacing={2} direction='row' flexWrap="wrap" >
                  <Input
                    disabled={stepSubmitLoading}
                    style={{marginLeft:0}}
                    accept='image/*'
                    id='contained-button-file9'
                    name='profile'
                    type='file'
                    onChange={handleUploadFile}
                  />
                  <Button disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.doc_company_profile)}  size="small" component='span' startIcon={<UploadFileIcon/>}>{ _.isNil(dataForm.doc_company_profile) ? 'Upload' : 'Update' }</Button>
                  {generateFormErrorMsg('Profil Perusahaan',dataForm.doc_company_profile,['required']).error && <Alert severity="error">{generateFormErrorMsg('Profile Perusahaan',dataForm.doc_company_profile,['required']).helperText}</Alert>}
              </Stack>
          </label>
          <Typography variant='body2' color='textSecondary' marginLeft={'1rem'}> Max. file size: 40 MB. </Typography>
          <br/>
          <Typography variant='body2' color='textSecondary' fontWeight={'bold'}> Logo Perusahaan </Typography>
          <label style={style.labelWrapper} htmlFor='contained-button-file10'>
              <Stack spacing={2} direction='row' flexWrap="wrap" >
                  <Input
                    disabled={stepSubmitLoading}
                    style={{marginLeft:0}}
                    accept='image/*'
                    id='contained-button-file10'
                    name='logo'
                    type='file'
                    onChange={handleUploadFile}
                  />
                  <Button disabled={stepSubmitLoading} variant='contained' color={buttonColor(dataForm.doc_logo_perusahaan)}  size="small" component='span' startIcon={<UploadFileIcon/>}>{ _.isNil(dataForm.doc_logo_perusahaan) ? 'Upload' : 'Update' }</Button>
                  {generateFormErrorMsg('Logo Perusahaan',dataForm.doc_logo_perusahaan,['required']).error && <Alert severity="error">{generateFormErrorMsg('Logo Perusahaan',dataForm.doc_logo_perusahaan,['required']).helperText}</Alert>}
              </Stack>
          </label>
          <Typography variant='body2' color='textSecondary' marginLeft={'1rem'}> Max. file size: 40 MB. </Typography>
          <br/>
          <Stack style={{ marginLeft: 8,marginTop:'2rem' }} spacing={2} direction='row'>
              <Button variant='contained' color='primary' size="large" onClick={handleSubmit} disabled={stepSubmitLoading || buttonStates.submit}>{stepSubmitLoading ? `Saving` : `Save`}</Button>
              <Button variant='outlined' color='error' size="large" onClick={handleCancel} disabled={stepSubmitLoading || buttonStates.cancel}>Cancel</Button>
          </Stack>
          <br/>
          {docsPreview.length > 0 &&(
            <ImageList sx={{ width: '100%', marginTop:'2rem'}}>
              {docsPreview.map((r,i)=>(
                <ImageListItem key={i} variant="standard">
                  <img
                    src={r.fileUrl || 'https://via.placeholder.com/150x100?text=KTP+tidak+ditemukan'}
                    alt="ktp"
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={r.inputName}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
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
