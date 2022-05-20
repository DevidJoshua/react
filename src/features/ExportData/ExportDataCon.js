import React from 'react'
import {connect} from 'react-redux'
import ExportDataComp from './ExportDataComp'
import Actions from './redux'
import _ from 'lodash'

const ExportDataCon =  (props) => {
    const {exportOptions,payload} = props
    // const exportFileOptions = ['csv','txt','xlsx']
    const exportFileOptions = ['csv','txt']

    const {fetchExportData} = props

    const onClickExport = (fileType)=>{
        payload.filter.formatFile = fileType
        fetchExportData({fileType,payload,...exportOptions})
    } 

    console.log("payload=======> ",payload)
    return <ExportDataComp {...props} exportFileOptions={exportFileOptions} onClickExport={onClickExport}/>
}

const mapStateToProps = (state, ownProps) => {
    const {exportOptions,additionalRequests} = ownProps
    const payload = exportOptions.buildPayload(state,exportOptions.exportId,additionalRequests)
    const exporting = state.exportdata.exporting
    const disabled = state.exportdata.disabled
    
    return{
        payload,
        exporting : _.has(exporting,exportOptions.exportId) ? state.exportdata.exporting[exportOptions.exportId] : false,
        disabled : _.has(disabled,exportOptions.exportId) ? state.exportdata.disabled[exportOptions.exportId] : false
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        fetchExportData: data => dispatch(Actions.fetchExportData(data)),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExportDataCon)