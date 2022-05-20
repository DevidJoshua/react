import React from 'react'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import { Detail } from '../../core/features/TablePagination'
// import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { detailService, fields, deleteService, detailPageTitle, upsertPageUrl, redirectAfterDelete } from './Manifest'
import ManifestEmailBlast from '../EmailBlast/Manifest'
// import ManifestCustomerEmail from '../CustomerEmail/Manifest'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'

const DetailContent = (props) => {
  const {
    dataDetail
    // history
  } = props

  let createdAt = Moment(dataDetail.created_at || 0)
  if (createdAt && createdAt.isValid()) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
  else createdAt = ''
  let updatedAt = Moment(dataDetail.updated_at || 0)
  if (updatedAt && updatedAt.isValid()) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
  else updatedAt = ''

  return (
    <dl>
      <dt>Judul</dt>
      <dd>{dataDetail.title}</dd>
      <dt><T id='label-description' /></dt>
      <dd>{dataDetail.description}</dd>
      <dt>Diperbaharui Oleh</dt>
      <dd>{(dataDetail.updated_by || {}).full_name}</dd>
      <dt>Dibuat Oleh</dt>
      <dd>{(dataDetail.created_by || {}).full_name}</dd>
      <dt>Tanggal Pembuatan</dt>
      <dd>{createdAt}</dd>
      <dt>Tanggal Diperbaharui</dt>
      <dd>{updatedAt}</dd>
    </dl>
  )
}

function Comp (props) {
  const { match, history } = props
  return (
    <ContentWrapper
      pageTitle={detailPageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: ManifestEmailBlast.listallPageTitle, link: ManifestEmailBlast.listallPageUrl() },
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
            // child={(dataDetail) => {
            //   // setDataDetail(dataDetail)
            //   let createdAt = Moment(path([paginationConfig.serviceName, 'created_at'], dataDetail))
            //   if (createdAt && createdAt.isValid()) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
            //   else createdAt = ''
            //   let updatedAt = Moment(path([paginationConfig.serviceName, 'updated_at'], dataDetail))
            //   if (updatedAt && updatedAt.isValid()) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
            //   else updatedAt = ''
            //   return (
            //     <dl>
            //       <dt>Judul</dt>
            //       <dd>{path([paginationConfig.serviceName, 'title'], dataDetail) || ''}</dd>
            //       <dt><T id='label-description' /></dt>
            //       <dd>{path([paginationConfig.serviceName, 'description'], dataDetail) || ''}</dd>
            //       <dt>Diperbaharui Oleh</dt>
            //       <dd>{path([paginationConfig.serviceName, 'updated_by', 'full_name'], dataDetail) || ''}</dd>
            //       <dt>Dibuat Oleh</dt>
            //       <dd>{path([paginationConfig.serviceName, 'created_by', 'full_name'], dataDetail) || ''}</dd>
            //       <dt>Tanggal Pembuatan</dt>
            //       <dd>{createdAt}</dd>
            //       <dt>Tanggal Diperbaharui</dt>
            //       <dd>{updatedAt}</dd>
            //     </dl>
            //   )
            // }}
            // footerCard={dataDetail => {
            //   // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
            //   return (
            //     <>
            //       {/* <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Hapus</button> */}
            //       <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(updatePageUrl(match.params._id))} type='button' className='btn bg-gradient-primary'>Ubah</button>
            //       <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push('/emailbatch/create')} type='button' className='btn bg-gradient-info'>Buat</button>
            //       {/* <button type='button' className='btn btn-info' onClick={() => history.push(createHref)}><i className='fas fa-plus' /> {`${createNewButtonLabel || 'Create New'}`}</button> */}
            //       {/* <button style={{ width: 100, marginLeft: 5 }} onClick={e => history.goBack()} type='button' className='btn bg-gradient-warning'>Back</button> */}
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
            <DetailContent history={history} match={match} />
          </Detail>
          {/* <Table
            paginationConfig={{
              serviceName: ManifestCustomerEmail.listallByBatchIdService,
              fields: ManifestCustomerEmail.fields
            }}
            columns={ManifestCustomerEmail.getColumns(history)}
            createHref={ManifestCustomerEmail.createPageUrl({ batchId: match.params._id })}
            createNewButtonLabel={ManifestCustomerEmail.createNewButtonLabel}
            cardTitle='Daftar Email Customer'
            whereCondition={{ batch_id: match.params._id }}
          /> */}
        </div>
      </div>

    </ContentWrapper>
  )
}
export default injectIntl(Comp)
