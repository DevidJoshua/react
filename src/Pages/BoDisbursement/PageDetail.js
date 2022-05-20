import React from 'react'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import { Detail, CardWrapperCon, Table, Filter } from '../../core/features/TablePagination'
// import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { detailService, fields, deleteService, detailPageTitle, listallPageTitle, listallPageUrl, upsertPageUrl, redirectAfterDelete } from './Manifest'
import MerchanKeyManifest from '../MerchantKey/Manifest'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'
import { ButtonActionCon } from '../../features/Disbursement'
// import AppConfig from '../../core/Config/AppConfig'
import { useHistory  } from 'react-router-dom'
import { useDispatch,useSelector }  from 'react-redux'
import TablepaginationActions from '../../core/features/TablePagination/redux'
import {path} from 'ramda'
import {toIdr,toDateTime} from '../../core/Utils/Utils'

const DetailContent = (props) => {
  const {
    dataDetail,
    formTitle,
    match,
    id
  } = props
  let createdAt = Moment(dataDetail.created_dt || 0)
  if (createdAt && dataDetail.created_dt !== null) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
  else createdAt = '-'
  let updatedAt = Moment(dataDetail.updated_dt || 0)
  if (updatedAt && dataDetail.updated_dt !== null) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
  else updatedAt = '-'

  const paginationConfig = {
    serviceName: MerchanKeyManifest.listallService,
    fields: MerchanKeyManifest.fields
  }

  const history = useHistory()
  React.useEffect(() => {
    if(_.isUndefined(id) || _.isNull(id) )history.push('/all-disbursement')
  }, [])
  
  return (
    <>
      <div className='row'>
        <div className='col-sm-10'>
          <CardWrapperCon formTitle={formTitle}>
            <dl>
              <dt>Total Amount</dt>
              <dd>{toIdr(dataDetail.total_amount)}</dd>
              <dt>Reference Number</dt>
              <dd>{dataDetail.ref_no || '-'}</dd>
              <hr />
              <dt>Account number</dt>
              <dd>{dataDetail.account_number || '-'}</dd>
              <dt>Account Name</dt>
              <dd>{dataDetail.account_name || '-'}</dd>
              <hr />
              <dt>Kode Bank</dt>
              <dd>{dataDetail.bank_code || '-'}</dd>
              <dt>Nama Bank</dt>
              <dd>{dataDetail.merchant_name || '-'}</dd>
              <hr/>
              <dt>Recipient Email</dt>
              <dd>{dataDetail.merchant_email || '-'}</dd>
              <dt>Recipient Name</dt>
              <dd>{dataDetail.merchant_name || '-'}</dd>
              <hr/>
              <dt>Keterangan</dt>
              <dd>{dataDetail.description || '-'}</dd>
              <hr />
              <dt>Status</dt>
              <dd>{dataDetail.status || '-'}</dd>
              <dt>Disbursement Acquirer</dt>
              <dd>{dataDetail.disburse_acquirer || '-'}</dd>
              <hr />
              <dt>Dibuat oleh</dt>
              <dd>{path(['created_by','full_name'],dataDetail) || '-'}</dd>
              <dt>Tanggal Pembuatan</dt>
              <dd>{toDateTime(dataDetail.created_dt)}</dd>
              <dt>Tanggal Diperbaharui</dt>
              <dd>{toDateTime(dataDetail.updated_dt)}</dd>
              <hr />
              <dt>Disetujui oleh</dt>
              <dd>{path(['approved_by','full_name'],dataDetail) || '-'}</dd>
              <dt>Tanggal Disetuji</dt>
              <dd>{toDateTime(dataDetail.approved_dt)}</dd>
              <hr />
              <dt>Divalidasi oleh</dt>
              <dd>{path(['validated_by','full_name'],dataDetail) || '-'}</dd>
              <dt>Tanggal Validasi</dt>
              <dd>{toDateTime(dataDetail.validated_dt)}</dd>
            </dl>
          </CardWrapperCon>
        </div>
      </div>
    </>
  )
}

function Comp (props) {
  const { match, history } = props

  const dispatch = useDispatch()

  //SET PAYLOAD FOR DELETE SERVICE
  const _id = match.params._id
  const merchant_id = String(useSelector(state=>state.myprofile.merchant.id))
  const user_id = useSelector(state=>state.myprofile.user_id)
  
  React.useEffect(() => {
      dispatch(TablepaginationActions.setDeletePayload({_id,merchant_id,user_id}))  
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
              // return (
              //   <>
              //     {dataDetail && dataDetail.status === 'OPEN' && deleteService && <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Hapus</button>}
              //     {dataDetail && dataDetail.status === 'OPEN' && upsertPageUrl(match.params._id) && <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(upsertPageUrl(match.params._id))} type='button' className='btn bg-gradient-primary'>Ubah</button>}
              //     {(dataDetail && upsertPageUrl()) && <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(upsertPageUrl())} type='button' className='btn bg-gradient-info'>Buat</button>}
              //   </>
              // )
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
