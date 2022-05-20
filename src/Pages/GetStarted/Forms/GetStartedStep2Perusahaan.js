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
import businessEntity  from '../../../data/businessEntity.json'
import MerchantCategoryIcon from './MerchantCategoryIcon'


const businessCategories = businessCat.map(r=>r.id)
var formErrors = []
function Comp (props) {
  const { submitData,step2KycFormData,reloadStep,stepSubmitLoading,getStartedMerchantCategory,pageTitle } = props
  const initialFormData = {
    business_entity:step2KycFormData.businessEntity||'',
    company_name:step2KycFormData.companyName||'',
    brand_name:step2KycFormData.brandName||'',

    business_category:step2KycFormData.businessCategory||'',
    business_activity:step2KycFormData.businessActivity||'',

    business_media:step2KycFormData.businessMedia||'',
    business_media_application:step2KycFormData.businessMediaApplication||'',
    business_media_website:step2KycFormData.businessMediaWebsite||'',

    name_pic_finance:step2KycFormData.namePicFinance||'',
    email_pic_finance:step2KycFormData.emailPicFinance||'',
    phone_pic_finance:step2KycFormData.phoneNoPicFinance||'',

    name_pic_technical:step2KycFormData.namePicTechnical||'',
    email_pic_technical:step2KycFormData.emailPicTechnical||'',
    phone_pic_technical:step2KycFormData.phoneNoPicTechnical||'',

    company_address:step2KycFormData.companyAddress||'',

    business_social_media_fb:step2KycFormData.businessSocialMediafb||'',
    business_social_media_yt:step2KycFormData.businessSocialMediayt||'',
    business_social_media_tiktok:step2KycFormData.businessSocialMediatiktok||'',
    business_social_media_ig:step2KycFormData.businessSocialMediaig||'',
    business_social_media_other:step2KycFormData.businessSocialMediaother||'',
  }
  const formRules = {
    business_entity:['required'],
    company_name:['required'],
    brand_name:['required'],
    business_category:['required'],
    business_activity:['required'],

    business_media:['required'],
    business_media_application:['required'],
    business_media_website:['required'],


    name_pic_finance:['required'],
    email_pic_finance:['required','email'],
    phone_pic_finance:['required'],

    name_pic_technical:['required'],
    email_pic_technical:['required','email'],
    phone_pic_technical:['required'],

    company_address:['required'],

    business_social_media_fb:['required'],
    business_social_media_yt:['required'],
    business_social_media_tiktok:['required'],
    business_social_media_ig:['required'],
    business_social_media_other:['required'],
  }
  const [formData, setFormData] = React.useState(initialFormData)
  const [isSubmit,setIsSubmit] = React.useState(false)

  const [socMedState, setSocMedState] = React.useState({
    business_social_media_fb: !_.isNil(step2KycFormData?.businessSocialMediafb),
    business_social_media_ig: !_.isNil(step2KycFormData?.businessSocialMediaig),
    business_social_media_tiktok: !_.isNil(step2KycFormData?.businessSocialMediatiktok),
    business_social_media_yt: !_.isNil(step2KycFormData?.businessSocialMediayt),
    business_social_media_other: !_.isNil(step2KycFormData?.businessSocialMediaother)
  })

  const [autoCompleteValue1, setAutoCompleteValue1] = React.useState(formData.business_category || null);
  const [checkedValues, setCheckedValues] = React.useState({ socmed:false, media:false })
  const [buttonStates,setButtonStates] = React.useState({ submit:true, cancel:false })

  const handleOnChangeForm = (name, value) => { setFormData({ ...formData, [name]: value }) }
  const handleOnChangeText =  (e) => { handleOnChangeForm(e.target.name, e.target.value) }

  const handleCheckSocmed = (event) =>{
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
    var ok = true
    submitData({...formData,reloadStep,merchantCategory:getStartedMerchantCategory})
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
          {pageTitle[getStartedMerchantCategory]} <MerchantCategoryIcon merchantCategory={getStartedMerchantCategory}/>
      </Typography>
      <Box component='form' sx={{ '& .MuiTextField-root': { m: 1 } }} noValidate autoComplete='off' >
        <div>
          {/* Business Entity */}
          <FormControl
            size='small'
            fullWidth
            required
            style={{marginLeft:'0.5rem'}}
            {...generateFormErrorMsg('Entitas Bisnis',formData.business_entity,formRules.business_entity)}>
            <InputLabel id="demo-simple-select-label">Entitas Bisnis </InputLabel>
            <Select
              onFocus={handleOnFocus}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='business_entity'
              value={formData.business_entity}
              onChange={handleOnChangeText}
              label="Entitas Bisnis"
              {...generateFormErrorMsg('Entitas Bisnis',formData.business_entity,formRules.business_entity)}
            >
                {businessEntity.map(r=><MenuItem value={r.value}>{r.label}</MenuItem>)}
            </Select>
            <FormHelperText>{generateFormErrorMsg('Entitas Bisnis',formData.business_entity,formRules.business_entity).helperText}</FormHelperText>
          </FormControl>
          <br/>
          {/* Company Name */}
          <TextField
            onFocus={handleOnFocus}
            required
            fullWidth
            size='small'
            name='company_name'
            id='merchant_name'
            label='Nama Perusahaan'
            helperText=''
            value={formData.company_name}
            onChange={handleOnChangeText}
            {...generateFormErrorMsg('Nama Perusahaan',formData.company_name,formRules.company_name)}
            disabled={stepSubmitLoading}/>
          <br />
          {/* Brand Name */}
          <TextField
            onFocus={handleOnFocus}
            required
            fullWidth
            size='small'
            name='brand_name'
            id='merchant_name'
            label='Nama Brand'
            helperText=''
            value={formData.brand_name}
            onChange={handleOnChangeText}
            {...generateFormErrorMsg('Nama Brand',formData.brand_name,formRules.brand_name)}
            disabled={stepSubmitLoading}/>
          <br />
          {/* Business Category */}
          <Autocomplete
            onFocus={handleOnFocus}
            value={autoCompleteValue1}
            inputValue={formData.business_category||""}
            onChange={(event, newValue) => {
              setAutoCompleteValue1(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              handleOnChangeForm('business_category', newInputValue)
            }}
            options={businessCategories}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Kategori Bisnis" {...generateFormErrorMsg('Kategori Bisnis',formData.business_category,formRules.business_category)}/>}
            disabled={stepSubmitLoading}
          />
          {/* Business Activity */}
          <TextField
            onFocus={handleOnFocus}
            required
            value={formData.business_activity}
            fullWidth
            size='small'
            id='business_activity'
            label='Kegiatan Usaha'
            helperText='Tuliskan semua kegiatan usaha dari bisnis Anda. Contoh : Penjualan Aki, Penjualan Pakaian Wanita, Jasa Pengiriman, Pembayaran Sekolah, dan lainnya.'
            multiline
            rows={4}
            onChange={event=>{
              handleOnChangeForm('business_activity', event.target.value)
            }}
            {...generateFormErrorMsg('Kegiatan Usaha',formData.business_activity,formRules.business_entity)}
            disabled={stepSubmitLoading}
          />
          <div style={{ marginLeft: 10 }}>
            <FormControl {...{error:!formData.business_media && isSubmit}} disabled={stepSubmitLoading}>
              <FormLabel id='demo-row-radio-buttons-group-label' required>Media Bisnis</FormLabel>
              <FormHelperText>{!formData.business_media ? 'Mohon pilih salah satu media bisnis': ''}</FormHelperText>
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
                <FormControlLabel value='business_social_media_fb' control={<Checkbox  checked={socMedState.business_social_media_fb||false} name='business_social_media_fb' onChange={handleCheckSocmed} id="business_social_media_fb" />} label='Facebook' />
                <FormControlLabel value='business_social_media_ig' control={<Checkbox checked={socMedState.business_social_media_ig||false} name='business_social_media_ig' onChange={handleCheckSocmed} id="business_social_media_ig"/>} label='Instagram' />
                <FormControlLabel value='business_social_media_tiktok' control={<Checkbox checked={socMedState.business_social_media_tiktok||false} name='business_social_media_tiktok' onChange={handleCheckSocmed} id="business_social_media_tiktok"/>} label='TikTok' />
                <FormControlLabel value='business_social_media_yt' control={<Checkbox checked={socMedState.business_social_media_yt||false} name='business_social_media_yt' onChange={handleCheckSocmed} id="business_social_media_yt"/>} label='Youtube' />
                <FormControlLabel value='business_social_media_other' control={<Checkbox checked={socMedState.business_social_media_other||false} name='business_social_media_other' onChange={handleCheckSocmed} id="business_social_media_other"/>} label='Lainnya' />
              </RadioGroup>
            </FormControl>
          </div>
          {socMedState.business_social_media_fb && <TextField onFocus={handleOnFocus} value={formData.business_social_media_fb} disabled={stepSubmitLoading} fullWidth size='small' id='facebook' label='Facebook' helperText='' onChange={event=>handleOnChangeForm('business_social_media_fb', event.target.value)} {...generateFormErrorMsg('Social Media Facebook',formData.business_social_media_fb,formRules.business_social_media_fb)}/>}
          {socMedState.business_social_media_ig && <TextField onFocus={handleOnFocus} value={formData.business_social_media_ig} disabled={stepSubmitLoading} fullWidth size='small' id='instagram' label='Instagram' helperText='' onChange={event=>handleOnChangeForm('business_social_media_ig', event.target.value)} {...generateFormErrorMsg('Social Media Instagram',formData.business_social_media_ig,formRules.business_social_media_ig)}/>}
          {socMedState.business_social_media_tiktok && <TextField onFocus={handleOnFocus} value={formData.business_social_media_tiktok} disabled={stepSubmitLoading} fullWidth size='small' id='tiktok' label='TikTok' helperText=''  onChange={event=>handleOnChangeForm('business_social_media_tiktok', event.target.value)} {...generateFormErrorMsg('Social Media Tiktok',formData.business_social_media_tiktok,formRules.business_social_media_tiktok)}/>}
          {socMedState.business_social_media_yt && <TextField onFocus={handleOnFocus} value={formData.business_social_media_yt} disabled={stepSubmitLoading} fullWidth size='small' id='youtube' label='Youtube' helperText='' onChange={event=>handleOnChangeForm('business_social_media_yt', event.target.value)} {...generateFormErrorMsg('Social Media Youtube',formData.business_social_media_yt,formRules.business_social_media_yt)}/>}
          {socMedState.business_social_media_other && <TextField onFocus={handleOnFocus} value={formData.business_social_media_other} disabled={stepSubmitLoading} fullWidth size='small' id='lainnya' label='Lainnya' helperText='' onChange={event=>handleOnChangeForm('business_social_media_other', event.target.value)} {...generateFormErrorMsg('Social Media Lainnya',formData.business_social_media_other,formRules.business_social_media_other)}/>}

          <TextField onFocus={handleOnFocus} value={formData.name_pic_finance} disabled={stepSubmitLoading} required fullWidth size='small' id='name_pic_finance' label='Nama PIC Finance'  helperText='' onChange={event=>handleOnChangeForm('name_pic_finance', event.target.value)} {...generateFormErrorMsg('Nama PIC Finance',formData.name_pic_finance,formRules.name_pic_finance)}/>
          <TextField onFocus={handleOnFocus} value={formData.email_pic_finance} disabled={stepSubmitLoading} required fullWidth size='small' id='email_pic_finance' label='Email PIC Finance' helperText='' onChange={event=>handleOnChangeForm('email_pic_finance', event.target.value)} {...generateFormErrorMsg('Email PIC Finance',formData.email_pic_finance,formRules.email_pic_finance)}/>
          <TextField onFocus={handleOnFocus} value={formData.phone_pic_finance} disabled={stepSubmitLoading} required fullWidth size='small' id='phone_pic_finance' label='No Telepon PIC Finance' helperText='' onChange={event=>handleOnChangeForm('phone_pic_finance', event.target.value)} {...generateFormErrorMsg('No Telepon PIC Finance ',formData.phone_pic_finance,formRules.phone_pic_finance)}/>
          <TextField onFocus={handleOnFocus} value={formData.name_pic_technical} disabled={stepSubmitLoading} required fullWidth size='small' id='name_pic_technical' label='Nama PIC Teknis' helperText='' onChange={event=>handleOnChangeForm('name_pic_technical', event.target.value)} {...generateFormErrorMsg('Nama PIC Teknikal',formData.name_pic_technical,formRules.name_pic_technical)}/>
          <TextField onFocus={handleOnFocus} value={formData.email_pic_technical} disabled={stepSubmitLoading} required fullWidth size='small' id='email_pic_technical' label='Email PIC Teknis' helperText='' onChange={event=>handleOnChangeForm('email_pic_technical', event.target.value)} {...generateFormErrorMsg('Email PIC Teknikal',formData.email_pic_technical,formRules.email_pic_technical)}/>
          <TextField onFocus={handleOnFocus} value={formData.phone_pic_technical} disabled={stepSubmitLoading} required fullWidth size='small' id='phone_pic_technical' label='No Telepon PIC Teknis' helperText='' onChange={event=>handleOnChangeForm('phone_pic_technical', event.target.value)} {...generateFormErrorMsg('No Telepon PIC Teknikal',formData.phone_pic_technical,formRules.phone_pic_technical)}/>
          <TextField onFocus={handleOnFocus} value={formData.company_address} disabled={stepSubmitLoading} required fullWidth multiline size='small' id='company_address' label='Alamat Perusahaan' helperText='' onChange={event=>handleOnChangeForm('company_address', event.target.value)} {...generateFormErrorMsg('Alamat Perusahaan',formData.company_address,formRules.company_address)}/>

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
