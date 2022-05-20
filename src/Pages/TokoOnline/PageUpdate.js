import React from 'react'
import { Detail, CardWrapperCon, Multiselect } from '../../core/features/TablePagination'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { FieldTextArea } from '../../features/TextEditor/components'
import { FieldUploadPictures } from '../../features/PictureUpload/components'
import { FieldProvince, FieldCity, FieldSubCity } from '../../features/SetLocation/components'
// import Immutable from 'seamless-immutable'
import { injectIntl } from 'react-intl'
// import _ from 'lodash'
// import { path } from 'ramda'
import AppConfig from '../../core/Config/AppConfig'
// import { getAccessToken } from '../../core/Utils/Utils'
import { redirectAfterDelete, upsertService, upsertPageTitle, listallPageUrl, listallPageTitle, fields, detailService } from './Manifest'
import PgatewayManifest from '../Pgateway/Manifest'

function addField (name, title, type, dataDetail, payload, tablepaginationOnChangeForm, serviceName) {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{title}</label>
      <input type={type} className='form-control' id={name} placeholder={`Masukkan ${title}`} value={typeof payload[name] !== 'undefined' ? payload[name] : dataDetail[name] || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: serviceName, fieldName: name, fieldValue: e.target.value })} />
    </div>
  )
}

const FormUpdate = (props) => {
  // const [fileArray, setFileArray] = React.useState([])
  // const [currentFileArray, setCurrentFileArray] = React.useState([])
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    id,
    tablepaginationResetForm,
    userPrivileges,
    fileArray,
    formTitle
  } = props
  React.useEffect(() => {
    const defaultFormValue = {}
    if (id) defaultFormValue._id = id
    tablepaginationResetForm({ isInitialReset: true, serviceName: upsertServiceName, defaultFormValue })
  }, [tablepaginationResetForm, upsertServiceName, id])
  return (
    <div className='row'>
      <div className='col-sm-6'>
        <CardWrapperCon formTitle={formTitle}>
          {addField('name', 'Nama Toko', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)}
          {userPrivileges.includes('FIELD-TOKO-OWNER-EMAIL') &&
            <div className='form-group'>
              <label htmlFor='owner'>Email pemilik Toko</label>
              <input type='text' className='form-control' id='owner' placeholder='Masukkan Email pemilik Toko' value={typeof payload.owner !== 'undefined' ? payload.owner : (dataDetail.owner || {}).email} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'owner', fieldValue: e.target.value })} />
            </div>}
          {addField('website', 'Website', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)}
          {addField('facebook', 'Facebook', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)}
          {addField('instagram', 'Instagram', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)}
          {addField('youtube', 'Youtube', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)}
          {addField('email', 'Email Toko', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)}
          {process.env.REACT_APP_SHOW_FORMFIELD_LOGO && addField('template', 'Template', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)}
          <div className='form-group'>
            <label htmlFor='description'>Tuliskan deskripsi toko</label>
            <FieldTextArea placeholder=' ' forProcess={typeof id !== 'undefined' ? 'update' : 'create'} dataId={id} defaultValue={typeof payload.description !== 'undefined' ? payload.description : dataDetail.description} onChange={(v) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'description', fieldValue: v })} idElement='description' />
          </div>
          {userPrivileges.includes('FIELD-TOKO-PGATEWAY') &&
            <div className='form-group'>
              <label htmlFor='pgateway_id'>Pilih Payment Gateway</label>
              <br />
              <Multiselect
                isMulti={false}
                className='form-control'
                label='Pilih Payment Gateway'
                labelButton='Pilih'
                labelColumn='Pilih'
                placeholder='Pilih'
                optionColumnValue='_id'
                optionColumnLabel='title'
                payloadValue={payload.pgateway_id}
                defaultValueOriginal={dataDetail.pgateway_id}
                getColumns={({ onChange }) => []}
                listallServiceName={PgatewayManifest.listallService}
                fields={PgatewayManifest.fields}
                onChange={({ val }) => {
                  tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'pgateway_id', fieldValue: val })
                }}
              />
            </div>}
          {/* {addField('description', 'Tuliskan deskripsi toko', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)} */}
          {/* {addField('plink_merchant_id', 'Plink Merchant Id', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)}
          {addField('plink_merchant_key_id', 'Plink Merchant Key Id', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)}
          {addField('plink_merchant_secret_key', 'Plink Merchant Secret Key', 'text', dataDetail, payload, tablepaginationOnChangeForm, upsertServiceName)} */}
          {process.env.REACT_APP_SHOW_FORMFIELD_LOGO &&
            <FieldUploadPictures
              fileArray={fileArray.image_ids}
              currentFileIds={dataDetail.image_ids}
              label='Logo'
              multiple={false}
              onChange={({ currentFileIds, newFiles }) => {
                tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'image_ids', fieldValue: currentFileIds.map(v => v._id) })
                tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'image_ids', type: 'file', fieldValue: newFiles })
                // setFileArray(newFiles);
                // setCurrentFileArray(currentFileIds)
              }}
            />}
          <FieldProvince withLabel defaultValue={typeof payload.province !== 'undefined' ? payload.province : dataDetail.province || ''} onChange={(v) => { tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'province', fieldValue: v }) }} />
          <FieldCity withLabel defaultValue={typeof payload.city !== 'undefined' ? payload.city : dataDetail.city || ''} provinceId={typeof payload.province !== 'undefined' ? payload.province : dataDetail.province || ''} onChange={(v) => { tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'city', fieldValue: v }) }} />
          <FieldSubCity withLabel defaultValue={typeof payload.subcity !== 'undefined' ? payload.subcity : dataDetail.subcity || ''} cityId={typeof payload.city !== 'undefined' ? payload.city : dataDetail.city || ''} onChange={(v) => { tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'subcity', fieldValue: v }) }} />
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
            // deleteServiceName={deleteService}
            // createPageUrl={upsertPageUrl()}
            fields={fields}
            id={match.params._id}
            // formTitle={upsertPageTitle}
            redirectAfterDelete={redirectAfterDelete}
            withoutWrapper
          >
            <FormUpdate
              formTitle={upsertPageTitle}
              serviceName={detailService}
              match={match}
            />
          </Detail>
        </div>
      </div>
    </ContentWrapper>
  )
}
export default injectIntl(Comp)
