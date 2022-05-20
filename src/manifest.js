import loadable from '@loadable/component'
import AppConfig from './core/Config/AppConfig'
import { takeLatest, takeEvery } from 'redux-saga/effects'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LinkIcon from '@mui/icons-material/Link'
import TableViewIcon from '@mui/icons-material/TableView'
import SettingsIcon from '@mui/icons-material/Settings'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ViewInArIcon from '@mui/icons-material/ViewInAr';

// Purchase Order
import { PurchaseorderTypes } from './features/PurchaseOrder/redux'
import {
  purchaseorderCheckStatusRequestOtp,
  purchaseorderCheckStatus
} from './features/PurchaseOrder/sagas'
// Dashboard
import { DashboardTypes } from './features/dashboard/redux'
import { dashboardFetchData } from './features/dashboard/sagas'
// Paymentlink
import { PaymentlinkTypes } from './features/PaymentLink/redux'
import {
  paymentlinkSubmitForm,
  paymentlinkSubmitOrdercode,
  paymentlinkFetchOne,
  changePaymentlinkStatus
} from './features/PaymentLink/sagas'
// Donationlink
import { DonationlinkTypes } from './features/DonationLink/redux'
import {
  donationlinkSubmitForm,
  donationlinkSubmitOrdercode,
  donationlinkFetchOne
} from './features/DonationLink/sagas'

// transaction
import { TransactionTypes } from './features/transaction/redux'
import { transactionPaymentStep1, transactionCheckStatusPayment } from './features/transaction/sagas'
// MerchantKey
import { MerchantkeyTypes } from './features/merchantKey/redux'

// MerchantKey
import { MerchantSecretKeyTypes } from './features/merchantSecretKey/redux'
import { dofetchMerchantSecretKey } from './features/merchantSecretKey/sagas'

import { merchantkeySubmitForm, merchantkeyFetchCurrentMerchantKey, merchantkeyUpdateCurrentCallbackUrl } from './features/merchantKey/sagas'

//Getstarted
import { GetStartedTypes }  from './features/GetStarted/redux'
import { 
  doSubmitKycStep2,
  doSubmitKycStep3,
  doSubmitKycStep4,
  dofetchKycProgress,
  doFetchKycFormDataStep2,
  doFetchKycFormDataStep3,
  doFetchKycFormDataStep4,
  doUploadKycDocs,
  doSubmitKycStep5,
  doFetchKycFormDataStep5,
  doSubmitKycStep6,
  doFetchKycFormDataStep6,
  doSubmitMerchantCategory
 } from './features/GetStarted/sagas'


// need approval
import { NeedapprovalTypes } from './features/NeedApproval/redux'

// Bank Account Combobox
import { BankAccountTypes } from './features/BankAccountCombobox/redux'
import { fetchBankComboboxData } from './features/BankAccountCombobox/sagas'

import {
  needapprovalCheckboxSubmitApprove,
  needapprovalCheckboxSubmitReject
} from './features/NeedApproval/sagas'

// need validate
import { NeedvalidationTypes } from './features/NeedValidation/redux'
import {
  needvalidationCheckboxSubmitValidate
} from './features/NeedValidation/sagas'

import enTranslationMessages from './translations/en.json'
import idTranslationMessages from './translations/id.json'

// custom columns
import { changeCustomColumn, fetchCustomColumns } from './features/CustomColumns/sagas'
import { CustomColumnsTypes } from './features/CustomColumns/redux'

// export data
import {ExportDataTypes} from './features/ExportData/redux'
import {fetchDataExport} from './features/ExportData/sagas'

// simulator
import {SimulatorTypes} from './features/Simulator/redux'
import {doPayVirtualAccount,doPayQris} from './features/Simulator/sagas'



import PageHome from './Pages/Home/PageHome'

const PageListTokoOnline = loadable(() =>
  import('./Pages/TokoOnline/PageList')
)

