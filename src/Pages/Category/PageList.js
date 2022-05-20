import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { Table } from '../../core/features/TablePagination'
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
    const paginationConfig = {
      serviceName: listallService,
      fields: fields
    }
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
            <Table
              listallServiceName={paginationConfig.serviceName}
              fields={paginationConfig.fields}
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
const mapStateToProps = (state, ownProps) => {
  return {
    userPrivileges: state.myprofile.user_privileges
  }
}
export default connect(mapStateToProps)(Comp)
