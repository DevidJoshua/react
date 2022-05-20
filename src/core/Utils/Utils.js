import React from 'react'
// import namor from 'namor'
import randomString from 'randomstring'
import AppConfig from '../Config/AppConfig'
import Moment from 'moment'
import { merge, path } from 'ramda'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import _, { isEmpty } from 'lodash'
import { areArraysEqual } from '@mui/base'

const MySwal = withReactContent(Swal)
var AES = require('crypto-js/aes')
var hmacSha256 = require('crypto-js/hmac-sha256')
var sha256 = require('crypto-js/sha256')
var EncUtf8 = require('crypto-js/enc-utf8')

const userPriv = {
  500: 'Bank',
  400: 'Customer',
  310: 'Merchant Support',
  300: 'Merchant Admin',
  210: 'Institution Support',
  200: 'Institution Admin',
  100: 'Operator'
}

export const saveTableHeaders = ({ userId, merchantId, tableId, headerKeys }) => {
  const store = localStorage.getItem('tableColumns')
  const col = store ? JSON.parse(store) : []
  let data = []

  // if columns not exists
  if (!col) {
    data.push({ userId, merchantId, tableId, headerKeys })
    localStorage.setItem('tableColumns', JSON.stringify(data))
  }else {
    // if data exist and length > 0
    data = col
    if (col.length > 0) {
      const find = col.find(r => r.userId == userId && r.merchantId == merchantId && r.tableId == tableId)
      // if specific data found
      if (find) {
        console.log('find==========>', find)
        col.map((r, i) => {
          if (r.userId == userId && r.merchantId == merchantId && r.tableId == tableId) {
            r[i] = { userId, merchantId, tableId, headerKeys }
          }
        })
        localStorage.setItem('tableColumns', JSON.stringify(data))    
        }
      // if data not found
      else {
        data.push({ userId, merchantId, tableId, headerKeys })
        console.log('not found after===>', data)
        localStorage.setItem('tableColumns', JSON.stringify(data))  
        }
    }else {
      // if data empty
      data.push({ userId, merchantId, tableId, headerKeys })
      localStorage.setItem('tableColumns', JSON.stringify(data))
    }
  }
}

export const deleteTableHeaders = (data = null, deleteType = 'specific') => {
  const store = localStorage.getItem('tableColumns')
  const col = store ? JSON.parse(store) : []
  if (deleteType == 'specific') {
    const { userId, merchantId, tableId } = data
    const data = col.filter(r => r.userId != userId && r.merchantId != merchantId && r.tableId != tableId)
    localStorage.setItem('tableColumns', JSON.stringify(data))
  }else {
    localStorage.removeItem('tableColumns')
  }
}

export const getTableheaders = ({ userId, merchantId, tableId }) => {
  const store = localStorage.getItem('tableColumns')
  const col = store ? JSON.parse(store) : []
  const foundData = col.find(r => r.userId == userId && r.merchantId == merchantId && r.tableId == tableId)
  return foundData
}

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

export const callToastr = (msg, type) => {
  if(_.has(window,'callToastr')){
    window.callToastr(msg,type)       
  }else{
    callErrorToast(msg,type)
  }
}

export const muiInputDatetimeFormat = (unixTime) => {
  var dt = new Date(unixTime)
  const year = dt.getFullYear()
  const month = ('0' + ((dt.getMonth() + 1)).toString()).slice(-2) // adding 0 in front
  const date = ('0' + ((dt.getDate())).toString()).slice(-2)
  const hour = ('0' + ((dt.getHours())).toString()).slice(-2)
  const minute = ('0' + ((dt.getMinutes())).toString()).slice(-2)

  return year + '-' + month + '-' + date + 'T' + hour + ':' + minute
}

export const htmlEntities = (str) => {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export const toIdr = (number) => {
  if (_.isNull(number) || isNaN(number)) return '-'
  else return Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number)
}

