import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import LoginContainer from '../../Containers/Login/LoginContainer'
import AppConfig from '../../Config/AppConfig'
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import { LoadingButton } from '@mui/lab'

class PageLogin extends Component {
  render () {
    const { history } = this.props
    return (
      <>
        <Helmet>
          <title>Login</title>
          <style>
            {`
              html{
                display:flex;
                align-items:center;
                justify-content:center;
              }
              body{
                box-sizing:border-box;
                display:flex;
                align-items:center;
                justify-content:center;
                background: #1A2980;  /* fallback for old browsers */
                background: -webkit-linear-gradient(to right, #26D0CE, #1A2980);  /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to right, #26D0CE, #1A2980); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */                
                padding:10rem;
              }
              @media only screen and (max-width: 600px) {
                body {
                  padding:1rem;
                }
              }
            `}
          </style>
        </Helmet>
        <div className='login-box'>
          <div className='card card-outline card-primary' style={{borderRadius:'2vh',boxShadow: "0px 0px 26px 0px rgba(0,0,0,0.75)"}}>
            <div className='card-header text-center'>
              <Link to='/login' className='h1'><b>{AppConfig.appName}</b></Link>
            </div>
            <div className='card-body login-card-body' style={{borderRadius:'2vh'}}>
              <LoginContainer history={history} location={this.props.location} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default injectIntl(PageLogin)
