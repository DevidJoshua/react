import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  myprofileSetMyprofile: ['data'],
  myprofileChangeMerchant: ['data'],
  myprofileChangeMerchantDone: ['data'],
  myprofileSetIntegrationParams: ['data'],
  reset: null
})
export const MyprofileTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  _id: '',
  user_id: '',
  full_name: '',
  email: '',
  username: '',
  user_privileges: [],
  user_merchants: [],
  merchant: {},
  loadingChangeMerchant: false,
  errorChangeMerchant: [],
  role: '',
  integration_params: {}
})
export const myprofileChangeMerchant = (state, { data }) => {
  return state.merge({ loadingChangeMerchant: true, errorChangeMerchant: [] })
}
export const myprofileSetIntegrationParams = (state, { data }) => {
  console.log('myprofileSetIntegrationParams=', data)
  const { integrationParams } = data
  return state.merge({ integration_params: { ...state.integration_params, ...integrationParams } })
}
export const myprofileChangeMerchantDone = (state, { data }) => {
  const { merchant, errors, userPrivileges } = data
  return state.merge({ merchant: merchant, loadingChangeMerchant: false, errorChangeMerchant: errors, user_privileges: userPrivileges })
}
export const myprofileSetMyprofile = (state, { data }) => {
  console.log('data===>', data)
  const { myprofile, userPrivileges, role, userMerchants, merchant } = data
  return state.merge({ full_name: myprofile.full_name, email: myprofile.email, _id: myprofile._id, username: myprofile.username, user_id: myprofile.user_id, merchant: merchant, user_merchants: userMerchants, user_privileges: userPrivileges, role: role })
}
export const reducer = createReducer(INITIAL_STATE, {
  [Types.MYPROFILE_CHANGE_MERCHANT]: myprofileChangeMerchant,
  [Types.MYPROFILE_CHANGE_MERCHANT_DONE]: myprofileChangeMerchantDone,
  [Types.MYPROFILE_SET_MYPROFILE]: myprofileSetMyprofile,
  [Types.MYPROFILE_SET_INTEGRATION_PARAMS]: myprofileSetIntegrationParams,
  [Types.RESET]: (state) => INITIAL_STATE
})
