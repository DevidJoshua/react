import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  fetchExportData: ['data'],
  fetchExportDataDone: ['data'],
  fetchExportDataFailed: ['data'],
  reset: null
})

export const ExportDataTypes = Types
export default Creators
export const INITIAL_STATE = Immutable({
    exporting:{},
    data:{},
    disabled:{},
    errors:{}
})

export const fetchExportData = (state, { data }) => state.merge({
  ...state,
  isExporting:{...state.isExporting,[data.serviceName]:true}
})

export const fetchExportDataDone = (state, { data }) => state.merge({
  ...state,
  isExporting:{...state.isExporting,[data.serviceName]:false},
  data:{...state.data,[data.serviceName]:data.exportData}
})

export const fetchExportDataFailed = (state, { data }) => state.merge({
  ...state,
  isExporting:{...state.isExporting,[data.serviceName]:false},
  errors:{...state.errors,[data.serviceName]:data.error},
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_EXPORT_DATA]: fetchExportData,
  [Types.FETCH_EXPORT_DATA_DONE]: fetchExportDataDone,
  [Types.FETCH_EXPORT_DATA_FAILED]: fetchExportDataFailed,
  [Types.RESET]: (state) => INITIAL_STATE
})
