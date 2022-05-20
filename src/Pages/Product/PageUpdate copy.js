import React, { useEffect } from 'react'
import { Detail, Multiselect } from '../../core/features/TablePagination'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { FieldUploadPictures } from '../../features/PictureUpload/components'
import { FieldTextArea } from '../../features/TextEditor/components'
import Immutable from 'seamless-immutable'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import { path } from 'ramda'
import AppConfig from '../../core/Config/AppConfig'
import { getAccessToken } from '../../core/Utils/Utils'
import TagManifest from '../../core/Pages/Tag/Manifest'
import CategoryManifest from '../Category/Manifest'
import TokoOnlineManifest from '../TokoOnline/Manifest'
import { redirectAfterDelete, updatePageTitle, upsertPageTitle, detailPageTitle, detailPageUrl, upsertService, fields, updateService, detailService } from './Manifest'

let tablepaginationOnChangeFormFunc = null
const paginationConfig = {
  serviceName: detailService,
  updateServiceName: updateService,
  fields: fields
}

function Comp (props) {
  const { match } = props
  const [fileArray, setFileArray] = React.useState([])
  const [dataDetail, setDataDetail] = React.useState([])
  const [payload, setPayload] = React.useState([])
  const [dataId, setDataId] = React.useState('')
  const [currentFileArray, setCurrentFileArray] = React.useState([])

  const [defaultValueTokoId, setDefaultValueTokoId] = React.useState([])
  const [defaultValueCatId, setDefaultValueCatId] = React.useState([])
  const [defaultValueTagId, setDefaultValueTagId] = React.useState([])

  useEffect(() => {
    if (tablepaginationOnChangeFormFunc) {
      const prodDetail = Immutable.asMutable(path([paginationConfig.serviceName], dataDetail) || {}, { deep: true })
      setDefaultValueTokoId(Immutable.asMutable(prodDetail.toko_id || [], { deep: true }))
      setDefaultValueCatId(Immutable.asMutable(prodDetail.category_id || [], { deep: true }))
      setDefaultValueTagId(Immutable.asMutable(prodDetail.tag_id || [], { deep: true }))

      if (parseFloat(prodDetail.weight || 0) >= 1) tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'weight', fieldValue: parseFloat(prodDetail.weight || 0) })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'name', fieldValue: prodDetail.name || '' })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'price', fieldValue: parseFloat(prodDetail.price || 0) })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'code', fieldValue: prodDetail.code || '' })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: prodDetail.description || '' })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'tag_id', fieldValue: (prodDetail.tag_id || []).map(v => '' + v._id) || [] })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: prodDetail.content1 || '' })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'isneed_shipping', fieldValue: prodDetail.isneed_shipping || '' })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'product_availability', fieldValue: prodDetail.product_availability || '' })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'preorder_policy', fieldValue: prodDetail.preorder_policy || '' })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: prodDetail.estimated_delivery_unit_time_instock || 0 })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: prodDetail.estimated_delivery_unit_time_preorder || 0 })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_time_preorder', fieldValue: prodDetail.estimated_delivery_time_preorder || 0 })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_time_instock', fieldValue: prodDetail.estimated_delivery_time_instock || 0 })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'instock_label', fieldValue: prodDetail.instock_label || '' })

      setDataId('' + prodDetail._id)
      const imageIds = Immutable.asMutable(path([paginationConfig.serviceName, 'image_ids'], dataDetail) || [], { deep: true })
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'image_ids', fieldValue: imageIds.map(v => '' + v._id) })
      setCurrentFileArray(imageIds)
    }
  }, [dataDetail])
  return (
    <ContentWrapper
      pageTitle={updatePageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: 'Daftar Produk', link: '/product' },
        { title: detailPageTitle, link: detailPageUrl(match.params._id), isActive: true },
        { title: updatePageTitle, link: null, isActive: true }
      ]}
      contentHeaderTitle={updatePageTitle}
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
            child={(tablepaginationOnChangeForm, dataDetail, payload, loading) => {
              tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
              if (_.isEmpty(dataDetail)) return null
              const pLoad = payload[paginationConfig.serviceName] || {}
              setPayload(pLoad)
              setDataDetail(dataDetail)
              console.log('pLoad.product_availabilityyyyyyy==>', pLoad.product_availability)
              console.log('pLoad.product_availabilityyyyyyypLoad==>', pLoad)
              console.log('pLoad.product_availabilityyyyyyypLoad==>', dataDetail)
              
              return (
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label htmlFor='title'>Nama Produk</label>
                      <input type='text' className='form-control' id='name' placeholder='masukkan Nama Produk' value={pLoad.name} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'name', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='code'>Kode Produk</label>
                      <input type='text' className='form-control' id='code' placeholder='masukkan kode produk=' value={pLoad.code} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'code', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='price'>Harga Produk</label>
                      <input type='float' className='form-control' id='price' placeholder='masukkan harga produk' value={pLoad.price} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'price', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='parent_id'>Butuh Ongkir?</label>
                      {pLoad.isneed_shipping &&
                        <select defaultValue={pLoad.isneed_shipping} name='isneed_shipping' id='isneed_shipping' className='custom-select' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'isneed_shipping', fieldValue: e.target.value })}>
                          <option value='Y'>Butuh</option>
                          <option value='N'>Tidak Butuh</option>
                        </select>}
                    </div>
                    {pLoad.isneed_shipping === 'Y' &&
                      <div className='form-group'>
                        <label htmlFor='weight'>Berat Produk (gram)</label>
                        <input type='float' className='form-control' required id='weight' placeholder='masukkan berat produk' value={pLoad.weight} onChange={e => { if (e.target.value !== '' && e.target.value < 1) return; tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'weight', fieldValue: e.target.value }) }} />
                      </div>}
                    {process.env.REACT_APP_SHOW_FORMFIELD_SHORTDESCRIPTION &&
                      <div className='form-group'>
                        <label htmlFor='description'>Short Description</label>
                        <input type='text' className='form-control' id='description' placeholder='Enter description' value={pLoad.description} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: e.target.value })} />
                      </div>}
                    {!(typeof loading === 'undefined' || loading === 'undefined' || loading) &&
                      <div className='form-group'>
                        <label htmlFor='content1'>Long Description</label>
                        <FieldTextArea textEditor forProcess='update' dataId={dataId} defaultValue={pLoad.content1} onChange={(v) => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: v })} idElement='content1' />
                      </div>}
                    {!(typeof loading === 'undefined' || loading === 'undefined' || loading) &&
                      <Multiselect
                        isAutocomplete
                        label='Pilih Toko'
                        name='toko_id'
                        id='toko_id'
                        maxOptions={50}
                        fetchDataConfig={{
                          serviceName: TokoOnlineManifest.listallService,
                          fields: TokoOnlineManifest.fields
                        }}
                        optionColumnValue='_id'
                        optionColumnLabel='name'
                        defaultValue={defaultValueTokoId || []}
                        onChange={(val, forDefaultValue) => {
                          setDefaultValueTokoId(forDefaultValue)
                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'toko_id', fieldValue: val })
                        }}
                        formType='update'
                      />}
                    {!(typeof loading === 'undefined' || loading === 'undefined' || loading) &&
                      <Multiselect
                        isAutocomplete
                        label='Pilih Kategori'
                        name='category_id'
                        id='category_id'
                        maxOptions={50}
                        fetchDataConfig={{
                          serviceName: CategoryManifest.listallService,
                          fields: CategoryManifest.fields
                        }}
                        sortBy={{ title: 1 }}
                        optionColumnValue='_id'
                        optionColumnLabel='title'
                        defaultValue={defaultValueCatId || []}
                        onChange={(val, forDefaultValue) => {
                          setDefaultValueCatId(forDefaultValue)
                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'category_id', fieldValue: val })
                        }}
                        formType='update'
                      />}
                    {!(typeof loading === 'undefined' || loading === 'undefined' || loading) &&
                      <Multiselect
                        isCreatableSelect
                        isAutocomplete
                        label='Tag'
                        name='tag_id'
                        id='tag_id'
                        placeholder='pilih'
                        maxOptions={100}
                        fetchDataConfig={{
                          serviceName: TagManifest.listallService,
                          fields: TagManifest.fields
                        }}
                        optionColumnValue='_id'
                        optionColumnLabel='name'
                        defaultValue={defaultValueTagId || []}
                        onChange={(val, forDefaultValue) => {
                          setDefaultValueTagId(forDefaultValue)
                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'tag_id', fieldValue: val })
                        }}
                        formType='update'
                      />}
                    {!(typeof loading === 'undefined' || loading === 'undefined' || loading) &&
                      <FieldUploadPictures currentFileIds={currentFileArray} label='Gambar' multiple onChange={({ currentFileIds, newFiles }) => { console.log('onchangeeeeee'); setFileArray(newFiles); setCurrentFileArray(currentFileIds) }} />}
                    {!(typeof loading === 'undefined' || loading === 'undefined' || loading || _.isEmpty(pLoad.product_availability)) &&
                      <div className='form-group'>
                        <label htmlFor='product_availability'>Ketersediaan Produk</label>
                        <select
                          name='product_availability'
                          id='product_availability' className='custom-select' onChange={e => {
                            tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'product_availability', fieldValue: e.target.value })
                          }}
                          defaultValue={pLoad.product_availability}
                        >
                          <option value='always_ready'>Selalu ada stok</option>
                          <option value='use_stock'>Gunakan stok</option>
                        </select>
                      </div>}
                    <div className='form-group'>
                      <label htmlFor='instock_label'>Label ketika stok masih ada</label>
                      <input type='text' className='form-control' id='instock_label' placeholder='contoh: Ada stok' value={pLoad.instock_label} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'instock_label', fieldValue: e.target.value })} />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='estimated_delivery_time_instock'>Setelah customer melakukan pembayaran, produk akan dikirim dalam:</label>
                      <div className='form-row'>
                        <input type='number' className='form-control' id='estimated_delivery_time_instock' placeholder='Masukan jumlah waktu' value={pLoad.estimated_delivery_time_instock} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_time_instock', fieldValue: e.target.value })} />
                        <div className='col-sm-10'>
                          <div className='d-inline form-check'>
                            <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_jam' defaultValue='hour' checked={pLoad.estimated_delivery_unit_time_instock === 'hour'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                            <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_jam'>Jam </label>
                          </div>
                          <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                            <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_hari' defaultValue='day' checked={pLoad.estimated_delivery_unit_time_instock === 'day'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                            <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_hari'>Hari </label>
                          </div>
                          <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                            <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_minggu' defaultValue='week' checked={pLoad.estimated_delivery_unit_time_instock === 'week'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                            <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_minggu'>Minggu </label>
                          </div>
                          <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                            <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_bulan' defaultValue='month' checked={pLoad.estimated_delivery_unit_time_instock === 'month'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                            <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_bulan'>Bulan </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {
                      pLoad.product_availability === 'use_stock' &&
                        <>
                          <div className='form-group'>
                            <label htmlFor='stock_amount'>Jumlah Stok</label>
                            <input type='number' className='form-control' id='stock_amount' placeholder='Masukan jumlah stok' value={path([paginationConfig.serviceName, 'stock_amount'], payload) || path([paginationConfig.serviceName, 'stock_amount'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'stock_amount', fieldValue: e.target.value })} />
                          </div>
                          {!_.isEmpty(pLoad.preorder_policy) &&
                            <div className='form-group'>
                              <label htmlFor='preorder_policy'>Status produk jika stok habis</label>
                              <select
                                name='preorder_policy' id='preorder_policy' className='custom-select' onChange={e => {
                                  tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'preorder_policy', fieldValue: e.target.value })
                                }}
                                defaultValue={pLoad.preorder_policy}
                              >
                                <option value='preorder'>Pre-Order</option>
                                <option value='unavailable'>Habis</option>
                              </select>
                            </div>}
                          {pLoad.preorder_policy === 'preorder' &&
                            <div className='form-group'>
                              <label htmlFor='estimated_delivery_time_preorder'>Produk Pre-order biasanya dikirimkan dalam:</label>
                              <input type='number' className='form-control' id='estimated_delivery_time_preorder' placeholder='Masukan jumlah waktu' value={pLoad.estimated_delivery_time_preorder} onChange={e => { if (e.target.value < 0) return; tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_time_preorder', fieldValue: e.target.value }) }} />
                              <div className='form-row'>
                                <div className='col-sm-10'>
                                  <div className='d-inline form-check'>
                                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_jam' defaultValue='hour' checked={pLoad.estimated_delivery_unit_time_preorder === 'hour'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_jam'>Jam </label>
                                  </div>
                                  <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_hari' defaultValue='day' checked={pLoad.estimated_delivery_unit_time_preorder === 'day'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_hari'>Hari </label>
                                  </div>
                                  <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_minggu' defaultValue='week' checked={pLoad.estimated_delivery_unit_time_preorder === 'week'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_minggu'>Minggu </label>
                                  </div>
                                  <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_bulan' defaultValue='month' checked={pLoad.estimated_delivery_unit_time_preorder === 'month'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_bulan'>Bulan </label>
                                  </div>
                                </div>
                              </div>
                            </div>}
                        </>
                    }

                  </div>
                </div>
              )
            }}
            beforeSubmit={(cb) => {
              if (payload.isneed_shipping === 'Y' && payload.weight < 1) return alert('berat barang minimal 1 gram.')
              // (payload[paginationConfig.serviceName] || {}).isneed_shipping === 'Y'
              // sebelum submit, lakukan upload files dulu
              window.submitUploadFileArray({ at: getAccessToken(), tablepaginationOnChangeForm: tablepaginationOnChangeFormFunc, serviceName: paginationConfig.serviceName, fileArray, hostBackend: AppConfig.hostBackend, currentImgIds: currentFileArray.map(v => '' + v._id), cb })
            }}
          />
          {/* } */}
        </div>
      </div>
    </ContentWrapper>
  )
}
export default injectIntl(Comp)
