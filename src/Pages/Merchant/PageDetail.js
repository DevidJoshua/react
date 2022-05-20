import React from 'react'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Detail, CardWrapperCon, Table, Filter } from '../../core/features/TablePagination'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { detailService, fields, deleteService, detailPageTitle, listallPageTitle, listallPageUrl, upsertPageUrl, redirectAfterDelete } from './Manifest'
import { TeamMemberCon } from 'features/dashboard'
import MerchanKeyManifest from '../MerchantKey/Manifest'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'
import { MerchantkeyModalCon } from '../../features/merchantKey'
import { Grid } from '@mui/material'
import { MerchantSecretKeyModalCon } from '../../features/merchantSecretKey'

const DetailContent = (props) => {
  const {
    dataDetail,
    formTitle,
    match,
    userPrivileges
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
          <CardWrapperCon formTitle='Merchant Integration Parameter'>
            <dl>
              <dt>Merchant Name</dt>
              <dd>{dataDetail.merchant_name}</dd>
              <dt>Merchant Code</dt>
              <dd>{dataDetail.merchant_code}</dd>
              <dt>Merchant Email</dt>
              <dd>{dataDetail.merchant_email}</dd>
              <dt>Merchant Phone Number</dt>
              <dd>{dataDetail.merchant_phone_number}</dd>
              <dt>Merchant Frontend Callback Url</dt>
              <dd>{dataDetail.frontend_callback_url}</dd>
              <dt>Merchant Backend Callback Url</dt>
              <dd>{dataDetail.backend_callback_url}</dd>
              <dt>Active Date</dt>
              <dd>{dataDetail.active_date}</dd>
              <dt>Is Active</dt>
              <dd>{dataDetail.is_active}</dd>
              <dt>Merchant Address</dt>
              <dd>{dataDetail.address}</dd>
              <dt>Merchant Picture</dt>
              <dd>{dataDetail.merchant_picture}</dd>
              <dt>Contact Name</dt>
              <dd>{dataDetail.contact_name}</dd>
              <dt>Contact Phone Number</dt>
              <dd>{dataDetail.contact_phone_number}</dd>
            </dl>
          </CardWrapperCon>
          {userPrivileges.includes('13') &&
            <CardWrapperCon formTitle='Merchant Info'>
              <dl>
                <dt>Debitin Merchant Id</dt>
                <dd>{dataDetail.merchant_debitin_id}</dd>
                <dt>Merchant Id</dt>
                <dd>{dataDetail._id}</dd>
                <dt>Plink Merchant Id / Partner Id</dt>
                <dd>{dataDetail.merchant_plink_id}</dd>
                <dt>Client Token</dt>
                <dd>{dataDetail.client_token}</dd>
                <dt>Is Merchant Parent</dt>
                <dd>{dataDetail.is_parent}</dd>
                <dt>Merchant Type</dt>
                <dd>{dataDetail.merchant_type}</dd>
                <dt>Payment Method Config</dt>
                <dd>{dataDetail.payment_method_config}</dd>
                <dt>Diperbaharui Oleh</dt>
                <dd>{(dataDetail.updated_by || {}).full_name || ''}</dd>
                <dt>Dibuat Oleh</dt>
                <dd>{(dataDetail.created_by || {}).full_name || ''}</dd>
                <dt>Tanggal Pembuatan</dt>
                <dd>{createdAt}</dd>
                <dt>Tanggal Diperbaharui</dt>
                <dd>{updatedAt}</dd>
              </dl>
            </CardWrapperCon>}
        </div>

        <div className='col-sm-6'>
          <div className='row'>
            <div className='col-sm-12'>
              <Table
                listallServiceName={MerchanKeyManifest.listallService}
                fields={MerchanKeyManifest.fields}
                columns={MerchanKeyManifest.getColumns(props.history)}
                cardHeader={() => (
                  <div className='row'>
                    <Grid container spacing={2}>
                      <Grid item>
                        <MerchantkeyModalCon merchantId={match.params._id} buttonTriggerLabel='Create New Key' />
                      </Grid>
                      {/* <Grid item>
                          <MerchantSecretKeyModalCon merchantId={match.params._id} buttonTriggerLabel='Generate Secret Key' serviceReference={MerchanKeyManifest.listallService}/>
                        </Grid> */}
                    </Grid>
                  </div>
                )}
                cardTitle={MerchanKeyManifest.listallPageTitle}
                withSearchField
                widthSearchField={300}
                apiVersion={2}
                whereCondition={{ merchant_id: match.params._id }}
              />
            </div>
            {userPrivileges.includes('13') &&
              <div className='col-sm-12'>
                <CardWrapperCon formTitle='Payment Method'>
                  {
                    (dataDetail.merchant_paymentmethod || []).map((i, k) => (
                      <dl key={k}><dt>Payment Method Code</dt><dd>{i.payment_method_code}</dd><dt>Configs</dt><dd>{i.configs}</dd></dl>)
                    )
                  }
                </CardWrapperCon>
              </div>}
            {userPrivileges.includes('13') &&
              <div className='col-sm-12'>
                <TeamMemberCon />
              </div>}
          </div>
        </div>
      </div>
    </>
  )
}

function Comp (props) {
  const { match, history, userPrivileges } = props
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
            <DetailContent userPrivileges={userPrivileges} formTitle={detailPageTitle} history={history} match={match} />
          </Detail>
        </div>
      </div>

    </ContentWrapper>
  )
}
// export default injectIntl(Comp)
const mapStateToProps = (state, ownProps) => {
  return {
    userPrivileges: state.myprofile.user_privileges,
    merchant: state.myprofile.merchant
  }
}
export default connect(mapStateToProps)(injectIntl(Comp))
