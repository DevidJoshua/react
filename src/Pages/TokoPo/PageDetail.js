import React from 'react'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import { Detail, Table } from '../../core/features/TablePagination'
import { FieldProvince, FieldCity, FieldSubCity, FieldCurrier, FieldCurrierVendor } from '../../features/SetLocation/components'
// import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { detailService, fields, deleteService, detailPageTitle, upsertPageUrl, redirectAfterDelete } from './Manifest'
import TokoCartManifest from '../TokoCart/Manifest'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'

function createRow (title, dataDetail, pathArr) {
  const val = dataDetail[pathArr[0]]
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

const TableCart = React.memo((props) => {
  const { history, match, dataDetail } = props
  console.log('propspropsprops=>', props)
  return (
    <Table
      listallServiceName={TokoCartManifest.listallBySessionIdService}
      fields={TokoCartManifest.fields}
      columns={TokoCartManifest.getColumns({ history, tokoId: match.params._id })}
      // createHref={TokoCartManifest.upsertPageUrl()}
      // createNewButtonLabel={TokoCartManifest.createNewButtonLabel}
      cardTitle={TokoCartManifest.listallPageTitle}
      whereCondition={{ session_id: dataDetail.session_id, status: '*' }}
      // cardTitle='Keranjang Belanja'
      // paginationConfig={{ serviceName: 'getAllTokoCartsBySessionId', fields: TokoCartManifest.fields }}
      // columns={TokoCartManifest.getColumns({ history, tokoId: match.params._id })}
      // whereCondition={{ session_id: detail.session_id, status: '*' }}
    />
  )
})

const DetailContent = (props) => {
  const {
    dataDetail,
    history,
    match,
    intl
  } = props
  let createdAt = Moment(dataDetail.created_at || 0)
  if (createdAt && createdAt.isValid()) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
  else createdAt = ''
  let updatedAt = Moment(dataDetail.updated_at || 0)
  if (updatedAt && updatedAt.isValid()) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
  else updatedAt = ''
  return (
    <>
      <div className='row'>
        <div className='col-md-6'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header' data-card-widget='collapse'>
                  <h3 className='card-title'>Total Pembayaran</h3>
                  <div className='card-tools'>
                    <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
                  </div>
                </div>
                <div className='card-body'>
                  <dl>
                    <dt>Total Harga Product</dt>
                    {/* <dd>{dataDetail.total_product_amount}</dd> */}
                    <dd>{intl.formatNumber(dataDetail.total_product_amount, { style: 'currency', currency: AppConfig.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })}</dd>
                    {createRow('Kode Unik', dataDetail, ['unique_code'])}
                    <dt>Ongkos Kirim</dt>
                    <dd>{intl.formatNumber(dataDetail.shipping_amount, { style: 'currency', currency: AppConfig.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })}</dd>
                    <dt>Total Pembayaran</dt>
                    <dd>{intl.formatNumber(dataDetail.total_amount, { style: 'currency', currency: AppConfig.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })}</dd>
                    {process.env.REACT_APP_SHOW_FORMFIELD_PAYMENTMETHOD && createRow('Metode Pembayaran', dataDetail, ['payment_method_id', 'title'])}
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
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header' data-card-widget='collapse'>
                  <h3 className='card-title'>Data Pembeli</h3>
                  <div className='card-tools'>
                    <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
                  </div>
                </div>
                <div className='card-body'>
                  <dl>
                    <dt>Nama</dt><dd>{dataDetail.full_name || '-'}</dd>
                    <dt>Nomor Telepon</dt><dd>{dataDetail.phone_number || '-'}</dd>
                    <dt>Email</dt><dd>{dataDetail.email || '-'}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header' data-card-widget='collapse'>
                  <h3 className='card-title'>Alamat Pengiriman</h3>
                  <div className='card-tools'>
                    <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
                  </div>
                </div>
                <div className='card-body'>
                  <dl>
                    {dataDetail.postal_fee_type === 'auto' &&
                      <>
                        {/* {createRow('Provinsi', dataDetail, ['shipping_province'])}
                        {createRow('Kota/Kabupaten', dataDetail, ['shipping_city'])}
                        {createRow('Kecamatan', dataDetail, ['shipping_subcity'])} */}
                        <dt>Provinsi</dt>
                        <dd><FieldProvince defaultValue={dataDetail.shipping_province} forProcess='display' /></dd>
                        <dt>Kota/Kabupaten</dt>
                        <dd><FieldCity defaultValue={dataDetail.shipping_city} provinceId={dataDetail.shipping_province} forProcess='display' /></dd>
                        <dt>Kecamatan</dt>
                        <dd><FieldSubCity defaultValue={dataDetail.shipping_subcity} cityId={dataDetail.shipping_city} forProcess='display' /></dd>
                        <dt>Kurir Vendor</dt>
                        <dd>
                          <FieldCurrierVendor
                            defaultValue={dataDetail.shipping_currier_vendor}
                            subcityId={dataDetail.shipping_subcity}
                            forProcess='display'
                          />
                        </dd>
                        <dt>Kurir</dt>
                        <dd>
                          <FieldCurrier
                            defaultValue={dataDetail.shipping_currier}
                            currierVendorId={dataDetail.shipping_currier_vendor}
                            tokoSubcity={dataDetail.toko_id.subcity}
                            shippingSubcity={dataDetail.shipping_subcity}
                            weight={dataDetail.total_weight}
                            forProcess='display'
                          />
                        </dd>
                      </>}
                    {createRow('Kode Pos', dataDetail, ['shipping_postal_code'])}
                    {createRow('Alamat', dataDetail, ['shipping_address'])}
                    <dt>Catatan</dt><dd>{dataDetail.notes || '-'}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <TableCart history={history} match={match} dataDetail={dataDetail} />
        </div>
      </div>
    </>
  )
}

function Comp (props) {
  const { match, history, intl } = props
  return (
    <ContentWrapper
      pageTitle={detailPageTitle}
      breadcrumb={[
        { title: 'Home', link: AppConfig.appHomePage },
        { title: 'Daftar Pembelian', link: '/purchaseorder' },
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
          >
            <DetailContent
              history={history}
              match={match}
              intl={intl}
            />
          </Detail>
        </div>
      </div>

    </ContentWrapper>
  )
}
export default injectIntl(Comp)