export const sanitizeValue = (val, strType = '') => {
  if (_.isNull(val) || val === 'null') return '-'
  switch (strType) {
    case 'excel' :
      return `'${val}`
    default:
      return val
  }
}

export const toDateTime = (timestamp, isDatetime = true, isTimeOnly = false) => {
  if (_.isNaN(timestamp) || _.isNaN(timestamp) || _.isNull(timestamp) || isEmpty(timestamp)) return '-'
  if (typeof timestamp === 'string') return timestamp
  const dt = Moment(timestamp)

  if (isTimeOnly) return dt.format('HH:mm:ss')
  const result = dt.format(isDatetime ? AppConfig.datetimeFormat : AppConfig.dateOnlyFormat)
  return result
}

const newPerson = () => {
  const _id = Date().now()
  return {
    _id,
    // firstName: namor.generate({ words: 1, numbers: 0 }),
    // lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100)
  }
}

export function makeData (len = 5553) {
  return range(len).map(d => {
    return {
      ...newPerson()
      // children: range(10).map(newPerson)
    }
  })
}

export const Logo = () => (
  <div
    style={{
      margin: '1rem auto',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    For more examples, visit {''}
    <br />
    <a href='https://github.com/react-tools/react-table' target='_blank' rel='noopener noreferrer'>
      <img
        alt='-'
        src='https://github.com/react-tools/media/raw/master/logo-react-table.png'
        style={{ width: '150px', margin: '.5em auto .3em' }}
      />
    </a>
  </div>
)

export const Tips = () => (
  <div style={{ textAlign: 'center' }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>
)

export const loadScript = cb => {
  // let bUrl = basePath
  // var url = window.location.href
  // var arr = url.split('/')
  // var result = arr[0] + '//' + arr[2]
  // console.log('result====>', result)
  // if (result === 'http://localhost:3000') bUrl = ''
  // window.recallDatePicker((start, end) => { console.log('start====>', start) })
  // window.collapseBoxRefresh()
  // window.pageReconReport()
  // nativeScript(bUrl).map(str => {
  //   var element = document.querySelector('[src=\'' + str + '\']')
  //   if (element) element.parentNode.removeChild(element)
  //   let script = document.createElement('script')
  //   script.src = str
  //   // script.async = true
  //   script.async = false
  //   document.body.appendChild(script)
  // })
}

export const loadScriptRecallDatePicker = cb => {
  window.recallDatePicker(cb)
}

export const getAccessToken = (accessTokenState) => {
  const sessionToken = getSession(AppConfig.sessionToken)
  accessTokenState = accessTokenState || sessionToken
  return accessTokenState
}

export const decryptAt = (msg, key) => {
  // console.log('decryptAt')
  const publicToken = window.sessionStorage.getItem(AppConfig.publicToken)
  const sessionToken = window.sessionStorage.getItem(AppConfig.sessionToken)
  if (!publicToken || !sessionToken) return ''
  if (typeof (AES.decrypt) !== 'function') AES = require('crypto-js/aes')
  if (EncUtf8 === null) EncUtf8 = require('crypto-js/enc-utf8')
  const str = AES.decrypt(msg, sessionToken)
  var plaintext = str.toString(EncUtf8)
  return plaintext
}

export const getUserPrivName = (uPriv) => {
  return userPriv[uPriv]
}

export const isLoggedIn = (isLoggedInState) => {
  const loginFlag = getSession(AppConfig.loginFlag)
  if (loginFlag === 'true' || loginFlag === 'false') {
  } else {
    const at = getAccessToken()
    if (at) return true
  }
  isLoggedInState = loginFlag || false
  if ((isLoggedInState === 'true' || isLoggedInState === true)) isLoggedInState = true
  else isLoggedInState = false
  return isLoggedInState
}

export const generateHmac = (msg) => {
  if (hmacSha256 === null) hmacSha256 = require('crypto-js/hmac-sha256')
  return hmacSha256(msg, AppConfig.hmacKey).toString()
}

export const generateSha256 = (msg) => {
  if (sha256 === null) sha256 = require('crypto-js/sha256')
  return sha256(msg).toString()
}

export const getUserColumn = () => {
  return [{
    id: 'userId',
    Header: 'User Id',
    accessor: 'userId' // String-based value accessors!
  }, {
    id: 'userFullname', // Required because our accessor is not a string
    Header: 'Full Name',
    accessor: d => d.userFullname, // Custom value accessors!,
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    id: 'email',
    Header: props => <span>Email</span>, // Custom header components!
    accessor: 'email'
  },
  {
    Header: 'Phone Number',
    accessor: 'mobile'
  }, {
    Header: 'Address',
    accessor: 'address'
  }, {
    Header: 'isLogin',
    accessor: 'isLogin'
  },
  {
    Header: 'Action',
    accessor: 'userId'
  }
  ]
}

export const getTransactionColumn = () => {
  return [{
    id: 'mercRefNo',
    Header: 'Merchant Ref. Number',
    accessor: 'mercRefNo' // String-based value accessors!
  },
  {
    id: 'ecommRefNo',
    Header: 'Mbdd Ref. Number',
    accessor: 'ecommRefNo' // String-based value accessors!
  },
  {
    id: 'coCcyAmt', // Required because our accessor is not a string
    Header: 'Amount',
    accessor: d => d.coCcyAmt, // Custom value accessors!,
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    id: 'createdDt',
    Header: props => <span>Created Date Time</span>, // Custom header components!
    accessor: d => Moment(d.createdDt).format('YYYY-MM-DD HH:mm')
  },
  {
    Header: 'Merchant User Id',
    accessor: 'consUsernameMerchant'
  },
  {
    Header: 'Source Of Fund',
    accessor: 'issuerCode'
  },
  {
    Header: 'Status',
    accessor: 'paySts'
  }]
}

export const setSession = (newSession, cb) => {
  if (typeof (AES.decrypt) !== 'function') AES = require('crypto-js/aes')
  if (EncUtf8 === null) EncUtf8 = require('crypto-js/enc-utf8')
  const encryptedCurrentSession = window.localStorage.getItem(AppConfig.sessionData)
  let currentSessionJson = {}
  if (encryptedCurrentSession) {
    // decrypt
    var bytes = AES.decrypt(encryptedCurrentSession, 'prismalink2019')
    var decryptedData = bytes.toString(EncUtf8)
    currentSessionJson = JSON.parse(decryptedData)
    currentSessionJson = merge(currentSessionJson, newSession)
  }
  // console.log('currentSessionJson1==>', currentSessionJson)
  var ciphertext = AES.encrypt(JSON.stringify(currentSessionJson), 'prismalink2019')
  var encryptedData = ciphertext.toString()
  window.localStorage.setItem(AppConfig.sessionData, encryptedData)
  if (cb) cb()
}

export const getSession = (parameter) => {
  if (EncUtf8 === null) EncUtf8 = require('crypto-js/enc-utf8')
  if (typeof (AES.decrypt) !== 'function') AES = require('crypto-js/aes')
  const encryptedCurrentSession = window.localStorage.getItem(AppConfig.sessionData)
  let currentSessionJson = {}
  if (encryptedCurrentSession) {
    // decrypt
    var bytes = AES.decrypt(encryptedCurrentSession, 'prismalink2019')
    var decryptedData = bytes.toString(EncUtf8)
    currentSessionJson = JSON.parse(decryptedData)
  }
  if (parameter) {
    const sessionValue = path([parameter], currentSessionJson) || ''
    return sessionValue
  }
  return currentSessionJson
}

export const destroySession = () => {
  // destroy execpt
  const tableColumns = localStorage.getItem('tableColumns') || JSON.stringify([])
  window.localStorage.clear()
  localStorage.setItem('tableColumns', tableColumns)
}

export const updateURLParameter = (url, param, paramVal) => {
  var newAdditionalURL = ''
  var tempArray = url.split('?')
  var baseURL = tempArray[0]
  var additionalURL = tempArray[1]
  var temp = ''
  if (additionalURL) {
    tempArray = additionalURL.split('&')
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split('=')[0] !== param) {
        newAdditionalURL += temp + tempArray[i]
        temp = '&'
      }
    }
  }

  var rowsTxt = temp + '' + param + '=' + paramVal
  return baseURL + '?' + newAdditionalURL + rowsTxt
}

export const generateRandomNumber = (length) => randomString.generate({
  length,
  charset: 'numeric'
})

export const callErrorToast = (msg, type, fn = () => console.log('alert closed')) => {
  if (msg === 'ERROR_CLIENT') msg = 'System Error'
  else if (msg === 'NETWORK_ERROR') msg = 'Error connection to server'
  switch (type) {
    case 'error':
      MySwal.fire({
        position: 'top-end',
        icon: 'error',
        title: msg,
        timer: 3000
      }).then(function () {
        fn()
      })
      break
    case 'warning':
      MySwal.fire({
        position: 'top-end',
        icon: 'warning',
        title: msg,
        timer: 3000
      }).then(function () {
        fn()
      })
      break
    default:
      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: msg,
        timer: 3000
      }).then(function () {
        fn()
      })
  }
}

