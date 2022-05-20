import React from 'react'
// import Immutable from 'seamless-immutable'
import { Link } from 'react-router-dom'
// import _ from 'lodash'
import { injectIntl } from 'react-intl'
import { Detail, CardWrapperCon } from '../../core/features/TablePagination'
// import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { upsertPageUrl, detailService, fields, deleteService, detailPageTitle, redirectAfterDelete } from './Manifest'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'
// import ManifestCustomerEmail from '../CustomerEmail/Manifest'
// import { data } from '../../core/Redux/HomeRedux'

const DetailContent = (props) => {
  const {
    dataDetail,
    history,
    formTitle
  } = props

  let createdAt = Moment(dataDetail.created_at || 0)
  if (createdAt && createdAt.isValid()) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
  else createdAt = ''
  let updatedAt = Moment(dataDetail.updated_at || 0)
  if (updatedAt && updatedAt.isValid()) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
  else updatedAt = ''

  let lastSentDate = '-'
  if (dataDetail.last_sent) {
    lastSentDate = Moment(dataDetail.last_sent || 0)
    if (lastSentDate && lastSentDate.isValid()) lastSentDate = lastSentDate.format('YYYY-MM-DD HH:mm:ss')
    else lastSentDate = ''
  }

  const emailBatchId = dataDetail.email_batch_id || {}
  return (
    <div className='row'>
      <div className='col-sm-6'>
        <CardWrapperCon formTitle={formTitle}>
          <dl>
            <dt>Nama Email</dt>
            <dd>{dataDetail.name}</dd>
            <dt>Subject</dt>
            <dd>{dataDetail.subject}</dd>
            <dt>Dikirim dari toko</dt>
            <dd>{(dataDetail.toko_id || {}).name}</dd>
            <dt>Daftar Email Tujuan</dt>
            <dd>
              <Link
                onClick={() => {
                  history.push('/emailbatch/upsert/' + emailBatchId._id)
                }}
              >
                {emailBatchId.title}
              </Link>
              {/* <br /> */}
              {/* {(emailBatchId.customer_email_ids || []).map(v => v.email).join(', ')} */}
            </dd>
            <dt>Body</dt>
            <dd><div dangerouslySetInnerHTML={{ __html: dataDetail.content1 }} /></dd>
            <dt>Terakhir dikirim</dt>
            <dd>{lastSentDate}</dd>
            <dt>Diperbaharui Oleh</dt>
            <dd>{(dataDetail.updated_by || {}).full_name}</dd>
            <dt>Dibuat Oleh</dt>
            <dd>{(dataDetail.created_by || {}).full_name}</dd>
            <dt>Tanggal Pembuatan</dt>
            <dd>{createdAt}</dd>
            <dt>Tanggal Diperbaharui</dt>
            <dd>{updatedAt}</dd>
          </dl>
        </CardWrapperCon>
      </div>
    </div>
  )
}
function Comp (props) {
  const { match, history } = props
  // const [dataDetail, setDataDetail] = React.useState([])
  // const [lastSent, setLastSent] = React.useState(0)
  // const paginationConfig = {
  //   serviceName: detailService,
  //   serviceDeleteName: deleteService,
  //   fields: fields
  // }
  // useEffect(() => {
  //   const dDetail = Immutable.asMutable(path([paginationConfig.serviceName], dataDetail) || {}, { deep: true })
  //   setLastSent(parseInt(dDetail.last_sent || 0))
  // }, [dataDetail, paginationConfig.serviceName])
  return (
    <ContentWrapper
      pageTitle={detailPageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: 'Daftar Email Blast', link: '/emailblast' },
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
            <DetailContent formTitle={detailPageTitle} history={history} match={match} />
          </Detail>
        </div>
      </div>

    </ContentWrapper>
  )
}
export default injectIntl(Comp)
