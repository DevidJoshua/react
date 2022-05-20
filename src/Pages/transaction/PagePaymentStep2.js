import React, { useEffect } from 'react'
// import ReactDOM from 'react-dom'

// import Avatar from '@material-ui/core/Avatar'
// import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
// import TextField from '@material-ui/core/TextField'
// import Paper from '@material-ui/core/Paper'
// import Grid from '@material-ui/core/Grid'
// import Snackbar from '@material-ui/core/Snackbar'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
// import Link from '@material-ui/core/Link'
// import Grid from '@material-ui/core/Grid'
// import Box from '@material-ui/core/Box'
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { green } from '@material-ui/core/colors'
// import Alert from '@material-ui/lab/Alert'
// import CircularProgress from '@material-ui/core/CircularProgress'
// import Card from '@material-ui/core/Card'
// import CardMedia from '@material-ui/core/CardMedia'
// import Fab from '@material-ui/core/Fab'
// import NavigationIcon from '@material-ui/icons/Navigation'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
// import Image from 'material-ui-image'
import { Images } from 'core/Themes'
import { PaymentPageStep2Con } from '../../features/PaymentLink'
import PaymentStatus from './PaymentStatus'

// function Copyright () {
//   return (
//     <Typography variant='body2' color='textSecondary' align='center'>
//       {'Copyright © '}
//       <Link color='inherit' href='https://material-ui.com/'>
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   )
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center'
  // },
  avatar: {
    margin: theme.spacing(1)
    // backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  wrapper: {
    // margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  card: {
    // textAlign: "center",
    backgroundColor: 'pink',
    width: '100%',
    minHeight: 600,
    // maxWidth: 400,
    // height: 680,
    textAlign: 'center',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // width: '100%',
    height: window.innerHeight - 200,
    // backgroundColor: 'pink',
    position: 'relative',
    paddingBottom: '100%' /* 16:9 */
    // paddingBottom: '56.25%' /* 16:9 */,
    // paddingTop: 25,
    // height: 0
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    // objectFit: 'cover',
    // width: '100%',
    // height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'blue',

    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    // width: '100%',
    height: '100%'
  },
  extendedIcon: {
    fontSize: 200,
    marginRight: theme.spacing(1),
    color: green[500]
  },
  plinkPaymentModal: {
    display: 'block',
    position: 'fixed',
    // zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    // backgroundColor: 'rgb(0,0,0)',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  plinkPaymentModalContent: {
    backgroundColor: '#fefefe',
    // margin: '10% auto',
    // padding: '10px',
    // border: '1px solid #888',
    // width: '90%',
    height: '100%'
  }
}))

// function renderHTMLFrame (url) {
//   return (
//     <iframe
//       onLoad={(loadEvent) => {
//         // NOT WORKING var frameBody = ReactDOM.findDOMNode(this).contentDocument.body; // contentDocument undefined
//         // NOT WORKING obj.nativeEvent.contentWindow.document.body.scrollHeight // contentWindow undefined
//       }}
//       ref='iframe'
//       src={url}
//       width='100%'
//       height='100%'
//       scrolling='no'
//       frameBorder='0'
//     />
//   )
// }
// function getDocHeight (doc) {
//   doc = doc || document
//   // stackoverflow.com/questions/1145850/
//   var body = doc.body; var html = doc.documentElement
//   var height = Math.max(body.scrollHeight, body.offsetHeight,
//     html.clientHeight, html.scrollHeight, html.offsetHeight)
//   return height
// }
// function setIframeHeight (id, refs) {
//   // alert('cek')
//   // var ifrm = document.getElementById(id, refs)
//   var ifrm = refs[id]
//   // var doc = refs[id]
//   var doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document
//   // ifrm.style.visibility = 'hidden'
//   // ifrm.style.height = '10px' // reset to minimal height ...
//   // // IE opt. for bing/msn needs a bit added or scrollbar appears
//   // ifrm.style.height = getDocHeight(doc) + 4 + 'px'
//   // ifrm.style.visibility = 'visible'
// }

