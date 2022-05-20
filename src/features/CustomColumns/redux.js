import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changeCustomColumns:['data'],
  removeCustomColumns:['data'],
  toogleDialog:['data'],
  fetchCustomColumns: ['data'],
  fetchCostomColumnsDone: ['data'],
  keyHeaders:[],
  reset: null
})

export const CustomColumnsTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  custom_columns:{},
  openDialog:{}
})


export const changeCustomColumns = (state, { data }) =>{
  const {tableId,tableColumns} = data 
  const columns = Immutable.asMutable(state.custom_columns)
  columns[tableId] = tableColumns
  return state.merge({ ...state,custom_columns:columns });
}

export const removeCustomColumns = (state, { data }) => {
  const {tableId} = data 
  const columns = Immutable.asMutable(state.custom_columns)
  delete columns[tableId]
  return state.merge({ ...state,custom_columns:columns });
}

export const fetchCustomColumns = (state,{data}) => state.merge({ ...state})

export const fetchCostomColumnsDone = (state,{data}) => { 
  const {tableId,tableColumns} = data 
  const columns = Immutable.asMutable(state.custom_columns)
  columns[tableId] = tableColumns
  return state.merge({ ...state,custom_columns:columns });
}

export const toogleDialog = (state, { data }) =>{
  const {tableId,isOpen} = data
  const openDialog = Immutable.asMutable(state.openDialog)
  openDialog[tableId] = isOpen
  return state.merge({...state,openDialog})
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_CUSTOM_COLUMNS]: changeCustomColumns,
  [Types.REMOVE_CUSTOM_COLUMNS]: removeCustomColumns,
  [Types.FETCH_CUSTOM_COLUMNS]: fetchCustomColumns,
  [Types.TOOGLE_DIALOG]: toogleDialog,
  [Types.FETCH_COSTOM_COLUMNS_DONE]:fetchCostomColumnsDone,
  [Types.RESET]: (state) => INITIAL_STATE
})
