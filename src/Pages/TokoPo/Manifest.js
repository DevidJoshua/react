import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = 'PurchaseOrder'
const entity = 'purchaseorder'
const serviceEntity = 'TokoPo'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const upsertPageUrl = (id) => (`/${entity}/upsert${id ? '/' + id : ''}`)
export const listallPageUrl = () => (`/${entity}`)
export const createNewButtonLabel = 'Buat Pesanan Baru'
export const createPageTitle = 'Buat order baru'
export const listallPageTitle = 'Data Pembelian'
export const detailPageTitle = 'Data Detail Pembelian'
export const upsertPageTitle = 'Form ' + entityName
export const upsertService = 'upsert' + serviceEntity
export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,payment_link_id,payment_status,pg_trx_id,total_weight,shipping_currier_vendor,shipping_postal_code, isneed_shipping, payment_method, payment_method_id{_id,title,description},notes,postal_fee_type,action,create_from,payment_date,shipping_currier,payment_page_url,full_name,phone_number,unique_code,invoice_code,email,session_id,device_id,shipping_subcity,shipping_city,shipping_province,shipping_address,total_product_amount,total_amount,shipping_amount,cart_id{_id, notes, count, amount, toko_id{_id, name, address, province, city, subcity}, product_id{_id, price, isneed_shipping, weight, name}},toko_id{_id, name, address, province, city, subcity},created_at,updated_at,created_by{full_name},updated_by{full_name}'
export const getColumns = (history, intl) => [
  {
    Header: 'Act',
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
  {
    Header: 'Status',
    accessor: p => {
      // p.action === 'checkoutProcess' ? 'proses checkout' : p.action === 'paymentProcess' ? 'proses pembayaran' : '-' }
      const map = {
        paymentProcess: 'proses pembayaran',
        checkoutProcess: 'proses checkout',
        doPayment: 'Pembayaran Selesai',
        paymentSuccess: 'Pembayaran Selesai',
        paymentFailed: 'Pembayaran Selesai'
      }
      return map[p.action] || '-'
    }
  },
  { Header: 'PG Ref No.', accessor: 'pg_trx_id' },
  { Header: 'Status Pembayaran', accessor: 'payment_status' },
  { Header: 'Payment Method', accessor: 'payment_method' },
  { Header: 'Nama', accessor: 'full_name' },
  { Header: 'No Invoice', accessor: 'invoice_code' },
  { Header: 'Toko', accessor: 'toko_id.name' },
  {
    Header: 'Total Pembayaran',
    accessor: p => {
      return intl.formatNumber(p.total_amount, { style: 'currency', currency: AppConfig.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }
    // accessor: p => (<T value={p.total_amount} style='currency' currency='IDR' />)
  },
  {
    Header: 'Tanggal Transaksi',
    accessor: 'updated_at',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  {
    Header: 'Tanggal Pembayaran',
    accessor: 'payment_date',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  // { Header: 'No Telepon', accessor: 'phone_number' },
  {
    Header: 'Link Pembayaran',
    accessor: p => {
      if (!p.session_id) return null
      return (
        <button
          type='button' onClick={(e) => {
            var dummy = document.createElement('textarea')
            document.body.appendChild(dummy)
            dummy.value = `${AppConfig.hostBackend}/payment/${p.payment_link_id}`
            dummy.select()
            document.execCommand('copy')
            document.body.removeChild(dummy)

            // var copyText = document.createElement('input')
            // copyText.type = 'text'
            // copyText.style.cssText = 'display: none;'
            // copyText.value = `${AppConfig.hostBackend}/payment/${detail.session_id}`
            // // element.id = '';
            // // var copyText = document.getElementById('linkPaymentId')
            // copyText.select()
            // copyText.setSelectionRange(0, 99999)
            // document.execCommand('copy')
            alert('Copied the text: ' + dummy.value)
          }} className='btn btn-outline-primary'
        >
          <i className='fa fa-copy' /> Link Pembayaran
        </button>)
    }
  }
  // { Header: 'Email', accessor: 'email' },
  // { Header: 'ID Sesi', accessor: 'session_id' },
  // { Header: 'Jasa Pengiriman', accessor: 'shipping_currier' },
  // { Header: 'Catatan', accessor: 'notes' },
  //   { Header: 'category', accessor: p => (<span>{(_.map(p.category_id, v => v.title) || []).join(', ')}</span>) },
  //   { Header: 'toko', accessor: p => (<span>{(_.map(p.toko_id, v => v.name) || []).join(', ')}</span>) },
  // { Header: 'picture', accessor: p => (<span>{p.image_id.filename}.{p.image_id.file_type}</span>) },
  //   {
  //     Header: 'created_at',
  //     accessor: 'created_at',
  //     Cell: d => {
  //       let data = Moment(d.cell.value)
  //       if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
  //       else data = ''
  //       return (<span>{`${data}`}</span>)
  //     }
  //   },

  // {
  //   Header: 'Tanggal Pembayaran',
  //   accessor: 'payment_date',
  //   Cell: d => {
  //     let data = Moment(d.cell.value)
  //     if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
  //     else data = ''
  //     return (<span>{`${data}`}</span>)
  //   }
  // }
  // { Header: 'created by', accessor: 'created_by.full_name' }
//   { Header: 'updated by', accessor: 'updated_by.full_name' }
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