export const truncate = (str, n, str2) => {
  if (!str) return ''
  return (str.length > n) ? str.substr(0, n - 1) + str2 : str
}

export const isJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const setupCanvasJsChartData = ({ dataset }) => {
  const indxTrx = []
  const indxPrc = []
  const newColl = {}
  for (var h = 0; h < dataset.length; h++) {
    const row = dataset[h]
    newColl[row.yvalue] = (newColl[row.yvalue] || {})
    newColl[row.yvalue][row.xvalue] = row.count
    if (indxPrc.indexOf(row.yvalue) === -1) {
      for (let i = 0; i < indxTrx.length; i++) {
        if (indxTrx[i] !== row.xvalue) {
          newColl[row.yvalue][indxTrx[i]] = 0
        }
      }
      indxPrc.push(row.yvalue)
    } else {
      // console.log('process sudah ada')
    }
    if (indxTrx.indexOf(row.xvalue) === -1) {
      // console.log('transaksi belum ada')
      for (let i = 0; i < indxPrc.length; i++) {
        if (indxPrc[i] !== row.yvalue) {
          console.log('set process ' + indxPrc[i] + ' transaksi ' + row.xvalue + ' 0')
          newColl[indxPrc[i]][row.xvalue] = 0
        }
      }
      indxTrx.push(row.xvalue)
    } else {
      // console.log('transaksi sudah ada')
    }
  }
  return { newdataset: newColl, indxTrx, indxPrc }
}

