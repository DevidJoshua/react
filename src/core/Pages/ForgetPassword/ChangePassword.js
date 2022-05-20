import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AppConfig from '../../Config/AppConfig'
import ForgetPasswordAction from '../../features/ForgetPassword/redux'
import { Grid,Paper,Typography,Box,TextField,InputAdornment } from '@mui/material'
import KeyIcon from '@mui/icons-material/Key';
import {useStyles} from './useStyles'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { blue,grey } from '@mui/material/colors'
import {Images} from 'core/Themes'
import { LoadingButton } from '@mui/lab'
import { formValidation } from 'core/Utils/Utils'
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from 'react-spinners/ClipLoader'

function PageChagePassword ({
  forgetpasswordValidateToken,
  forgetpasswordSubmitNewPassword,
  errors,
  match,
  loadingValidateToken,
  loadingSubmitNewPass,
  loadingSubmitNewToken,
  errorsValidate,
  history
}) {
  const [formData,setFormData] = React.useState({ newPassword:'', confNewPassword:'' })
  const [focus,setFocus] = React.useState(false)
  const [submitButton,setSubmitButton] = React.useState(true)
  const handleFocus = () =>{ setFocus(true) }
  React.useEffect(() => {
    forgetpasswordValidateToken({ token: match.params.token })
  }, [forgetpasswordValidateToken, match.params.token])
  const handleSubmit = () =>{
    forgetpasswordSubmitNewPassword({ history, newpassword: formData.new, token: match.params.token })
  }
  const handleValidation = (label,data,rules) =>{
    let dflt = { error:false, msg:''}
    const validations = focus ? formValidation(label,data,rules) : dflt
    if((formData.newPassword).length < 5){
      return { helperText:'Pastikan password minimal 5 karakter.',error:true}
    }
    return {helperText:validations.msg,error:validations.error}
  }
  React.useEffect(()=>{
  setSubmitButton(
      (formData.newPassword != formData.confNewPassword) || 
      handleValidation('Password',formData.newPassword,['required']).error || 
      handleValidation('New Password Conf',formData.confNewPassword,['required']).error 
    )
  },[formData])

  
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>Lupa Kata Sandi</title>
      </Helmet>
      {(errorsValidate || []).length
      ? (<Grid className={classes.root} flexDirection='column' style={{background:grey[200]}}>
            <Link to='/login'>
              <center>
                  <Box component="img" sx={{ width: 150}} alt="Logo Plinklite" src={Images.logoPlinklite} />
              </center>
            </Link>
            <br/>
            <Box className={classes.loginWrapper} >
              <Box className={classes.boxForgetPass} style={{borderRadius:'2rem',}}>
                <Grid className={classes.headerBoxFailed} style={{borderRadius:'2rem',}}>
                    <CancelIcon/>
                    <h3>{errorsValidate[0] || 'Failed to verify token'}</h3>
                </Grid>
                <LoadingButton
                  type='submit'
                  onClick={()=>{
                    window.location.href = '/login'
                  }}
                  variant='outlined'
                  style={{
                    borderRadius:'3rem',
                    marginTop: '2rem',
                    marginBottom: '0.5rem',
                    textTransform:'none',
                    fontWeight:'bold'
                  }}
                  fullWidth
                  >Go to Login</LoadingButton>
              </Box>
            </Box>
        </Grid>
        )
      : (loadingValidateToken
        ? <Grid className={classes.root}>
            <Loader/>&nbsp; Memuat ...
          </Grid>
        : <Grid className={classes.root}>
            <Box className={classes.loginWrapper}>
              <Box className={classes.boxForgetPass}>
                <Link to='/login'> <center> <Box component="img" sx={{ width: 150}} alt="Logo Plinklite" src={Images.logoPlinklite} /> </center> </Link>
                <Typography className={classes.pageTitle} marginTop='1rem' marginBottom='1rem' textAlign='center' variant='h5'>Change Password</Typography>
                <TextField
                  {...handleValidation('Password',formData.newPassword,['required'])}
                  onFocus={handleFocus}
                  value={formData.newPassword}
                  onChange={(e)=>{
                    setFormData({...formData,newPassword:e.target.value})
                  }}
                  disabled={loadingSubmitNewPass}
                  className={classes.input}
                  fullWidth
                  type='password'
                  label='Password'
                  placeholder='Password'
                  margin='normal'
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                          <KeyIcon/>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  {...handleValidation('Konfirmasi Password',formData.confNewPassword,['required'])}
                  onFocus={handleFocus}
                  disabled={loadingSubmitNewPass}
                  type='password'
                  value={formData.confNewPassword}
                  onChange={(e)=>{
                    setFormData({...formData,confNewPassword:e.target.value})
                  }}
                  className={classes.input}
                  fullWidth
                  label='Confirm Password'
                  placeholder='Confirm Password'
                  margin='normal'
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                          <KeyIcon/>
                      </InputAdornment>
                    )
                  }}
                />
              <LoadingButton
                type='submit'
                onClick={handleSubmit}
                disabled={submitButton}
                loading={loadingSubmitNewPass}
                style={{
                  borderRadius:'3rem',
                  marginTop: '2rem',
                  marginBottom: '0.5rem',
                  textTransform:'none',
                  fontWeight:'bold'
                }}
                variant='contained'
                fullWidth
                >Submit</LoadingButton>
            </Box>
          </Box>         
        </Grid>
        )}
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  const ValidateTokenErrors = state.forgetpassword.ValidateToken.errors || []
  const SubmitNewPasswordErrors = state.forgetpassword.SubmitNewPassword.errors || []
  return {
    loadingValidateToken: state.forgetpassword.ValidateToken.loading,
    loadingSubmitNewPass: state.forgetpassword.SubmitNewPassword.loading,
    errorsValidate: (ValidateTokenErrors || []).map(v => (v.message || v)),
    errorsSubmit:(SubmitNewPasswordErrors || []).map(v=>(v.message || v))
  }
}

const mapDispatchToProps = dispatch => {
  return {
    forgetpasswordValidateToken: data => dispatch(ForgetPasswordAction.forgetpasswordValidateToken(data)),
    forgetpasswordSubmitNewPassword: data => dispatch(ForgetPasswordAction.forgetpasswordSubmitNewPassword(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageChagePassword)
