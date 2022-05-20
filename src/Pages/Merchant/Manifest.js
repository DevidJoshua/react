import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import AppConfig from '../../core/Config/AppConfig'
import {sanitizeValue,toIdr} from '../../core/Utils/Utils'
const basePath = AppConfig.basePath

const entityName = 'Merchant'
const entity = 'merchant'
const serviceEntity = 'Merchant'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const upsertPageUrl = (id) => (`/${entity}/upsert${id ? '/' + id : ''}`)
export const listallPageUrl = () => (`/${entity}`)
export const createNewButtonLabel = 'Buat Merchant Baru'
export const createPageTitle = 'Buat Merchant'
export const listallPageTitle = 'Merchant'
export const detailPageTitle = 'Detail Merchant'
export const upsertPageTitle = 'Form ' + entityName
// export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
// export const updateService = 'update' + serviceEntity
export const upsertService = 'upsert' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,merchant_name,merchant_code,merchant_debitin_id,' +
  'merchant_plink_id,merchant_email,merchant_phone_number,frontend_callback_url,backend_callback_url,' +
  'active_date,is_active,client_token,is_parent,address,merchant_type,merchant_picture,contact_name,contact_phone_number,payment_method_config,' +
  'created_at,updated_at,created_by{full_name},updated_by{full_name},merchant_key{key_encrypt,key_id},merchant_paymentmethod{payment_method_code,configs}'
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
  { Header: 'Merchant Name', accessor: p=>sanitizeValue(p.merchant_name) },
  { Header: 'Code', accessor: p=>sanitizeValue(p.merchant_code) },
  { Header: 'Partner Id', accessor: p=>sanitizeValue(p.merchant_plink_id) },
  { Header: 'Merchant Email', accessor: p=>sanitizeValue(p.merchant_email) },
  { Header: 'Merchant Phone Number', accessor: p=>sanitizeValue(p.merchant_phone_number) },
  { Header: 'Contact Name', accessor: p=>sanitizeValue(p.contact_name) },
  { Header: 'Contact Phone Number', accessor: p=>sanitizeValue(p.contact_phone_number) }
  // {
  //   Header: 'Toko',
  //   accessor: 'toko_id',
  //   Cell: d => {
  //     // let data = Moment(d.cell.value)
  //     // if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
  //     // else data = ''
  //     const toko = (_.map(d.cell.value || [], (v, k) => v.name) || []).join(', ')
  //     return (<span>{`${toko}`}</span>)
  //   }
  // }
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
  // { Header: 'Dibuat Oleh', accessor: 'created_by.full_name' },
  // { Header: 'Dirubah Oleh', accessor: 'updated_by.full_name' }
  // { Header: 'created at', accessor: 'created_at' },
  // { Header: 'updated at', accessor: 'updated_at' }
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