// const renderIframe = ({ url, classes }) => {
//   const setIframeHeight = (id, refs) => {
//   }
//   return (
//     <>
//       <div
//         className='video'
//         style={{
//           backgroundColor: 'pink',
//           position: 'relative',
//           paddingBottom: '100%' /* 16:9 */,
//           // paddingBottom: '56.25%' /* 16:9 */,
//           paddingTop: 25,
//           height: 0
//         }}
//       >
//         <iframe
//           ref='ifrm'
//           id='ifrm'
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%'
//           }}
//           src={url}
//           frameBorder='0'
//           onload={setIframeHeight('ifrm', this.refs)}
//         />
//         {/* <Fab variant='extended'>
//           <NavigationIcon className={classes.extendedIcon} />
//           Navigate
//         </Fab> */}
//       </div>
//     </>
//   )
// }

function PagePayment (props) {
  const { match, paymentStatus, paymentPageUrl, history, invoiceNumber, transactionPaymentStep1 } = props
  const classes = useStyles()
  const [values] = React.useState({
    email: match.params.email,
    toko_id: match.params.toko_id,
    id: match.params.transaction_id,
    device_id: navigator.userAgent,
    history: history
  })
  // const [iframeHeight, setIframeHeight] = React.useState('')

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    // const obj = ReactDOM.findDOMNode(this)
    // setIframeHeight(obj.contentWindow.document.body.scrollHeight + 'px')
    transactionPaymentStep1(values)
    return () => {}
  }, [transactionPaymentStep1, values])
  // const handleIframeOnLoad = () => {
  //   var ifrm = document.getElementById('ifrm')
  //   var doc = null
  //   if (ifrm !== undefined && ifrm !== null) {
  //     // alert('yesss')
  //     // doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document
  //   }
  //   // alert('cek')
  //   // refInput.current.focus()
  //   // var doc = refIframe.contentDocument ? refIframe.contentDocument : refIframe.contentWindow.document
  //   // refIframe.style.visibility = 'hidden'
  //   // refIframe.style.height = '10px' // reset to minimal height ...
  //   // IE opt. for bing/msn needs a bit added or scrollbar appears
  //   // refIframe.style.height = getDocHeight(doc) + 4 + 'px'
  //   // refIframe.style.visibility = 'visible'
  //   // refIframe.style.height = 800
  //   // alert(refIframe.style.height)
  //   // console.log('cekkkkkkkkkkkk')
  // }
  // this.setState({ iFrameHeight: obj.contentWindow.document.body.scrollHeight + 'px' })
  // return renderIframe({ url: paymentPageUrl, classes })
  // const paymentPageUrl = ((paymentLinkDataDetail || {}).transaction_id || {}).payment_page_url || ''
  // const paymentStatus = ((paymentLinkDataDetail || {}).transaction_id || {}).status || 'pending'
  if (paymentStatus === 'paid') {
    // redirect
    // setOpenSnackBar(true)
    // paymentlinkSetOpenSnackBarStatusPayment({ open: true })
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <img alt='' src={Images.payPagePaymentLinkLogo} style={{ marginBottom: 50 }} />
          <CheckCircleIcon className={classes.extendedIcon} />
          <Typography variant='h3' gutterBottom>
            Terima kasih
          </Typography>
          <Typography variant='h6' gutterBottom>
            Pembayaran untuk nomor pesanan
          </Typography>
          <Typography variant='h2' gutterBottom>
            {invoiceNumber}
          </Typography>
          <Typography variant='h6' gutterBottom>
            sudah kami terima
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            Tunjukan halaman ini kepada kasir kami
          </Typography>
        </div>
      </Container>
    )
  }
  return (
    <>
      <div className={classes.plinkPaymentModal}>
        <div style={{ width: '100%', height: 80, position: 'fixed', right: 0, bottom: 0, textAlign: 'center', zIndex: 1, opacity: 0.8 }}>
          <PaymentStatus transactionId={match.params.transaction_id} />
        </div>
        <div className={classes.plinkPaymentModalContent}>
          <iframe title='payment-page' style={{ width: '100%', height: '100%' }} src={paymentPageUrl} />
        </div>
      </div>
      {/* <Fab variant='extended'>
        <NavigationIcon className={classes.extendedIcon} />
        Navigate
      </Fab> */}
    </>
  )
}
// function PagePayment (props) {
//   const { match, loadingSubmitOrdercode, paymentlinkFetchOne, errorSubmitOrdercode, history, paymentLinkDataDetail } = props
//   const classes = useStyles()
//   const [values, setValues] = React.useState({
//     email: match.params.email,
//     toko_id: match.params.toko_id,
//     order_code: match.params.order_code,
//     id: match.params._id,
//     device_id: navigator.userAgent,
//     history: history
//   })
//   const refIframe = useRef()
//   // const [iframeHeight, setIframeHeight] = React.useState('')

