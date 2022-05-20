import React from 'react'
// import Immutable from 'seamless-immutable'
import { Detail, Combobox, Multiselect } from '../../core/features/TablePagination'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { injectIntl } from 'react-intl'
// import { path } from 'ramda'
import AppConfig from '../../core/Config/AppConfig'
import { listallService, updatePageTitle, detailPageTitle, detailPageUrl, redirectAfterCreate, upsertService, fields, detailService, updateService, redirectAfterDelete } from './Manifest'
import TokoOnlineManifest from '../TokoOnline/Manifest'

const FormUpdate = (props) => {
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName
  } = props
  const tokoIds = dataDetail.toko_id
  // React.useEffect(() => {
  //   tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: '_id', fieldValue: '' + dataDetail._id })
  // }, [dataDetail])
  // if (!dataDetail) return
  return (
    <div className='row'>
      <div className='col-sm-6'>
        <div className='form-group'>
          <label htmlFor='title'>title</label>
          <input type='text' className='form-control' id='title' placeholder='Enter title' value={typeof payload.title !== 'undefined' ? payload.title : dataDetail.title || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'title', fieldValue: e.target.value })} />
        </div>
        <div className='form-group'>
          <label htmlFor='toko_id'>Pilih Beberapa Toko</label>
          <br />
          <Multiselect
            className='form-control'
            label='pilih Beberapa Toko'
            labelButton='Pilih'
            labelColumn='Pilih'
            optionColumnValue='_id'
            optionColumnLabel='name'
            defaultValue={typeof payload.toko_id !== 'undefined' ? payload.toko_id : (tokoIds || []).map(v => '' + v._id)}
            // defaultValue={typeof payload.toko_id !== 'undefined' ? payload.toko_id : (tokoIds || []).map(v => ({ value: v._id, label: v.name }))}
            getColumns={({ onChange }) => []}
            listallServiceName={TokoOnlineManifest.listallService}
            fields={TokoOnlineManifest.fields}
            onChange={({ val }) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'toko_id', fieldValue: val })}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='parent_id'>Pilih Kategori Induk</label>
          <br />
          <Combobox
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
        </div>
      </div>
    </div>
  )
}
function Comp (props) {
  const { match } = props
  // window.singleDatePicker('#start_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
  //   const x = document.getElementById('start_date')
  //   x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
  //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: new Date(par).getTime() })
  // })
  // window.singleDatePicker('#end_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
  //   const x = document.getElementById('end_date')
  //   x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
  //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: new Date(par).getTime() })
  // })
  // window.activateEditor({hostBackend: AppConfig.hostBackend, at: getAccessToken(), cb: (content) => {
  //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
  // }})
  // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: match.params.role_id })
  // }

  // render () {
  // const { match } = props

  // const [defaultValueTokoId, setDefaultValueTokoId] = React.useState([])
  // const [defaultValueCatId, setDefaultValueCatId] = React.useState([])

  // useEffect(() => {
  //   const tokoIds = Immutable.asMutable(path([paginationConfig.serviceName, 'toko_id'], dataDetail) || [], { deep: true })
  //   setDefaultValueTokoId(Immutable.asMutable(tokoIds || [], { deep: true }))
  //   // const catIds = Immutable.asMutable(path([paginationConfig.serviceName, 'category_id'], dataDetail) || [], { deep: true })
  //   // setDefaultValueCatId(Immutable.asMutable(catIds || [], { deep: true }))
  // }, [dataDetail])

  // const tokoIds = Immutable.asMutable(path([paginationConfig.serviceName, 'toko_id'], dataDetail) || [], { deep: true })
  return (
    <ContentWrapper
      pageTitle={updatePageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: 'Daftar Kategori', link: '/category' },
        { title: detailPageTitle, link: detailPageUrl(match.params._id), isActive: true },
        { title: updatePageTitle, link: null, isActive: true }
      ]}
      contentHeaderTitle={updatePageTitle}
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Detail
            detailServiceName={detailService}
            upsertServiceName={upsertService}
            fields={fields}
            id={match.params._id}
            formTitle={updatePageTitle}
            redirectAfterDelete={redirectAfterDelete}
          >
            <FormUpdate />
          </Detail>
        </div>
      </div>
    </ContentWrapper>
  )
  // }
}
export default injectIntl(Comp)
