import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import AppConfig from '../../core/Config/AppConfig'
import { NeedValidateCheckBoxCon } from 'features/NeedValidation'
import { toIdr } from 'core/Utils/Utils'
const basePath = AppConfig.basePath

const entityName = 'DisbursementNeedValidation'
const entity = 'DisbursementNeedValidation'
const serviceEntity = 'DisbursementNeedValidation'

export const redirectAfterCreate = '/disbursement-transaction-detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/disbursement-transaction-detail/${id}`)
export const upsertPageUrl = (id) => (`/${entity}/upsert${id ? '/' + id : ''}`)
export const listallPageUrl = () => (`/${entity}`)
export const createNewButtonLabel = 'Buat Kategori Baru'
export const createPageTitle = 'Buat Kategori'
export const listallPageTitle = 'Need Validation'
export const detailPageTitle = 'Detail Kategori'
export const upsertPageTitle = 'Form ' + entityName
// export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
// export const updateService = 'update' + serviceEntity
export const upsertService = 'upsert' + serviceEntity
export const listallService = 'getAll' + serviceEntity
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,merchant_name,email_merchant,total_amount,status,account_number,bank_code,bank_name,payment_date,created_dt,updated_dt,created_by{_id, full_name}'
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
  { Header: 'Total Amount', accessor: p => toIdr(p.total_amount) },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Account Number', accessor: 'account_number' },
  { Header: 'Bank Code', accessor: 'bank_code' },
  { Header: 'Bank Name', accessor: 'bank_name' },
  { Header: 'Created at', accessor: 'created_dt' },
  { Header: 'Created by', accessor: 'created_by.full_name' },
  { Header: 'payment date', accessor: p=>p.payment_date === 'null' ? '-' : p.payment_date },
  {
    Header: 'set',
    accessor: p => {
      console.log("data p>>>>",p)
      // const thePriv = _.find(dataDetail.privilege_id, { name: p.cell.value })
      // console.log('thePriv====>', thePriv)
      // if (!_.isEmpty(thePriv)) {
      //   priv[p.cell.value] = true
      //   console.log(`set ${p.cell.value} menjadi true`)
      // }
      // setPrivilege({ ...privilege, [p.cell.value]: true })
      // console.log(`privvvv====>${p.cell.value}===>${priv[p.cell.value]}`)
      // const v = path(['_id'], p)
      // const label = path(['name'], p)
      return (
        <div className='form-check'>
          <NeedValidateCheckBoxCon transactionId={p._id} idComparison={p.created_by._id}/>
          {/* <input type='checkbox' className='form-check-input' id='exampleCheck1' onChange={(e) => {}} checked={priv[p.cell.value] ? true : false } onClick={(e) => { priv[p.cell.value] = e.target.checked }} /> */}
          {/* <label className='form-check-label' htmlFor='exampleCheck1'>{label}</label> */}
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
