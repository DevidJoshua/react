import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import AppConfig from '../../core/Config/AppConfig'
import {toIdr,toDateTime} from '../../core/Utils/Utils'

const basePath = AppConfig.basePath

const entityName = 'DisbursementTransaction'
const entity = 'disbursementtransaction'
const serviceEntity = 'DisbursementTransaction'

export const redirectAfterCreate = '/disbursement-transaction-detail'
export const redirectAfterDelete = `/all-disbursement`
export const detailPageUrl = (id) => (`/disbursement-transaction-detail/${id}`)
export const upsertPageUrl = (id) => (`/form-disbursement-transaction${id ? '/' + id : ''}`)
export const listallPageUrl = () => (`/all-disbursement`)
export const createNewButtonLabel = 'Buat Kategori Baru'
export const createPageTitle = 'Buat Kategori'
export const listallPageTitle = 'All Disbursement'
export const detailPageTitle = 'Detail Disbursement Transaction'
export const upsertPageTitle = 'Form Disbursement Transaction'
// export const createService = 'create' + serviceEntity
export const detailService = 'getDetailDisbursementTransaction'
// export const updateService = 'update' + serviceEntity
export const upsertService = 'upsert' + serviceEntity
export const listallService = 'getAllDisbursementStatus'
export const deleteService = 'delete' + serviceEntity +'ById'
// export const fields = { _id: true, disburse_acquirer: true, total_amount: true, merchant_name: true, status: true, account_number: true, bank_code: true }
export const fields = { _id: true, merchant_name: true, email_merchant: true, disburse_acquirer: true, payment_date: true, total_amount: true, status: true, account_number: true, bank_code: true, created_dt: true, updated_dt: true, validated_dt: true, approved_dt: true, validated_by: { _id: true, full_name: true }, approved_by: { _id: true, full_name: true }, created_by: { _id: true, full_name: true }, bank_name: true }
export const getColumns = (history) => [
  {
    Header: ' ',
    accessor: '_id',
    Cell: p => (
      <div className='btn-group'>
        <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
          <span className='sr-only'>Toggle Dropdown</span>
        </button>
        <div className='dropdown-menu' role='menu'>
          <Link className='dropdown-item' to={`${basePath}${redirectAfterCreate}/${p.cell.value}`}>Detail</Link>
        </div>
      </div>)
  },
  { Header: 'Recipient Name', accessor: 'merchant_name' },
  { Header: 'Recipient Email', accessor: 'email_merchant' },
  { Header: 'Total Amount', accessor: p=>toIdr(p.total_amount) },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Account Number', accessor: 'account_number' },
  { Header: 'Bank Code', accessor: 'bank_code' },
  { Header: 'Bank Name', accessor: 'bank_name' },
  { Header: 'Created by', accessor: 'created_by.full_name' },
  { Header: 'Validated by', accessor: 'validated_by.full_name' },
  { Header: 'Approved by', accessor: 'approved_by.full_name' },
  { Header: 'payment date', accessor: p =>{
    console.log("data pnya>>>>",p)
    // 'payment_date'
    return p.payment_date == 'null' ? '-' : p.payment_date 
  }}
  // {
  //   Header: 'Tanggal Dibuat',
  //   accessor: 'created_at',
  //   Cell: d => {
  //     let data = Moment(d.cell.value)
  //     if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
  //     else data = ''
  //     return (<span>{`${data}`}</span>)
  //   }
  // },
  // {
  //   Header: 'Tanggal Dirubah',
  //   accessor: 'updated_at',
  //   Cell: d => {
  //     let data = Moment(d.cell.value)
  //     if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
  //     else data = ''
  //     return (<span>{`${data}`}</span>)
  //   }
  // },

]
export default {
  redirectAfterCreate,
  redirectAfterDelete,
  detailPageUrl,
  upsertPageUrl,
  // createPageUrl,
  createNewButtonLabel,
  createPageTitle,
  listallPageTitle,
  detailPageTitle,
  // updatePageTitle,
  // createService,
  detailService,
  // updateService,
  listallService,
  deleteService,
  upsertService,
  fields,
  getColumns,
  listallPageUrl
}
