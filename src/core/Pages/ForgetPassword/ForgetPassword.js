import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AppConfig from '../../Config/AppConfig'
import ForgetPasswordAction from '../../features/ForgetPassword/redux'
import LoginActions from 'core/Containers/Login/redux'
import { isLoggedIn } from 'core/Utils/Utils'
import { Grid,Paper,Typography,Box,TextField,InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {Images} from 'core/Themes'
import EmailIcon from '@mui/icons-material/Email';
import {useStyles} from './useStyles'
import { formValidation } from '../../../core/Utils/Utils'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { blue,grey } from '@mui/material/colors'
import _ from 'lodash'
function PageForgetPassword ({
  errors,
  forgetpasswordSubmitEmail,
  successMessage,
  loading,
  history,
  userPrivileges,
  loginCheckLogin
}) {

  React.useEffect(() => {
    loginCheckLogin({})
  }, [])

  const [email,setEmail] = React.useState('')
  const [focus,setFocus] = React.useState(false)
  const handleSubmit =()=>{
    forgetpasswordSubmitEmail({email})
  }
  const handleFocus = () =>{
    setFocus(true)
  }
  const handleValidation = (label,data,rules) =>{
    let dflt = { error:false, msg:''}
    const validations = focus ? formValidation(label,data,rules) : dflt
    return {helperText:validations.msg,error:validations.error}
  }

  const classes = useStyles()
  if (isLoggedIn() === true && userPrivileges.length > 0) return window.open(`${AppConfig.basePath}${AppConfig.appHomePage}`, '_self', true)
  else console.log('return component')
  
  return (
    <>
      <Helmet>
        <title>Lupa Password</title>
      </Helmet>
      {(errors.length === 0 && successMessage)  
        ?(
        <Grid className={classes.root} flexDirection='column' style={{background:grey[200]}}>
            <Link to='/login'>
              <center>
                  <Box component="img" sx={{ width: 150}} alt="Logo Plinklite" src={Images.logoPlinklite} />
              </center>
            </Link>
            <br/>
            <Box className={classes.loginWrapper} >
              <Box className={classes.boxForgetPass} style={{borderRadius:'2rem',}}>
                <Grid className={classes.headerBoxSuccess} style={{borderRadius:'2rem',}}>
                    <CheckCircleIcon/>
                    <h3>{successMessage || 'Email has been successfully Sent'}</h3>
                </Grid>
                <LoadingButton
                  type='submit'
                  onClick={()=>{
                    window.location.href = '/login'
                  }}
                  loading={loading}
                  variant='outlined'
                  style={{
                    borderRadius:'3rem',
                    marginTop: '2rem',
                    marginBottom: '0.5rem',
                    textTransform:'none',
                    fontWeight:'bold'
                  }}
                  fullWidth
                  >Continue Login</LoadingButton>
              </Box>
            </Box>
        </Grid>
        )
        :(
          <Grid className={classes.root}>
            <Box className={classes.loginWrapper}>
              <Box className={classes.boxForgetPass}>
                <Link to='/login'>
                  <center>
                      <Box component="img" sx={{ width: 150}} alt="Logo Plinklite" src={Images.logoPlinklite} />
                  </center>
                </Link>
                <Typography className={classes.pageTitle} marginTop='1rem' marginBottom='1rem' textAlign='center' variant='h5'>Forget Password</Typography>
                <TextField
                  {...handleValidation('Email',email,['required','email'])}
                  onChange={(e)=>{ setEmail(e.target.value) }}
                  onFocus={handleFocus}
                  value={email}
                  className={classes.input}
                  fullWidth
                  label='Email'
                  placeholder='Email'
                  margin='normal'
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon/>
                      </InputAdornment>
                    )
                  }}
                />
                <LoadingButton
                  type='submit'
                  onClick={handleSubmit}
                  disabled={handleValidation('Email',email,['email']).error || _.isNil(email) || _.isEmpty(email)}
                  loading={loading}
                  style={{
                    borderRadius:'3rem',
                    marginTop: '2rem',
                    marginBottom: '0.5rem',
                    textTransform:'none',
                    fontWeight:'bold'
                  }}
                  variant='contained'
                  fullWidth
                  >Login</LoadingButton>
              </Box>
            </Box>         
          </Grid>
        )
      }
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.forgetpassword.SubmitEmail.loading,
    errors: state.forgetpassword.SubmitEmail.errors || [],
    successMessage: state.forgetpassword.SubmitEmail.successMessage,
    userPrivileges: state.myprofile.user_privileges
  }
}

const mapDispatchToProps = dispatch => {
  return {
    forgetpasswordSubmitEmail: data => dispatch(ForgetPasswordAction.forgetpasswordSubmitEmail(data)),
    loginCheckLogin: data => dispatch(LoginActions.loginCheckLogin(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageForgetPassword)