export const miliseconds = (hrs, min, sec) => {
  return ((hrs * 60 * 60 + min * 60 + sec) * 1000)
}

export const listenToUserIdle = () => {
  // extend idle time
  document.addEventListener('mousemove', () => {
    setTimeout(() => {
      setSession({ ...getSession(), [AppConfig.idleTimeFlag]: new Date().getTime() + miliseconds(AppConfig.idleTimeIncHours, AppConfig.idleTimeIncMinutes, AppConfig.idleTimeIncSeconds) })
      // console.log("on mouse move extend time=======>",getSession(AppConfig.idleTimeFlag))
    }, 10000)
  })

  document.addEventListener('click', () => {
    setTimeout(() => {
      setSession({ ...getSession(), [AppConfig.idleTimeFlag]: new Date().getTime() + miliseconds(AppConfig.idleTimeIncHours, AppConfig.idleTimeIncMinutes, AppConfig.idleTimeIncSeconds) })
      // console.log("on click extend time=======>",getSession(AppConfig.idleTimeFlag))
    }, 10000)
  })
  document.addEventListener('keydown', () => {
    setTimeout(() => {
      setSession({ ...getSession(), [AppConfig.idleTimeFlag]: new Date().getTime() + miliseconds(AppConfig.idleTimeIncHours, AppConfig.idleTimeIncMinutes, AppConfig.idleTimeIncSeconds) })
      // console.log("on key down extend time=======>",getSession(AppConfig.idleTimeFlag))
    }, 10000)
  })
  document.addEventListener('keypress', () => {
    setTimeout(() => {
      setSession({ ...getSession(), [AppConfig.idleTimeFlag]: new Date().getTime() + miliseconds(AppConfig.idleTimeIncHours, AppConfig.idleTimeIncMinutes, AppConfig.idleTimeIncSeconds) })
      // console.log("on keypress extend time=======>",getSession(AppConfig.idleTimeFlag))
    }, 10000)
  })
  document.addEventListener('wheel', () => {
    setTimeout(() => {
      setSession({ ...getSession(), [AppConfig.idleTimeFlag]: new Date().getTime() + miliseconds(AppConfig.idleTimeIncHours, AppConfig.idleTimeIncMinutes, AppConfig.idleTimeIncSeconds) })
      // console.log("on wheel extend time=======>",getSession(AppConfig.idleTimeFlag))
    }, 10000)
  })
}

