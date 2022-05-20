import React from 'react'
import { Link } from 'react-router-dom'
// import _ from 'lodash'
import AppConfig from '../../../core/Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = 'PlTransaction'
const entity = 'pltransaction'
const serviceEntity = 'PlTransaction'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const upsertPageUrl = (id) => (`/${entity}/upsert${id ? '/' + id : ''}`)
export const listallPageUrl = () => (`/${entity}`)
export const createNewButtonLabel = 'Buat Kategori Baru'
export const createPageTitle = 'Buat Kategori'
export const listallPageTitle = 'Kategori'
export const detailPageTitle = 'Detail Kategori'
export const upsertPageTitle = 'Form ' + entityName
export const detailService = 'getDetail' + serviceEntity
export const upsertService = 'upsert' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,trx_code,process_name,transaction_id,elipse_time,process_unixtime_begin,process_unixtime_end,trx_unixtime_begin,trx_unixtime_end'
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
  { Header: 'Trx Code', accessor: 'trx_code' },
  { Header: 'Process Name', accessor: 'process_name' }
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
