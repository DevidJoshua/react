import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import AppConfig from '../../core/Config/AppConfig'
import {toIdr,toDateTime,sanitizeValue}  from '../../core/Utils/Utils'
import { MenuList,MenuItem } from '@mui/material'

const basePath = AppConfig.basePath

const entityName = 'PlTransaction'
const serviceEntity = 'PlTransaction'

export const redirectAfterCreate = '/report/transaction-detail'
export const redirectAfterDelete = '/report/all-transaction'
export const detailPageUrl = (id) => (`/report/transaction-detail/${id}`)
export const upsertPageUrl = (id) => (`/report/transaction-form${id ? '/' + id : ''}`)
export const listallPageUrl = () => ('/report/all-transaction')
export const createNewButtonLabel = 'Create New Transaction'
export const createPageTitle = 'Create New Transaction'
export const listallPageTitle = 'Transaction Report'
export const detailPageTitle = 'Transaction Detail'
export const upsertPageTitle = 'Form ' + entityName
export const detailService = 'getDetail' + serviceEntity
export const upsertService = 'upsert' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = 'accountNumber,partnerCode,mercNm,externalId,invoiceNumber,id,pymtMethodCd,paySts,payDt,trxCreationDt,trxAmt,ecommRefNo,payBnkRefNo,mercId,mercCd,mercRefNo,mercNm,pymtMethodCd,pymtMethodNm,coCcyCd'
const stat = [
  {status:'SETLD',text:'Dibayar',class:'btn-success btn-sm'},
  {status:'SETTL',text:'Dibayar',class:'btn-success btn-sm'},
  {status:'PAID',text:'Dibayar',class:'btn-success btn-sm'},
  {status:'PNDNG',text:'Menunggu Pembayaran',class:'btn-warning btn-sm'},
  {status:'REJEC',text:'Pembayaran Gagal',class:'btn-danger btn-sm'},
  {status:'REJCT',text:'Pembayaran Gagal',class:'btn-danger btn-sm'},
  {status:'CANCL',text:'Pembayaran Dibatalkan',class:'btn-secondary btn-sm'}
]
const statusTxt = status =>{
  const found = stat.find(r=>r.status ===  status)  
  return found ? found.class : 'btn-default btn-sm'
}

const options = [{label:'Detail', content: p=> <Link className='dropdown-item' to={`${basePath}${redirectAfterCreate}/${p.cell.value}`}>Detail</Link>}]
export const getColumns = (history) => [
  {
    Header: '',
    accessor: 'id',
    Cell: p => (
      <MenuList id="split-button-menu">
          {options.map(r => (
            <MenuItem>
              {r.content(p)}
            </MenuItem>
          ))}
      </MenuList>
      )
  },

  { Header: 'Merchant Ref No', accessor: p=>sanitizeValue(p.mercRefNo)},
  { Header: 'Plink Ref No', accessor: p=>sanitizeValue(p.ecommRefNo)},
  { Header: 'Bank Ref No', accessor: p=>sanitizeValue(p.payBnkRefNo)},
  { Header: 'Created Date', accessor: p=>sanitizeValue(p.trxCreationDt)},
  
  { Header: 'Merchant Name', accessor: p=>sanitizeValue(p.mercNm)},
  { Header: 'Payment Method', accessor: p=>sanitizeValue(p.pymtMethodCd)},
  { Header: 'Bank', accessor: p=>sanitizeValue(p.partnerCode)},
  { Header: 'Account No', accessor: p=>sanitizeValue(p.accountNumber)},
  { Header: 'Amount', accessor: p=>sanitizeValue(toIdr(p.trxAmt))},
  { Header: 'Payment Date', accessor: p=>sanitizeValue(p.payDt)},
  { Header: 'Status', accessor: p=><span className={statusTxt(p.paySts)}><strong>{sanitizeValue(p.paySts)}</strong></span>}
]

export const exportDataOptions = {
   endPoint:'/api/render/document/pltransactions',
   fileName:'Data Transaction',
   exportId:listallService,
   buildPayload:(state,exportId)=>{
    const index = _.has(state.tablepagination.pageIndex,exportId) ? state.tablepagination.pageIndex[exportId] : 0
    const size = _.has(state.tablepagination.pageSize,exportId) ? state.tablepagination.pageSize[exportId] : 0
    const filter = _.has(state.tablepagination.filter,exportId) ? state.tablepagination.filter[exportId] : 0
    return { page_index: index, page_size: size, filter: { ...filter } }
   }
}

export default {
  redirectAfterCreate,
  redirectAfterDelete,
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
  getColumns,
  listallPageUrl
}
