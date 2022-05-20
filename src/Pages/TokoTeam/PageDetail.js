import React from 'react'
import { injectIntl } from 'react-intl'
import { Detail as Detaildata } from '../../core/features/TablePagination'
import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { detailService, fields, deleteService, updatePageUrl, redirectAfterDelete } from './Manifest'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'

function createRow (title, paginationConfig, dataDetail, pathArr) {
  return (
    <>
      <dt>{title}</dt>
      <dd>{path([paginationConfig.serviceName, ...pathArr], dataDetail) || '-'}</dd>
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

  // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
  // const courseId = path([paginationConfig.serviceName, 'subject_id', 'course_id', '_id'], dataDetail)
  return (
    <ContentWrapper
      pageTitle='Anggota Tim'
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        // { title: 'Course', link: '/course', isActive: true },
        // { title: 'Course Detail', link: `/course/detail/${courseId}`, isActive: true },
        // { title: 'Subject Detail', link: `/subject/detail/${subjectId}`, isActive: true },
        { title: 'Anggota Tim', link: null, isActive: true }
      ]}
      contentHeaderTitle='Anggota Tim'
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Detaildata
            id={match.params._id}
            updateHref={updatePageUrl(match.params._id)}
            formTitle='Anggota Tim'
            paginationConfig={paginationConfig}
            child={(dataDetail) => {
              let createdAt = Moment(path([paginationConfig.serviceName, 'created_at'], dataDetail))
              if (createdAt && createdAt.isValid()) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
              else createdAt = ''
              let updatedAt = Moment(path([paginationConfig.serviceName, 'updated_at'], dataDetail))
              if (updatedAt && updatedAt.isValid()) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
              else updatedAt = ''
              return (
                <dl>
                  {createRow('Nama', paginationConfig, dataDetail, ['user_id', 'full_name'])}
                  {createRow('Toko', paginationConfig, dataDetail, ['toko_id', 'name'])}
                  {createRow('Dibuat Oleh', paginationConfig, dataDetail, ['created_by', 'full_name'])}
                  {createRow('Diperbaharui Oleh', paginationConfig, dataDetail, ['updated_by', 'full_name'])}
                  <dt>Tanggal Dibuat</dt>
                  <dd>{createdAt}</dd>
                  <dt>Tanggal Diperbaharui</dt>
                  <dd>{updatedAt}</dd>
                  {/* {createRow('Website', paginationConfig, dataDetail, ['website'])}
                  {createRow('Facebook', paginationConfig, dataDetail, ['facebook'])}
                  {createRow('Instagram', paginationConfig, dataDetail, ['instagram'])}
                  {createRow('Youtube', paginationConfig, dataDetail, ['youtube'])}
                  {createRow('Description', paginationConfig, dataDetail, ['description'])}
                  {createRow('Status', paginationConfig, dataDetail, ['status'])} */}
                </dl>
              )
            }}
            footerCard={dataDetail => {
              // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
              return (
                <>
                  <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Hapus</button>
                  <button style={{ width: 150, marginLeft: 5 }} onClick={() => history.push(`/tokoonline/detail/${match.params.toko_id}`)} type='button' className='btn bg-gradient-primary'>Toko Detail</button>
                </>
              )
            }}
            modalFooter={(dataDetail, tablepaginationDeleteData) => {
              // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
              return (
                <>
                  <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal'>Batal</button>
                  <button type='button' className='btn btn-outline-light' onClick={() => tablepaginationDeleteData({ id: match.params._id, serviceName: paginationConfig.serviceDeleteName, redirectAfterDelete: redirectAfterDelete(match.params.toko_id), history })}>Hapus</button>
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
