import React from 'react'
import { injectIntl } from 'react-intl'
import _, { isNull } from 'lodash'
import { Detail, CardWrapperCon, Table, Filter } from '../../core/features/TablePagination'
// import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { detailService, fields, deleteService, detailPageTitle, listallPageTitle, listallPageUrl, upsertPageUrl, redirectAfterDelete } from './Manifest'
import MerchanKeyManifest from '../MerchantKey/Manifest'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'
import { MerchantkeyModalCon } from '../../features/merchantKey'
import { ButtonActionCon } from '../../features/BankAccount'
// import AppConfig from '../../core/Config/AppConfig'
import { useHistory  } from 'react-router-dom'
import { useDispatch,useSelector }  from 'react-redux'
import TablepaginationActions from '../../core/features/TablePagination/redux'
import {path} from 'ramda'


const DetailContent = (props) => {
  const {
    dataDetail,
    formTitle,
    match,
    id
  } = props

  let createdAt = Moment(dataDetail.created_at || 0)
  if (createdAt && dataDetail.created_at !== null) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
  else createdAt = '-'
  
  let updatedAt = Moment(dataDetail.updated_at || 0)
  if (updatedAt && dataDetail.updated_at !== null) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
  else updatedAt = '-'

  const paginationConfig = {
    serviceName: MerchanKeyManifest.listallService,
    fields: MerchanKeyManifest.fields
  }

  const history = useHistory()
  React.useEffect(() => {
    if(_.isUndefined(id) || _.isNull(id) )history.push('/all-bank-account')
  }, [])

  console.log("bank name",dataDetail)
  return (
    <>
      <div className='row'>
        <div className='col-sm-10'>
          <CardWrapperCon formTitle={formTitle}>
            <dl>
              <dt>Account number</dt>
              <dd>{dataDetail.account_number}</dd>
              <dt>Account Name</dt>
              <dd>{dataDetail.account_name}</dd>
              <dt>Status</dt>
              <dd>{dataDetail.status}</dd>
              <hr />
              <dt>Keterangan</dt>
              <dd>{dataDetail.description}</dd>
              <hr/>
              <dt>Bank Code</dt>
              <dd>{ path(['bank_code_id','bank_code'],dataDetail) || '-'}</dd>
              <dt>Nama Bank</dt>
              <dd>{dataDetail.bank_name || '-'}</dd>
              <hr />
              <dt>Dibuat oleh</dt>
              <dd>{path(['created_by','full_name'],dataDetail) || '-'}</dd>
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
  console.log("detaill>>>>>>>",match)  

  //SET PAYLOAD FOR DELETE SERVICE
  const id = match.params._id
  const merchant_id = String(useSelector(state=>state.myprofile.merchant.id))
  const user_id = useSelector(state=>state.myprofile.user_id)
  
  const dispatch = useDispatch()
  
  React.useEffect(() => {
      dispatch(TablepaginationActions.setDeletePayload({id,merchant_id,user_id}))  
  }, [])
  
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
            apiVersion={2}
            buttonAction={({ dataDetail }) => {
              return (
                <ButtonActionCon
                  history={history}
                  id={match.params._id}
                  dataDetail={dataDetail}
                  deleteService={deleteService}
                  upsertPageUrl={upsertPageUrl}
                />)
            }}
          >
            <DetailContent formTitle={detailPageTitle} history={history} match={match} />
          </Detail>
        </div>
      </div>

    </ContentWrapper>
  )
}
export default injectIntl(Comp)
