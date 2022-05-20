import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'
import {toDateTime,sanitizeValue,toIdr} from '../../core/Utils/Utils'
import PaymentLinkSwitchChangeStatus from '../../features/PaymentLink/containers/PaymentLinkSwitchChangeStatus'
import _ from 'lodash'
import { ClickAwayListener } from '@mui/base'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'

const basePath = AppConfig.basePath

const entityName = 'PaymentLink'
const entity = 'paymentlink'
const serviceEntity = 'PaymentLink'
const pageEntity = 'link-payment'


export const redirectAfterUpsert = `/${pageEntity}/detail/`
export const redirectAfterCreate = `/${pageEntity}/detail/`
export const redirectAfterDelete = '/' + pageEntity

export const detailPageUrl = (id) => (`/${pageEntity}/detail/${id}`)
export const upsertPageUrl = (id) => (`/${pageEntity}/upsert/${id}`)
export const listallPageUrl = () => (`/${pageEntity}`)

export const createNewButtonLabel = 'createNewButtonLabel'
export const createPageTitle = 'Form Payment Link'
export const listallPageTitle = 'Payment Link'
export const detailPageTitle = 'Detail Payment Link'
export const upsertPageTitle = 'Form ' + entityName
export const detailService = 'getdetailed'
export const upsertService = 'updatepaymentlink'
export const listallService = 'getListPaymentLink'
export const deleteService = 'deletePaymentLink'

export const fields = 'id idCode maxTransactions merchantId merchants{ id merchantName } status updatedAt otherBills{ billAmount billName id } createdAt createdBy{ id userId username } deviceId expiredDateTime additionalData1 amount totalAmount description additionalData2'

const copyUrl = (e,p) => {
  var dummy = document.createElement('textarea')
  document.body.appendChild(dummy)
  dummy.value = `${AppConfig.payDonationLinkUrl}${AppConfig.paymentLinkRedirectionEndpoint}?id=${p.id}&code=${p.idCode}`
  dummy.select()
  document.execCommand('copy')
  document.body.removeChild(dummy)
  alert('Payment Link berhasil disalin: ' + dummy.value)
}

export const getColumns = (history) => [
  // {
  //   headerKey:'id',
  //   Header: 'Aksi',
  //   accessor: 'id',
  //   Cell: p => (
  //     <React.Fragment>
  //       <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
  //         <Button onClick={handleClick}>{options[selectedIndex]}</Button>
  //         <Button
  //           size="small"
  //           aria-controls={open ? 'split-button-menu' : undefined}
  //           aria-expanded={open ? 'true' : undefined}
  //           aria-label="select merge strategy"
  //           aria-haspopup="menu"
  //           onClick={handleToggle}
  //         >
  //           <ArrowDropDownIcon />
  //         </Button>
  //       </ButtonGroup>
  //       <Popper
  //         open={open}
  //         anchorEl={anchorRef.current}
  //         role={undefined}
  //         transition
  //         disablePortal
  //       >
  //         {({ TransitionProps, placement }) => (
  //           <Grow
  //             {...TransitionProps}
  //             style={{
  //               transformOrigin:
  //                 placement === 'bottom' ? 'center top' : 'center bottom',
  //             }}
  //           >
  //             <Paper>
  //               <ClickAwayListener onClickAway={handleClose}>
  //                 <MenuList id="split-button-menu">
  //                   {options.map((option, index) => (
  //                     <MenuItem
  //                       key={option}
  //                       disabled={index === 2}
  //                       selected={index === selectedIndex}
  //                       onClick={(event) => handleMenuItemClick(event, index)}
  //                     >
  //                       {option}
  //                     </MenuItem>
  //                   ))}
  //                 </MenuList>
  //               </ClickAwayListener>
  //             </Paper>
  //           </Grow>
  //         )}
  //       </Popper>
  //     </React.Fragment>
  //   )
  // },
  { headerKey:'cd',Header: 'Waktu Dibuat',accessor: d =>toDateTime(d.createdAt)},
  { headerKey:'ie',Header: 'ID Eksternal', accessor: p => (<span>{sanitizeValue(p.additionalData1)}</span>) },
  { headerKey:'cd',Header: 'Nominal', accessor: p => (<span>{toIdr(p.totalAmount)}</span>) },
  { headerKey:'ni',Header: 'Nomor Identifikasi',accessor: p => sanitizeValue(p.idCode) },
  { headerKey:'st',Header: 'Status',accessor: p =><PaymentLinkSwitchChangeStatus serviceName={listallService} status={p.status} idPaymentlink={p.id}/>},
  {
    headerKey:'pl',
    Header:"Payment Link",
    accessor: p => {
      return (
        <div>
            <button type='button' data-toggle="tooltip" data-placement="top" title="Salin" onClick={e=>copyUrl(e,p)} className='btn btn-outline-primary'> <i className='fa fa-copy' /></button>
            <button type='button' data-toggle="tooltip" data-placement="top" title="Buka" onClick={()=>window.open(`${AppConfig.payDonationLinkUrl}${AppConfig.paymentLinkRedirectionEndpoint}?id=${p.id}&code=${p.idCode}`,'_blank')} className='btn btn-outline-primary ml-1'> <i className='fa fa-globe' /></button>
        </div>
        )
      },
  }
]


