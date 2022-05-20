import React, { Component } from 'react'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { Table } from '../../core/features/TablePagination'
import { listallService, fields, listallPageTitle, upsertPageUrl, createNewButtonLabel, getColumns } from './Manifest'
import ManifestEmailBatch from '../EmailBatch/Manifest'
import AppConfig from '../../core/Config/AppConfig'
class Comp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: getColumns(props.history)
    }
  }

  render () {
    const { columns } = this.state
    const { history } = this.props
    return (
      <ContentWrapper
        pageTitle={listallPageTitle}
        breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: listallPageTitle, link: null, isActive: true }]}
        contentHeaderTitle={listallPageTitle}
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            {/* <Filter
              paginationConfig={paginationConfig}
              child={(tablepaginationOnChangeFilter, filter) => (
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label htmlFor='string_to_search'>Cari</label>
                      <input type='text' className='form-control' value={path(['string_to_search'], filter) || ''} id='string_to_search' placeholder='' onChange={e => tablepaginationOnChangeFilter({ serviceName: paginationConfig.serviceName, fieldName: 'string_to_search', fieldValue: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}
            /> */}
            <Table
              listallServiceName={listallService}
              fields={fields}
              columns={columns}
              createHref={upsertPageUrl()}
              createNewButtonLabel={createNewButtonLabel}
              cardTitle={listallPageTitle}
            />
            <Table
              listallServiceName={ManifestEmailBatch.listallService}
              fields={ManifestEmailBatch.fields}
              columns={ManifestEmailBatch.getColumns(history)}
              createHref={ManifestEmailBatch.upsertPageUrl()}
              createNewButtonLabel={ManifestEmailBatch.createNewButtonLabel}
              cardTitle={ManifestEmailBatch.listallPageTitle}
            />
            {/* <Table
              paginationConfig={{
                serviceName: ManifestEmailBatch.listallService,
                fields: ManifestEmailBatch.fields
              }}
              columns={ManifestEmailBatch.getColumns(history)}
              createHref={ManifestEmailBatch.createPageUrl()}
              createNewButtonLabel={ManifestEmailBatch.createNewButtonLabel}
              cardTitle='Daftar Group Email Customer'
            /> */}
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
export default Comp
