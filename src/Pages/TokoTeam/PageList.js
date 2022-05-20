import React, { Component } from 'react'
import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { Table, Filter } from '../../core/features/TablePagination'
import { listallService, fields, listallPageTitle, createPageUrl, createNewButtonLabel, getColumns } from './Manifest'
import AppConfig from '../../core/Config/AppConfig'
class Comp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: getColumns(props.history)
    }
  }

  render () {
    const paginationConfig = {
      serviceName: listallService,
      fields: fields
    }
    const { columns } = this.state
    return (
      <ContentWrapper
        pageTitle={listallPageTitle}
        breadcrumb={[{ title: 'Home', link: AppConfig.appHomePage }, { title: listallPageTitle, link: null, isActive: true }]}
        contentHeaderTitle={listallPageTitle}
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Filter
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
            />
            <Table
              paginationConfig={paginationConfig}
              columns={columns}
              createHref={createPageUrl()}
              createNewButtonLabel={createNewButtonLabel}
            />
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
export default Comp
