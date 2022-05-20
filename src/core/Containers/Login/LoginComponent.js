import React from 'react'
import {isEmpty, isNil} from 'ramda'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'
import {injectIntl, FormattedMessage as T} from 'react-intl'
import {
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Button
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import {LoadingButton} from '@mui/lab'
import AppConfig from 'core/Config/AppConfig'
import {FormControl, InputLabel} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Images } from 'core/Themes'


const LoginPageComponent = (props) => {
  const {responseMessage, classes, isRequesting, loginPatch, loginDoLogin} = props
  const [submitData,
    setSubmitData] = React.useState({
    password: '',
    email: '',
    grant_type: 'password',
    username: '',
    client_id: '',
    formSubmitMessage: ''
  })
  const [validationData,
    setValidationData] = React.useState({})
  const [isDisabled,
    setDisabled] = React.useState(false)

  const handleSubmit = () => {
    var submittedData = {
      ...submitData,
      history: props.history
    }

    loginDoLogin(submittedData)
  }

  const onChangeValidation = (e, props) => {
    var validation = {}
  }

  const handleChange = (e, props) => {
    onChangeValidation(e, props)
    var newSt = {
      ...submitData,
      [props]: e.target.value
    }

    setSubmitData(newSt)
  }
  
  const [passIsVisible,setPasswordIsVisible] = React.useState(false)

  React.useEffect(() => {
    loginPatch({responseMessage: '', responseCode: '', responseDescription: ''})
    if (setSubmitData.password === '' || setSubmitData.email === '') {
      setDisabled(true)
    }
  }, [])

  return (
    <Box className={classes.boxLogin} sx={{'& > :not(style)': { m: 1 },padding:'0rem'}}  display='flex' justifyContent='center'>
      <Link to='/login'>
        <center>
            <Box component="img" sx={{ width: 150}} alt="Logo Plinklite" src={Images.logoPlinklite} />
        </center>
      </Link>
      <TextField
        className={classes.input}
        disabled={isRequesting}
        {...validationData.emailProps}
        onChange={e => handleChange(e, 'email')}
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
      <TextField
        className={classes.input}
        fullWidth
        style={{background:'white'}}
        disabled={isRequesting}
        {...validationData.passwordProps}
        onChange={e => handleChange(e, 'password')}
        label='Password'
        placeholder='Password'
        margin='normal'
        variant='outlined'
        type={passIsVisible ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {passIsVisible
                ? <VisibilityIcon style={{cursor:'pointer'}} onClick={()=>{
                    setPasswordIsVisible(!passIsVisible) 
                  }}/>
                : <VisibilityOffIcon style={{cursor:'pointer'}} onClick={()=>{
                    setPasswordIsVisible(!passIsVisible) 
                  }}/>
              }
            </InputAdornment>
          )
        }}/>

      <LoadingButton
        type='submit'
        disabled={isDisabled}
        style={{
          borderRadius:'3rem',
          marginTop: '2rem',
          marginBottom: '0.5rem',
          textTransform:'none',
          fontWeight:'bold'
        }}
        variant='contained'
        loading={isRequesting}
        fullWidth
        onClick={handleSubmit}
        >Login</LoadingButton>
        <Link to='/forget-password' style={{textDecoration:'none'}}> <center> <Typography variant='h6' className={classes.loginLink}>Forgot password?</Typography> </center> </Link>
        <hr style={{width:'70%',alignSelf:'center'}}/>
        <center>
          <Typography variant='h6' style={{display:'inline'}} className={classes.loginLink}>Don't have an account?</Typography>
          <Link to='/signup' style={{textDecoration:'none',marginLeft:'0.5rem'}}>
              <Typography fontWeight={'bold'} variant='h6' style={{display:'inline'}} className={classes.loginLinkClick} >Signup</Typography>
          </Link>
        </center> 
    </Box>
  )
}

export default injectIntl(LoginPageComponent)
