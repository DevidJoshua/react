import React from 'react'
// import ReactDOM from 'react-dom'

// import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
// import Link from '@material-ui/core/Link'
// import Grid from '@material-ui/core/Grid'
// import Box from '@material-ui/core/Box'
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
// import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { green } from '@material-ui/core/colors'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
// import Card from '@material-ui/core/Card'
// import CardMedia from '@material-ui/core/CardMedia'
// import Fab from '@material-ui/core/Fab'
// import NavigationIcon from '@material-ui/icons/Navigation'
// import Image from 'material-ui-image'
import { Images } from 'core/Themes'
import { PaymentPageCon } from '../../features/PaymentLink'

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
    // height: 680,
    textAlign: 'center',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // width: '100%',
    // height: '100%'
    // backgroundColor: 'pink',
    position: 'relative',
    paddingBottom: '100%' /* 16:9 */,
    // paddingBottom: '56.25%' /* 16:9 */,
    paddingTop: 25,
    height: 0
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    // objectFit: 'cover',
    // width: '100%',
    // height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',

    position: 'absolute',
    top: 0,
    left: 0,
    // width: '100%',
    height: '100%'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
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

// const renderIframe = ({ url, classes }) => {
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
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%'
//           }}
//           src={url}
//           frameBorder='0'
//         />
//         <Fab variant='extended'>
//           <NavigationIcon className={classes.extendedIcon} />
//           Navigate
//         </Fab>
//       </div>
//     </>
//   )
// }

function PagePaymentStep1 (props) {
  const { match, loadingSubmitOrdercode, paymentlinkSubmitOrdercode, errorSubmitOrdercode, history } = props
  const classes = useStyles()
  const [values, setValues] = React.useState({
    email: match.params.email,
    toko_id: match.params.toko_id,
    order_code: match.params.order_code,
    device_id: navigator.userAgent,
    history: history
  })
  // const [iframeHeight, setIframeHeight] = React.useState('')

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   // document.title = `You clicked ${count} times`;
  //   const obj = ReactDOM.findDOMNode(this)
  //   setIframeHeight(obj.contentWindow.document.body.scrollHeight + 'px')
  // })
  const handleChange = (prop) => (event, value) => {
    setValues({ ...values, [prop]: value || event.target.value })
  }
  // Similar to componentDidMount and componentDidUpdate:

  const handleSubmit = (e) => {
    console.log('values==>', values)
    paymentlinkSubmitOrdercode(values)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar} src={Images.payPagePaymentLinkLogo}>
          <LockOutlinedIcon />
        </Avatar> */}
        {/* <Image
          src={Images.payPagePaymentLinkLogo}
          onClick={() => console.log('onClick')}
          aspectRatio={(16/9)}
          disableSpinner
        /> */}
        <img alt='' src={Images.payPagePaymentLinkLogo} style={{ marginBottom: 50 }} />
        {/* <Typography component='h1' variant='h5'>
          Sign in
        </Typography> */}
        <form className={classes.form} noValidate>
          <Typography variant='caption' display='block'>
          Alamat email untuk menerima bukti pembayaran (optional)
          </Typography>
          <TextField
            style={{ marginTop: 0 }}
            variant='outlined'
            margin='normal'
            // required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            autoFocus
            value={values.email}
            onChange={handleChange('email')}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='order_code'
            label='Nomor Pesanan'
            value={values.order_code}
            onChange={handleChange('order_code')}
            // type='password'
            id='order_code'
            autoComplete='order_code'
          />
          {/* <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          /> */}
          <div className={classes.wrapper}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              disabled={loadingSubmitOrdercode}
              onClick={handleSubmit}
            >
              Lanjutkan
            </Button>
            {loadingSubmitOrdercode && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
          {(errorSubmitOrdercode !== undefined && errorSubmitOrdercode.length > 0) && <Alert severity='error'>{errorSubmitOrdercode.map(i => i.message).join(';')}</Alert>}
          {/* <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  )
}

export default PaymentPageCon(PagePaymentStep1)