const PageDetailTokoOnline = loadable(() =>
  import('./Pages/TokoOnline/PageDetail')
)
const PageUpdateTokoOnline = loadable(() =>
  import('./Pages/TokoOnline/PageUpdate')
)
// Toko Inventory
const PageListTokoInventory = loadable(() =>
  import('./Pages/TokoInventory/PageList')
)
const PageDetailTokoInventory = loadable(() =>
  import('./Pages/TokoInventory/PageDetail')
)
// Toko Po
const PageListTokoPo = loadable(() => import('./Pages/TokoPo/PageList'))
const PageDetailTokoPo = loadable(() => import('./Pages/TokoPo/PageDetail'))
const PageUpdateTokoPo = loadable(() => import('./Pages/TokoPo/PageUpdate'))
// Toko Team
const PageListTokoTeam = loadable(() => import('./Pages/TokoTeam/PageList'))
const PageDetailTokoTeam = loadable(() =>
  import('./Pages/TokoTeam/PageDetail')
)
const PageUpdateTokoTeam = loadable(() =>
  import('./Pages/TokoTeam/PageUpdate')
)
// Category
const PageListCategory = loadable(() => import('./Pages/Category/PageList'))
const PageDetailCategory = loadable(() =>
  import('./Pages/Category/PageDetail')
)
const PageUpdateCategory = loadable(() =>
  import('./Pages/Category/PageUpdate')
)
// Toko Product
const PageListProduct = loadable(() => import('./Pages/Product/PageList'))
const PageDetailProduct = loadable(() => import('./Pages/Product/PageDetail'))

const PageUpdateProduct = loadable(() => import('./Pages/Product/PageUpdate'))
// Email Blast
const PageListEmailBlast = loadable(() =>
  import('./Pages/EmailBlast/PageList')
)

const PageDetailEmailBlast = loadable(() =>
  import('./Pages/EmailBlast/PageDetail')
)

const PageUpdateEmailBlast = loadable(() =>
  import('./Pages/EmailBlast/PageUpdate')
)

const PageDetailEmailBatch = loadable(() =>
  import('./Pages/EmailBatch/PageDetail')
)

const PageUpdateEmailBatch = loadable(() =>
  import('./Pages/EmailBatch/PageUpdate')
)
const PageListEmailBatch = loadable(() =>
  import('./Pages/EmailBatch/PageList')
)

const PageListPaymentMethod = loadable(() =>
  import('./Pages/PaymentMethod/PageList')
)

const PageDetailPaymentMethod = loadable(() =>
  import('./Pages/PaymentMethod/PageDetail')
)
const PageUpdatePaymentMethod = loadable(() =>
  import('./Pages/PaymentMethod/PageUpdate')
)

const PageCustomerEmail = loadable(() =>
  import('./Pages/CustomerEmail/PageCreate')
)

const PageCheckStatusPayment = loadable(() =>
  import('./Pages/CheckStatusPayment/PageCheckStatusPayment')
)

const PageMonitoringDebitin = loadable(() =>
  import('./Pages/Monitoring/PageMonitoringDebitin')
)

const PageListPgateway = loadable(() => import('./Pages/Pgateway/PageList'))
const PageDetailPgateway = loadable(() =>
  import('./Pages/Pgateway/PageDetail')
)
const PageUpdatePgateway = loadable(() =>
  import('./Pages/Pgateway/PageUpdate')
)

// payment link
const PageListPaymentLink = loadable(() =>
  import('./Pages/PaymentLink/PageList')
)
const PageDetailPaymentLink = loadable(() =>
  import('./Pages/PaymentLink/PageDetail')
)
const PageUpdatePaymentLink = loadable(() =>
  import('./Pages/PaymentLink/PageUpdate')
)

// donation link
const PageListDonationLink = loadable(() =>
  import('./Pages/DonationLink/PageList')
)
const PageDetailDonationLink = loadable(() =>
  import('./Pages/DonationLink/PageDetail')
)
const PageUpdateDonationLink = loadable(() =>
  import('./Pages/DonationLink/PageUpdate')
)

