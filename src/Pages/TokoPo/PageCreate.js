import React, { useEffect } from 'react'
import _ from 'lodash'
import Loader from '../../core/Components/Loader/Loader'
import { Create as Createform, Combobox, MultiselectCheckbox as MultiCheckbox } from '../../core/features/TablePagination'
import Immutable from 'seamless-immutable'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { injectIntl } from 'react-intl'
import { getAccessToken, generateRandomNumber, callErrorToast } from '../../core/Utils/Utils'
import { FieldProvince, FieldCity, FieldSubCity } from '../../features/SetLocation/components'
import { path } from 'ramda'
import { createService, fields, createPageTitle, redirectAfterCreate } from './Manifest'
import ProductManifest from '../Product/Manifest'
import TokoOnlineManifest from '../TokoOnline/Manifest'
import PaymentMethodManifest from '../PaymentMethod/Manifest'
import AppConfig from '../../core/Config/AppConfig'

const paginationConfig = {
  serviceName: createService,
  fields: fields
}

let tablepaginationOnChangeFormFunc = null

const MultiselectCheckbox = React.memo(props => {
  const tablepaginationOnChangeForm = props.tablepaginationOnChangeForm
  const tokoId = props.tokoId
  // const shippingAmount = props.shippingAmount
  return (
    <MultiCheckbox
      buttonModalLabel='Tambah Produk'
      buttonAddLabel='Pilih'
      listallService={ProductManifest.listallService + 'ByTokoIdAndWithStock'}
      fields={ProductManifest.fields}
      columns={({ currentValue, setListData }) => {
        return [
          { Header: 'Nama', accessor: 'name' },
          { Header: 'Berat', accessor: p => p.isneed_shipping === 'Y' ? p.weight : '-' },
          { Header: 'Butuh Ongkir', accessor: p => p.isneed_shipping === 'Y' ? 'ya' : 'tidak' },
          {
            Header: 'Stok',
            accessor: p => {
              if (p.product_availability === 'use_stock') return p.stock_amount
              else return 'selalu ada stock'
            }
          },
          {
            Header: 'Jumlah',
            accessor: p => {
              let val = {}
              if (currentValue !== undefined) val = currentValue
              if (val['' + p._id] === undefined) val['' + p._id] = {}
              if (val['' + p._id].qty === undefined) val['' + p._id].qty = 0
              if (val['' + p._id].object === undefined) val['' + p._id].object = {}
              return (
                <input
                  style={{ width: 70 }} type='number' id='qty' placeholder='' value={val['' + p._id].qty} onChange={(e) => {
                    if (e.target.value < 0) return
                    val['' + p._id].qty = e.target.value
                    val['' + p._id].object = p
                    setListData(JSON.stringify(val || {}))
                    // tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'list_products', fieldValue: val })
                  }}
                />
              )
            }
          },
          {
            Header: 'Catatan',
            accessor: (p, ex) => {
              let val = {}
              if (currentValue !== undefined) val = currentValue
              if (val['' + p._id] === undefined) val['' + p._id] = {}
              if (val['' + p._id].qty === undefined) val['' + p._id].qty = 0
              if (val['' + p._id].object === undefined) val['' + p._id].object = {}
              if (val['' + p._id].notes === undefined) val['' + p._id].notes = ''
              return (
                <textarea
                  style={{ height: 40 }}
                  type='text' id='notes' placeholder='' onChange={(e) => {
                    val['' + p._id].notes = e.target.value
                    val['' + p._id].object = p
                    setListData(JSON.stringify(val || {}))
                    // tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'list_products', fieldValue: val })
                  }}
                  value={val['' + p._id].notes}
                />
              )
            }
          }
          // {
          //   Header: 'Check',
          //   accessor: p => {
          //     let val = {}
          //     if (currentValue !== undefined) val = currentValue
          //     if (val['' + p._id] === undefined) val['' + p._id] = {}
          //     if (val['' + p._id].qty === undefined) val['' + p._id].qty = 0
          //     if (val['' + p._id].object === undefined) val['' + p._id].object = {}
          //     return (
          //       <input
          //         type='checkbox' checked={val['' + p._id].checked} onChange={(e) => {
          //           val['' + p._id].checked = e.target.checked
          //           val['' + p._id].object = p
          //           // tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'list_products', fieldValue: val })
          //           setListData(JSON.stringify(val || {}))
          //         }}
          //       />
          //     )
          //   }
          // }
        ]
      }}
      onChange={val => {
        let wgt = 0
        let isneedShipping = 'N'
        const uniqueCode = generateRandomNumber(3)
        const currentValue = val
        if (currentValue !== undefined) {
          let totalHarga = 0
          const cartProduct = []
          for (var i in currentValue) {
            const v = currentValue[i]
            if (v.checked) {
              const p = v.object
              if (p.isneed_shipping === 'Y') {
                wgt += parseFloat(p.weight) * v.qty
                isneedShipping = 'Y'
              }
              const harga = parseInt(p.price) * v.qty
              totalHarga += harga
              // totalAmount = parseInt(uniqueCode) + parseInt(totalHarga) + parseInt(shippingAmount || 0)
              // cartProduct.push({ count: parseInt(v.qty), amount: parseInt(harga), product_id: '' + p._id })
              const formFieldProducts = `{ notes: "${v.notes}", count: ${parseInt(v.qty)}, amount: ${parseInt(harga)}, product_id: "${'' + p._id}" }`
              console.log('formFieldProducts===>', formFieldProducts)
              cartProduct.push(formFieldProducts)
            }
          }
          console.log('wgtwgtwgtwgt=>', wgt)
          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'total_product_amount', fieldValue: totalHarga })
          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'unique_code', fieldValue: parseInt(uniqueCode) })
          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'total_weight', fieldValue: wgt })
          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'isneed_shipping', fieldValue: isneedShipping })
          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'cart_products', fieldValue: cartProduct })
        }
      }}
      // fieldName='list_products'
      // currentValue={currentValue}
      whereCondition={{ toko_id: tokoId }}
    />
  )
})

