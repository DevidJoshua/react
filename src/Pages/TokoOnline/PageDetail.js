import React from 'react'
import { injectIntl, FormattedMessage as T } from 'react-intl'
// import _ from 'lodash'
import { DisplayPictures } from '../../features/PictureUpload/components'
import { Detail, CardWrapperCon, Table } from '../../core/features/TablePagination'
import { FieldProvince, FieldCity, FieldSubCity } from '../../features/SetLocation/components'
// import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { listallPageTitle, detailService, fields, deleteService, detailPageTitle, upsertPageUrl, redirectAfterDelete, listallPageUrl } from './Manifest'
import TokoTeamManifest from '../TokoTeam/Manifest'
import Moment from 'moment'
import AppConfig from '../../core/Config/AppConfig'

const DetailContent = (props) => {
  const {
    dataDetail,
    formTitle,
    serviceName
  } = props
  let createdAt = Moment(dataDetail.created_at || 0)
  if (dataDetail.created_at && createdAt.isValid()) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
  else createdAt = '-'
  let updatedAt = Moment(dataDetail.updated_at || 0)
  if (dataDetail.updated_at && updatedAt.isValid()) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
  else updatedAt = '-'
  let status = dataDetail.status
  if (status === 'active') status = 'Aktif'
  else if (status === 'inactive') status = 'Tidak Aktif'
  else status = '-'
  return (
    <>
      <div className='row'>
        <div className='col-sm-6'>
          <CardWrapperCon serviceName={serviceName} formTitle={formTitle}>
            <dl>
              <dt>Id Toko</dt><dd>{dataDetail._id || '-'}</dd>
              <dt>Nama Toko</dt><dd>{dataDetail.name || '-'}</dd>
              <dt>Slug</dt><dd>{dataDetail.slug}</dd>
              <dt>Pemilik</dt><dd>{(dataDetail.owner || {}).full_name || '-'}</dd>
              <dt>Website</dt><dd>{dataDetail.website || '-'}</dd>
              {process.env.REACT_APP_SHOW_FORMFIELD_LOGO && <><dt>Template</dt><dd>{dataDetail.template || '-'}</dd></>}
              <dt>Facebook</dt><dd>{dataDetail.facebook || '-'}</dd>
              <dt>Instagram</dt><dd>{dataDetail.instagram || '-'}</dd>
              <dt>Youtube</dt><dd>{dataDetail.youtube || '-'}</dd>
              <dt>Email</dt><dd>{dataDetail.email || '-'}</dd>
              <dt><T id='label.storedescription' /></dt><dd>{dataDetail.description || '-'}</dd>
              <dt>Provinsi</dt>
              <dd><FieldProvince defaultValue={dataDetail.province} forProcess='display' /></dd>
              <dt>Kota/Kabupaten</dt>
              <dd><FieldCity defaultValue={dataDetail.city} provinceId={dataDetail.province} forProcess='display' /></dd>
              <dt>Kecamatan</dt>
              <dd><FieldSubCity defaultValue={dataDetail.subcity} cityId={dataDetail.city} forProcess='display' /></dd>
              <dt>Status</dt>
              <dd>{status || '-'}</dd>
              {process.env.REACT_APP_SHOW_FORMFIELD_PG && <><dt>Payment Gateway</dt><dd>{(dataDetail.pgateway_id || {}).title || '-'}</dd></>}
              {/* <dt>Plink Merchant Id</dt><dd>{dataDetail.plink_merchant_id}</dd>
              <dt>Plink Merchant Key Id</dt><dd>{dataDetail.plink_merchant_key_id}</dd>
              <dt>Plink Merchant Secret Key</dt><dd>{dataDetail.plink_merchant_secret_key}</dd> */}
              {process.env.REACT_APP_SHOW_FORMFIELD_LOGO &&
                <><dt>Logo</dt>
                  <dd>
                    {/* <img src={`${AppConfig.hostBackend}/api/renderfile/${path([paginationConfig.serviceName, 'image_id', 'filename'], dataDetail) || ''}.${path([paginationConfig.serviceName, 'image_id', 'file_type'], dataDetail) || ''}`} /> */}
                    <DisplayPictures
                      currentFileArray={dataDetail.image_ids}
                    />
                  </dd>
                </>}

              <dt>Diperbaharui Oleh</dt>
              <dd>{(dataDetail.updated_by || {}).full_name || '-'}</dd>
              <dt>Dibuat Oleh</dt>
              <dd>{(dataDetail.created_by || {}).full_name || '-'}</dd>
              <dt>Tanggal Pembuatan</dt>
              <dd>{createdAt || '-'}</dd>
              <dt>Tanggal Diperbaharui</dt>
              <dd>{updatedAt || '-'}</dd>
            </dl>
          </CardWrapperCon>
        </div>
      </div>
    </>
  )
}

function Comp (props) {
  const { match, history } = props
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
            <DetailContent serviceName={detailService} formTitle={detailPageTitle} history={history} match={match} />
          </Detail>
          {/* {!_.isEmpty(path([paginationConfig.serviceName], dataDetail)) &&
            <Table
              cardTitle='label.team-member'
              paginationConfig={{ serviceName: 'getAllTokoTeamsByTokoId', fields: TokoTeamManifest.fields }}
              columns={TokoTeamManifest.getColumns({ history, tokoId: match.params._id })}
              createHref={`${TokoTeamManifest.createPageUrl()}/${match.params._id}`}
              createNewButtonLabel='Tambah anggota tim'
              whereCondition={{ toko_id: match.params._id }}
            />} */}
          <Table
            listallServiceName='getAllTokoTeamsByTokoId'
            fields={TokoTeamManifest.fields}
            columns={TokoTeamManifest.getColumns(history)}
            // createHref={TokoTeamManifest.upsertPageUrl()}
            // createNewButtonLabel={createNewButtonLabel}
            cardTitle={TokoTeamManifest.listallPageTitle}
            whereCondition={JSON.stringify({ toko_id: match.params._id })}
          />
        </div>
      </div>

    </ContentWrapper>
  )
}
export default injectIntl(Comp)
