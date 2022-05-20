import React from 'react'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import { Detail, CardWrapperCon } from '../../core/features/TablePagination'
// import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { detailService, fields, deleteService, detailPageTitle, listallPageTitle, listallPageUrl, upsertPageUrl, redirectAfterDelete } from './Manifest'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'
import {sanitizeValue} from '../../core/Utils/Utils'
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
      <dl>
        <dt>Id</dt>
        <dd>{sanitizeValue(dataDetail.invoiceNumber)}</dd>
        <dt>External Id</dt>
        <dd>{sanitizeValue(dataDetail.externalId)}</dd>
        <dt>Merchant Ref No</dt>
        <dd>{sanitizeValue(dataDetail.mercRefNo)}</dd>
        <dt>Plink Ref No</dt>
        <dd>{sanitizeValue(dataDetail.ecommRefNo)}</dd>
        <dt>Bank Ref No</dt>
        <dd>{sanitizeValue(dataDetail.payBnkRefNo)}</dd>
        <dt>Payment Method</dt>
        <dd>{sanitizeValue(dataDetail.pymtMethodCd)}</dd>
        <dt>Payment Amount</dt>
        <dd>{sanitizeValue(dataDetail.trxAmt)}</dd>
        <dt>Created Date</dt>
        <dd>{sanitizeValue(dataDetail.trxCreationDt)}</dd>
        <dt>Payment Date</dt>
        <dd>{sanitizeValue(dataDetail.payDt)}</dd>
        <dt>Status</dt>
        <dd>{sanitizeValue(dataDetail.paySts)}</dd>
      </dl>
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
            remove
            detailServiceName={detailService}
            deleteServiceName={deleteService}
            fields={fields}
            id={match.params._id}
            formTitle={detailPageTitle}
            redirectAfterDelete={redirectAfterDelete}
            updatePageUrl={upsertPageUrl(match.params._id)}
            // buttonAction={({ dataDetail,id,deleteServiceName })=> id && deleteServiceName ? <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Hapus</button> : <></>}
            buttonAction={({ dataDetail,id,deleteServiceName })=> <></>}
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
