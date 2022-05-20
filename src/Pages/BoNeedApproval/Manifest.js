import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { NeedApprovalCheckBox } from '../../features/NeedApproval'
import AppConfig from '../../core/Config/AppConfig'
import {sanitizeValue} from '../../core/Utils/Utils'
import Moment from 'moment'
import { toIdr } from 'core/Utils/Utils'

const basePath = AppConfig.basePath
const entityName = 'Category'
const entity = 'category'
const serviceEntity = 'DisbursementNeedApproval'


export const opApproveAccountNumberService = 'needapprovalCheckboxSubmitApprove'
export const opRejectAccountNumberService = 'needapprovalCheckboxSubmitReject'

export const redirectAfterCreate = '/disbursement-transaction-detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/disbursement-transaction-detail/${id}`)
export const upsertPageUrl = (id) => (`/${entity}/upsert${id ? '/' + id : ''}`)
export const listallPageUrl = () => (`/${entity}`)
export const createNewButtonLabel = 'Buat Kategori Baru'
export const createPageTitle = 'Buat Kategori'
export const listallPageTitle = 'Need Approval'
export const detailPageTitle = 'Detail Kategori'
export const upsertPageTitle = 'Form ' + entityName
// export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
// export const updateService = 'update' + serviceEntity
export const upsertService = 'upsert' + serviceEntity
export const listallService = 'getAll' + serviceEntity
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,merchant_name, email_merchant, total_amount,status,account_number,bank_code,bank_name,created_dt,updated_dt,validated_dt,validated_by{_id,full_name}'
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
  { Header: 'Recipient Name', accessor: p=>sanitizeValue(p.merchant_name) },
  { Header: 'Recipient Email', accessor: p=>sanitizeValue(p.email_merchant) },
  { Header: 'Total Amount', accessor: p => sanitizeValue(toIdr(p.total_amount)) },
  { Header: 'Status', accessor: p=>sanitizeValue(p.status) },
  { Header: 'Account Number', accessor: p=>sanitizeValue(p.account_number) },
  { Header: 'Bank Code', accessor: p=>sanitizeValue(p.bank_code) },
  { Header: 'Bank Name', accessor: p=>sanitizeValue(p.bank_name) },
  { Header: 'Validated at', accessor: p => {
    const date = Moment(p.validated_dt)
    const dt = p.validated_dt === null || p.validated_dt === undefined ? '-' : date.format(AppConfig.datetimeFormat)
    return sanitizeValue(dt)
  } },
  { Header: 'Validated by', accessor: 'validated_by.full_name' },
  {
    Header: 'set',
    accessor: p => {
      // if(_.has(p,'_id')|| _.has(p,['_id'])) return(<></>)
      return (
        <div className='form-check'>
          <NeedApprovalCheckBox transactionId={p._id} idComparison={p.validated_by._id} />
        </div>)
    }
  }
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
