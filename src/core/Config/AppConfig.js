import { getEnvMode } from 'core/Utils/Utils'
console.log('process.env===>', process.env.NODE_ENV)
export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  analyticsTrackerId: '',
  // auth0: {
  //   clientId: cred.AUTH0_CLIENT_ID,
  //   host: cred.AUTH0_HOST
  // },
  backendURL: '',
  basePath: '',
  env: process.env.NODE_ENV,
  minDesktopScreenWidth: 770,
  authHeader: 'Authorization',
  authTokenType: 'Bearer',
  publicToken: 'publicToken',
  sessionToken: 'st',
  loginFlag: 'il',
  idleTimeFlag:'it',
  idleTimeIncHours:0,
  idleTimeIncMinutes:30,
  idleTimeIncSeconds:0,
  sessionData: 'ssst',
  datetimeFormat: 'MM-DD-YYYY  HH:mm:ss',
  dateOnlyFormat: 'MM-DD-YYYY',
  copyright: process.env.REACT_APP_COPYRIGH,
  graphqlPath: process.env.REACT_APP_GRAPHQL_PATH,
  hostBackend: process.env.REACT_APP_BACKEND_BASE_URL,
  baseUrl: process.env.REACT_APP_BASE_URL,
  appName: process.env.REACT_APP_APP_NAME,
  appHomePage: process.env.REACT_APP_HOMEPAGE_PATH,
  currency: process.env.REACT_APP_CURRENCY,
  payDonationLinkUrl: process.env.REACT_APP_PAY_DONATION_LINK_URL,
  paymentLinkRedirectionEndpoint: process.env.REACT_APP_PAYMENT_LINK_REDIRECTION_ENDPOINT,
  hmacKey: process.env.REACT_APP_HMACKEY,
  reactAppBaseUrlProduction: process.env.REACT_APP_BASE_URL_PRODUCTION,
  reactAppBaseUrlStaging: process.env.REACT_APP_BASE_URL_STAGING,
  taptalkSecretKey:  process.env.REACT_APP_TAPTALK_SECRET,
  uploadMerchantKycEndpoint: '/upload/doc/merchant',
  kycDocumentSizeLimit:5120, // in kilobytes
  // payDonationLinkUrl:'http://localhost:3003'
}