// transaction
const PagePaymentStep1PaymentLink = loadable(() =>
  import('./Pages/transaction/PagePaymentStep1')
)
const PagePaymentStep2PaymentLink = loadable(() =>
  import('./Pages/transaction/PagePaymentStep2')
)
const PageLandingDonationLink = loadable(() =>
  import('./Pages/transaction/PageLandingDonation')
)
const PageSettingDevelopment = loadable(() =>
  import('./Pages/settings/Development')
)
const PageSettingBusinessProfile = loadable(() =>
  import('./Pages/settings/BusinessProfile')
)
const PagePaymentSandbox = loadable(() =>
  import('./Pages/Simulator/PaymentSimulator')
)


// Backoffice
const PageNeedValidation = loadable(() => import('./Pages/BoNeedValidation/PageList'))
const PageNeedApproval = loadable(() => import('./Pages/BoNeedApproval/PageList'))
const PageBoDisbursementTransactionDetail = loadable(() => import('./Pages/BoDisbursement/PageDetail'))
const PageBoDisbursementTransactionForm = loadable(() => import('./Pages/BoDisbursement/PageUpsert'))
const PageBoAllDisbursementTransaction = loadable(() => import('./Pages/BoDisbursement/PageList'))

const PageBoAccountNeedApproval = loadable(() => import('./Pages/BoAccount/NeedApprovalAccountNumberPageList'))
const AllBankAccountPageList = loadable(() => import('./Pages/BoAccount/AllBankAccountPageList'))
const PageBoAccountForm = loadable(() => import('./Pages/BoAccount/PageUpsert'))
const PageBoBankAccountDetail = loadable(() => import('./Pages/BoAccount/PageDetail'))

// report transaction
const PageAllPlTransaction = loadable(() => import('./Pages/PlTransaction/PageList'))
const PagePlTransactionDetail = loadable(() => import('./Pages/PlTransaction/PageDetail'))

// merchant
const PageListMerchant = loadable(() => import('./Pages/Merchant/PageList'))

const PageDetailMerchant = loadable(() =>
  import('./Pages/Merchant/PageDetail')
)
const PageUpdateMerchant = loadable(() =>
  import('./Pages/Merchant/PageUpdate')
)

const PageAllPlTransactionFee = loadable(() =>
  import('./Pages/PlTransactionFee/PageList')
)
const GetStartedStep1 = loadable(() =>
  import('./Pages/GetStarted/GetStarted')
)

// merchant need approval
const MerchantNeedApprovalPageList = loadable(() => import('./Pages/MerchantNeedApproval/MerchantNeedApprovalPageList'))

