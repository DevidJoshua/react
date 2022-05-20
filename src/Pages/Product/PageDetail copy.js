import React from 'react'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import { Detail as Detaildata } from '../../core/features/TablePagination'
import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { detailService, fields, deleteService, detailPageTitle, updatePageUrl, redirectAfterDelete } from './Manifest'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'

function createRow (title, paginationConfig, dataDetail, pathArr) {
  const val = path([paginationConfig.serviceName, pathArr[0]], dataDetail)
  let ddVal = ''
  if (!_.isEmpty(val) && Array.isArray(val)) {
    ddVal = (val.map(v => {
      if (v) return v[pathArr[1]]
      else return '-'
    })).join(', ')
  } else if (!_.isEmpty(val) && typeof val === 'object') {
    ddVal = val[pathArr[1]]
  } else {
    ddVal = val
  }
  return (
    <>
      <dt>{title}</dt>
      <dd>{ddVal || '-'}</dd>
    </>
  )
}

function Comp (props) {
  const { match, history } = props
  const paginationConfig = {
    serviceName: detailService,
    serviceDeleteName: deleteService,
    fields: fields
  }
  return (
    <ContentWrapper
      pageTitle={detailPageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: 'Daftar Produk', link: '/product' },
        // { title: 'Course', link: '/course', isActive: true },
        // { title: 'Course Detail', link: `/course/detail/${courseId}`, isActive: true },
        // { title: 'Subject Detail', link: `/subject/detail/${subjectId}`, isActive: true },
        { title: detailPageTitle, link: null, isActive: true }
      ]}
      contentHeaderTitle={detailPageTitle}
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Detaildata
            id={match.params._id}
            updateHref={updatePageUrl(match.params._id)}
            formTitle={detailPageTitle}
            paginationConfig={paginationConfig}
            child={(dataDetail) => {
              const imageIds = Immutable.asMutable(path([paginationConfig.serviceName, 'image_ids'], dataDetail) || [], { deep: true })
              const currentFileArray = imageIds
              let isNeedOngkir = path([paginationConfig.serviceName, 'isneed_shipping'], dataDetail)
              if (isNeedOngkir === 'Y') isNeedOngkir = 'Butuh'
              else isNeedOngkir = 'Tidak Butuh'
              let createdAt = Moment(path([paginationConfig.serviceName, 'created_at'], dataDetail))
              if (createdAt && createdAt.isValid()) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
              else createdAt = ''
              let updatedAt = Moment(path([paginationConfig.serviceName, 'updated_at'], dataDetail))
              if (updatedAt && updatedAt.isValid()) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
              else updatedAt = ''
              const productAvailabilityLabel = { use_stock: 'Gunakan Stok', always_ready: 'Selalu Ada Stok' }
              const estimatedDeliveryUnitTimeLabel = { hour: 'Jam', day: 'Hari', week: 'Minggu', month: 'Bulan' }

              const preorderpolicyLabel = path([paginationConfig.serviceName, 'preorder_policy'], dataDetail) === 'unavailable' ? 'Habis' : 'Pre-Order'
              // createRow('Status produk jika stok habis', paginationConfig, dataDetail, ['preorder_policy'])

              return (
                <dl>
                  {createRow('Nama', paginationConfig, dataDetail, ['name'])}
                  {createRow('Kode', paginationConfig, dataDetail, ['code'])}
                  {createRow('Harga', paginationConfig, dataDetail, ['price'])}
                  {createRow('Berat', paginationConfig, dataDetail, ['weight'])}
                  <dt>Apakah Butuh Ongkir?</dt>
                  <dd>{isNeedOngkir}</dd>
                  {/* {createRow('Apakah Butuh Ongkir', paginationConfig, dataDetail, ['isneed_shipping'])} */}
                  {createRow('Kategori', paginationConfig, dataDetail, ['category_id', 'title'])}
                  {createRow('Toko Online', paginationConfig, dataDetail, ['toko_id', 'name'])}
                  {createRow('Tagging', paginationConfig, dataDetail, ['tag_id', 'name'])}
                  {process.env.REACT_APP_SHOW_FORMFIELD_SHORTDESCRIPTION && createRow('Deskripsi', paginationConfig, dataDetail, ['description'])}

                  <dt><T id='label-description' /></dt>
                  <dd><div dangerouslySetInnerHTML={{ __html: path([paginationConfig.serviceName, 'content1'], dataDetail) || '' }} /></dd>

                  <dt>Ketersediaan Produk</dt>
                  <dd>{productAvailabilityLabel[path([paginationConfig.serviceName, 'product_availability'], dataDetail)]}</dd>

                  {createRow('Label ketika stok masih ada', paginationConfig, dataDetail, ['instock_label'])}
                  <dt>Setelah customer melakukan pembayaran, produk akan dikirim dalam:</dt>
                  <dd>{path([paginationConfig.serviceName, 'estimated_delivery_time_instock'], dataDetail)} {estimatedDeliveryUnitTimeLabel[path([paginationConfig.serviceName, 'estimated_delivery_unit_time_instock'], dataDetail)] || ''}</dd>

                  {
                    path([paginationConfig.serviceName, 'product_availability'], dataDetail) === 'use_stock' &&
                      <>
                        {createRow('Jumlah Stok', paginationConfig, dataDetail, ['stock_amount'])}
                        <dt>Status produk jika stok habis:</dt>
                        <dd>{preorderpolicyLabel}</dd>
                        {/* createRow('Status produk jika stok habis', paginationConfig, dataDetail, ['preorder_policy']) */}
                        {
                          path([paginationConfig.serviceName, 'preorder_policy'], dataDetail) === 'preorder' &&
                            <>
                              <dt>Produk Pre-order biasanya dikirimkan dalam:</dt>
                              <dd>{path([paginationConfig.serviceName, 'estimated_delivery_time_preorder'], dataDetail)} {estimatedDeliveryUnitTimeLabel[path([paginationConfig.serviceName, 'estimated_delivery_unit_time_preorder'], dataDetail)] || ''}</dd>
                            </>
                        }
                      </>
                  }

                  {createRow('Diperbaharui Oleh', paginationConfig, dataDetail, ['updated_by', 'full_name'])}
                  {createRow('Dibuat Oleh', paginationConfig, dataDetail, ['created_by', 'full_name'])}
                  <dt>Tanggal Dibuat</dt>
                  <dd>{createdAt}</dd>
                  <dt>Tanggal Diperbaharui</dt>
                  <dd>{updatedAt}</dd>
                  <dt>Gambar</dt>
                  <dd>
                    {/* <img src={`${AppConfig.hostBackend}/api/renderfile/${path([paginationConfig.serviceName, 'image_id', 'filename'], dataDetail) || ''}.${path([paginationConfig.serviceName, 'image_id', 'file_type'], dataDetail) || ''}`} /> */}
                    <div className='container'>
                      <div className='row row-cols-3'>
                        {
                          currentFileArray.map((v, k) => (
                            <div key={k} className='col'>
                              <div className='card'>
                                <img width='100%' src={`${AppConfig.hostBackend}/api/renderfile/${v.filename || ''}.${v.file_type || ''}`} alt='...' />
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </dd>
                </dl>
              )
            }}
            footerCard={dataDetail => {
              // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
              return (
                <>
                  <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Hapus</button>
                  <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(updatePageUrl(match.params._id))} type='button' className='btn bg-gradient-primary'>Ubah</button>
                  <button style={{ marginLeft: 5 }} onClick={() => history.push('/product/create')} type='button' className='btn bg-gradient-info'><T id='label.createNewProduct' /></button>
                  {/* <button style={{ width: 100, marginLeft: 5 }} onClick={e => history.goBack()} type='button' className='btn bg-gradient-warning'>Kembali</button> */}
                </>
              )
            }}
            modalFooter={(dataDetail, tablepaginationDeleteData) => {
              // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
              return (
                <>
                  <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal'>Batal</button>
                  <button type='button' className='btn btn-outline-light' onClick={() => tablepaginationDeleteData({ id: match.params._id, serviceName: paginationConfig.serviceDeleteName, redirectAfterDelete: redirectAfterDelete, history })}>Hapus</button>
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
