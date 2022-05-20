import React from 'react'
import { Detail, Multiselect, MultiselectCheckbox } from '../../core/features/TablePagination'
// import Loader from '../../core/Components/Loader/Loader'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
// import { FieldUploadPictures } from '../../features/PictureUpload/components'
import { generateRandomNumber, callErrorToast } from '../../core/Utils/Utils'
import { FieldProvince, FieldCity, FieldSubCity, FieldCurrier, FieldCurrierVendor } from '../../features/SetLocation/components'
// import Immutable from 'seamless-immutable'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
// import { path } from 'ramda'
import AppConfig from '../../core/Config/AppConfig'
// import { getAccessToken } from '../../core/Utils/Utils'
import { redirectAfterDelete, upsertService, upsertPageTitle, listallPageUrl, listallPageTitle, fields, detailService } from './Manifest'
import TokoOnlineManifest from '../TokoOnline/Manifest'
import ProductManifest from '../Product/Manifest'
import PaymentMethodManifest from '../PaymentMethod/Manifest'

// function addField (name, title, type, dataDetail, payload, tablepaginationOnChangeForm, serviceName) {
//   return (
//     <div className='form-group'>
//       <label htmlFor={name}>{title}</label>
//       <input type={type} className='form-control' id={name} placeholder={`Enter ${title}`} value={typeof payload[name] !== 'undefined' ? payload[name] : dataDetail[name] || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: serviceName, fieldName: name, fieldValue: e.target.value })} />
//     </div>
//   )
const FormUpdate = (props) => {
  // const [fileArray, setFileArray] = React.useState([])
  // const [currentFileArray, setCurrentFileArray] = React.useState([])
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    id,
    tablepaginationResetForm,
    // userPrivileges,
    // fileArray,
    intl,
    redirectAfterUpsert
  } = props

  React.useEffect(() => {
    const defaultFormValue = {}
    if (id) defaultFormValue._id = id
    tablepaginationResetForm({
      redirectAfterUpsert,
      isInitialReset: true,
      serviceName: upsertServiceName,
      defaultFormValue,
      formSchema: {
        total_amount: {
          type: 'number',
          validate: (v) => { if ((id && typeof v !== 'undefined' && !(v > 0)) || (!id && !(v > 0))) return { errorMessage: 'Produk masih kosong.' } }
        },
        total_product_amount: { type: 'number', mandatory: true, errorMessage: 'Produk masih kosong.' }
      }
    })
  }, [redirectAfterUpsert, tablepaginationResetForm, upsertServiceName, id])

  const [tokoDetail, setTokoDetail] = React.useState({})
  // const [subCurrierList, setSubCurrierList] = React.useState([])
  // const [subcurrierIsLoaded, setSubcurrierIsLoaded] = React.useState(false)

  // console.log('subCurrierListsubCurrierList=>', subCurrierList)
  const shippingAmount = payload.shipping_amount || dataDetail.shipping_amount || 0
  const totalProductAmount = typeof payload.total_product_amount !== 'undefined' ? payload.total_product_amount : dataDetail.total_product_amount
  const uniqueCode = payload.unique_code || dataDetail.unique_code || 0

  React.useEffect(() => {
    if (tablepaginationOnChangeForm) {
      const totalAmount = parseFloat(shippingAmount || 0) + parseFloat(totalProductAmount || 0) + parseFloat(uniqueCode || 0)
      const v = {
        serviceName: upsertServiceName,
        fieldName: 'total_amount',
        mandatory: 'Produk masih kosong',
        fieldValue: totalAmount
      }
      if (id) v.resetValue = totalAmount
      if (!id && typeof payload.total_amount === 'undefined' && totalAmount === 0) {
      } else {
        tablepaginationOnChangeForm(v)
      }
    }
  }, [id, upsertServiceName, tablepaginationOnChangeForm, shippingAmount, totalProductAmount, uniqueCode, payload.total_amount])

  React.useEffect(() => {
    if (id && dataDetail) {
      // const tokoDetail = tokoDetailx || dataDetail.toko_id
      setTokoDetail(dataDetail.toko_id)
      // if (subCurrierList.length === 0 && dataDetail.total_weight) {
      //   fetchShippingCost({ kurir: dataDetail.shipping_currier_vendor, weight: dataDetail.total_weight, shippingSubcity: dataDetail.shipping_subcity, setSubCurrierList, setSubcurrierIsLoaded, tokoSubcity: (dataDetail.toko_id || {}).subcity })
      // }
    }
  }, [id, dataDetail, setTokoDetail])
  if (id && !dataDetail) return null

  return (
    <>
      <div className='row'>
        <div className='col-sm-6'>
          <div className='form-group'>
            {dataDetail.toko_id &&
              <>
                <label htmlFor='parent_id'>Nama Toko</label>
                <br />
                <span>{(dataDetail.toko_id || {}).name}</span>
              </>}
            {!dataDetail.toko_id &&
              <>
                <label htmlFor='parent_id'>Pilih Toko</label>
                <br />
                <Multiselect
                  isMulti={false}
                  className='form-control'
                  label='Pilih Toko'
                  labelButton='Pilih'
                  labelColumn='Pilih'
                  placeholder='Pilih'
                  optionColumnValue='_id'
                  optionColumnLabel='name'
                  payloadValue={payload.toko_id}
                  defaultValueOriginal={dataDetail.toko_id}
                  getColumns={({ onChange }) => []}
                  listallServiceName={TokoOnlineManifest.listallService}
                  fields={TokoOnlineManifest.fields}
                  onChange={({ val, optionsOriginal }) => {
                    const toko = optionsOriginal.filter(v => '' + v._id === '' + val)[0]
                    // console.log('tokotokotokotoko===>', toko)
                    if (!toko.subcity) return callErrorToast('Alamat toko anda belum lengkap. Mohon lengkapi alamat toko anda.', 'error')
                    tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'toko_id', fieldValue: val })
                    setTokoDetail(toko)
                  }}
                />
                {/* <Combobox
                  className='form-control'
                  label='Pilih Toko'
                  labelButton='Pilih'
                  labelColumn='Pilih'
                  optionColumnValue='_id'
                  optionColumnLabel='name'
                  getColumns={({ onChange }) => [
                    { Header: 'Nama Toko', accessor: 'name' }
                  ]}
                  listallServiceName={TokoOnlineManifest.listallService}
                  upsertServiceName={upsertServiceName}
                  fields={TokoOnlineManifest.fields}
                  defaultValue={typeof payload.toko_id !== 'undefined' ? payload.toko_id : (dataDetail.toko_id || {})._id}
                  onChange={({ val, originalValue }) => { setTokoDetail(originalValue); tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'toko_id', fieldValue: val }) }}
                /> */}
              </>}
          </div>
        </div>
      </div>
      {(payload.toko_id || dataDetail.toko_id) &&
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
                      className='form-control'
                      label='Pilih Produk'
                      labelButton='Pilih'
                      labelColumn='Pilih'
                      optionColumnValue='_id'
                      optionColumnLabel='name'
                      objectKey='product_id'
                      getColumns={({ onChange, defaultValue, objectKey }) => [
                        { Header: 'Nama Produk', accessor: 'name' },
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
                          Header: 'Catatan',
                          accessor: p => {
                            let val = defaultValue || []
                            const rowVal = val.filter(v => '' + (v[objectKey] || {})._id === '' + p._id)
                            const notInPayload = _.isEmpty(rowVal)
                            console.log('rowValrowValrowVal=>', rowVal)
                            return (
                              <textarea
                                style={{ height: 40 }}
                                type='text' id='notes' placeholder='' onChange={(e) => {
                                  if (e.target.value < 0) return
                                  val = val.filter(v => '' + (v[objectKey] || {})._id !== '' + p._id)
                                  if (!notInPayload) val = [...val, { ...rowVal[0], notes: e.target.value }]
                                  else val = [...val, { amount: 0, count: 0, [objectKey]: p, notes: e.target.value }]
                                  onChange({ objectKey, val })
                                }}
                                value={(rowVal[0] || {}).notes}
                              />
                            )
                          }
                        },
                        {
                          Header: 'Jumlah',
                          accessor: p => {
                            let val = defaultValue || []
                            const rowVal = val.filter(v => '' + (v[objectKey] || {})._id === '' + p._id)
                            const notInPayload = _.isEmpty(rowVal)
                            return (
                              <input
                                style={{ width: 70 }} type='number' id='qty' placeholder='' value={(rowVal[0] || {}).count} onChange={(e) => {
                                  if (parseInt(e.target.value) < 0) {
                                    e.target.value = 0
                                    return
                                  }
                                  val = val.filter(v => '' + (v[objectKey] || {})._id !== '' + p._id)
                                  if (!notInPayload) val = [...val, { ...rowVal[0], amount: parseInt(e.target.value) * parseInt(p.price), count: parseInt(e.target.value), checked: e.target.value > 0 }]
                                  else val = [...val, { notes: '', [objectKey]: p, amount: parseInt(e.target.value) * parseInt(p.price), count: parseInt(e.target.value), checked: e.target.value > 0 }]
                                  onChange({ objectKey, val })
                                }}
                              />
                            )
                          }
                        },
                        {
                          Header: 'Pilih',
                          accessor: p => {
                            let val = defaultValue || []
                            const rowVal = val.filter(v => '' + (v[objectKey] || {})._id === '' + p._id)
                            const notInPayload = _.isEmpty(rowVal)
                            return (
                              <input
                                type='checkbox'
                                checked={(rowVal[0] || {}).checked}
                                onChange={(e) => {
                                  val = val.filter(v => '' + (v[objectKey] || {})._id !== '' + p._id)
                                  if (!notInPayload) val = [...val, { ...rowVal[0], checked: e.target.checked }]
                                  else val = [...val, { amount: 0, count: 0, notes: '', [objectKey]: p, checked: e.target.checked }]
                                  onChange({ objectKey, val })
                                }}
                              />
                            )
                          }
                        }
                      ]}
                      // listallServiceName={ProductManifest.listallService}
                      listallServiceName={ProductManifest.listallService + 'ByTokoIdAndWithStock'}
                      upsertServiceName={upsertServiceName}
                      fields={ProductManifest.fields}
                      defaultValue={[...(typeof payload.cart_id !== 'undefined' ? JSON.parse(payload.cart_id) : (dataDetail.cart_id || []).map(v => ({ _id: v._id, amount: v.amount, count: v.count, notes: v.notes, checked: true, product_id: v.product_id })))]}
                      onChange={({ val, objectKey }) => {
                        let wgt = 0
                        let isneedShipping = 'N'
                        let totalHarga = 0

                        let uniqueCode = 0
                        for (let i = 0; i < val.length; i++) {
                          const v = val[i]
                          console.log('v===>', v)
                          const p = v[objectKey]
                          if (v.checked && p) {
                            if (p.isneed_shipping === 'Y') {
                              wgt += parseFloat(p.weight) * parseInt(v.count)
                              isneedShipping = 'Y'
                            }
                            // const harga = parseInt(p.price) * parseInt(v.count)
                            totalHarga += parseInt(v.amount)
                            // value.push(v)
                            // const formFieldProducts = `{ notes: "${v.notes}", count: ${parseInt(v.qty)}, amount: ${parseInt(harga)}, product_id: "${'' + p._id}" }`
                          }
                        }

                        if (totalHarga > 0) {
                          uniqueCode = parseInt(generateRandomNumber(2))
                        }

                        const value = val.map(v => {
                          const product = v[objectKey]
                          if (!product) return null
                          return ({
                            ...v,
                            [objectKey]: {
                              _id: (v[objectKey] || {})._id,
                              isneed_shipping: (v[objectKey] || {}).isneed_shipping,
                              name: (v[objectKey] || {}).name,
                              weight: (v[objectKey] || {}).weight,
                              price: (v[objectKey] || {}).price
                            }
                          })
                        }).filter(v => v !== null)

                        console.log('totalHargatotalHargatotalHargatotalHarga=>', totalHarga)
                        const valStr = JSON.stringify(_.orderBy(value, [objectKey + '.name'], ['asc']))
                        tablepaginationOnChangeForm({
                          serviceName: upsertServiceName,
                          batchData: {
                            cart_id: valStr,
                            // cart_id: valStr.replace(/"/g, '\''),
                            total_product_amount: totalHarga,
                            unique_code: parseInt(uniqueCode),
                            total_weight: wgt,
                            isneed_shipping: isneedShipping
                          }
                        })
                      }}
                      whereCondition={JSON.stringify({ toko_id: '' + (payload.toko_id || (dataDetail.toko_id || {})._id) })}
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
                          <td>{intl.formatNumber(typeof payload.shipping_amount !== 'undefined' ? payload.shipping_amount || 0 : dataDetail.shipping_amount || 0, { style: 'currency', currency: AppConfig.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                        </tr>
                        <tr>
                          <td>Harga Produk</td>
                          <td>{intl.formatNumber(totalProductAmount || 0, { style: 'currency', currency: AppConfig.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                        </tr>
                        <tr>
                          <td>Kode Uniq</td>
                          <td>{payload.unique_code || dataDetail.unique_code || 0}</td>
                        </tr>
                        <tr>
                          <td />
                          <td>{intl.formatNumber(payload.total_amount || dataDetail.total_amount || 0, { style: 'currency', currency: AppConfig.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    {id &&
                      <dl>
                        {process.env.REACT_APP_SHOW_FORMFIELD_PAYMENTMETHOD &&
                          <>
                            <dt>Metode Pembayaran</dt>
                            <dd>{(dataDetail.payment_method_id || {}).title}</dd>
                          </>}
                        <dt>Link Pembayaran</dt>
                        <dd>{AppConfig.hostBackend}/payment/{dataDetail.session_id}</dd>
                        <dd>
                          <button
                            type='button' onClick={(e) => {
                              var dummy = document.createElement('textarea')
                              document.body.appendChild(dummy)
                              dummy.value = `${AppConfig.hostBackend}/payment/${dataDetail.session_id}`
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
                            <i className='fa fa-copy' /> Copy Link Pembayaran
                          </button>
                        </dd>
                      </dl>}
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
                        <br />
                        <Multiselect
                          isMulti={false}
                          className='form-control'
                          label='Pilih Metode Pembayaran'
                          labelButton='Pilih'
                          labelColumn='Pilih'
                          placeholder='Pilih'
                          optionColumnValue='_id'
                          optionColumnLabel='title'
                          payloadValue={payload.payment_method_id}
                          defaultValueOriginal={dataDetail.payment_method_id}
                          getColumns={({ onChange }) => []}
                          listallServiceName={PaymentMethodManifest.listallService}
                          fields={PaymentMethodManifest.fields}
                          onChange={({ val }) => {
                            tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'payment_method_id', fieldValue: val })
                          }}
                        />
                        {/* <Combobox
                          className='form-control'
                          label='Pilih Metode Pembayaran'
                          labelButton='Pilih'
                          labelColumn='Pilih'
                          optionColumnValue='_id'
                          optionColumnLabel='title'
                          getColumns={({ onChange }) => [
                            { Header: 'Metode Pembayaran', accessor: 'title' }
                          ]}
                          listallServiceName={PaymentMethodManifest.listallService}
                          upsertServiceName={upsertServiceName}
                          fields={PaymentMethodManifest.fields}
                          defaultValue={typeof payload.payment_method_id !== 'undefined' ? payload.payment_method_id : (dataDetail.payment_method_id || {})._id}
                          onChange={({ val }) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'payment_method_id', fieldValue: val })}
                        /> */}
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
                      <input type='text' className='form-control' id='full_name' placeholder='masukan nama pembeli' value={typeof payload.full_name !== 'undefined' ? payload.full_name : dataDetail.full_name} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'full_name', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='phone_number'>Nomor Telepon</label>
                      <input type='text' className='form-control' id='phone_number' placeholder='' value={typeof payload.phone_number !== 'undefined' ? payload.phone_number : dataDetail.phone_number} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'phone_number', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
                      <input type='text' className='form-control' id='email' placeholder='' value={typeof payload.email !== 'undefined' ? payload.email : dataDetail.email} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'email', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='shipping_address'>Alamat Pengiriman</label>
                      <input type='text' className='form-control' id='shipping_address' value={typeof payload.shipping_address !== 'undefined' ? payload.shipping_address : dataDetail.shipping_address} placeholder='' onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'shipping_address', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='shipping_postal_code'>Kode Pos</label>
                      <input type='text' className='form-control' id='shipping_postal_code' placeholder='' value={typeof payload.shipping_postal_code !== 'undefined' ? payload.shipping_postal_code : dataDetail.shipping_postal_code} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'shipping_postal_code', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='order_notes'>Catatan</label>
                      <textarea type='text' className='form-control' id='order_notes' placeholder='' value={typeof payload.notes !== 'undefined' ? payload.notes : dataDetail.notes} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'notes', fieldValue: e.target.value })} />
                    </div>
                  </div>
                </div>
              </div>
              {(payload.isneed_shipping || dataDetail.isneed_shipping) === 'Y' && (
                <div className='col-sm-12'>
                  <div className='card'>
                    <div className='card-header' data-card-widget='collapse'>
                      <h3 className='card-title'>Ongkos Kirim</h3>
                    </div>
                    <div className='card-body'>
                      <div className='form-group'>
                        {/* <label htmlFor='postal_fee_type'>Ongkos Kirim:</label> */}
                        <div class='form-check'>
                          <input
                            className='form-check-input' type='radio' name='postal_fee_type' id='postal_fee_type_auto' value='auto' checked={(payload.postal_fee_type || dataDetail.postal_fee_type) === 'auto'} onChange={e => {
                              // let shippingAmount = 0
                              // if (typeof payload.shipping_amount !== 'undefined') {
                              //   if (payload.shipping_amount > 0) {
                              //     shippingAmount = dataDetail.shipping_amount
                              //   } else {
                              //     shippingAmount = dataDetail.shipping_amount
                              //   }
                              // } else {
                              //   shippingAmount = dataDetail.shipping_amount
                              // }
                              tablepaginationOnChangeForm({
                                serviceName: upsertServiceName,
                                fieldName: 'postal_fee_type',
                                batchData: {
                                  postal_fee_type: e.target.value,
                                  shipping_amount: dataDetail.shipping_amount
                                }
                              })
                            }}
                          />
                          <label className='form-check-label' htmlFor='postal_fee_type_auto'>Hitung Ongkos Kirim </label>
                        </div>
                        <div class='form-check'>
                          <input
                            className='form-check-input' type='radio' name='postal_fee_type' id='postal_fee_type_manual' value='manual' checked={(payload.postal_fee_type || dataDetail.postal_fee_type) === 'manual'} onChange={e => {
                              tablepaginationOnChangeForm({
                                serviceName: upsertServiceName,
                                fieldName: 'postal_fee_type',
                                batchData: {
                                  postal_fee_type: e.target.value,
                                  shipping_amount: 0,
                                  shipping_province: '',
                                  shipping_city: '',
                                  shipping_subcity: '',
                                  shipping_currier_vendor: '',
                                  shipping_currier: ''
                                }
                              })
                            }}
                          />
                          <label className='form-check-label' htmlFor='postal_fee_type_manual'>Ongkos Kirim Manual</label>
                        </div>
                        <div class='form-check'>
                          <input
                            className='form-check-input' type='radio' name='postal_fee_type' id='postal_fee_type_none' value='none' checked={(payload.postal_fee_type || dataDetail.postal_fee_type) === 'none'} onChange={e => {
                              tablepaginationOnChangeForm({
                                serviceName: upsertServiceName,
                                fieldName: 'postal_fee_type',
                                batchData: {
                                  postal_fee_type: e.target.value,
                                  shipping_amount: 0,
                                  shipping_province: '',
                                  shipping_city: '',
                                  shipping_subcity: '',
                                  shipping_currier_vendor: '',
                                  shipping_currier: ''
                                }
                              })
                            }}
                          />
                          <label className='form-check-label' htmlFor='postal_fee_type_none'>Tanpa Ongkos Kirim</label>
                        </div>
                      </div>
                      {(payload.postal_fee_type || dataDetail.postal_fee_type) === 'manual' &&
                        <div className='form-group'>
                          <label htmlFor='shipping_amount'>Ongkos Kirim</label>
                          <input
                            type='number' className='form-control' id='shipping_amount' placeholder='' value={typeof payload.shipping_amount !== 'undefined' ? payload.shipping_amount : dataDetail.shipping_amount} onChange={e => {
                              if (e.target.value < 0) return
                              tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'shipping_amount', fieldValue: parseFloat(e.target.value) })
                            }}
                          />
                        </div>}

                      {(payload.postal_fee_type || dataDetail.postal_fee_type) === 'auto' &&
                        <>
                          <FieldProvince
                            withLabel
                            defaultValue={payload.shipping_province || dataDetail.shipping_province}
                            onChange={(v) => {
                              console.log('pLoad.total_weightpLoad.total_weight=>', payload.total_weight)
                              if (!(tokoDetail.subcity || (dataDetail.toko_id || {}).subcity)) return callErrorToast('Ongkos kirim tidak bisa dihitung karena alamat toko anda belum lengkap.', 'error')
                              // if (!(pLoad.total_weight && parseFloat(pLoad.total_weight) <= 1)) return callErrorToast('Ongkos kirim tidak bisa dihitung berat barang masih kosong', 'error')
                              if (parseFloat(payload.total_weight || dataDetail.total_weight) < 1 || !(payload.total_weight || dataDetail.total_weight)) return callErrorToast('Ongkos kirim tidak bisa dihitung berat barang masih kosong', 'error')
                              tablepaginationOnChangeForm({
                                serviceName: upsertServiceName,
                                batchData: {
                                  shipping_province: v,
                                  shipping_city: '',
                                  shipping_subcity: '',
                                  shipping_currier_vendor: '',
                                  shipping_currier: '',
                                  shipping_amount: 0
                                }
                              })
                            }}
                          />
                          <FieldCity
                            withLabel
                            defaultValue={typeof payload.shipping_city !== 'undefined' ? payload.shipping_city : dataDetail.shipping_city}
                            provinceId={typeof payload.shipping_province !== 'undefined' ? payload.shipping_province : dataDetail.shipping_province}
                            onChange={(v) => {
                              if (!(tokoDetail.subcity || (dataDetail.toko_id || {}).subcity)) return callErrorToast('Ongkos kirim tidak bisa dihitung karena alamat toko anda belum lengkap.', 'error')
                              tablepaginationOnChangeForm({
                                serviceName: upsertServiceName,
                                batchData: {
                                  shipping_city: v,
                                  shipping_subcity: '',
                                  shipping_currier_vendor: '',
                                  shipping_currier: '',
                                  shipping_amount: 0
                                }
                              })
                            }}
                          />
                          <FieldSubCity
                            withLabel
                            defaultValue={typeof payload.shipping_subcity !== 'undefined' ? payload.shipping_subcity : dataDetail.shipping_subcity}
                            cityId={typeof payload.shipping_city !== 'undefined' ? payload.shipping_city : dataDetail.shipping_city}
                            onChange={(v) => {
                              if (!(tokoDetail.subcity || (dataDetail.toko_id || {}).subcity)) return callErrorToast('Ongkos kirim tidak bisa dihitung karena alamat toko anda belum lengkap.', 'error')
                              tablepaginationOnChangeForm({
                                serviceName: upsertServiceName,
                                batchData: {
                                  shipping_subcity: v,
                                  shipping_currier_vendor: '',
                                  shipping_currier: '',
                                  shipping_amount: 0
                                }
                              })
                            }}
                          />
                          <FieldCurrierVendor
                            withLabel
                            defaultValue={typeof payload.shipping_currier_vendor !== 'undefined' ? payload.shipping_currier_vendor : dataDetail.shipping_currier_vendor}
                            subcityId={typeof payload.shipping_subcity !== 'undefined' ? payload.shipping_subcity : dataDetail.shipping_subcity}
                            onChange={(v) => {
                              if (!(tokoDetail.subcity || (dataDetail.toko_id || {}).subcity)) return callErrorToast('Ongkos kirim tidak bisa dihitung karena alamat toko anda belum lengkap.', 'error')
                              tablepaginationOnChangeForm({
                                serviceName: upsertServiceName,
                                batchData: {
                                  shipping_currier_vendor: v,
                                  shipping_currier: '',
                                  shipping_amount: 0
                                }
                              })
                            }}
                          />
                          <FieldCurrier
                            withLabel
                            defaultValue={typeof payload.shipping_currier !== 'undefined' ? payload.shipping_currier : dataDetail.shipping_currier}
                            currierVendorId={typeof payload.shipping_currier_vendor !== 'undefined' ? payload.shipping_currier_vendor : dataDetail.shipping_currier_vendor}
                            tokoSubcity={tokoDetail.subcity || (dataDetail.toko_id || {}).subcity}
                            shippingSubcity={payload.shipping_subcity || dataDetail.shipping_subcity}
                            weight={payload.total_weight || dataDetail.total_weight}
                            onChange={(value, listData) => {
                              if (!(tokoDetail.subcity || (dataDetail.toko_id || {}).subcity)) return callErrorToast('Ongkos kirim tidak bisa dihitung karena alamat toko anda belum lengkap.', 'error')
                              const v = (listData.filter(v => value === v.origin.service)[0] || {}).origin
                              console.log('shipping_curriershipping_curriershipping_currier=> ', v)
                              if (v) {
                                tablepaginationOnChangeForm({
                                  serviceName: upsertServiceName,
                                  batchData: {
                                    shipping_currier: v.service,
                                    shipping_amount: parseFloat(v.cost[0].value)
                                  }
                                })
                              } else {
                                callErrorToast('Data ongkos kirim tidak valid.', 'error')
                              }
                              // tablepaginationOnChangeForm({
                              //   serviceName: upsertServiceName,
                              //   batchData: {
                              //     shipping_currier: v,
                              //     shipping_amount: 0
                              //   }
                              // })
                            }}
                          />
                          {/* {(payload.shipping_subcity || dataDetail.shipping_subcity) &&
                            <div className='form-group'>
                              <label htmlFor='shipping_currier_vendor'>Kurir</label>
                              <select
                                value={(payload.shipping_currier_vendor || dataDetail.shipping_currier_vendor)}
                                name='shipping_currier_vendor'
                                id='shipping_currier_vendor'
                                class='custom-select'
                                onChange={e => {
                                  if (!(tokoDetail.subcity || dataDetail.subcity)) return callErrorToast('error', 'Ongkos kirim tidak bisa dihitung karena alamat toko anda belum lengkap.')
                                  fetchShippingCost({ kurir: e.target.value, weight: payload.total_weight || dataDetail.total_weight, shippingSubcity: payload.shipping_subcity || dataDetail.shipping_subcity, setSubCurrierList, setSubcurrierIsLoaded, tokoSubcity: tokoDetail.subcity })
                                  tablepaginationOnChangeForm({ serviceName: upsertServiceName, batchData: { shipping_currier_vendor: e.target.value, shipping_currier: '', shipping_amount: 0 } })
                                }}
                              >
                                <option key='-'>pilih</option>
                                {courierList.map((v, i) => {
                                  if ((payload.shipping_currier_vendor || dataDetail.shipping_currier_vendor) === v.value) return (<option key={i} value={v.value}>{v.label}</option>)
                                  else return (<option key={i} value={v.value}>{v.label}</option>)
                                })}
                              </select>
                            </div>} */}
                          {/* {(payload.shipping_currier_vendor || dataDetail.shipping_currier_vendor) &&
                            <div className='form-group'>
                              <label htmlFor='shipping_currier'>Layanan Kurir</label>
                              {subcurrierIsLoaded && <Loader loading type='rpmerah' />}
                              {!subcurrierIsLoaded &&
                                <select
                                  value={(typeof payload.shipping_currier !== 'undefined' ? payload.shipping_currier : dataDetail.shipping_currier)}
                                  name='shipping_currier'
                                  id='shipping_currier'
                                  class='custom-select'
                                  onChange={e => {
                                    // const v = JSON.parse(e.target.value)
                                    // e.target.value
                                    const v = subCurrierList.filter(v => e.target.value === v.service)[0]
                                    console.log('shipping_curriershipping_curriershipping_currier=> ', v)
                                    if (v) {
                                      tablepaginationOnChangeForm({
                                        serviceName: upsertServiceName,
                                        batchData: {
                                          shipping_currier: v.service,
                                          shipping_amount: parseFloat(v.cost[0].value)
                                        }
                                      })
                                    }
                                  }}
                                >
                                  <option key='-'>pilih</option>
                                  {subCurrierList.map((v, k) => {
                                    if ((typeof payload.shipping_currier !== 'undefined' ? payload.shipping_currier : dataDetail.shipping_currier) === v.service) return (<option key={k} value={v.service}>{v.service}</option>)
                                    else return (<option key={k} value={v.service} selected>{v.service}</option>)
                                  })}
                                </select>}
                            </div>} */}
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
}

function Comp (props) {
  const { match, intl } = props

  return (
    <ContentWrapper
      pageTitle={upsertPageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: listallPageTitle, link: listallPageUrl() },
        { title: upsertPageTitle, link: null, isActive: true }
      ]}
      contentHeaderTitle={upsertPageTitle}
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Detail
            detailServiceName={detailService}
            upsertServiceName={upsertService}
            fields={fields}
            id={match.params._id}
            formTitle={upsertPageTitle}
            redirectAfterDelete={redirectAfterDelete}
            withoutWrapper
          >
            <FormUpdate
              intl={intl}
              redirectAfterUpsert={listallPageUrl()}
            />
          </Detail>
        </div>
      </div>
    </ContentWrapper>
  )
}
export default injectIntl(Comp)
