import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { formValidation } from 'core/Utils/Utils'
import Alert from '@mui/material/Alert';
import _ from 'lodash'
import MerchantCategoryIcon from './MerchantCategoryIcon'
import { Grid } from '@mui/material'
import SignaturePad from 'react-signature-canvas'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Checkbox } from '@mui/material'
import swal from 'sweetalert2'
import tnc from '../../../data/tnc'
import EditIcon from '@mui/icons-material/Edit';
import { blueGrey,grey } from '@mui/material/colors';

const style = {
  labelWrapper:{
    margin:0,
    marginTop:'0.5rem',
    marginBottom:'0.5rem'
  },
  input:{
    margin:0,
    marginTop:'1rem'
  },
  textareaReadOnly:{
    overflow:'auto',
    width:'100%',
    height:'40rem',
    border:'solid 1px'
  },
  signatureStyle:{
    boxSizing:'border-box',
    width:'100%',
    height:'10rem',
    background:grey[200],
    border:'solid #bcc2be 0.5rem',
    cursor:'url(http://icons.iconarchive.com/icons/designcontest/vintage/32/Patent-Pen-icon.png) 0 30, progress'
  },
  signatureWrapper:{
    display:'block',
    textAlign:'center',
  },
  signedWrapper:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background:blueGrey[300]
  },
  signedAlert:{
    background:'#fff',
    padding:'0.5rem',
    borderRadius:'0.5rem',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  }
}

const Input = styled('input')({
  display: 'none'
})

