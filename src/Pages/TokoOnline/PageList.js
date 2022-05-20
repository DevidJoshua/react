import React from 'react'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { Table } from '../../core/features/TablePagination'
import AppConfig from '../../core/Config/AppConfig'
import { listallService, fields, listallPageTitle, upsertPageUrl, createNewButtonLabel, getColumns } from './Manifest'
function Comp (props) {
  const { history } = props
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
                    <label htmlFor='string_to_search'>Search</label>
                    <input type='text' className='form-control' value={path(['string_to_search'], filter) || ''} id='string_to_search' placeholder='Enter some text' onChange={e => tablepaginationOnChangeFilter({ serviceName: paginationConfig.serviceName, fieldName: 'string_to_search', fieldValue: e.target.value })} />
                  </div>
                </div>
              </div>
            )}
          /> */}
          <Table
            listallServiceName={listallService}
            fields={fields}
            columns={getColumns(history)}
            createHref={upsertPageUrl()}
            createNewButtonLabel={createNewButtonLabel}
            cardTitle={listallPageTitle}
            withSearchField
            widthSearchField={300}
          />
        </div>
      </div>
    </ContentWrapper>
  )
}
export default Comp
