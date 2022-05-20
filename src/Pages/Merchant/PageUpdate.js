import React from 'react'
import { Detail, Multiselect, CardWrapperCon } from '../../core/features/TablePagination'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import moment from 'moment'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker'
import TextField from '@mui/material/TextField'
import AppConfig from '../../core/Config/AppConfig'
import { listallService, upsertPageTitle, listallPageUrl, listallPageTitle, upsertService, fields, detailService, redirectAfterDelete } from './Manifest'
import TokoOnlineManifest from '../TokoOnline/Manifest'

const InputText = ({ upsertServiceName, tablepaginationOnChangeForm, payload, name, dataDetail }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{name}</label>
      <input type='text' className='form-control' id={name} placeholder='' value={typeof payload[name] !== 'undefined' ? payload[name] : dataDetail[name] || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: name, fieldValue: e.target.value })} />
    </div>
  )
}
const InputText2 = ({ upsertServiceName, tablepaginationOnChangeForm, payload, name, label, dataDetail }) => {
  return (
    <>
      <TextField
        size='small'
        id={name}
        label={label}
        value={typeof payload[name] !== 'undefined' ? payload[name] : dataDetail[name] || ''}
        onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: name, fieldValue: e.target.value })}
      />
    </>
  )
  // return (
  //   <div className='form-group'>
  //     <label htmlFor={name}>{name}</label>
  //     <input type='text' className='form-control' id={name} placeholder='' value={typeof payload[name] !== 'undefined' ? payload[name] : dataDetail[name] || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: name, fieldValue: e.target.value })} />
  //   </div>
  // )
}

const FormUpdate = (props) => {
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    id,
    tablepaginationResetForm,
    formTitle,
    userPrivileges
  } = props
  React.useEffect(() => {
    const defaultFormValue = {}
    if (id) defaultFormValue._id = id
    tablepaginationResetForm({ apiVersion: 2, isInitialReset: true, serviceName: upsertServiceName, defaultFormValue })
  }, [tablepaginationResetForm, upsertServiceName, id])
  console.log('payloadpayloadpayload===>', payload.title)
  console.log('payloadpayloadpayload===>', dataDetail.title)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete='off'
      >

        <InputText2
          upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
          name='frontend_callback_url'
          label='Frontend Callback Url'
        />
        <InputText2
          upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
          name='backend_callback_url'
          label='Backend Callback Url'
        />
        {/* <InputText2
          upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
          name='active_date'
          label='Active Date'
        /> */}
        {/* 2021-07-27 14:34:13.0 */}
        <InputText2
          upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
          name='address'
          label='Address'
        />

        <InputText2
          upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
          name='merchant_picture'
          label='Merchant Picture'
        />
        <InputText2
          upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
          name='contact_name'
          label='Contact Name'
        />
        <InputText2
          upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
          name='contact_phone_number'
          label='Contact Phone Number'
        />
        {userPrivileges.includes('13') &&
          (<>
            <InputText2
              upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
              name='merchant_name' label='Merchant Name'
            />
            <InputText2
              upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
              name='merchant_code' label='Merchant Code'
            />
            <InputText2
              upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
              name='merchant_debitin_id' label='Merchant Debitin Id'
            />
            <InputText2
              upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
              name='merchant_plink_id'
              label='Merchant Plink Id'
            />
            <InputText2
              upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
              name='merchant_phone_number'
              label='Merchant Phone Number'
            />
            <InputText2
              upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
              name='merchant_email'
              label='Merchant Email'
            />
            <DateTimePicker
              label='Active Date'
              value={typeof payload.active_date !== 'undefined' ? payload.active_date : dataDetail.active_date || ''}
              inputFormat='yyyy-MM-dd HH:mm:ss.SSS'
              onChange={(e) => {
                var d = moment(e)
                tablepaginationOnChangeForm({
                  serviceName: upsertServiceName,
                  fieldName: 'active_date',
                  fieldValue: d.isValid() ? moment(d).format('YYYY-MM-DD HH:mm:ss.SSS ZZ') : ''
                  // fieldValue: d.isValid() ? d.format('YYYY-MM-DD HH:mm:ss') : ''
                })
              }}
              renderInput={(params) => <TextField size='small' {...params} />}
            />
            <InputText2
              upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
              name='is_active'
              label='Is Active'
            />
            <InputText2
              upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
              name='client_token'
              label='Client Token'
            />
            <InputText2
              upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
              name='is_parent'
              label='Is Parent'
            />
            <InputText2
              upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
              name='merchant_type'
              label='Merchant Type'
            />
            <InputText2
              upsertServiceName={upsertServiceName} dataDetail={dataDetail} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm}
              name='payment_method_config'
              label='Payment Method Config'
            />
           </>)}
      </Box>
    </LocalizationProvider>
  )
}
function Comp (props) {
  console.log('raysaaaaaaaa')
  const { match, userPrivileges } = props
  return (
    <ContentWrapper
      pageTitle={upsertPageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: listallPageTitle, link: listallPageUrl() },
        { title: upsertPageTitle, link: null, isActive: true }
      ]}
      contentHeaderTitle={upsertPageTitle}
      isNeedLoggedin
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <Grid item xs={12}>
              <Paper variant='outlined'>
                <div style={{ padding: 10 }}>
                  <Detail
                    detailServiceName={detailService}
                    upsertServiceName={upsertService}
                    fields={fields}
                    id={match.params._id}
                    formTitle={upsertPageTitle}
                    redirectAfterDelete={redirectAfterDelete}
                    withoutWrapper
                  >
                    <FormUpdate userPrivileges={userPrivileges} formTitle={upsertPageTitle} />
                  </Detail>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ContentWrapper>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    userPrivileges: state.myprofile.user_privileges,
    merchant: state.myprofile.merchant
  }
}
export default connect(mapStateToProps)(injectIntl(Comp))
