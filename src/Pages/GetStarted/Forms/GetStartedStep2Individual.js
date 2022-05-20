import React, { useEffect, useState,memo } from 'react'
import { connect } from 'react-redux'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Checkbox from '@mui/material/Checkbox'
import Stack from '@mui/material/Stack'
import FormHelperText from '@mui/material/FormHelperText'
import _ from 'lodash'
import { formValidation } from 'core/Utils/Utils'
import businessCat  from '../../../data/businessCategory.json'
import { data } from 'core/Redux/HomeRedux'
import MerchantCategoryIcon from './MerchantCategoryIcon'

const businessCategories = businessCat.map(r=>r.id)
var formErrors = []
function Comp (props) {
  const { getStartedMerchantCategory,submitData,step2KycFormData,reloadStep,stepSubmitLoading} = props
  const initialFormData = {
    merchant_name: step2KycFormData?.brandName||'',
    merchant_category: step2KycFormData?.businessCategory||'',
    business_activity:step2KycFormData?.businessActivity||'',
    business_media:step2KycFormData?.businessMedia||'',
    business_media_website:step2KycFormData?.businessMediaWebsite||'',
    business_media_application:step2KycFormData?.businessMediaApplication||'',
    business_social_media_fb:step2KycFormData?.businessSocialMediafb||'',
    business_social_media_yt:step2KycFormData?.businessSocialMediayt||'',
    business_social_media_tiktok:step2KycFormData?.businessSocialMediatiktok||'',
    business_social_media_ig:step2KycFormData?.businessSocialMediaig||'',
    business_social_media_other:step2KycFormData?.businessSocialMediaother||'',
    pic_finance_name:step2KycFormData?.namePicFinance||'',
    pic_finance_email:step2KycFormData?.emailPicFinance||'',
    pic_finance_phone:step2KycFormData?.phoneNoPicFinance||'',
    pic_technical_name:step2KycFormData?.namePicTechnical||'',
    pic_technical_email:step2KycFormData?.emailPicTechnical||'',
    pic_technical_phone:step2KycFormData?.phoneNoPicTechnical||'',
    business_address:step2KycFormData?.businessAddress||'',
  }
  const formRules = {
    merchant_name:['required'],
    merchant_category:['required'],
    business_activity:['required'],
    business_media:['required'],
    business_media_website:['required'],
    business_media_application:['required'],
    pic_finance_name:['required'],
    pic_finance_email:['required','email'],
    pic_finance_phone:['required'],
    pic_technical_name:['required'],
    pic_technical_email:['required','email'],
    pic_technical_phone:['required'],
    business_address:['required'],
    business_social_media_fb:['required'],
    business_social_media_yt:['required'],
    business_social_media_tiktok:['required'],
    business_social_media_ig:['required'],
    business_social_media_other:['required'],
  }
  const [formData, setFormData] = React.useState(initialFormData)
  const [autoCompleteValue1, setAutoCompleteValue1] = React.useState(formData.merchant_category || null);
  const [isSubmit,setIsSubmit] = React.useState(false)
  const [socMedState, setSocMedState] = React.useState({
    facebook: !_.isNil(step2KycFormData?.businessSocialMediafb),
    instagram: !_.isNil(step2KycFormData?.businessSocialMediaig),
    tiktok: !_.isNil(step2KycFormData?.businessSocialMediatiktok),
    youtube: !_.isNil(step2KycFormData?.businessSocialMediayt),
    lainnya: !_.isNil(step2KycFormData?.businessSocialMediaother)
  })
  const [checkedValues, setCheckedValues] = React.useState({ socmed:false, media:false })
  const [buttonStates,setButtonStates] = React.useState({ submit:true, cancel:false })
  const [onFocus,setOnFocus] = React.useState(false)

  const handleOnChangeForm = (name, value) => {
    setFormData({ ...formData, [name]: value }) }
  const handleOnChangeText =  (e) => { handleOnChangeForm(e.target.name, e.target.value) }

  const handleCheckSocmed = (event) =>{
    setFormData({...formData,[event.target.id]:event.target.checked === true ? formData[event.target.id] : null })
    setSocMedState({...socMedState,[event.target.name]:event.target.checked})
  }

  const generateFormErrorMsg = (label,data,rules) =>{
    const dataValidation  = formValidation(label,data,rules)
    if(!dataValidation.error || !isSubmit){
      formErrors = formErrors.filter(r=>r!=label)
      return {}
    }
    else{
      formErrors = [...formErrors,label]
      return { error:dataValidation.error, helperText:dataValidation.msg }
    }
  }

  const handleSubmit = () =>{
    setIsSubmit(true)
    submitData({...formData,reloadStep,merchantCategory:getStartedMerchantCategory})
  }

  const handleOnFocus = () =>{
    setIsSubmit(true)
  }

  const handleCancel = () =>{
    reloadStep()
  }


  React.useEffect(()=>{
    setIsSubmit(false)
  },[])

  const businessMediaMapping = {
    aplikasi:'business_media_application',
    website:'business_media_website'
  }

  const propertyDataExclude = [
    //filter unchecked socmed
    ...(Object.entries(socMedState)
        .filter(r=>!r[1]))
        .map(r=>r[0]),
    //filter unselected radio button
    ...(formData.business_media === ''
        ? (Object.entries(businessMediaMapping).map(r=>r[1]))
        : Object.entries(businessMediaMapping)
          .filter(r=>r[1] !== businessMediaMapping[formData.business_media])
          .map(r=>r[1])
      )
  ]
  const sanitizedOtherInputs = (Object.entries(formData)).filter(r=> {
    return !(propertyDataExclude.some(s=> s === r[0]))
  })

  React.useEffect(()=>{
    //check is data same with database
    let isSyncronize = !((Object.entries(formData)).some(r=> formData[r[0]] !== initialFormData[r[0]]))
    //validates all data
    let isErrorFound = sanitizedOtherInputs.some(r=> formValidation('',formData[r[0]],formRules[r[0]]).error)
    const res = isSyncronize || isErrorFound
    setButtonStates({submit:res,cancel:res})
  },[formData])


  return (
    <Paper elevation={4} style={{padding:'2rem'}}>
      <Typography variant='h6' style={{marginBottom:'2rem'}} color='textSecondary'>
          Business Detail <MerchantCategoryIcon merchantCategory={getStartedMerchantCategory}/>
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
          <TextField  onFocus={handleOnFocus} required fullWidth size='small' name='merchant_name' id='merchant_name' label='Nama Brand' helperText='' value={formData.merchant_name} onChange={handleOnChangeText} {...generateFormErrorMsg('Nama Brand',formData.merchant_name,formRules.merchant_name)} disabled={stepSubmitLoading}/><br />
          <Autocomplete
            onFocus={handleOnFocus}
            value={autoCompleteValue1}
            inputValue={formData.merchant_category||""}
            onChange={(event, newValue) => {
              setAutoCompleteValue1(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              handleOnChangeForm('merchant_category', newInputValue)
            }}
            options={businessCategories}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Kategori Bisnis" {...generateFormErrorMsg('Kategori Bisnis',formData.merchant_category,formRules.merchant_category)}/>}
            disabled={stepSubmitLoading}
          />

          <TextField
            onFocus={handleOnFocus}
            required
            value={formData.business_activity}
            fullWidth
            size='small'
            id='kegiatan_usaha'
            label='Kegiatan Usaha'
            helperText='Tuliskan semua kegiatan usaha dari bisnis Anda. Contoh : Penjualan Aki, Penjualan Pakaian Wanita, Jasa Pengiriman, Pembayaran Sekolah, dan lainnya.'
            multiline
            rows={4}
            onChange={event=>{
              handleOnChangeForm('business_activity', event.target.value)
            }}
            {...generateFormErrorMsg('Kegiatan Usaha',formData.business_activity,formRules.business_activity)}
            disabled={stepSubmitLoading}
          />
          <div style={{ marginLeft: 10 }}>
          <FormControl {...{error:!formData.business_media && isSubmit}} disabled={stepSubmitLoading}>
              <FormLabel id='demo-row-radio-buttons-group-label' required>Media Bisnis</FormLabel>
              <FormHelperText>{!checkedValues.media ? 'Mohon pilih salah satu media bisnis': ''}</FormHelperText>
              <RadioGroup
                onFocus={handleOnFocus}
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                defaultValue={formData.business_media}
                onChange={event=>{
                  handleOnChangeForm('business_media', event.target.value)
                }}
              >
                <FormControlLabel value='website' control={<Radio />} label='Website' />
                <FormControlLabel value='aplikasi' control={<Radio />} label='Aplikasi' />
                <FormControlLabel value='websiteaplikasi' control={<Radio />} label='Website & Aplikasi' />
              </RadioGroup>
            </FormControl>
            {(formData.business_media === 'website' || formData.business_media === 'websiteaplikasi')&&  <TextField placeholder='harap diisi dengan url website' onFocus={handleOnFocus} value={formData.business_media_website} disabled={stepSubmitLoading} fullWidth size='small' id='website' label='Website' helperText='' onChange={event=>handleOnChangeForm('business_media_website', event.target.value)} {...generateFormErrorMsg('Url Website',formData.business_media_website,formRules.business_media_website)}/>}
            {(formData.business_media === 'aplikasi'|| formData.business_media === 'websiteaplikasi') && <TextField placeholder='harap diisi dengan url aplikasi' onFocus={handleOnFocus} value={formData.business_media_application} disabled={stepSubmitLoading} fullWidth size='small' id='aplikasi' label='Aplikasi' helperText='' onChange={event=>handleOnChangeForm('business_media_application', event.target.value)} {...generateFormErrorMsg('Url Aplikasi',formData.business_media_application,formRules.business_media_application)}/>}
          </div>
          <div style={{ marginLeft: 10,marginTo:5 }}>
            <FormControl disabled={stepSubmitLoading}>
              <FormLabel id='demo-row-radio-buttons-group-label2' required {...{error:!(Object.entries(socMedState)).find(r=>r[1]) && isSubmit}}>Media Sosial</FormLabel>
              <FormHelperText error={!(Object.entries(socMedState)).find(r=>r[1]) && isSubmit}>{!(Object.entries(socMedState)).find(r=>r[1]) && isSubmit ? 'Mohon pilih media sosial': ''}</FormHelperText>
              <RadioGroup
                onFocus={handleOnFocus}
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
              >
                <FormControlLabel value='facebook' control={<Checkbox  checked={socMedState.facebook||false} name='facebook' onChange={handleCheckSocmed} id="business_social_media_fb" />} label='Facebook' />
                <FormControlLabel value='instagram' control={<Checkbox checked={socMedState.instagram||false} name='instagram' onChange={handleCheckSocmed} id="business_social_media_ig"/>} label='Instagram' />
                <FormControlLabel value='tiktok' control={<Checkbox checked={socMedState.tiktok||false} name='tiktok' onChange={handleCheckSocmed} id="business_social_media_tiktok"/>} label='TikTok' />
                <FormControlLabel value='youtube' control={<Checkbox checked={socMedState.youtube||false} name='youtube' onChange={handleCheckSocmed} id="business_social_media_yt"/>} label='Youtube' />
                <FormControlLabel value='lainnya' control={<Checkbox checked={socMedState.lainnya||false} name='lainnya' onChange={handleCheckSocmed} id="business_social_media_other"/>} label='Lainnya' />
              </RadioGroup>
            </FormControl>
          </div>
          {socMedState.facebook && <TextField onFocus={handleOnFocus} value={formData.business_social_media_fb} disabled={stepSubmitLoading} fullWidth size='small' id='facebook' label='Facebook' helperText='' onChange={event=>handleOnChangeForm('business_social_media_fb', event.target.value)} />}
          {socMedState.instagram && <TextField onFocus={handleOnFocus} value={formData.business_social_media_ig} disabled={stepSubmitLoading} fullWidth size='small' id='instagram' label='Instagram' helperText='' onChange={event=>handleOnChangeForm('business_social_media_ig', event.target.value)}/>}
          {socMedState.tiktok && <TextField onFocus={handleOnFocus} value={formData.business_social_media_tiktok} disabled={stepSubmitLoading} fullWidth size='small' id='tiktok' label='TikTok' helperText=''  onChange={event=>handleOnChangeForm('business_social_media_tiktok', event.target.value)}/>}
          {socMedState.youtube && <TextField onFocus={handleOnFocus} value={formData.business_social_media_yt} disabled={stepSubmitLoading} fullWidth size='small' id='youtube' label='Youtube' helperText='' onChange={event=>handleOnChangeForm('business_social_media_yt', event.target.value)}/>}
          {socMedState.lainnya && <TextField onFocus={handleOnFocus} value={formData.business_social_media_other} disabled={stepSubmitLoading} fullWidth size='small' id='lainnya' label='Lainnya' helperText='' onChange={event=>handleOnChangeForm('business_social_media_other', event.target.value)} />}
          <TextField onFocus={handleOnFocus} value={formData.pic_finance_name} disabled={stepSubmitLoading} required fullWidth size='small' id='pic_finance_name' label='Nama PIC Finance'  helperText='' onChange={event=>handleOnChangeForm('pic_finance_name', event.target.value)} {...generateFormErrorMsg('Nama PIC Finance',formData.pic_finance_name,formRules.pic_finance_name)}/>
          <TextField onFocus={handleOnFocus} value={formData.pic_finance_email} disabled={stepSubmitLoading} required fullWidth size='small' id='pic_finance_email' label='Email PIC Finance' helperText='' onChange={event=>handleOnChangeForm('pic_finance_email', event.target.value)} {...generateFormErrorMsg('Email PIC Finance',formData.pic_finance_email,formRules.pic_finance_email)}/>
          <TextField onFocus={handleOnFocus} value={formData.pic_finance_phone} disabled={stepSubmitLoading} required fullWidth size='small' id='pic_finance_tlp' label='No Telepon PIC Finance' helperText='' onChange={event=>handleOnChangeForm('pic_finance_phone', event.target.value)} {...generateFormErrorMsg('No Telepon PIC Finance ',formData.pic_finance_phone,formRules.pic_finance_phone)}/>
          <TextField onFocus={handleOnFocus} value={formData.pic_technical_name} disabled={stepSubmitLoading} required fullWidth size='small' id='pic_teknis_name' label='Nama PIC Teknis' helperText='' onChange={event=>handleOnChangeForm('pic_technical_name', event.target.value)} {...generateFormErrorMsg('Nama PIC Teknikal',formData.pic_technical_name,formRules.pic_technical_name)}/>
          <TextField onFocus={handleOnFocus} value={formData.pic_technical_email} disabled={stepSubmitLoading} required fullWidth size='small' id='pic_teknis_email' label='Email PIC Teknis' helperText='' onChange={event=>handleOnChangeForm('pic_technical_email', event.target.value)} {...generateFormErrorMsg('Email PIC Teknikal',formData.pic_technical_email,formRules.pic_technical_email)}/>
          <TextField onFocus={handleOnFocus} value={formData.pic_technical_phone} disabled={stepSubmitLoading} required fullWidth size='small' id='pic_teknis_tlp' label='No Telepon PIC Teknis' helperText='' onChange={event=>handleOnChangeForm('pic_technical_phone', event.target.value)} {...generateFormErrorMsg('No Telepon PIC Teknikal',formData.pic_technical_phone,formRules.pic_technical_phone)}/>
          <TextField onFocus={handleOnFocus} value={formData.business_address} disabled={stepSubmitLoading} required fullWidth multiline size='small' id='business_address' label='Alamat Bisnis' helperText='' onChange={event=>handleOnChangeForm('business_address', event.target.value)} {...generateFormErrorMsg('Alamat Bisnis',formData.business_address,formRules.business_address)}/>
          <Stack style={{ marginLeft: 8,marginTop:'2rem' }} spacing={2} direction='row'>
            <Button variant='contained' color='success' disabled={buttonStates.submit || stepSubmitLoading} onClick={handleSubmit} >{stepSubmitLoading ? `Saving` : `Save`}</Button>
            <Button variant='contained' color='error' disabled={buttonStates.cancel || stepSubmitLoading} onClick={handleCancel}> Cancel</Button>
          </Stack>
        </div>
      </Box>
    </Paper>
  )
}
export default connect((state, ownProps) => ({
  step2KycFormData:state.getstarted.step2KycFormData,
  stepSubmitLoading:state.getstarted.stepSubmitLoadingStep2
}), dispatch => ({
}))(memo(Comp))