//   // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
//     // Update the document title using the browser API
//     // document.title = `You clicked ${count} times`;
//     // const obj = ReactDOM.findDOMNode(this)
//     // setIframeHeight(obj.contentWindow.document.body.scrollHeight + 'px')
//     paymentlinkFetchOne(values)
//     return () => {}
//   }, [paymentlinkFetchOne, values.id])
//   const handleIframeOnLoad = () => {
//     var ifrm = document.getElementById('ifrm')
//     var doc = null
//     if (ifrm !== undefined && ifrm !== null) {
//       // alert('yesss')
//       // doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document
//     }
//     // alert('cek')
//     // refInput.current.focus()
//     // var doc = refIframe.contentDocument ? refIframe.contentDocument : refIframe.contentWindow.document
//     // refIframe.style.visibility = 'hidden'
//     // refIframe.style.height = '10px' // reset to minimal height ...
//     // IE opt. for bing/msn needs a bit added or scrollbar appears
//     // refIframe.style.height = getDocHeight(doc) + 4 + 'px'
//     // refIframe.style.visibility = 'visible'
//     // refIframe.style.height = 800
//     // alert(refIframe.style.height)
//     // console.log('cekkkkkkkkkkkk')
//   }
//   // this.setState({ iFrameHeight: obj.contentWindow.document.body.scrollHeight + 'px' })
//   // return renderIframe({ url: paymentPageUrl, classes })
//   const paymentPageUrl = ((paymentLinkDataDetail || {}).transaction_id || {}).payment_page_url || ''
//   return (
//     <div style={{ flexGrow: 1, padding: 10, backgroundColor: 'red' }}>
//       {/* <div style={{ height: 200, width: '100%', backgroundColor: 'blue' }} /> */}
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <Paper className={classes.paper}>
//             <div
//               className='video'
//               style={{
//                 backgroundColor: 'pink',
//                 position: 'relative',
//                 // paddingBottom: '100%' /* 16:9 */,
//                 // paddingBottom: '56.25%' /* 16:9 */,
//                 // paddingTop: 25,
//                 height: 500
//               }}
//             >
//               <iframe
//                 ref={refIframe}
//                 id='ifrm'
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: '100%',
//                   height: '100%'
//                 }}
//                 src={paymentPageUrl}
//                 frameBorder='0'
//                 onLoad={handleIframeOnLoad}
//               />
//               {/* <Fab variant='extended'>
//                 <NavigationIcon className={classes.extendedIcon} />
//                 Navigate
//               </Fab> */}
//             </div>
//             {/* {renderIframe({ url: paymentPageUrl, classes })} */}
//             {/* <Card className={classes.card}>
//               <CardMedia
//                 id='iframeM'
//                 component='iframe'
//                 alt='Contemplative Reptile'
//                 className={classes.media}
//                 // height={600}
//                 title='Contemplative Reptile'
//                 src={paymentPageUrl}
//               />
//               <Fab  variant='extended'>
//                 <NavigationIcon className={classes.extendedIcon} />
//                 Navigate
//               </Fab>
//             </Card> */}
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Paper className={classes.paper}>
//             <div style={{ height: 200, width: '100%', backgroundColor: 'blue' }} />
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   )
// }

export default PaymentPageStep2Con(PagePayment)
