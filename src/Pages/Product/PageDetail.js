import React from 'react'
import { injectIntl } from 'react-intl'
// import Immutable from 'seamless-immutable'
import _ from 'lodash'
import { DisplayPictures } from '../../features/PictureUpload/components'
import { CardWrapperCon } from '../../core/features/TablePagination/containers'
import { Detail } from '../../core/features/TablePagination'
import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { redirectAfterDelete, detailService, fields, deleteService, detailPageTitle, upsertPageUrl } from './Manifest'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'

function createRow (title, dataDetail, pathArr) {
  const val = path([pathArr[0]], dataDetail)
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

const DetailContent = (props) => {
  const {
    dataDetail,
    formTitle,
    detailServiceName
  } = props
  let isNeedOngkir = dataDetail.isneed_shipping
  if (isNeedOngkir === 'Y') isNeedOngkir = 'Butuh'
  else isNeedOngkir = 'Tidak Butuh'
  let createdAt = Moment(dataDetail.created_at || 0)
  if (createdAt && createdAt.isValid()) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
  else createdAt = ''
  let updatedAt = Moment(dataDetail.updated_at || 0)
  if (updatedAt && updatedAt.isValid()) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
  else updatedAt = ''

  const productAvailabilityLabel = { use_stock: 'Gunakan Stok', always_ready: 'Selalu Ada Stok' }
  const estimatedDeliveryUnitTimeLabel = { hour: 'Jam', day: 'Hari', week: 'Minggu', month: 'Bulan' }
  const preorderpolicyLabel = dataDetail.preorder_policy === 'unavailable' ? 'Habis' : 'Pre-Order'

  return (
    <>
      <div className='row'>
        <div className='col-sm-6'>
          <CardWrapperCon formTitle={formTitle} serviceName={detailServiceName}>
            <dl>
              {createRow('Nama', dataDetail, ['name'])}
              {createRow('Kode', dataDetail, ['code'])}
              {createRow('Harga', dataDetail, ['price'])}
              {createRow('Berat', dataDetail, ['weight'])}
              <dt>Apakah Butuh Ongkir?</dt>
              <dd>{isNeedOngkir}</dd>
              {/* {createRow('Apakah Butuh Ongkir', dataDetail, ['isneed_shipping'])} */}
              {createRow('Kategori', dataDetail, ['category_id', 'title'])}
              {createRow('Toko Online', dataDetail, ['toko_id', 'name'])}
              {createRow('Tagging', dataDetail, ['tag_id', 'name'])}
              {process.env.REACT_APP_SHOW_FORMFIELD_SHORTDESCRIPTION && createRow('Deskripsi', dataDetail, ['description'])}

              <dt>Deskripsi Produk</dt>
              <dd><div className='dangerouslySetInnerHTML' dangerouslySetInnerHTML={{ __html: dataDetail.content1 || '' }} /></dd>

              <dt>Ketersediaan Produk</dt>
              <dd>{productAvailabilityLabel[dataDetail.product_availability]}</dd>

              {createRow('Label ketika stok masih ada', dataDetail, ['instock_label'])}
              <dt>Setelah customer melakukan pembayaran, produk akan dikirim dalam:</dt>
              <dd>{dataDetail.estimated_delivery_time_instock} {estimatedDeliveryUnitTimeLabel[dataDetail.estimated_delivery_unit_time_instock]}</dd>

              {
                dataDetail.product_availability === 'use_stock' &&
                  <>
                    {createRow('Jumlah Stok', dataDetail, ['stock_amount'])}
                    <dt>Status produk jika stok habis:</dt>
                    <dd>{preorderpolicyLabel}</dd>
                    {/* createRow('Status produk jika stok habis', dataDetail, ['preorder_policy']) */}
                    {
                      dataDetail.preorder_policy === 'preorder' &&
                        <>
                          <dt>Produk Pre-order biasanya dikirimkan dalam:</dt>
                          <dd>{dataDetail.estimated_delivery_time_preorder} {estimatedDeliveryUnitTimeLabel[dataDetail.estimated_delivery_unit_time_preorder] || ''}</dd>
                        </>
                    }
                  </>
              }
              <dt>Gambar</dt>
              <dd>
                {/* <img src={`${AppConfig.hostBackend}/api/renderfile/${path([paginationConfig.serviceName, 'image_id', 'filename'], dataDetail) || ''}.${path([paginationConfig.serviceName, 'image_id', 'file_type'], dataDetail) || ''}`} /> */}
                <DisplayPictures
                  currentFileArray={dataDetail.image_ids}
                />
              </dd>
              <dt>Diperbaharui Oleh</dt>
              <dd>{(dataDetail.updated_by || {}).full_name || ''}</dd>
              <dt>Dibuat Oleh</dt>
              <dd>{(dataDetail.created_by || {}).full_name || ''}</dd>
              <dt>Tanggal Pembuatan</dt>
              <dd>{createdAt}</dd>
              <dt>Tanggal Diperbaharui</dt>
              <dd>{updatedAt}</dd>
            </dl>
          </CardWrapperCon>
        </div>
      </div>
    </>
  )
}

function Comp (props) {
  const { match, history } = props
  // const paginationConfig = {
  //   serviceName: detailService,
  //   serviceDeleteName: deleteService,
  //   fields: fields
  // }
  return (
    <ContentWrapper
      pageTitle={detailPageTitle}
      breadcrumb={[
        { title: 'Home', link: AppConfig.appHomePage },
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
          <Detail
            detailServiceName={detailService}
            deleteServiceName={deleteService}
            fields={fields}
            id={match.params._id}
            formTitle={detailPageTitle}
            redirectAfterDelete={redirectAfterDelete}
            updatePageUrl={upsertPageUrl(match.params._id)}
            createPageUrl={upsertPageUrl()}
            withoutWrapper
            // footerCard={dataDetail => {
            //   // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
            //   return (
            //     <>
            //       <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Hapus</button>
            //       <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(updatePageUrl(match.params._id))} type='button' className='btn bg-gradient-primary'>Ubah</button>
            //       <button style={{ marginLeft: 5 }} onClick={() => history.push('/product/create')} type='button' className='btn bg-gradient-info'><T id='label.createNewProduct' /></button>
            //       {/* <button style={{ width: 100, marginLeft: 5 }} onClick={e => history.goBack()} type='button' className='btn bg-gradient-warning'>Kembali</button> */}
            //     </>
            //   )
            // }}
            // modalFooter={(dataDetail, tablepaginationDeleteData) => {
            //   // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
            //   return (
            //     <>
            //       <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal'>Batal</button>
            //       <button type='button' className='btn btn-outline-light' onClick={() => tablepaginationDeleteData({ id: match.params._id, serviceName: paginationConfig.serviceDeleteName, redirectAfterDelete: redirectAfterDelete, history })}>Hapus</button>
            //     </>
            //   )
            // }}
          >
            <DetailContent history={history} match={match} formTitle={detailPageTitle} detailServiceName={detailService} />
          </Detail>
        </div>
      </div>

    </ContentWrapper>
  )
}
export default injectIntl(Comp)
