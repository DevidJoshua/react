import React from 'react'
import { Detail, Multiselect } from '../../core/features/TablePagination'
import { CardWrapperCon } from '../../core/features/TablePagination/containers'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { FieldUploadPictures } from '../../features/PictureUpload/components'
import { FieldTextArea } from '../../features/TextEditor/components'
// import Immutable from 'seamless-immutable'
import { injectIntl } from 'react-intl'
// import _ from 'lodash'
// import { path } from 'ramda'
import AppConfig from '../../core/Config/AppConfig'
// import { getAccessToken } from '../../core/Utils/Utils'
import TagManifest from '../../core/Pages/Tag/Manifest'
import CategoryManifest from '../Category/Manifest'
import TokoOnlineManifest from '../TokoOnline/Manifest'
import { listallPageUrl, listallPageTitle, redirectAfterDelete, upsertPageTitle, upsertService, fields, detailService } from './Manifest'

function addField (name, title, type, dataDetail, payload, tablepaginationOnChangeForm, serviceName) {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{title}</label>
      <input type={type} className='form-control' id={name} placeholder={`Masukkan ${title}`} value={typeof payload[name] !== 'undefined' ? payload[name] : dataDetail[name] || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: serviceName, fieldName: name, fieldValue: e.target.value })} />
    </div>
  )
}
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
    fileArray,
    formTitle,
    detailServiceName
    // match
  } = props
  React.useEffect(() => {
    // typeof payload.estimated_delivery_time_preorder !== 'undefined' ? payload.estimated_delivery_time_preorder : dataDetail.estimated_delivery_time_preorder
    const defaultFormValue = {
      estimated_delivery_time_preorder: dataDetail.estimated_delivery_time_preorder || 1,
      estimated_delivery_time_instock: dataDetail.estimated_delivery_time_instock || 1
    }
    if (id) defaultFormValue._id = id
    tablepaginationResetForm({
      isInitialReset: true,
      serviceName: upsertServiceName,
      defaultFormValue,
      formSchema: {
        price: {
          type: 'number',
          validate: (v, payload) => {
            const price = typeof payload.price !== 'undefined' ? payload.price : dataDetail.price
            if (!price) return { errorMessage: 'Anda belum mengisi Harga Produk' }
          }
        },
        product_availability: { type: 'string', mandatory: true, errorMessage: 'Anda belum mengisi Ketersediaan Produk' },
        estimated_delivery_time_instock: { type: 'number', mandatory: true, errorMessage: 'Anda belum mengisi waktu pengiriman Produk' },
        estimated_delivery_time_preorder: {
          type: 'number',
          validate: (v, payload) => {
            const preorderPolicy = typeof payload.preorder_policy !== 'undefined' ? payload.preorder_policy : dataDetail.preorder_policy
            if (preorderPolicy === 'preorder' && v !== undefined && v <= 0) return { errorMessage: 'Anda belum mengisi waktu Pre-order' }
          }
        },
        preorder_policy: {
          type: 'string',
          validate: (v, payload) => {
            const productAvailability = typeof payload.product_availability !== 'undefined' ? payload.product_availability : dataDetail.product_availability
            if (productAvailability === 'use_stock' && v !== undefined && !v) return { errorMessage: 'Anda belum mengisi status produk jika stok habis' }
          }
        }
      }
    })
  }, [dataDetail.price, tablepaginationResetForm, upsertServiceName, id, dataDetail.estimated_delivery_time_instock, dataDetail.estimated_delivery_time_preorder, dataDetail.preorder_policy, dataDetail.product_availability])
  const estimatedDeliveryUnitTimeInstock = (typeof payload.estimated_delivery_unit_time_instock !== 'undefined' ? payload.estimated_delivery_unit_time_instock : dataDetail.estimated_delivery_unit_time_instock)
  const estimatedDeliveryUnitTimePreorder = (typeof payload.estimated_delivery_unit_time_preorder !== 'undefined' ? payload.estimated_delivery_unit_time_preorder : dataDetail.estimated_delivery_unit_time_preorder)
  const productAvailability = typeof payload.product_availability !== 'undefined' ? payload.product_availability : dataDetail.product_availability
  const preorderPolicy = typeof payload.preorder_policy !== 'undefined' ? payload.preorder_policy : dataDetail.preorder_policy
  const isneedShipping = typeof payload.isneed_shipping !== 'undefined' ? payload.isneed_shipping : dataDetail.isneed_shipping

  return (
    <div className='row'>
      <div className='col-sm-6'>
        <CardWrapperCon formTitle={formTitle} serviceName={detailServiceName}>
          {addField('name', 'Nama Produk', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)}
          {addField('code', 'Kode Produk', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)}
          <div className='form-group'>
            <label htmlFor='price'>Harga Produk</label>
            <input type='number' className='form-control' id='price' placeholder='Masukkan Harga Produk' value={typeof payload.price !== 'undefined' ? payload.price : dataDetail.price || ''} onChange={e => { if (e.target.value < 0) return; tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'price', fieldValue: e.target.value }) }} />
          </div>
          <div className='form-group'>
            <label htmlFor='parent_id'>Butuh Ongkir?</label>
            <select value={isneedShipping} name='isneed_shipping' id='isneed_shipping' className='custom-select' onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'isneed_shipping', fieldValue: e.target.value })}>
              <option value=''>Pilih</option>
              <option value='Y'>Butuh</option>
              <option value='N'>Tidak Butuh</option>
            </select>
          </div>
          {isneedShipping === 'Y' &&
            <div className='form-group'>
              <label htmlFor='weight'>Berat Produk (gram)</label>
              <input type='float' className='form-control' required id='weight' placeholder='masukkan berat produk' value={typeof payload.weight !== 'undefined' ? payload.weight : dataDetail.weight} onChange={e => { if (e.target.value !== '' && e.target.value < 1) return; tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'weight', fieldValue: e.target.value }) }} />
            </div>}
          {process.env.REACT_APP_SHOW_FORMFIELD_SHORTDESCRIPTION &&
            <div className='form-group'>
              <label htmlFor='description'>Short Description</label>
              <input type='text' className='form-control' id='description' placeholder='Masukkan description' value={typeof payload.description !== 'undefined' ? payload.description : dataDetail.description} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'description', fieldValue: e.target.value })} />
            </div>}
          {/* {!(typeof loading === 'undefined' || loading === 'undefined' || loading) && */}
          <div className='form-group'>
            <label htmlFor='content1'>Deskripsi Produk</label>
            <FieldTextArea textEditor forProcess={typeof id !== 'undefined' ? 'update' : 'create'} dataId={id} defaultValue={typeof payload.content1 !== 'undefined' ? payload.content1 : dataDetail.content1} onChange={(v) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'content1', fieldValue: v })} idElement='content1' />
          </div>
          <div className='form-group'>
            <label htmlFor='toko_id'>Pilih Toko</label>
            <br />
            <Multiselect
              isMulti
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
              onChange={({ val }) => { tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'toko_id', fieldValue: val }) }}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='category_id'>Pilih Kategori</label>
            <br />
            <Multiselect
              isMulti
              className='form-control'
              label='Pilih Kategori'
              labelButton='Pilih'
              labelColumn='Pilih'
              placeholder='Pilih'
              optionColumnValue='_id'
              optionColumnLabel='title'
              payloadValue={payload.category_id}
              defaultValueOriginal={dataDetail.category_id}
              getColumns={({ onChange }) => []}
              listallServiceName={CategoryManifest.listallService}
              fields={CategoryManifest.fields}
              onChange={({ val }) => { tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'category_id', fieldValue: val }) }}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='category_id'>Tag</label>
            <br />
            <Multiselect
              isMulti
              className='form-control'
              label='Tag'
              labelButton='Pilih'
              labelColumn='Pilih'
              placeholder='Pilih'
              optionColumnValue='_id'
              optionColumnLabel='name'
              payloadValue={payload.tag_id}
              defaultValueOriginal={dataDetail.tag_id}
              getColumns={({ onChange }) => []}
              listallServiceName={TagManifest.listallService}
              fields={TagManifest.fields}
              onChange={({ val }) => {
                console.log('onchangemultiselect==>', val)
                tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'tag_id', fieldValue: val })
              }}
              isCreatableSelect
            />
          </div>
          <FieldUploadPictures
            fileArray={fileArray.image_ids}
            currentFileIds={dataDetail.image_ids}
            label='Gambar'
            multiple
            onChange={({ currentFileIds, newFiles }) => {
              tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'image_ids', fieldValue: currentFileIds.map(v => v._id) })
              tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'image_ids', type: 'file', fieldValue: newFiles })
              // setFileArray(newFiles);
              // setCurrentFileArray(currentFileIds)
            }}
          />
          <div className='form-group'>
            <label htmlFor='product_availability'>Ketersediaan Produk</label>
            <select
              name='product_availability'
              id='product_availability' className='custom-select' onChange={e => {
                tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'product_availability', fieldValue: e.target.value })
              }}
              value={productAvailability}
            >
              <option value=''>Pilih</option>
              <option value='use_stock'>Gunakan stok</option>
              <option value='always_ready'>Selalu ada stok</option>
            </select>
          </div>
          {/* {addField('instock_label', 'Label ketika stok masih ada', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)} */}
          <div className='form-group'>
            <label htmlFor='instock_label'>Label ketika stok masih ada</label>
            <input type='text' className='form-control' id='instock_label' placeholder='Masukkan Label ketika stok masih ada' value={typeof payload.instock_label !== 'undefined' ? payload.instock_label : dataDetail.instock_label || 'Stok Tersedia'} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'instock_label', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='estimated_delivery_time_instock'>Setelah customer melakukan pembayaran, produk akan dikirim dalam:</label>
            <div className='form-row'>
              <input type='number' className='form-control' id='estimated_delivery_time_instock' placeholder='Masukan jumlah waktu' value={typeof payload.estimated_delivery_time_instock !== 'undefined' ? payload.estimated_delivery_time_instock : dataDetail.estimated_delivery_time_instock} onChange={e => { if (e.target.value < 0) return; tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'estimated_delivery_time_instock', fieldValue: e.target.value }) }} />
              <div className='col-sm-10'>
                <div className='d-inline form-check'>
                  <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_jam' defaultValue='hour' checked={estimatedDeliveryUnitTimeInstock === 'hour'} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                  <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_jam'>Jam </label>
                </div>
                <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                  <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_hari' defaultValue='day' checked={estimatedDeliveryUnitTimeInstock === 'day'} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                  <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_hari'>Hari </label>
                </div>
                <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                  <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_minggu' defaultValue='week' checked={estimatedDeliveryUnitTimeInstock === 'week'} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                  <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_minggu'>Minggu </label>
                </div>
                <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                  <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_bulan' defaultValue='month' checked={estimatedDeliveryUnitTimeInstock === 'month'} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                  <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_bulan'>Bulan </label>
                </div>
              </div>
            </div>
          </div>
          {
            productAvailability === 'use_stock' &&
              <>
                <div className='form-group'>
                  <label htmlFor='stock_amount'>Jumlah Stok</label>
                  <input type='number' className='form-control' id='stock_amount' placeholder='Masukan jumlah stok' value={typeof payload.stock_amount !== 'undefined' ? payload.stock_amount : dataDetail.stock_amount} onChange={e => { if (e.target.value < 0) return; tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'stock_amount', fieldValue: e.target.value }) }} />
                </div>
                <div className='form-group'>
                  <label htmlFor='preorder_policy'>Status produk jika stok habis</label>
                  <select
                    name='preorder_policy' id='preorder_policy' className='custom-select' onChange={e => {
                      tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'preorder_policy', fieldValue: e.target.value })
                    }}
                    value={preorderPolicy}
                  >
                    <option value=''>Pilih</option>
                    <option value='preorder'>Pre-Order</option>
                    <option value='unavailable'>Habis</option>
                  </select>
                </div>
              </>
          }
          {preorderPolicy === 'preorder' &&
            <div className='form-group'>
              <label htmlFor='estimated_delivery_time_preorder'>Produk Pre-order biasanya dikirimkan dalam:</label>
              <input type='number' className='form-control' id='estimated_delivery_time_preorder' placeholder='Masukan jumlah waktu' value={typeof payload.estimated_delivery_time_preorder !== 'undefined' ? payload.estimated_delivery_time_preorder : dataDetail.estimated_delivery_time_preorder} onChange={e => { if (e.target.value < 0) return; tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'estimated_delivery_time_preorder', fieldValue: e.target.value }) }} />
              <div className='form-row'>
                <div className='col-sm-10'>
                  <div className='d-inline form-check'>
                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_jam' defaultValue='hour' checked={estimatedDeliveryUnitTimePreorder === 'hour'} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_jam'>Jam </label>
                  </div>
                  <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_hari' defaultValue='day' checked={estimatedDeliveryUnitTimePreorder === 'day'} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_hari'>Hari </label>
                  </div>
                  <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_minggu' defaultValue='week' checked={estimatedDeliveryUnitTimePreorder === 'week'} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_minggu'>Minggu </label>
                  </div>
                  <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_bulan' defaultValue='month' checked={estimatedDeliveryUnitTimePreorder === 'month'} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_bulan'>Bulan </label>
                  </div>
                </div>
              </div>
            </div>}
        </CardWrapperCon>
      </div>
    </div>
  )
}

function Comp (props) {
  const { match } = props
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
            // beforeSubmit={(cb) => {
            //   if (payload.isneed_shipping === 'Y' && payload.weight < 1) return alert('berat barang minimal 1 gram.')
            //   // (payload[paginationConfig.serviceName] || {}).isneed_shipping === 'Y'
            //   // sebelum submit, lakukan upload files dulu
            //   window.submitUploadFileArray({ at: getAccessToken(), tablepaginationOnChangeForm: tablepaginationOnChangeFormFunc, serviceName: paginationConfig.serviceName, fileArray, hostBackend: AppConfig.hostBackend, currentImgIds: currentFileArray.map(v => '' + v._id), cb })
            // }}
          >
            <FormUpdate detailServiceName={detailService} formTitle={upsertPageTitle} />
          </Detail>
          {/* } */}
        </div>
      </div>
    </ContentWrapper>
  )
}
export default injectIntl(Comp)
