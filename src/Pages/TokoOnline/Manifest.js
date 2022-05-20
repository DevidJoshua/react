import React from 'react'
import { Link } from 'react-router-dom'
import AppConfig from '../../core/Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = AppConfig.appName
const entity = 'tokoonline'
const serviceEntity = 'TokoTokoOnline'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const upsertPageUrl = (id) => (`/${entity}/upsert${id ? '/' + id : ''}`)
export const listallPageUrl = () => (`/${entity}`)
export const createNewButtonLabel = 'Buat Baru'
export const createPageTitle = 'Buat Baru'
export const listallPageTitle = 'Daftar Toko'
export const detailPageTitle = 'Toko Detail'
export const upsertPageTitle = 'Form ' + entityName
export const upsertService = 'upsert' + serviceEntity
export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,name,pgateway_id{_id,title,keyid,mid,secretkey,configs},template,image_ids{_id, filename, filenameorigin, file_type},logo{_id, filename, filenameorigin, file_type},address,email,template,plink_merchant_secret_key,province,city,subcity,slug,plink_merchant_id,plink_merchant_key_id,status,website,facebook,instagram,youtube,description,created_at,updated_at,owner{_id,full_name,email},created_by{full_name},updated_by{full_name}'
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
          {/* <Link className='dropdown-item' to={upsertPageUrl(p.cell.value)}>Detail</Link> */}
          <Link className='dropdown-item' to={`${basePath}${redirectAfterCreate}/${p.cell.value}`}>Detail</Link>
        </div>
      </div>)
  },
  { Header: 'Nama', accessor: 'name' },
  { Header: 'website', accessor: 'website' },
  { Header: 'facebook', accessor: 'facebook' },
  { Header: 'instagram', accessor: 'instagram' },
  { Header: 'youtube', accessor: 'youtube' },
  { Header: 'status', accessor: 'status' },
  // {
  //   Header: 'Tanggal Diperbaharui',
  //   accessor: 'updated_at',
  //   Cell: d => {
  //     let data = Moment(d.cell.value)
  //     if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
  //     else data = ''
  //     return (<span>{`${data}`}</span>)
  //   }
  // },
  { Header: 'Pemilik', accessor: 'owner.full_name' }
//   { Header: 'updated by', accessor: 'updated_by.full_name' }
  // { Header: 'created at', accessor: 'created_at' },
  // { Header: 'updated at', accessor: 'updated_at' }
]

export default {
  redirectAfterCreate,
  redirectAfterDelete,
  detailPageUrl,
  upsertPageUrl,
  createNewButtonLabel,
  createPageTitle,
  listallPageTitle,
  detailPageTitle,
  upsertPageTitle,
  createService,
  detailService,
  upsertService,
  listallService,
  deleteService,
  fields,
  getColumns,
  listallPageUrl
}
