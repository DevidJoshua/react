import React from 'react'
import { Detail } from '../../core/features/TablePagination'
import { FieldTextArea } from '../../features/TextEditor/components'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { detailService, upsertService, fields, createPageTitle, upsertPageTitle, listallPageUrl, redirectAfterDelete, listallPageTitle } from './Manifest'
import AppConfig from '../../core/Config/AppConfig'

const FormUpdate = (props) => {
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    id,
    tablepaginationResetForm
  } = props
  React.useEffect(() => {
    const defaultFormValue = {}
    if (id) defaultFormValue._id = id
    tablepaginationResetForm({ isInitialReset: true, serviceName: upsertServiceName, defaultFormValue })
  }, [tablepaginationResetForm, upsertServiceName, id])
  return (
    <div className='row'>
      <div className='col-sm-6'>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input type='text' value={payload.title || dataDetail.title} className='form-control' id='title' placeholder=' ' onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'title', fieldValue: e.target.value })} />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Keterangan</label>
          <FieldTextArea forProcess={typeof id !== 'undefined' ? 'update' : 'create'} dataId={id} defaultValue={typeof payload.description !== 'undefined' ? payload.description : dataDetail.description} onChange={(v) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'description', fieldValue: v })} idElement='description' />
        </div>
      </div>
    </div>
  )
}

function Comp (props) {
  const { match } = props
  return (
    <ContentWrapper
      pageTitle={createPageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: listallPageTitle, link: listallPageUrl() },
        { title: upsertPageTitle, link: null, isActive: true }
      ]}
      contentHeaderTitle={createPageTitle}
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
          >
            <FormUpdate />
          </Detail>
        </div>
      </div>
    </ContentWrapper>
  )
}
export default Comp
