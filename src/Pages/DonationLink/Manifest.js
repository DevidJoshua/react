import React from 'react'
// import { Link } from 'react-router-dom'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = 'DonationLink'
const entity = 'donationlink'
const serviceEntity = 'DonationLink'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const upsertPageUrl = (id) => (`/${entity}/upsert${id ? '/' + id : ''}`)
export const listallPageUrl = () => (`/${entity}`)
export const createNewButtonLabel = 'createNewButtonLabel'
export const createPageTitle = 'createPageTitle'
export const listallPageTitle = 'Link Bayar'
export const detailPageTitle = 'detailPageTitle'
export const upsertPageTitle = 'Form ' + entityName
export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
export const upsertService = 'upsert' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,title,toko_id{_id,name},status,payment_date,transaction_id{_id,payment_page_url,status,payment_date},payment_amount,description,order_code,additional_data1,created_at,updated_at,created_by{full_name},updated_by{full_name}'
export const getColumns = (history) => [
  {
    Header: 'Waktu Dibuat',
    accessor: 'created_at',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  {
    Header: 'Waktu Expired',
    accessor: d => {
      let data
      if ((d.transaction_id || {}).payment_date === undefined || !(d.transaction_id || {}).payment_date) data = ''
      else {
        data = Moment((d.transaction_id || {}).payment_date)
        if (data && data.isValid()) data = data.format('HH:mm:ss')
        else data = ''
      }
      return (<span>{`${data}`}</span>)
    }
  },
  { Header: 'External Id', accessor: p => (<span>{p.additional_data1}</span>) },
  { Header: 'Jumlah', accessor: p => (<span>{p.payment_amount}</span>) },
  { Header: 'Status', accessor: p => (<span>{(p.transaction_id || {}).status || 'pending'}</span>) },
  { Header: 'Nomor Identifikasi',accessor: p => (<span>{(p.transaction_id || {}).status || 'pending'}</span>) },
  {
    Header:"Action",
    accessor: p => {
      if (!p.toko_id || !p.toko_id._id) return null
      return (
        <button
          type='button' onClick={(e) => {
            var dummy = document.createElement('textarea')
            document.body.appendChild(dummy)
            dummy.value = `${AppConfig.hostBackend}/payment-step1/${p.toko_id._id}/${p.order_code}`
            dummy.select()
            document.execCommand('copy')
            document.body.removeChild(dummy)

            alert('Copied the text: ' + dummy.value)
          }} className='btn btn-outline-primary'
        >
          <i className='fa fa-copy' /> {p.order_code}
        </button>)
      },
  }
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
