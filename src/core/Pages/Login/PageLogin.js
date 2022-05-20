import React from 'react'
import Helmet from 'react-helmet'
import { injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import LoginContainer from '../../Containers/Login/LoginContainer'
import AppConfig from '../../Config/AppConfig'
import { Grid,Paper,Typography } from '@mui/material'
import {useStyles} from './useStyles'
import Box from '@mui/material/Box'

const PageLogin = (props) =>{
  const { history } = props

  const classes = useStyles()
  
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Grid className={classes.root} >
        <Box className={classes.loginWrapper}>           
          <LoginContainer history={history} location={props.location} classes={classes}/>
        </Box>
      </Grid>
    </>
    )
}

export default injectIntl(PageLogin)

