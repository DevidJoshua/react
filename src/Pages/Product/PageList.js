import React, { Component } from 'react'
// import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { Table } from '../../core/features/TablePagination'
// import { SearchField } from 'features/searchField'
import { listallService, fields, listallPageTitle, upsertPageUrl, createNewButtonLabel, getColumns } from './Manifest'
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
              withoutCardHeader
              serviceName={listallService}
              child={(tablepaginationOnChangeFilter, filter = {}) => (
                <div className='row'>
                  <div className='col-sm-6'>
                    <SearchField
                      width={300}
                      value={filter.string_to_search || ''}
                      tablepaginationOnChangeFilter={tablepaginationOnChangeFilter}
                      listallService={listallService}
                    />
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
              withSearchField
              widthSearchField={300}
            />
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
export default Comp
