import React, { Component } from 'react'
// import AppConfig from '../../Config/AppConfig'
import ClipLoader from 'react-spinners/ClipLoader'
// import Lottie from 'react-lottie'
// import * as rpmerah from './Loader_asset/Loader-merah.json'
// import * as rpputih from './Loader_asset/Loader-putih.json'
// import loadable from '@loadable/component'
// Can be a string as well. Need to ensure each key-value pair ends with ;
// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;

// const Lottie = loadable(() => import('react-lottie'))
// `

export default class Loader extends Component {
  render () {
    return (
      <div className='sweet-loading'>
        <ClipLoader
        //   css={override}
          sizeUnit='px'
          size={this.props.size || 40}
          color='#123abc'
          loading={this.props.loading}
        />
      </div>
    )
  }
}
