import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dashboardFetchData: ['data'],
  dashboardFetchDataDone: ['data'],
  reset: null
})

export const DashboardTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  FetchData: { loading: false }
})

export const dashboardFetchDataDone = (state, { data }) => state.merge({ FetchData: { ...state.FetchData, loading: false, ...data } })
export const dashboardFetchData = (state, { data }) => state.merge({ FetchData: { ...state.FetchData, loading: true } })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DASHBOARD_FETCH_DATA]: dashboardFetchData,
  [Types.DASHBOARD_FETCH_DATA_DONE]: dashboardFetchDataDone,
  [Types.RESET]: (state) => INITIAL_STATE
})