export const checkIfPublicUrl = () => {
  if (window.location.pathname.startsWith('/login') ||
        window.location.pathname.startsWith('/change-password') ||
        window.location.pathname.startsWith('/signup') ||
        window.location.pathname.startsWith('/pay') ||
        window.location.pathname.startsWith('/dnt') ||
        window.location.pathname.startsWith('/forget-password')) { return true } else { return false }
}

export const getEnvMode = () => {
  const host = window.location.protocol + '//' + window.location.host
  if (host === AppConfig.reactAppBaseUrlProduction) {
    setEnvMode('production')
    return 'production'
  } else {
    setEnvMode('staging')
    return 'staging'
  }
  // const env = window.localStorage.getItem('mode')
  // if (env === 'production') {
  //   return 'production'
  // }
  // return 'staging'
}

export const setEnvMode = (mode) => {
  window.localStorage.setItem('mode', mode)
}

const validationFunctions = {
  isNothing: d => _.isNil(d)||_.isEmpty(d),
  isEmail: d=>/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(d),
  isUrl: d=>/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(d),
  maxSize: (actualSize,ruleSize)=>{
    return !(actualSize<ruleSize)
  },

  extractValidation: (regex:RegExp,rls:Array) => rls.some(e=>regex.test(e)),
  extractValidationValue: (regex:RegExp,rls:Array)=>{
    var value = null
    
    for(let row in rls){
      if(regex.test(rls[row])){
        value = parseInt(rls[row].split(regex)[1])
        return value
      }
    }
    return value
  }
}

export const formValidation = (label:String,data:any,rules:Array,type='string') =>{
    let result = { error:false, msg:''}

    if(rules.includes('required')){
      result.error = validationFunctions.isNothing(data)
      result.msg = validationFunctions.isNothing(data) ? `Pastikan input ${label} tidak boleh kosong` : ''
      return result
    }

    if(rules.includes('email')){
      result.error = !validationFunctions.isEmail(data)
      result.msg = validationFunctions.isEmail(data) ? '' : `Email tidak valid`
<<<<<<< HEAD
    }

    if(rules.includes('url')){
      result.error = !validationFunctions.isUrl(data)
      result.msg = validationFunctions.isUrl(data) ? '' : `Url tidak valid`
=======
>>>>>>> a2dba7665af5b716491d8614967b4f955e295d03
    }

    if(validationFunctions.extractValidation(/^maxSize:/,rules)){
      result.error = !validationFunctions.maxSize(validationFunctions.extractValidationValue(/^maxSize:/,rules),data)
      result.msg = validationFunctions.maxSize(validationFunctions.extractValidationValue(/^maxSize:/,rules),data) ? '' : `Ukuran file input ${label} terlalu besar`
    }
    return result
}
