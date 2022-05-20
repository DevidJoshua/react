import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import SignupActions from '../../features/Signup/redux'
import AppConfig from '../../Config/AppConfig'
import { isLoggedIn } from '../../Utils/Utils'
import LoginActions, { LoginSelectors } from 'core/Containers/Login/redux'
import { Grid, Paper, TextField, InputAdornment, Box, Typography, Button } from '@mui/material'
import { useStyles } from './useStyles'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import StoreIcon from '@mui/icons-material/Store'
import { LoadingButton } from '@mui/lab'
import { Images } from 'core/Themes'
import { formValidation } from '../../Utils/Utils'

const basePath = AppConfig.basePath

function PageSignup (props) {
  const { signupRequest, history, loading, loginCheckLogin } = props
  const classes = useStyles()
  const [data, setData] = React.useState({ history, email: '', full_name: '', business_name: '' })
  const [validation, setValidation] = React.useState({ email: '', full_name: '', business_name: '' })
  const [isFocus,setIsFocus] = React.useState(false)

  const handleFocus = () =>{
    setIsFocus(true)
  }
  // componentDidMount
  React.useEffect(() => {
    loginCheckLogin({})
  }, [])

  const handleChange = (event, props) => {
    setData({ ...data, [props]: event.target.value })
  }
  const handleSubmit = () => {
    signupRequest(data)
  }
  const handleGotoLogin = () => {
    history.push('/login')
  }
  const handleValidation = (label,data,rules) =>{
    let dflt = { error:false, msg:''}
    const validations = isFocus ? formValidation(label,data,rules) : dflt
    console.log('validats=====>',validations)
    return {helperText:validations.msg,error:validations.error}
  }
  if (isLoggedIn(props.isLoggedIn) === true && props.userPrivileges.length > 0) return window.open(`${basePath}${AppConfig.appHomePage}`, '_self', true)
  else console.log('return component')
  return (
    <>
      <Helmet>
        <title>Plink Dashboard - Singup Admin</title>
      </Helmet>
      <Grid className={classes.root} flexDirection='column'>
        <Link to='/login'>
          <center>
              <Box component="img" sx={{ width: 150, marginBottom:'1rem'}} alt="Logo Plinklite" src={Images.logoPlinklite} />
          </center>
        </Link>
        <Box className={classes.boxRegister}>
          <Typography className={classes.pageTitle} textAlign='center' variant='h5'>Signup</Typography>
          <Box className={classes.signupWrapper}>
            <TextField 
              fullWidth
              {...handleValidation('Email',data.email,['required','email'])}
              onFocus={handleFocus}
              disabled={loading} 
              onChange={e => handleChange(e, 'email')} 
              label='Email' 
              placeholder='JohnDuke@gmail.com' 
              margin='normal' 
              variant='outlined'
              className={classes.input} 
              InputProps={{ 
                endAdornment: (<InputAdornment position='start'> <EmailIcon /> </InputAdornment>) 
              }} 
              />
            <TextField 
              fullWidth
              {...handleValidation('Nama Lengkap',data.full_name,['required'])}
              onFocus={handleFocus}
              disabled={loading} 
              onChange={e => handleChange(e, 'full_name')} 
              label='Nama Lengkap' 
              placeholder='John Duke' 
              margin='normal' 
              variant='outlined' 
              className={classes.input}
              InputProps={{ 
                endAdornment: (<InputAdornment position='start'> <PersonIcon /> </InputAdornment>) 
              }} 
              />
            <TextField 
              fullWidth
              {...handleValidation('Nama Bisnis',data.business_name,['required'])}
              onFocus={handleFocus}
              className={classes.input}
              disabled={loading} 
              onChange={e => handleChange(e, 'business_name')} 
              label='Nama Bisnis' 
              placeholder='Toko kelontong' 
              margin='normal' 
              variant='outlined' 
              InputProps={{ 
                endAdornment: (<InputAdornment position='start'> <StoreIcon /> </InputAdornment>) 
              }} 
              />
            <LoadingButton 
                fullWidth 
                className={classes.submitSignup}
                style={{ 
                  marginTop: '2rem',
                  marginBottom: '0.5rem',
                  textTransform:'none'
                }} 
                variant='contained' 
                loading={loading} 
                onClick={handleSubmit} 
                disabled={data.full_name === '' || data.email === '' || data.business_name === '' || handleValidation('Email',data.email,['email']).error}>
                  Submit
            </LoadingButton>
            <LoadingButton 
                fullWidth 
                className={classes.submitSignup}
                style={{ 
                  marginTop: '2rem',
                  marginBottom: '0.5rem',
                  textTransform:'none'
                }} 
                variant='outlined' 
                onClick={handleGotoLogin}>
                  Login
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.signup.loading,
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    userPrivileges: state.myprofile.user_privileges
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signupRequest: data => dispatch(SignupActions.signupRequest(data)),
    loginCheckLogin: data => dispatch(LoginActions.loginCheckLogin(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageSignup)
