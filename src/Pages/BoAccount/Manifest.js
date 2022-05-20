import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { NeedApprovalCheckBox } from '../../features/NeedApproval'
import AppConfig from '../../core/Config/AppConfig'
import {sanitizeValue} from '../../core/Utils/Utils'

import Moment from 'moment'
const basePath = AppConfig.basePath

const entityName = 'Account'
export const entity = 'account'
const serviceEntity = 'BankAccount'

export const redirectAfterCreate = '/account-number-detail'
export const redirectAfterDelete = '/all-bank-account'
export const detailPageUrl = (id) => (`/account-number-detail/${id}`)
export const upsertPageUrl = (id) => (`/form-account-number${id ? '/' + id : ''}`)
export const listallPageUrl = () => ('/all-bank-account')
export const createNewButtonLabel = 'Buat Kategori Baru'
export const createPageTitle = 'Detail Bank Account'
export const listallPageTitle = 'All Bank Accounts'
export const needApprovalListallPageTitle = 'Need Approval Bank Accounts'
export const detailPageTitle = 'Detail Bank Account'
export const upsertPageTitle = 'Form ' + entityName
// export const createService = 'create' + serviceEntity
export const detailService = 'getDetailBankAccountById'
// export const updateService = 'update' + serviceEntity
export const upsertService = 'upsertAccountNumber'

export const opApproveAccountNumberService = 'approveBankAccount'
export const opRejectAccountNumberService = 'rejectBankAccount'

export const approvedAccountNumberlistallService = 'getAllBankAccount'
export const getAllBankAccount = 'getAllBankAccount'

export const needApprovalAccountNumberlistallService = 'getAllNeedApprovalBankAccount'
export const deleteService = 'delete' + serviceEntity +'ById'
export const fields = { _id: true, bank_code_id: { _id: true,bank_code:true }, bank_code: true, bank_name: true, status: true, description: true, account_number: true, created_at: true, updated_at: true, created_by: { _id: true, full_name: true, email: true }, validated_by: { _id: true, full_name: true, email: true , updated_at:true }, approved_by: { _id: true, email: true, full_name: true }, account_name: true }
// export const fields = '_id,status,description,account_number,created_at,updated_at,created_by{_id,full_name},validated_by{_id,full_name},approved_by{_id,email,full_name},account_name'
export const getApprovedBankAccountColumns = (history) => [
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
  { Header: 'Account Name', accessor: p=>sanitizeValue(p.account_name) },
  { Header: 'Account Number', accessor: p=>sanitizeValue(p.account_number) },
  { Header: 'Bank Code', accessor: p=>sanitizeValue(p.bank_code) },
  { Header: 'Bank Name', accessor: p=>sanitizeValue(p.bank_name) },
  { Header: 'description', accessor: p=>sanitizeValue(p.description) },
  { Header: 'Status', accessor: p=>sanitizeValue(p.status) },
  { Header: 'created by', accessor: p => <span>{sanitizeValue((p.created_by || {}).full_name)}</span> },
  { Header: 'approved by', accessor: 'approved_by.full_name' }
]

export const getNeedApprovalBankAccountColumns = (history) => [
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
  { Header: 'Receipt Name', accessor: p=>sanitizeValue(p.account_name) },
  { Header: 'Receipt Number', accessor: p=>sanitizeValue(p.account_number) },
  { Header: 'Bank Code', accessor: p=>sanitizeValue(p.bank_code) },
  { Header: 'Bank Name', accessor: p=>sanitizeValue(p.bank_name) },
  { Header: 'Description', accessor: p=>sanitizeValue(p.description) },
  { Header: 'Status', accessor: p=>sanitizeValue(p.status) },
  { Header: 'Validated by', accessor: p => <span>{sanitizeValue((p.validated_by || {}).full_name)}</span> },
  { Header: 'Validated date', accessor: p =>{
    const date = Moment(p.created_at)
    const dt = p.created_at === null || p.created_at === undefined ? '-' : date.format(AppConfig.datetimeFormat)
    return sanitizeValue(dt)
  }},
  { Header: 'Created by', accessor: p => <span>{(sanitizeValue(p.created_by || {}).full_name)}</span> },
  { Header: 'Created at', accessor: p =>{
    const date = Moment(p.created_at)
    const dt = p.created_at === null || p.created_at === undefined ? '-' : date.format(AppConfig.datetimeFormat)
    return sanitizeValue(dt)
  }},
  { Header: 'Updated at', accessor: p =>{
    const date = Moment(p.updated_at)
    const dt = p.updated_at === null || p.updated_at === undefined ? '-' : date.format(AppConfig.datetimeFormat)
    return sanitizeValue(dt)
  } },
  {
    Header: 'set',
    accessor: p => {
      if(!_.has(p,'validated_by._id')) return(<></>)
      return (
        <>
          <div className='form-check'>
            <NeedApprovalCheckBox idComparison={ p.validated_by._id} transactionId={p._id} />
          </div>
        </>
      )
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
  // listallService,
  deleteService,
  upsertService,
  fields,
  listallPageUrl
}
