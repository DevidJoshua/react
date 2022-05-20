import React from 'react'
import { Detail, Multiselect, CardWrapperCon } from '../../core/features/TablePagination'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { injectIntl } from 'react-intl'
import AppConfig from '../../core/Config/AppConfig'
import { listallService, upsertPageTitle, listallPageUrl, listallPageTitle, upsertService, fields, detailService, redirectAfterDelete } from './Manifest'
import TokoOnlineManifest from '../TokoOnline/Manifest'
import BankAccountCombobox from '../../features/BankAccountCombobox'
import { connect,useDispatch as dispatch} from 'react-redux'
import ComboboxActions from '../../features/BankAccountCombobox/redux'


const FormUpdate = (props) => {
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    id,
    tablepaginationResetForm,
    formTitle,
    myMerchantId,
    myUserId
  } = props
  // useMemo(() => tablepaginationResetForm({ serviceName: upsertServiceName, defaultFormValue: { _id: id } }), [])
  React.useEffect(() => {
    const defaultFormValue = { merchant_id: '' + myMerchantId, user_id: myUserId }
    if (id) defaultFormValue._id = id
    tablepaginationResetForm({ apiVersion: 2, isInitialReset: true, serviceName: upsertServiceName, defaultFormValue, redirectAfterUpsert:'/account-number-detail/', redirectAfterDelete:'/all-bank-account' })
    // if (id) tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: '_id', fieldValue: id, resetValue: id })
  }, [tablepaginationResetForm, upsertServiceName, id])
  // if (dataDetail) {
  //   tablepaginationResetForm({ serviceName: upsertServiceName, defaultFormValue: { _id: id } })
  // }
  // if (dataDetail) {
  // useMemo(() => {
  //   return tablepaginationResetForm({ serviceName: upsertServiceName, defaultFormValue: { _id: dataDetail._id } })
  // }, [upsertServiceName, tablepaginationResetForm, dataDetail])
  // }
  // const [payloadValueOriginal, setPayloadValueOriginal] = React.useState([])
  console.log('payloadpayloadpayload ===>', payload)
  // console.log('payloadpayloadpayload===>', dataDetail.title)

  React.useEffect(()=>{
    console.log("props>>>>>>>"+props)
    // tablepaginationOnChangeForm({ serviceName: merchant, fieldName: 'description', fieldValue: e.target.value })}
  },[])
console.log("servicenya>>>>>>",upsertServiceName)
  return (
    <div className='row'>
      <div className='col-sm-6'>
        <CardWrapperCon formTitle={formTitle}>
          <input type='hidden' className='form-control' id='merchant_id' value={typeof payload.merchant_id !== 'undefined' ? payload.merchant_id : dataDetail.merchant_id || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'merchant_id', fieldValue: e.target.value })} />
          <input type='hidden' className='form-control' id='user_id' value={typeof payload.user_id !== 'undefined' ? payload.user_id : dataDetail.user_id || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'user_id', fieldValue: e.target.value })} />
          <div className='form-group'>
            <label htmlFor='title'>Account Name</label>
            <input type='text' className='form-control' id='title' placeholder='Masukkan nama pemilik account number' value={typeof payload.account_name !== 'undefined' ? payload.account_name : dataDetail.account_name || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'account_name', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='account_number'>Account Number</label>
            <input type='text' className='form-control' id='account_number' placeholder='Masukkan account number (nomor rekening)' value={typeof payload.account_number !== 'undefined' ? payload.account_number : dataDetail.account_number || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'account_number', fieldValue: e.target.value })} />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Keterangan</label>
            <input type='text' className='form-control' id='description' placeholder='Masukkan keterangan' value={typeof payload.description !== 'undefined' ? payload.description : dataDetail.description || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'description', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='bank_code_id'>Bank Code</label>
            <br />
            <Multiselect
              isMulti={false}
              className='mr-3'
              label='Bank Code'
              labelButton='Pilih'
              labelColumn='Pilih'
              placeholder='Pilih'
              optionColumnValue='_id'
              optionColumnLabel='bank_name'
              payloadValue={payload.bank_code_id}
              defaultValueOriginal={dataDetail.bank_code_id}
              getColumns={({ onChange }) => []}
              listallServiceName='getAllBankCode'
              fields='_id,bank_name,bank_code'
              onChange={({ val }) => {
                tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'bank_code_id', fieldValue: val })
              }}
              apiVersion={2}
            />
          </div>

          {/* <div className='form-group'>
            <label htmlFor='toko_id'>Pilih Toko</label>
            <br />
            <Multiselect
              isMulti
              className='form-control'
              label='Pilih Toko'
              labelButton='Pilih'
              labelColumn='Pilih'
              placeholder='Pilih'
              optionColumnValue='_id'
              optionColumnLabel='name'
              payloadValue={payload.toko_id}
              defaultValueOriginal={dataDetail.toko_id}
              getColumns={({ onChange }) => []}
              listallServiceName={TokoOnlineManifest.listallService}
              fields={TokoOnlineManifest.fields}
              onChange={({ val }) => { tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'toko_id', fieldValue: val }) }}
            />
          </div> */}
          {/* <div className='form-group'>
            <label htmlFor='parent_id'>Pilih Kategori Induk</label>
            <br />
            <Multiselect
              isMulti={false}
              className='form-control'
              label='Pilih Kategori Induk'
              labelButton='Pilih'
              labelColumn='Pilih'
              placeholder='Pilih'
              optionColumnValue='_id'
              optionColumnLabel='title'
              payloadValue={payload.parent_id}
              defaultValueOriginal={dataDetail.parent_id}
              getColumns={({ onChange }) => []}
              listallServiceName={listallService}
              fields={fields}
              onChange={({ val }) => {
                tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'parent_id', fieldValue: val })
              }}
            /> */}
          {/* <Combobox
              className='form-control'
              label='pilih kategori induk'
              labelButton='Pilih'
              labelColumn='Pilih'
              optionColumnValue='_id'
              optionColumnLabel='title'
              getColumns={({ onChange }) => [
                { Header: 'Nama Kategori', accessor: 'title' }
              ]}
              listallServiceName={listallService}
              upsertServiceName={upsertServiceName}
              fields={fields}
              defaultValue={typeof payload.parent_id !== 'undefined' ? payload.parent_id : (dataDetail.parent_id || {})._id}
              onChange={({ val }) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'parent_id', fieldValue: val })}
            />
          </div> */}
        </CardWrapperCon>
      </div>
    </div>
  )
}
function Comp (props) {
  const { match } = props
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
      <div className='row'>
        <div className='col-md-12'>
          <Detail
            detailServiceName={detailService}
            upsertServiceName={upsertService}
            fields={fields}
            id={match.params._id}
            formTitle={upsertPageTitle}
            redirectAfterDelete={redirectAfterDelete}
            withoutWrapper
            apiVersion={2}
          >
            <FormUpdate formTitle={upsertPageTitle} />
          </Detail>
        </div>
      </div>
    </ContentWrapper>
  )
}

export default injectIntl(Comp)
