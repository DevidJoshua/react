import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { OnOffSwitcherCon } from '../../features/merchantKey'
import AppConfig from '../../core/Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = 'MerchantKey'
const entity = 'merchantKey'
const serviceEntity = 'MerchantKey'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const upsertPageUrl = (id) => (`/${entity}/upsert${id ? '/' + id : ''}`)
export const listallPageUrl = () => (`/${entity}`)
export const createNewButtonLabel = 'Buat Merchant Key Baru'
export const createPageTitle = 'Buat Merchant Key'
export const listallPageTitle = 'MerchantKey'
export const detailPageTitle = 'Detail Merchant Key'
export const upsertPageTitle = 'Form ' + entityName
// export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
// export const updateService = 'update' + serviceEntity
export const upsertService = 'upsert' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,key_encrypt,key_decrypt,key_id,is_active,' +
  'created_at,updated_at,created_by{full_name},updated_by{full_name}'
export const getColumns = (history) => [
  // {
  //   Header: ' ',
  //   accessor: '_id',
  //   Cell: p => (
  //     <div className='btn-group'>
  //       <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
  //         <span className='sr-only'>Toggle Dropdown</span>
  //       </button>
  //       <div className='dropdown-menu' role='menu'>
  //         <Link className='dropdown-item' to={`${basePath}${redirectAfterCreate}/${p.cell.value}`}>Detail</Link>
  //       </div>
  //     </div>)
  // },
  // { Header: 'Secret Key (encrypted)', accessor: 'key_encrypt' },
  { Header: 'Key Id', accessor: 'key_id' },
  { Header: 'Secret Key', accessor: 'key_decrypt' },
  { Header: 'is Active', accessor: 'is_active' }
  // {
  //   Header: 'is_active',
  //   accessor: (p) => {
  //     return (<OnOffSwitcherCon />)
  //   }
  // }
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