export const appendColumns =  (flag,data=[],existingColumns=[],dataDetail={}) =>{  
  let columnSpec = []
  if(_.has(dataDetail,detailService)){
    columnSpec = dataDetail[detailService] === undefined ? [] : (dataDetail[detailService]['additionalData2'] === undefined? [] : dataDetail[detailService]['additionalData2'])

  }
  const stringifySpec = typeof columnSpec === 'object' ?  '[]' : (columnSpec.toString()).replace(/"/g, '\"')  
  const additionalColumnSpec = JSON.parse(stringifySpec) || []
  const originalColumns = existingColumns || []

  switch(flag){   
    case 'columns':
      //reshape columns
      additionalColumnSpec.map(r=>{
        originalColumns.push({ headerKey: `pl-${r.id}`,Header: r.inputLabel,accessor: d =>sanitizeValue(d[`pl-${r.id}`])},)
      })
      
      const uniqueColumns = _.uniq(existingColumns, 'headerKey')
      return uniqueColumns
    break;
    case 'data':
      //reshape data
      const reshapedData =  data.map(r=>{
          var dataRow = {...r}
          if(_.has(dataRow,'additionalData2')){
              if(!_.isEmpty((dataRow['additionalData2']))){
                  var additionalData = JSON.parse(dataRow.additionalData2)
                  if(additionalData){
                    additionalData.map(s=>{
                      var obj = {}
                      obj[`pl-${s.inputId}`] = s.inputValue
                      Object.assign(dataRow,obj)
                    })
                  }
                  delete dataRow.additionalData2
              }
              return dataRow     
          }
          return dataRow
      })

      return reshapedData
    break;
    case 'ori-columns':
      return existingColumns
    break;
    case 'ori-data': 
      return data
    break;
  }
}

export const preProcessPatchData = (prop) =>{
  //add columns to spec
  const {dataDetail,data} = prop
  const columnSpec = dataDetail === undefined ? [] : dataDetail['additionalData2']
  const stringifySpec = typeof columnSpec === 'object' ?  '[]' : (columnSpec.toString()).replace(/"/g, '\"')  
  const additionalColumnSpec = JSON.parse(stringifySpec) || []
  const originalColumns = plDetailTrx.columns() || []

  additionalColumnSpec.map(r=>{
    originalColumns.push({ headerKey: `pl-${r.id}`,Header: r.inputLabel,accessor: d =>sanitizeValue(d[`pl-${r.id}`])},)
  })

  const uniqueColumns = _.uniq(originalColumns, 'headerKey')

  return {columns:uniqueColumns}
}

const statusTxt = status =>{
  const stat = [{status:'SETLD',text:'Dibayar',class:'btn-success btn-sm'},{status:'PNDNG',text:'Menunggu Pembayaran',class:'btn-warning btn-sm'},{status:'REJEC',text:'Pembayaran Gagal',class:'btn-danger btn-sm'}]
  const found = stat.find(r=>r.status ===  status) || {}
  return found.class
}

export const plDetailTrx = {
    serviceName:'gettransactionpaymenlink',
    redirectToDetail:'',
    trxFields:'externalId,invoiceNumber,id,pymtMethodCd,paySts,payDt,trxCreationDt,trxAmt,ecommRefNo,payBnkRefNo,mercId,mercCd,mercRefNo,mercNm,pymtMethodCd,pymtMethodNm,coCcyCd,additionalData2',
    columns:() => [
      {
        alias: 'Aksi',
        headerKey:'id',
        Header: '',
        accessor: 'id',
        Cell: p => (
          <div className='btn-group'>
            <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
              <span className='sr-only'>Toggle Dropdown</span>
            </button>
            <div className='dropdown-menu' role='menu'>
              <Link className='dropdown-item' to={`${basePath}/report/transaction-detail/${p.cell.value}`}>Detail</Link>
            </div>
          </div>)
      },
      { headerKey:'idd',Header: 'Id', accessor: p=>sanitizeValue(p.id)},
      { headerKey:'pm',Header: 'Payment Method', accessor: p=>sanitizeValue(p.pymtMethodCd)},
      { headerKey:'am',Header: 'Amount', accessor: p=>sanitizeValue(toIdr(p.trxAmt))},
      { headerKey:'st',Header: 'Status', accessor: p=><span className={statusTxt(p.paySts)}><strong>{sanitizeValue(p.paySts)}</strong></span>},
      { headerKey:'pd',Header: 'Payment Date', accessor: p=>sanitizeValue(p.payDt)},      
    ]
}

export const exportDataOptions = {
  endPoint:'/api/render/document/paymentlink/trx',
  fileName:'Data Transaction',
  exportId:plDetailTrx.serviceName,
  buildPayload:(state,exportId,additionalRequest)=>{
   const index = _.has(state.tablepagination.pageIndex,exportId) ? state.tablepagination.pageIndex[exportId] : 0
   const size = _.has(state.tablepagination.pageSize,exportId) ? state.tablepagination.pageSize[exportId] : 0
   const filter = _.has(state.tablepagination.filter,exportId) ? state.tablepagination.filter[exportId] : 0
   return { page_index: index, page_size: size, filter: { ...filter },...additionalRequest }
  }
}

export default {
  redirectAfterCreate,
  redirectAfterDelete,
  appendColumns,
  detailPageUrl,
  upsertPageUrl,
  createNewButtonLabel,
  createPageTitle,
  listallPageTitle,
  detailPageTitle,
  detailService,
  listallService,
  deleteService,
  upsertService,
  fields,
  pageEntity,
  getColumns,
  listallPageUrl,
  preProcessPatchData
}
