import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    toogleMode: ['data'],
})

export const StylesTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    theme:{},
    mode:'light'  
})

/* ------------- Reducers ------------- */
export const toogleMode = (state, { data }) => state.merge({ ...state,mode:data.mode })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOOGLE_MODE]: toogleMode
})
