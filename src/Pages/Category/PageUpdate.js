import React from 'react'
import { Detail, Multiselect, CardWrapperCon } from '../../core/features/TablePagination'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { injectIntl } from 'react-intl'
import AppConfig from '../../core/Config/AppConfig'
import { listallService, upsertPageTitle, listallPageUrl, listallPageTitle, upsertService, fields, detailService, redirectAfterDelete } from './Manifest'
import TokoOnlineManifest from '../TokoOnline/Manifest'

const FormUpdate = (props) => {
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    id,
    tablepaginationResetForm,
    formTitle
  } = props
  // useMemo(() => tablepaginationResetForm({ serviceName: upsertServiceName, defaultFormValue: { _id: id } }), [])
  React.useEffect(() => {
    const defaultFormValue = {}
    if (id) defaultFormValue._id = id
    tablepaginationResetForm({ isInitialReset: true, serviceName: upsertServiceName, defaultFormValue })
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
  console.log('payloadpayloadpayload===>', payload.title)
  console.log('payloadpayloadpayload===>', dataDetail.title)
  return (
    <div className='row'>
      <div className='col-sm-6'>
        <CardWrapperCon formTitle={formTitle}>
          <div className='form-group'>
            <label htmlFor='title'>Nama Kategori</label>
            <input type='text' className='form-control' id='title' placeholder='Masukkan nama kategori' value={typeof payload.title !== 'undefined' ? payload.title : dataDetail.title || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'title', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
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
          </div>
          <div className='form-group'>
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
            />
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
            /> */}
          </div>
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
          >
            <FormUpdate formTitle={upsertPageTitle} />
          </Detail>
        </div>
      </div>
    </ContentWrapper>
  )
}
export default injectIntl(Comp)
