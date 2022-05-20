import React from 'react'
import { injectIntl } from 'react-intl'
// import _ from 'lodash'
import { Detail, CardWrapperCon } from '../../core/features/TablePagination'
// import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { detailService, fields, deleteService, detailPageTitle, listallPageTitle, listallPageUrl, upsertPageUrl, redirectAfterDelete } from './Manifest'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'
// import AppConfig from '../../core/Config/AppConfig'

const DetailContent = (props) => {
  const {
    dataDetail,
    formTitle
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
        <div className='col-sm-6'>
          <CardWrapperCon formTitle={formTitle}>
            <dl>
              <dt>Judul</dt>
              <dd>{dataDetail.title}</dd>
              <dt>pgcode</dt>
              <dd>{dataDetail.pgcode}</dd>
              <dt>keyid</dt>
              <dd>{dataDetail.keyid}</dd>
              <dt>mid</dt>
              <dd>{dataDetail.mid}</dd>
              <dt>secretkey</dt>
              <dd>{dataDetail.secretkey}</dd>
              <dt>configs</dt>
              <dd>{dataDetail.configs}</dd>
              <dt>description</dt>
              <dd>{dataDetail.description}</dd>
              <dt>backendCallbackUrl</dt>
              <dd>{dataDetail.backendCallbackUrl}</dd>
              <dt>frontendCallbackUrl</dt>
              <dd>{dataDetail.frontendCallbackUrl}</dd>
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
  return (
    <ContentWrapper
      pageTitle={detailPageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: listallPageTitle, link: listallPageUrl() },
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
            <DetailContent formTitle={detailPageTitle} history={history} match={match} />
          </Detail>
        </div>
      </div>

    </ContentWrapper>
  )
}
export default injectIntl(Comp)
