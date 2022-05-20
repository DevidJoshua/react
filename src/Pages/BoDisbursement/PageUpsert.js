import React from 'react'
import _ from 'lodash'
import { Detail, Multiselect, CardWrapperCon } from '../../core/features/TablePagination'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { injectIntl } from 'react-intl'
import AppConfig from '../../core/Config/AppConfig'
import { upsertPageTitle, listallPageUrl, listallPageTitle, upsertService, fields, detailService, redirectAfterDelete } from './Manifest'


const FormUpdate = (props) => {
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    id,
    tablepaginationResetForm,
    formTitle,
    myUserId
  } = props
  // useMemo(() => tablepaginationResetForm({ serviceName: upsertServiceName, defaultFormValue: { _id: id } }), [])
  React.useEffect(() => {
    const defaultFormValue = {}
    if (id) defaultFormValue._id = id
    tablepaginationResetForm({ apiVersion: 2, isInitialReset: true, serviceName: upsertServiceName, defaultFormValue,redirectAfterUpsert:'/disbursement-transaction-detail/', redirectAfterDelete:'/all-disbursement' })
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

  // Set additional service arguments
  // const merchantName = useSelector(state=> state.myprofile.merchant.merchant_name)
  // React.useEffect(()=>{
  //   tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'merchant_name', fieldValue: merchantName} )
  // },[])

  console.log("data detail >>>>>>>> "+JSON.stringify(dataDetail))
  if (!_.isEmpty(dataDetail) && ((dataDetail.created_by || {})._id !== myUserId || dataDetail.status !== 'OPEN')) return null
  return (
    <div className='row'>
      <div className='col-sm-6'>
        <CardWrapperCon formTitle={formTitle}>
          <div className='form-group'>
            <label htmlFor='title'>Total Amount</label>
            <input type='number' className='form-control' id='title' placeholder='Masukkan jumlah transaksi' value={typeof payload.total_amount !== 'undefined' ? payload.title : dataDetail.total_amount || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'total_amount', fieldValue: parseInt(e.target.value) })} />
          </div>
          <div className='form-group'>
            <label htmlFor='ref_no'>Reference Number</label>
            <input type='text' className='form-control' id='ref_no' placeholder='Masukkan nomor referensi' value={typeof payload.ref_no !== 'undefined' ? payload.ref_no : dataDetail.ref_no || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'ref_no', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Bank Account</label>
            <Multiselect
              isMulti={false}
              className='form-control'
              label='Bank Code'
              labelButton='Pilih'
              labelColumn='Pilih'
              placeholder='Pilih'
              optionColumnValue='_id'
              optionColumnLabel='account_name'
              payloadValue={payload.bank_account_id}
              defaultValueOriginal={dataDetail.bank_account_id}
              getColumns={({ onChange }) => []}
              listallServiceName='getAllBankAccount'
              fields='_id,account_name,account_number,status'
              onChange={({ val }) => {
                tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'bank_account_id', fieldValue: parseInt(val) })
              }}
              apiVersion={2}
              whereCondition={{ status: 'APPROVED' }}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='merchant_name'>Recipient  Name</label>
            <input type='text' className='form-control' id='merchant_name' placeholder='Nama merchant tujuan' value={typeof payload.merchant_name !== 'undefined' ? payload.merchant_name : dataDetail.merchant_name || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'merchant_name', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='merchant_email'>Recipient  Email</label>
            <input type='text' className='form-control' id='merchant_email' placeholder='Alamat email merchant tujuan' value={typeof payload.merchant_email !== 'undefined' ? payload.merchant_email : dataDetail.merchant_email || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'merchant_email', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Deskripsi</label>
            <input type='text' className='form-control' id='description' placeholder='Masukkan Deskripsi' value={typeof payload.description !== 'undefined' ? payload.description : dataDetail.description || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'description', fieldValue: e.target.value })} />
          </div>
          
          {/* <div className='form-group'>
            <label htmlFor='description'>Bank Code</label>
            <input type='text' className='form-control' id='bank_code' placeholder='Masukkan kode bank' value={typeof payload.bank_code !== 'undefined' ? payload.bank_code : dataDetail.bank_code || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'bank_code', fieldValue: e.target.value })} />
          </div> */}
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
  console.log('raysaaaaaaaa')
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
