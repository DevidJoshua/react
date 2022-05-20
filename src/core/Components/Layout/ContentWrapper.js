import React, { Component } from 'react'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../ContentHeader'
import Helmet from 'react-helmet'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

export default class ContentWrapper extends Component {
  render () {
    // console.log('render ContentWrapper....')
    const { children, pageTitle, breadcrumb, isNeedLoggedin } = this.props
    return (
      <>
        {isNeedLoggedin && <LoginCheck />}
        <Helmet>
          <title>{pageTitle}</title>
          {/* <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' /> */}
          {/* <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' /> */}
          {/* <body className='sidebar-mini layout-navbar-fixed' style={{ height: 'auto' }} /> */}
        </Helmet>
        <ContentHeader
          // title={contentHeaderTitle}
          breadcrumb={breadcrumb}
        />
        <br />
        {children}
      </>
    )
  }
}