function Comp (props) {
  const { history, intl } = props
  // const { provinces, cities, subcities } = this.state
  // const [error, setError] = React.useState('')

  const [subCurrierList, setSubCurrierList] = React.useState([])
  const [subcurrierIsLoaded, setSubcurrierIsLoaded] = React.useState(false)

  const [tokoDetail, setTokoDetail] = React.useState({})
  // const [postalFeeType, setPostalFeeType] = React.useState(null)
  const [payload, setPayload] = React.useState({})
  const servicePayload = payload[createService] || {}
  // const servicePayload = payload[createService] || {}
  const fetchShippingCost = ({ kurir, weight }) => {
    console.log('payload=======>', payload)
    const body = {
      origin: tokoDetail.subcity,
      originType: 'subdistrict',
      destinationType: 'subdistrict',
      destination: servicePayload.shipping_subcity || '',
      weight: parseFloat(weight),
      courier: kurir
    }
    setSubcurrierIsLoaded(true)
    fetch(
      AppConfig.hostBackend + '/api/v1/fetchdata-cost',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(
        (result) => {
          setSubcurrierIsLoaded(false)
          console.log('result====>', result)
          const status = path(['rajaongkir', 'status', 'code'], result)
          const description = path(['rajaongkir', 'status', 'description'], result) || ''
          if (status !== 200) {
            if ((description).includes('Weight harus lebih besar dari 0')) return alert('Berat barang tidak boleh kurang dari 1 Gram.')
            return alert(description)
          }
          setSubCurrierList(result.rajaongkir.results[0].costs)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setSubcurrierIsLoaded(false)
          console.log(error)
          // setError(error)
        }
      )
  }
  useEffect(() => {
    window.activateEditor({
      hostBackend: AppConfig.hostBackend,
      at: getAccessToken(),
      cb: (content) => {
        tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
      }
    })
  }, [tokoDetail])
  // }, [JSON.stringify(tokoDetail)])

  useEffect(() => {
    if (tablepaginationOnChangeFormFunc) {
      const totalAmount = parseFloat(servicePayload.shipping_amount || 0) + parseFloat(servicePayload.total_product_amount || 0) + parseFloat(servicePayload.unique_code || 0)
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'total_amount', fieldValue: totalAmount })
    }
  }, [servicePayload.shipping_amount, servicePayload.total_product_amount, servicePayload.unique_code])
  const courierList = [
    { value: 'jne', label: 'jne' },
    { value: 'jnt', label: 'jnt' },
    { value: 'tiki', label: 'tiki' },
    { value: 'sicepat', label: 'sicepat' },
    { value: 'wahana', label: 'wahana' },
    { value: 'ninja', label: 'ninja' },
    { value: 'pos', label: 'pos' }
  ]

  // const tokoId = servicePayload.toko_id || ''
  return (
    <ContentWrapper
      pageTitle={createPageTitle}
      breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: 'Daftar Pembelian', link: '/purchaseorder' }, { title: createPageTitle, link: null, isActive: true }]}
      contentHeaderTitle={createPageTitle}
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Createform
            formTitle={createPageTitle}
            paginationConfig={paginationConfig}
            redirectAfterCreate={redirectAfterCreate}
            child={(tablepaginationOnChangeForm, payload) => {
              tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
              const pLoad = Immutable.asMutable(path([paginationConfig.serviceName], payload) || {}, { deep: true })
              // setServicePayload(pLoad)
              // console.log('childchildchildchildchildchild')
              setPayload(payload)
              return (
                <>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label htmlFor='parent_id'>Pilih Toko</label>
                        {/* <input type='text' className='form-control' id='grading_id' placeholder='Enter grading code' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'grading_id', fieldValue: e.target.value })} /> */}
                        <Combobox
                          label='pilih toko'
                          name='toko_id'
                          id='toko_id'
                          maxOptions={50}
                          fetchDataConfig={{
                            serviceName: TokoOnlineManifest.listallService,
                            fields: TokoOnlineManifest.fields
                          }}
                          optionColumnValue='_id'
                          optionColumnLabel='name'
                          defaultValue=''
                          onChange={(e, allDataOption) => {
                            const toko = _.find(allDataOption, { _id: e.target.value })
                            console.log('allDataOption====>', allDataOption)
                            console.log('toko====>', toko)
                            if (!toko.subcity) {
                              callErrorToast('Alamat toko belum lengkap.', 'error')
                              tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'toko_id', fieldValue: null })
                              return
                            }

                            tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'toko_id', fieldValue: e.target.value })
                            tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'cart_products', fieldValue: [] })
                            tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_address', fieldValue: '' })
                            tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_province', fieldValue: '' })
                            tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_city', fieldValue: '' })
                            tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_subcity', fieldValue: '' })
                            tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_currier_vendor', fieldValue: '' })
                            tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_currier', fieldValue: '' })
                            tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_amount', fieldValue: 0 })
                            setTokoDetail(toko)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {(!_.isEmpty(pLoad.toko_id) && pLoad.toko_id !== 'pilih toko') &&
                    <div className='row'>
                      <div className='col-sm-6'>
                        <div className='row'>
                          <div className='col-sm-12'>
                            <div className='card'>
                              <div className='card-header'>
                                <h3 className='card-title'>Daftar Produk</h3>
                              </div>
                              <div className='card-body'>
                                <MultiselectCheckbox
                                  tokoId={pLoad.toko_id}
                                  tablepaginationOnChangeForm={tablepaginationOnChangeForm}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-12'>
                            <div className='card'>
                              <div className='card-header' data-card-widget='collapse'>
                                <h3 className='card-title'>Total Harga</h3>
                              </div>
                              <div className='card-body'>
                                <table className='table table-bordered'>
                                  {/* <thead>
                                    <tr>
                                      <th>Nama Produk</th>
                                      <th>Jumlah</th>
                                      <th style={{ width: 40 }}>Pilih</th>
                                    </tr>
                                  </thead> */}
                                  <tbody>
                                    <tr>
                                      <td>Ongkos Kirim</td>
                                      <td>{intl.formatNumber(pLoad.shipping_amount || 0, { style: 'currency', currency: AppConfig.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                    </tr>
                                    <tr>
                                      <td>Harga Produk</td>
                                      <td>{intl.formatNumber(pLoad.total_product_amount || 0, { style: 'currency', currency: AppConfig.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                      {/* <td>{servicePayload.total_product_amount}</td> */}
                                    </tr>
                                    <tr>
                                      <td>Kode Uniq</td>
                                      <td>{pLoad.unique_code || 0}</td>
                                    </tr>
                                    <tr>
                                      <td />
                                      <td>{intl.formatNumber(pLoad.total_amount || 0, { style: 'currency', currency: AppConfig.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            {process.env.REACT_APP_SHOW_FORMFIELD_PAYMENTMETHOD &&
                              <div className='card'>
                                <div className='card-header' data-card-widget='collapse'>
                                  <h3 className='card-title'>Metode Pembayaran</h3>
                                </div>
                                <div className='card-body'>
                                  <div className='form-group'>
                                    <label htmlFor='parent_id'>Pilih Metode Pembayaran</label>
                                    {/* <input type='text' className='form-control' id='grading_id' placeholder='Enter grading code' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'grading_id', fieldValue: e.target.value })} /> */}
                                    <Combobox
                                      label='pilih metode pembayaran'
                                      name='payment_method_id'
                                      id='payment_method_id'
                                      maxOptions={50}
                                      fetchDataConfig={{
                                        serviceName: PaymentMethodManifest.listallService,
                                        fields: PaymentMethodManifest.fields
                                      }}
                                      optionColumnValue='_id'
                                      optionColumnLabel='title'
                                      defaultValue=''
                                      onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'payment_method_id', fieldValue: e.target.value })}
                                    />
                                  </div>
                                  
                                </div>
                              </div>}
                          </div>
                        </div>
                      </div>
                      <div className='col-sm-6'>
                        <div className='row'>
                          <div className='col-sm-12'>
                            <div className='card'>
                              <div className='card-header' data-card-widget='collapse'>
                                <h3 className='card-title'>Data Pembeli</h3>
                              </div>
                              <div className='card-body'>
                                <div className='form-group'>
                                  <label htmlFor='full_name'>Nama</label>
                                  <input type='text' className='form-control' id='full_name' placeholder='masukan nama pembeli' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'full_name', fieldValue: e.target.value })} />
                                </div>
                                <div className='form-group'>
                                  <label htmlFor='phone_number'>Nomor Telepon</label>
                                  <input type='text' className='form-control' id='phone_number' placeholder='' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'phone_number', fieldValue: e.target.value })} />
                                </div>
                                <div className='form-group'>
                                  <label htmlFor='email'>Email</label>
                                  <input type='text' className='form-control' id='email' placeholder='' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'email', fieldValue: e.target.value })} />
                                </div>
                                <div className='form-group'>
                                  <label htmlFor='shipping_address'>Alamat Pengiriman</label>
                                  <input type='text' className='form-control' id='shipping_address' value={servicePayload.shipping_address} placeholder='' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_address', fieldValue: e.target.value })} />
                                </div>
                                <div className='form-group'>
                                  <label htmlFor='shipping_postal_code'>Kode Pos</label>
                                  <input type='text' className='form-control' id='shipping_postal_code' placeholder='' value={servicePayload.shipping_postal_code} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_postal_code', fieldValue: e.target.value })} />
                                </div>
                                <div className='form-group'>
                                  <label htmlFor='order_notes'>Catatan</label>
                                  <textarea type='text' className='form-control' id='order_notes' placeholder='' value={servicePayload.notes} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'notes', fieldValue: e.target.value })}>{servicePayload.notes}</textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                          {pLoad.isneed_shipping === 'Y' && (
                            <div className='col-sm-12'>
                              <div className='card'>
                                <div className='card-header' data-card-widget='collapse'>
                                  <h3 className='card-title'>Ongkos Kirim</h3>
                                </div>
                                <div className='card-body'>
                                  <div className='form-group'>
                                    {/* <label htmlFor='postal_fee_type'>Ongkos Kirim:</label> */}
                                    <div class='form-check'>
                                      <input className='form-check-input' type='radio' name='postal_fee_type' id='postal_fee_type_auto' defaultValue='auto' checked={servicePayload.postal_fee_type === 'auto'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'postal_fee_type', fieldValue: e.target.value })} />
                                      <label className='form-check-label' htmlFor='postal_fee_type_auto'>Hitung Ongkos Kirim </label>
                                    </div>
                                    <div class='form-check'>
                                      <input className='form-check-input' type='radio' name='postal_fee_type' id='postal_fee_type_manual' defaultValue='manual' checked={servicePayload.postal_fee_type === 'manual'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'postal_fee_type', fieldValue: e.target.value })} />
                                      <label className='form-check-label' htmlFor='postal_fee_type_manual'>Ongkos Kirim Manual</label>
                                    </div>
                                  </div>
                                  {servicePayload.postal_fee_type === 'manual' &&
                                    <div className='form-group'>
                                      <label htmlFor='shipping_amount'>Ongkos Kirim</label>
                                      <input
                                        type='number' className='form-control' id='shipping_amount' placeholder='' value={servicePayload.shipping_amount} onChange={e => {
                                          if (e.target.value < 0) return
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_amount', fieldValue: parseFloat(e.target.value) })
                                        }}
                                      />
                                    </div>}

                                  {servicePayload.postal_fee_type === 'auto' &&
                                    <>
                                      <FieldProvince
                                        withLabel
                                        defaultValue={path([paginationConfig.serviceName, 'shipping_province'], payload)}
                                        onChange={(v) => {
                                          console.log('pLoad.total_weightpLoad.total_weight=>', pLoad.total_weight)
                                          if (!tokoDetail.subcity) return callErrorToast('Ongkos kirim tidak bisa dihitung karena alamat toko anda belum lengkap.', 'error')
                                          // if (!(pLoad.total_weight && parseFloat(pLoad.total_weight) <= 1)) return callErrorToast('Ongkos kirim tidak bisa dihitung berat barang masih kosong', 'error')
                                          if (parseFloat(pLoad.total_weight) <= 1 || !pLoad.total_weight) return callErrorToast('Ongkos kirim tidak bisa dihitung berat barang masih kosong', 'error')
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_province', fieldValue: v })
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_currier_vendor', fieldValue: '' })
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_currier', fieldValue: '' })
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_amount', fieldValue: 0 })
                                        }}
                                      />
                                      <FieldCity
                                        withLabel
                                        defaultValue={path([paginationConfig.serviceName, 'shipping_city'], payload)}
                                        provinceId={path([paginationConfig.serviceName, 'shipping_province'], payload)}
                                        onChange={(v) => {
                                          if (!tokoDetail.subcity) return callErrorToast('error', 'Ongkos kirim tidak bisa dihitung karena alamat toko anda belum lengkap.')
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_city', fieldValue: v })
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_currier_vendor', fieldValue: '' })
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_currier', fieldValue: '' })
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_amount', fieldValue: 0 })
                                        }}
                                      />
                                      <FieldSubCity
                                        withLabel
                                        defaultValue={path([paginationConfig.serviceName, 'shipping_subcity'], payload)}
                                        cityId={path([paginationConfig.serviceName, 'shipping_city'], payload)}
                                        onChange={(v) => {
                                          if (!tokoDetail.subcity) return callErrorToast('error', 'Ongkos kirim tidak bisa dihitung karena alamat toko anda belum lengkap.')
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_subcity', fieldValue: v })
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_currier_vendor', fieldValue: '' })
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_currier', fieldValue: '' })
                                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_amount', fieldValue: 0 })
                                        }}
                                      />
                                      {servicePayload.shipping_city &&
                                        <div className='form-group'>
                                          <label htmlFor='shipping_currier_vendor'>Kurir</label>
                                          <select
                                            name='shipping_currier_vendor'
                                            id='shipping_currier_vendor'
                                            class='custom-select'
                                            onChange={e => {
                                              if (!tokoDetail.subcity) return callErrorToast('error', 'Ongkos kirim tidak bisa dihitung karena alamat toko anda belum lengkap.')
                                              fetchShippingCost({ kurir: e.target.value, weight: pLoad.total_weight })
                                              tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_currier', fieldValue: '' })
                                              tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_amount', fieldValue: 0 })
                                              tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_currier_vendor', fieldValue: e.target.value })
                                            }}
                                          >
                                            <option key='-'>pilih</option>
                                            {courierList.map((v, i) => {
                                              if (servicePayload.shipping_currier_vendor === v.value) return (<option key={i} value={v.value} selected>{v.label}</option>)
                                              else return (<option key={i} value={v.value}>{v.label}</option>)
                                            })}
                                          </select>
                                        </div>}
                                      {servicePayload.shipping_currier_vendor &&
                                        <div className='form-group'>
                                          <label htmlFor='shipping_currier'>Layanan Kurir</label>
                                          {subcurrierIsLoaded && <Loader loading type='rpmerah' />}
                                          {!subcurrierIsLoaded &&
                                            <select
                                              name='shipping_currier'
                                              id='shipping_currier'
                                              class='custom-select'
                                              onChange={e => {
                                                const v = JSON.parse(e.target.value)
                                                tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_currier', fieldValue: v.service })
                                                tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'shipping_amount', fieldValue: parseFloat(v.cost[0].value) })
                                              }}
                                            >
                                              <option key='-'>pilih</option>
                                              {subCurrierList.map((v, k) => {
                                                if (servicePayload.shipping_currier !== v.value) return (<option key={k} value={JSON.stringify(v)}>{v.service}</option>)
                                                else return (<option key={k} value={JSON.stringify(v)} selected>{v.service}</option>)
                                              })}
                                            </select>}
                                        </div>}
                                    </>}

                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>}
                </>
              )
            }}
            footerCard={({ tablepaginationSubmitForm, payload }) => {
              return (
                <>
                  <button style={{ width: 100 }} type='button' className='btn bg-gradient-warning' onClick={e => history.goBack()}>Cancel</button>
                  <button
                    style={{ width: 100, marginLeft: 5 }} type='button' className='btn bg-gradient-primary' onClick={(e) => {
                      tablepaginationSubmitForm({
                        fields: paginationConfig.fields,
                        payload,
                        serviceName: paginationConfig.serviceName,
                        history,
                        redirectAfterCreate: redirectAfterCreate
                      })
                    }}
                  >Submit
                  </button>
                </>
              )
            }}
          />
        </div>
      </div>
    </ContentWrapper>
  )
}
export default injectIntl(Comp)
