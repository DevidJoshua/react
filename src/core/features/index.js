import { takeEvery, takeLatest } from 'redux-saga/effects'
import { TablepaginationTypes } from './TablePagination/redux'
import { tablepaginationFetchData, tablepaginationSubmitForm, tablepaginationFetchDataDetail, tablepaginationDeleteData } from './TablePagination/sagas'

import { ForgetpasswordTypes } from './ForgetPassword/redux'
import { forgetpasswordSubmitNewPassword, forgetpasswordSubmitEmail, forgetpasswordValidateToken } from './ForgetPassword/sagas'
import { ChangepasswordTypes } from './ChangePassword/redux'
import { changepasswordSubmit } from './ChangePassword/sagas'

import { SignupTypes } from './Signup/redux'
import { signupRequest, signupAdminRequest } from './Signup/sagas'

import { PrivilegeTypes } from './Privilege/redux'
import { privilegeCheckboxSubmit } from './Privilege/sagas'

import { MyprofileTypes } from './myprofile/redux'
import { myprofileChangeMerchant } from './myprofile/sagas'

export const sagas = [
  { effects: takeLatest, type: MyprofileTypes.MYPROFILE_CHANGE_MERCHANT, sagas: myprofileChangeMerchant },
  { effects: takeLatest, type: PrivilegeTypes.PRIVILEGE_CHECKBOX_SUBMIT, sagas: privilegeCheckboxSubmit },
  { effects: takeLatest, type: SignupTypes.SIGNUP_REQUEST, sagas: signupRequest },
  { effects: takeLatest, type: SignupTypes.SIGNUP_ADMIN_REQUEST, sagas: signupAdminRequest },

  { effects: takeLatest, type: ChangepasswordTypes.CHANGEPASSWORD_SUBMIT, sagas: changepasswordSubmit },

  { effects: takeLatest, type: ForgetpasswordTypes.FORGETPASSWORD_SUBMIT_EMAIL, sagas: forgetpasswordSubmitEmail },
  { effects: takeLatest, type: ForgetpasswordTypes.FORGETPASSWORD_VALIDATE_TOKEN, sagas: forgetpasswordValidateToken },
  { effects: takeLatest, type: ForgetpasswordTypes.FORGETPASSWORD_SUBMIT_NEW_PASSWORD, sagas: forgetpasswordSubmitNewPassword },
  
  { effects: takeEvery, type: TablepaginationTypes.TABLEPAGINATION_DELETE_DATA, sagas: tablepaginationDeleteData },
  { effects: takeEvery, type: TablepaginationTypes.TABLEPAGINATION_FETCH_DATA_DETAIL, sagas: tablepaginationFetchDataDetail },
  { effects: takeEvery, type: TablepaginationTypes.TABLEPAGINATION_SUBMIT_FORM, sagas: tablepaginationSubmitForm },
  { effects: takeEvery, type: TablepaginationTypes.TABLEPAGINATION_FETCH_DATA, sagas: tablepaginationFetchData },
  

]

export const reducers = {
  myprofile: require('./myprofile/redux').reducer,
  myaccountpage: require('./myaccount/redux').reducer,
  tablepagination: require('./TablePagination/redux').reducer,
  signup: require('./Signup/redux').reducer,
  forgetpassword: require('./ForgetPassword/redux').reducer,
  changepassword: require('./ChangePassword/redux').reducer,
  privilege: require('./Privilege/redux').reducer
}

export const api = [
  require('./myprofile/api'),
  require('./TablePagination/api'),
  require('./ForgetPassword/api'),
  require('./ChangePassword/api'),
  require('./Signup/api'),
  require('./Privilege/api')
]
