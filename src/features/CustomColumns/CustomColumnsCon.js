import React from 'react'
import CustomColumnsComponent from './CustomColumnsComponent'
import { connect } from 'react-redux'
import Actions from './redux'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
const CustomColumnCon = (props)=>{
    const {changeCustomColumns,serviceName,reduxCustomColumns,userId,merchantId,fetchCustomColumns,columns,tableId,reshapedColumns,dataDetail,oriColumns} = props
    const onSubmit = (tableColumns) =>{
        changeCustomColumns({tableId,tableColumns,userId,merchantId})    
    }
    React.useEffect(() => { fetchCustomColumns({tableId,userId,merchantId,originalCols:columns})}, [dataDetail]) 
    
    return (<CustomColumnsComponent {...props} columns={oriColumns} onSubmit={onSubmit} reduxCustomColumns={reduxCustomColumns.length < 1 ? Immutable.asMutable(oriColumns.map(r=>r.headerKey)) : reduxCustomColumns }/>)
}

const mapStateToProps = (state,ownProps) =>{
    const stCol = state.customcolumns
    const stProf =  state.myprofile
    const {tableId} = ownProps
    const reduxCol = stCol.custom_columns[tableId] === undefined ? [] : stCol.custom_columns[tableId]
    const dataDetail = state.tablepagination.dataDetail
    const allColumns = state.tablepagination.columns

    return{
        dataDetail,
        userId: stProf.user_id,
        merchantId:stProf.merchant.id,
        reduxCustomColumns: Immutable.asMutable((_.without(reduxCol,undefined) || []).map(r=>r.headerKey)) || [],
        isOpen: stCol.openDialog[tableId] || false,
        oriColumns: allColumns[ownProps.serviceName] === undefined ? [] : allColumns[ownProps.serviceName]
    }
}
const mapDispatchToProps = dispatch => {
    return{
        toogleCustColDialog: data=>dispatch(Actions.toogleDialog(data)),
        changeCustomColumns: data=>dispatch(Actions.changeCustomColumns(data)),
        removeColumns: data=>dispatch(Actions.removeCustomColumns(data)),
        fetchCustomColumns: data=>dispatch(Actions.fetchCustomColumns(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomColumnCon)
  