export const pages = [
  {
    entity: 'tokoonline',
    entityTitle: 'Toko',
    ListAllComp: PageListTokoOnline,
    UpdateComp: PageUpdateTokoOnline,
    DetailComp: PageDetailTokoOnline,
    params: [':_id?']
  },
  {
    entity: 'inventory',
    entityTitle: 'Inventaris',
    ListAllComp: PageListTokoInventory,
    DetailComp: PageDetailTokoInventory,
    params: [':_id?']
  },
  {
    entity: 'purchaseorder',
    entityTitle: 'data-pembelian',
    DetailComp: PageDetailTokoPo,
    ListAllComp: PageListTokoPo,
    UpdateComp: PageUpdateTokoPo,
    params: [':_id?']
  },
  {
    entity: 'tokoteam',
    entityTitle: 'Toko Team',
    ListAllComp: PageListTokoTeam,
    UpdateComp: PageUpdateTokoTeam,
    DetailComp: PageDetailTokoTeam,
    params: [':_id', ':toko_id']
  },
  {
    entity: 'category',
    entityTitle: 'Kategori',
    ListAllComp: PageListCategory,
    UpdateComp: PageUpdateCategory,
    DetailComp: PageDetailCategory,
    params: [':_id?']
  },
  {
    entity: 'product',
    entityTitle: 'Produk',
    ListAllComp: PageListProduct,
    UpdateComp: PageUpdateProduct,
    DetailComp: PageDetailProduct,
    params: [':_id?']
  },
  {
    entity: 'emailblast',
    entityTitle: 'Email Blast',
    ListAllComp: PageListEmailBlast,
    UpdateComp: PageUpdateEmailBlast,
    DetailComp: PageDetailEmailBlast,
    params: [':_id?']
  },
  {
    entity: 'emailbatch',
    entityTitle: 'Email Grup',
    ListAllComp: PageListEmailBatch,
    UpdateComp: PageUpdateEmailBatch,
    DetailComp: PageDetailEmailBatch,
    params: [':_id?']
  },
  {
    entity: 'paymentmethod',
    entityTitle: 'Payment Method',
    ListAllComp: PageListPaymentMethod,
    UpdateComp: PageUpdatePaymentMethod,
    DetailComp: PageDetailPaymentMethod,
    params: [':_id?']
  },
  {
    entity: 'paymentlink',
    entityTitle: 'Link Pembayaran',
    ListAllComp: PageListPaymentLink,
    UpdateComp: PageUpdatePaymentLink,
    DetailComp: PageDetailPaymentLink,
    params: [':_id?']
  },
  {
    entity: 'pgateway',
    entityTitle: 'Pgateway',
    ListAllComp: PageListPgateway,
    UpdateComp: PageUpdatePgateway,
    DetailComp: PageDetailPgateway,
    params: [':_id?']
  },
  {
    entity: 'customeremail',
    entityTitle: 'Email Customer',
    CreateComp: PageCustomerEmail,
    params: [':_id', ':batch_id']
  },
  {
    entity: 'merchant',
    // entityTitle: 'Merchant',
    ListAllComp: PageListMerchant,
    UpdateComp: PageUpdateMerchant,
    DetailComp: PageDetailMerchant,
    params: [':_id?'],
    privName: '8'
  },
  {
    '/merchant-need-approval': {
      route: '/merchant-need-approval',
      path: '/merchant-need-approval',
      title: 'Need Approval',
      component: MerchantNeedApprovalPageList,
      privName: 'mrc_need_approval'
    }
  },
  {
    '/cek-satus-pembayaran': {
      route: '/cek-satus-pembayaran',
      path: '/cek-satus-pembayaran',
      title: 'Cek Status Pembayaran',
      component: PageCheckStatusPayment,
      isPublic: true
    }
  },
  {
    '/dashboard-ecomm': {
      route: '/dashboard-ecomm',
      path: '/dashboard-ecomm',
      title: 'Dashboard',
      component: PageHome,
      privName: 'hme'
    }
  },
  {
    '/payment-step1/:toko_id?/:order_code?': {
      route: '/payment-step1/:toko_id?/:order_code?',
      path: '/payment-step1/:toko_id?/:order_code?',
      title: 'Payment',
      component: PagePaymentStep1PaymentLink,
      isPublic: true
    }
  },
  {
    '/payment-step2/:toko_id?/:transaction_id': {
      route: '/payment-step2/:toko_id?/:transaction_id',
      path: '/payment-step2/:toko_id?/:transaction_id',
      title: 'Payment',
      component: PagePaymentStep2PaymentLink,
      isPublic: true
    }
  },
  {
    '/dnt-landing/:slug': {
      route: '/dnt-landing/:slug',
      path: '/dnt-landing/:slug',
      title: 'Donation Link',
      component: PageLandingDonationLink,
      isPublic: true
    }
  },
  {
    '/monitoring-debitin': {
      route: '/monitoring-debitin',
      path: '/monitoring-debitin',
      title: 'Monitoring Debitin',
      component: PageMonitoringDebitin
    }
  },
  {
    '/need-validation-transaction': {
      route: '/need-validation-transaction',
      path: '/need-validation-transaction',
      title: 'page-title-need-validation',
      component: PageNeedValidation,
      privName: '5'
    }
  },
  {
    '/need-approval-transaction': {
      route: '/need-approval-transaction',
      path: '/need-approval-transaction',
      title: 'Need Approval',
      component: PageNeedApproval,
      privName: '5'
    }
  },
  {
    '/all-disbursement': {
      route: '/all-disbursement',
      path: '/all-disbursement',
      title: 'All Disbursement',
      component: PageBoAllDisbursementTransaction,
      privName: '5'
    }
  },
  {
    '/form-disbursement-transaction/:_id?': {
      route: '/form-disbursement-transaction/:_id?',
      path: '/form-disbursement-transaction/:_id?',
      title: 'Form Disbursement Transaction',
      component: PageBoDisbursementTransactionForm,
      privName: '10'
    }
  },
  {
    '/disbursement-transaction-detail/:_id?': {
      route: '/disbursement-transaction-detail/:_id?',
      path: '/disbursement-transaction-detail/:_id?',
      title: 'Disbursement Transaction Detail',
      component: PageBoDisbursementTransactionDetail,
      privName: '11'
    }
  },
  {
    '/all-bank-account': {
      route: '/all-bank-account',
      path: '/all-bank-account',
      title: 'All Bank Account',
      component: AllBankAccountPageList,
      privName: '9a'
    }
  },
  {
    '/need-approval-account-number': {
      route: '/need-approval-account-number',
      path: '/need-approval-account-number',
      title: 'Need Approval',
      component: PageBoAccountNeedApproval,
      privName: '9b'
    }
  },
  {
    '/form-account-number/:_id?': {
      route: '/form-account-number/:_id?',
      path: '/form-account-number/:_id?',
      title: 'Form Account Number/:_id?',
      component: PageBoAccountForm,
      privName: '9c'
    }
  },
  {
    '/account-number-detail/:_id?': {
      route: '/account-number-detail/:_id?',
      path: '/account-number-detail/:_id?',
      title: 'Account Number Detail/:_id?',
      component: PageBoBankAccountDetail,
      privName: '9d'
    }
  },
  {
    '/report/all-transaction': {
      route: '/report/all-transaction',
      path: '/report/all-transaction',
      title: 'Transactions',
      component: PageAllPlTransaction,
      privName: 'trx1'
    }
  },
  {
    '/report/transaction-detail/:_id?': {
      route: '/report/transaction-detail/:_id?',
      path: '/report/transaction-detail/:_id?',
      title: 'Detail Transaction',
      component: PagePlTransactionDetail,
      privName: 'trx2'
    }
  },
  {
    '/report/transaction-fee': {
      route: '/report/transaction-fee',
      path: '/report/transaction-fee',
      title: 'Settlement',
      component: PageAllPlTransactionFee,
      privName: 'trx3'
    }
  },
  {
    '/link-payment': {
      route: '/link-payment',
      path: '/link-payment',
      title: 'Payment Link',
      component: PageListPaymentLink,
      privName: '/payment-link'
    }
  },
  {
    '/link-payment/detail/:_id?': {
      route: '/link-payment/detail/:_id?',
      path: '/link-payment/detail/:_id?',
      title: 'Detail ',
      component: PageDetailPaymentLink,
      privName: '/payment-link-detail'
    }
  },
  {
    '/link-payment/upsert/:_id?': {
      route: '/link-payment/upsert/:_id?',
      path: '/link-payment/upsert/:_id?',
      title: 'Update Payment Link',
      component: PageUpdatePaymentLink,
      privName: '/payment-link-upsert'
    }
  },
  {
    '/link-donation': {
      route: '/link-donation',
      path: '/link-donation',
      title: 'Donation Link',
      component: PageListDonationLink,
      privName: '/donation-link'
    }
  },
  {
    '/link-donation': {
      route: '/link-donation',
      path: '/link-donation',
      title: 'Donation Link',
      component: PageListDonationLink,
      privName: '/donation-link'
    }
  },
  {
    '/settings/developers': {
      route: '/settings/developers',
      path: '/settings/developers',
      title: 'Development',
      component: PageSettingDevelopment,
      privName: '14'
    }
  },
  {
    '/simulator': {
      route: '/simulator',
      path: '/simulator',
      title: 'Simulator',
      component: PagePaymentSandbox,
      privName: 'simulator-pg'
    }
  },
  
  {
    '/settings/business-profile': {
      route: '/settings/business-profile',
      path: '/settings/business-profile',
      title: 'Business Profile',
      component: PageSettingBusinessProfile,
      privName: '14'
    }
  },
  {
    '/get-started': {
      route: '/get-started',
      path: '/get-started',
      title: 'Get Started',
      component: GetStartedStep1,
      privName: '/get-started'
    }
  },
  { '/': { route: '/', path: '/', title: 'Dashboard', component: PageHome } }
]

export default () => ({
  redux: {
    needvalidation: require('./features/NeedValidation/redux').reducer,
    needapproval: require('./features/NeedApproval/redux').reducer,
    transaction: require('./features/transaction/redux').reducer,
    paymentlink: require('./features/PaymentLink/redux').reducer,
    donationlink: require('./features/DonationLink/redux').reducer,
    merchantkey: require('./features/merchantKey/redux').reducer,
    merchantsecretkey: require('./features/merchantSecretKey/redux').reducer,
    purchaseorder: require('./features/PurchaseOrder/redux').reducer,
    dashboard: require('./features/dashboard/redux').reducer,
    listbankcombobox: require('./features/BankAccountCombobox/redux').reducer,
    customcolumns: require('./features/CustomColumns/redux').reducer,
    exportdata: require('./features/ExportData/redux').reducer,
    simulator : require('./features/Simulator/redux').reducer,
    getstarted : require('./features/GetStarted/redux').reducer
  },
  api: [
    require('./features/NeedValidation/api'),
    require('./features/NeedApproval/api'),
    require('./features/merchantKey/api'),
    require('./features/merchantSecretKey/api'),
    require('./features/transaction/api'),
    require('./features/PaymentLink/api'),
    require('./features/DonationLink/api'),
    require('./features/PurchaseOrder/api'),
    require('./features/dashboard/api'),
    require('./features/BankAccountCombobox/api'),
    require('./features/ExportData/api'),
    require('./features/Simulator/api'),
    require('./features/GetStarted/api'),

    // require('./features/CustomColumns/api'),
  ],
  sagas: [
    { effects: takeLatest, type: GetStartedTypes.SUBMIT_KYC_STEP2, sagas: doSubmitKycStep2 },
    { effects: takeLatest, type: GetStartedTypes.SUBMIT_KYC_STEP3, sagas: doSubmitKycStep3 },
    { effects: takeLatest, type: GetStartedTypes.SUBMIT_KYC_STEP4, sagas: doSubmitKycStep4 },
    { effects: takeLatest, type: GetStartedTypes.SUBMIT_KYC_STEP5, sagas: doSubmitKycStep5 },
    { effects: takeLatest, type: GetStartedTypes.SUBMIT_KYC_STEP6, sagas: doSubmitKycStep6 },
    { effects: takeLatest, type: GetStartedTypes.FETCH_PROGRESS_DATA, sagas: dofetchKycProgress },
    { effects: takeLatest, type: GetStartedTypes.FETCH_KYC_DATA_STEP2, sagas: doFetchKycFormDataStep2 },
    { effects: takeLatest, type: GetStartedTypes.FETCH_KYC_DATA_STEP3, sagas: doFetchKycFormDataStep3 },
    { effects: takeLatest, type: GetStartedTypes.FETCH_KYC_DATA_STEP4, sagas: doFetchKycFormDataStep4 },
    { effects: takeLatest, type: GetStartedTypes.FETCH_KYC_DATA_STEP5, sagas: doFetchKycFormDataStep5 },
    { effects: takeLatest, type: GetStartedTypes.FETCH_KYC_DATA_STEP6, sagas: doFetchKycFormDataStep6 },
    { effects: takeLatest, type: GetStartedTypes.UPLOAD_KYC_DOCUMENT, sagas: doUploadKycDocs, requestType:'file' },
    { effects: takeLatest, type: GetStartedTypes.SET_MERCHANT_CATEGORY, sagas: doSubmitMerchantCategory },

    { effects: takeLatest, type: NeedvalidationTypes.NEEDVALIDATION_CHECKBOX_SUBMIT_VALIDATE, sagas: needvalidationCheckboxSubmitValidate },
    { effects: takeLatest, type: NeedapprovalTypes.NEEDAPPROVAL_CHECKBOX_SUBMIT_APPROVE, sagas: needapprovalCheckboxSubmitApprove },
    { effects: takeLatest, type: NeedapprovalTypes.NEEDAPPROVAL_CHECKBOX_SUBMIT_REJECT, sagas: needapprovalCheckboxSubmitReject },

    { effects: takeLatest, type: MerchantkeyTypes.MERCHANTKEY_SUBMIT_FORM, sagas: merchantkeySubmitForm },
    { effects: takeLatest, type: MerchantkeyTypes.MERCHANTKEY_FETCH_CURRENT_MERCHANT_KEY, sagas: merchantkeyFetchCurrentMerchantKey },
    { effects: takeLatest, type: MerchantkeyTypes.MERCHANTKEY_UPDATE_CURRENT_CALLBACK_URL, sagas: merchantkeyUpdateCurrentCallbackUrl },

    { effects: takeLatest, type: MerchantSecretKeyTypes.FETCH_MERCHANT_SECRET_KEY, sagas: dofetchMerchantSecretKey },

    { effects: takeLatest, type: TransactionTypes.TRANSACTION_PAYMENT_STEP1, sagas: transactionPaymentStep1 },
    { effects: takeLatest, type: TransactionTypes.TRANSACTION_CHECK_STATUS_PAYMENT, sagas: transactionCheckStatusPayment },

    { effects: takeLatest, type: PaymentlinkTypes.PAYMENTLINK_FETCH_ONE, sagas: paymentlinkFetchOne },
    { effects: takeLatest, type: PaymentlinkTypes.PAYMENTLINK_SUBMIT_FORM, sagas: paymentlinkSubmitForm },
    { effects: takeLatest, type: PaymentlinkTypes.PAYMENTLINK_SUBMIT_ORDERCODE, sagas: paymentlinkSubmitOrdercode },
    { effects: takeLatest, type: PaymentlinkTypes.PAYMENTLINK_TOOGLE_ROW_DATA, sagas: changePaymentlinkStatus },

    { effects: takeLatest, type: DonationlinkTypes.DONATIONLINK_FETCH_ONE, sagas: donationlinkFetchOne },
    { effects: takeLatest, type: DonationlinkTypes.DONATIONLINK_SUBMIT_FORM, sagas: donationlinkSubmitForm },
    { effects: takeLatest, type: DonationlinkTypes.DONATIONLINK_SUBMIT_ORDERCODE, sagas: donationlinkSubmitOrdercode },

    { effects: takeEvery, type: ExportDataTypes.FETCH_EXPORT_DATA, sagas: fetchDataExport },

    { effects: takeLatest, type: SimulatorTypes.DO_PAY_VIRTUAL_ACCOUNT, sagas: doPayVirtualAccount },
    { effects: takeLatest, type: SimulatorTypes.DO_PAY_QRIS, sagas: doPayQris },


    { effects: takeLatest, type: CustomColumnsTypes.CHANGE_CUSTOM_COLUMNS, sagas: changeCustomColumn },
    { effects: takeLatest, type: CustomColumnsTypes.FETCH_CUSTOM_COLUMNS, sagas: fetchCustomColumns },

    { effects: takeLatest, type: PurchaseorderTypes.PURCHASEORDER_CHECK_STATUS_REQUEST_OTP, sagas: purchaseorderCheckStatusRequestOtp },
    { effects: takeLatest, type: PurchaseorderTypes.PURCHASEORDER_CHECK_STATUS, sagas: purchaseorderCheckStatus },
    { effects: takeLatest, type: DashboardTypes.DASHBOARD_FETCH_DATA, sagas: dashboardFetchData },
    { effects: takeLatest, type: BankAccountTypes.FETCH_BANK_DATA, sagas: fetchBankComboboxData }
  ],
  sidemenu: [
    { route: '/dashboard-ecomm', title: AppConfig.appName + ' Dashboard', icon: <DashboardIcon color='menuDrawerIcon' /> },
    { userPrivilegeCode: '/payment-link', route: '/link-payment', title: 'Payment Link', iconClassName: 'nav-icon fas fa-link', icon: <LinkIcon color='menuDrawerIcon' /> },
    // { userPrivilegeCode: '/link-donation', route: '/link-donation', title: 'Donasi',iconClassName:'nav-icon fas fa-heart' },
    {
      userPrivilegeCode: '4',
      title: 'Disbursement',
      iconClassName: 'nav-icon fas fa-paper-plane',
      submenu: [
        { route: '/all-disbursement' },
        { route: '/need-validation-transaction' },
        { route: '/need-approval-transaction' }
      ]
    },
    {
      userPrivilegeCode: '9',
      title: 'Account Number',
      iconClassName: 'nav-icon fas fa-file-invoice',
      icon: <AccountBalanceIcon color='menuDrawerIcon' />,
      submenu: [
        { route: '/all-bank-account' },
        { route: '/need-approval-account-number' }
      ]
    },
    {
      userPrivilegeCode: 'trx',
      title: 'Report',
      iconClassName: 'nav-icon fas fa-table',
      icon: <TableViewIcon color='menuDrawerIcon' />,
      submenu: [
        { route: '/report/all-transaction' },
        { route: '/report/transaction-fee' }
      ]
    },
    {
      userPrivilegeCode: '7',
      title: 'Merchant',
      iconClassName: 'nav-icon fas fa-store-alt',
      icon: <StorefrontIcon color='menuDrawerIcon'/>,
      submenu: [{ route: '/merchant', title: 'All Merchant' }, { route: '/merchant-need-approval' }]
    },
    {
      userPrivilegeCode: 'main-menu-ecommerce-management',
      title: 'E-Commerce',
      iconClassName: 'nav-icon fas fa-th',
      submenu: [
        { route: '/tokoonline', title: 'Toko Online Management' },
        { route: '/category', title: 'Category Management' },
        { route: '/product', title: 'Product Management' },
        { route: '/inventory', title: 'Inventaris' },
        { route: '/emailblast', title: 'Email Blast' },
        { route: '/paymentmethod', title: 'Payment Method' },
        // { route: '/paymentlink', title: 'Payment Link' },
        { route: '/purchaseorder', title: 'Purchase Order' }
      ]
    },
    {
      userPrivilegeCode: 'main-menu-monitoring',
      title: 'Monitoring',
      iconClassName: 'nav-icon fas fa-tachometer-alt',
      submenu: [{ route: '/monitoring-debitin', title: 'Monitoring Debitin' }]
    },
    {
      userPrivilegeCode: 'simulator-pg',
      route: '/simulator',
      title: 'Simulator',
      iconClassName: 'nav-icon fas fa-tachometer-alt',
      icon: <ViewInArIcon color='menuDrawerIcon'/>
    },
    {
      userPrivilegeCode: 'main-menu-settings',
      title: 'Pengaturan',
      iconClassName: 'nav-icon fas fa-tachometer-alt',
      icon: <SettingsIcon color='menuDrawerIcon' />,
      submenu: [
        { route: '/pgateway', title: 'Payment Gateway' },
        { route: '/settings/developers', title: 'Developers' }
        // { route: '/settings/business-profile', title: 'Your Profile' }
      ]
    }
  ],
  translations: {
    en: enTranslationMessages,
    id: idTranslationMessages
  }
})
