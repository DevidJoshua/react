import React, { useEffect } from 'react'
import { injectIntl } from 'react-intl'
import { Detail,Table } from '../../core/features/TablePagination'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { detailService, fields, deleteService, detailPageTitle,listallPageTitle, listallPageUrl, redirectAfterDelete, upsertPageUrl, detailPageUrl, appendColumns,preProcessPatchData,exportDataOptions } from './Manifest'
import moment from 'moment'
import {sanitizeValue,toIdr,toDateTime} from '../../core/Utils/Utils'
import AppConfig from '../../core/Config/AppConfig'
import TablePaginationActions from '../../core/features/TablePagination/redux'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import CustomColumns from '../../features/CustomColumns/CustomColumnsCon'
import FormFilter from './FormFilter'
import Paper from '@mui/material/Paper'
import {plDetailTrx} from './Manifest'
import ExportDataCon from '../../features/ExportData/ExportDataCon'
import Grid from '@mui/material/Grid';


const DetailContent = (props) => {
  const {dataDetail} = props
  let {idCode,additionalData1,createdBy,expiredDateTime,amount,totalAmount,otherBills,createdAt,updatedAt,description} = dataDetail
  if(otherBills != null) otherBills = otherBills.length > 0 && otherBills[0]['billAmount'] !== undefined ? otherBills[0]['billAmount'] : 0
  if(createdBy != undefined) createdBy = createdBy.username
  moment.locale();
  return (
     <div className='card p-2'>
        <div className='row'>
          <div className='col-sm-6'>
            <strong>Nomor Identifikasi</strong>
            <br></br>
            {sanitizeValue(idCode)}
            <dt>ID Eksternal</dt>
            <dd>{sanitizeValue(additionalData1)}</dd>
            <dt>Nominal</dt>
            <dd>{toIdr(amount)}</dd>
            <dt>Biaya Admin</dt>
            <dd>{toIdr(otherBills)}</dd>
            <dt>Total Keseluruhan</dt>
            <dd>{toIdr(totalAmount)}</dd>
          </div>
          <div className='col-sm-6'>
            <dt>Waktu Kadaluarsa</dt>
            <dd><span className="right badge badge-danger"><h6>{toDateTime(moment(expiredDateTime))}</h6></span></dd>
            <dt>Dibuat Oleh</dt>
            <dd>{sanitizeValue(createdBy)}</dd>
            <dt>Tanggal Pembuatan</dt>
            <dd>{toDateTime(createdAt)}</dd>
            <dt>Tanggal Diperbaharui</dt>
            <dd>{toDateTime(updatedAt)}</dd>   
          </div>
          
      </div>
      <div className='col-12'>
          <hr/>
          <dt>Keterangan</dt>
          <dd>{sanitizeValue(description)}</dd>
      </div>
     </div>  
  )
}
function Comp (props) {
  const { match, history } = props
  const dispatch = useDispatch()
  const {columns,trxFields,serviceName} = plDetailTrx
  const tableId = `PL${match.params._id}${serviceName}`
  
  useEffect(()=>{
    if(_.isNull(match.params._id) || _.isEmpty(match.params._id) || _.isUndefined(match.params._id)) window.history.back()
    dispatch(TablePaginationActions.setDeletePayload({paymentlink_id:match.params._id}))
  },[])


  return (
    <ContentWrapper
      pageTitle={detailPageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: listallPageTitle, link: listallPageUrl() },
        { title: detailPageTitle, link: null, isActive: true }
      ]}
      contentHeaderTitle={detailPageTitle}
      isNeedLoggedin
    >
      <Paper variant='outlined'>
        <div style={{ padding: 10 }}>
          <Detail
            withoutWrapper
            preProcessPatchData={preProcessPatchData}
            detailServiceName={detailService}
            deleteServiceName={deleteService}
            fields={fields}
            id={match.params._id}
            apiVersion={3}
            formTitle={detailPageTitle}
            redirectAfterDelete={redirectAfterDelete}
            updatePageUrl={upsertPageUrl(match.params._id)}
            createPageUrl={upsertPageUrl()}
            buttonAction={({ dataDetail,id,deleteServiceName })=> id && deleteServiceName ? <div>
                <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger ' data-toggle='modal' data-target='#modal-danger'><span className='fas fa-trash-alt mr-2'/>Hapus</button>
                <button style={{ width: 100 }} type='button' className='ml-2 btn bg-gradient-primary' onClick={()=>history.push(upsertPageUrl(match.params._id))}><span className='fas fa-pencil-alt mr-2'/>Ubah</button>
            </div> : <></>}
          >       
            <DetailContent history={history} match={match} />
          </Detail>
          <Table
              cardHeader={()=>(
                <div style={{boxSizing:'border-box',padding:'1rem'}}>
                 <FormFilter serviceName={serviceName}/>
                  <div className='row ml-2'>
                      <CustomColumns serviceName={detailService} tableId={tableId}  columns={columns()} appendColumns={appendColumns}/>
                      &nbsp; &nbsp;
                      <ExportDataCon exportOptions={exportDataOptions} additionalRequests={{id:match.params._id}}/>
                  </div>
                </div>
              )}
              appendColumns={appendColumns}
              withoutCardHeader
              tableId={tableId} 
              listallServiceName={serviceName}
              fields={trxFields}
              columns={columns()}
              cardTitle='Transactions'
              additionalRequests={{id:match.params._id}}
              apiVersion={2}
              collapsable
          />
        </div>
      </Paper>

    </ContentWrapper>
  )
}
export default injectIntl(Comp)