function Comp (props) {
  const { merchantCode,getStartedMerchantCategory,stepSubmitLoading,submitData,step6KycFormData,reloadStep,uploadKycDocument,uploadingStates } = props
  const [signatureRef,setSignatureRef] = React.useState({})
  const [isSubmit,setIsSubmit] = React.useState(false)
  const {isSigned,setIsSigned} = React.useState(_.isNil(step6KycFormData?.signatureData) ? true : false )
  const [buttonStates,setButtonStates] = React.useState({
    submit:false,
    cancel:false
  })

  const initialFormData = {
    tnc:step6KycFormData?.tncAgreeDisagree || '',
    signature_name:step6KycFormData?.signatureName || '',
    signature_position:step6KycFormData?.signaturePosition || '',
    signature_data:step6KycFormData?.signatureData || null
  }
  const formRules = {
    tnc:['required'],
    signature_name:['required'],
    signature_position:['required'],
    signature_data:['required']
  }

  const [formData,setFormData] = React.useState(initialFormData)

  const handleOnChangeForm = (prop,value) => {
      setFormData({...formData,[prop]:value})
  }

  const trimSignature = async() =>{
    const fileName = `signature-${merchantCode}.png`
    const data = await signatureRef.getTrimmedCanvas().toDataURL('image/png')
    return await fetch(data).then(res=>res.blob()).then(blob=>new File([blob], fileName)) 
  }

  const clearSignature = () =>{
    signatureRef.clear()
  }

  const handleSubmit = async() =>{
    const fileInput = new FormData()
    const additionalData = {
      signatureName:formData.signature_name,
      tncAgreeDisagree:formData.tnc,
      signaturePosition:formData.signature_position
    }
    const options = {
      params:'documentRequest',
      rules: ['maxSize:5242880'] //in kilobytes = 5 MB
    }
    fileInput.append('documentRequest',await trimSignature())
    fileInput.append('byParams','signature')
    fileInput.append('additionalParams',JSON.stringify(additionalData))
    if(signatureRef.isEmpty()){
      swal.fire('Pastikan untuk menandatangani','','error')
    }else{
      uploadKycDocument({stateUpload:'signature',fileInput,options,label:'signature',reloadStep })
    }
  }
  const handleCancel = () =>{
    setFormData(initialFormData)
    reloadStep()
  }

  const generateFormErrorMsg = (label,data,rules) =>{
    const dataValidation  = formValidation(label,data,rules)
    if(!dataValidation.error || !isSubmit) return {}
    return { error:dataValidation.error, helperText:dataValidation.msg }
  }

  const handleResetSignature = () =>{
      setIsSigned(false)
  }

  React.useEffect(()=>{
      const data = Object.entries(formData).filter(r=>r[0] !== 'signature_data')
      let res = data.some(r=> formValidation('',formData[r[0]],formRules[r[0]]).error)
      //check if signatureRef is set
      setButtonStates({submit:res,cancel:res})
  },[formData])

  React.useEffect(()=>{
    const data = Object.entries(formData)
    let res = data.some(r=> initialFormData[r[0]] !== formData[r[0]])
    setButtonStates({submit:!res,cancel:!res})
  },[])

  return (
    <Paper elevation={4} style={{padding:'2rem'}}>
      <Typography variant='h6' color='textSecondary'>
          Persetujuan Syarat dan Ketentuan Layanan <MerchantCategoryIcon merchantCategory={getStartedMerchantCategory}/>
      </Typography>
      <Box component='form' sx={{ '& .MuiTextField-root': { m: 1 } }} noValidate autoComplete='off' >
        <div>
            <br/>
            <div style={style.textareaReadOnly} dangerouslySetInnerHTML={{__html:tnc.perusahaan}}></div>
            <br/>
            <Typography variant='body2' color='textSecondary'> <b>Note:</b> Pastikan Anda membaca dan mengerti keseluruhan syarat dan ketentuan yang tertera.</Typography>
            {/* input checked */}
            <FormControlLabel value='tnc' disabled={stepSubmitLoading} control={<Checkbox  name='tnc' id="tnc" checked={formData.tnc == 'agree'? true : false } onChange={e=>handleOnChangeForm('tnc',e.target.checked ? 'agree' : '')}/>} label='Setuju dengan ketentuan Prismalink' />
            <br/>
            <br/>
            <Typography variant='h6' color='textSecondary'> Yang Bertanda Tangan di Bawah ini:  </Typography>

            {/* input text */}
            <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField  fullWidth label="Nama" disabled={stepSubmitLoading} defaultValue={formData.signature_name} onChange={e=>handleOnChangeForm('signature_name',e.target.value)} {...generateFormErrorMsg('Nama',formData.signature_name,formRules.signature_name)} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Jabatan" disabled={stepSubmitLoading} defaultValue={formData.signature_position} onChange={e=>handleOnChangeForm('signature_position',e.target.value)} {...generateFormErrorMsg('Jabatan',formData.signature_position,formRules.signature_position)}/>
                </Grid>
            </Grid>
            <Typography variant='body2' color='textSecondary'><b>Note:</b> Penandatangan adalah pihak yang berhak sesuai dengan akta yang berlaku. </Typography>
            <br/>
            <div style={style.signatureWrapper}>
                {!isSigned
                ? <SignaturePad
                    style
                    canvasProps={{style:style.signatureStyle}}
                    ref={(ref) => setSignatureRef(ref)}
                    onEnd={()=>{
                      console.log('signed')
                      setFormData({...formData,signature_data:'signed'})
                    }}
                  />
                : <div style={{...style.signedWrapper,...style.signatureStyle}}>
                    <div style={style.signedAlert}>
                        <Typography variant="h5" component="h2"> Sudah Ditandatangani </Typography>&nbsp;&nbsp;
                        <Button onClick={handleResetSignature} color="primary" variant='contained' color='success' aria-label="upload picture" component="span" endIcon={<EditIcon/>}> Ganti </Button>
                    </div>
                  </div>
                }
            </div>
            <Grid display='flex' marginBottom={'1rem'} marginTop={'1rem'} spacing={5} alignItems='center'>
              <Grid item>
                  <Typography variant='body2' color='textSecondary'> <b>Note:</b> Pastikan tanda tangan tidak terpotong dan sesuai dengan KTP. </Typography>
              </Grid>
              <Grid item>
                  <Button size='small' variant='contained' color='error' onClick={()=>clearSignature()} style={{marginLeft:'1rem'}} >Bersihkan</Button>
              </Grid>
            </Grid>
          <br/>
          <Stack style={{ marginLeft: 8,marginTop:'2rem' }} spacing={2} direction='row'>
            <Button variant='contained' color='success' disabled={buttonStates.submit || stepSubmitLoading}  onClick={handleSubmit} >{stepSubmitLoading ? `Saving` : `Save`}</Button>
            <Button variant='contained' color='error' disabled={buttonStates.cancel || stepSubmitLoading} onClick={handleCancel}> Cancel</Button>
          </Stack>

        </div>
      </Box>
    </Paper>
  )
}
export default connect((state, ownProps) => ({
  merchantCode:state.myprofile.merchant.merchant_code,
  step6KycFormData:state.getstarted.step6KycFormData,
  uploadingStates:state.getstarted.uploadingStates,
  stepSubmitLoading:state.getstarted.stepSubmitLoadingStep6
}), dispatch => ({
}))(Comp)
