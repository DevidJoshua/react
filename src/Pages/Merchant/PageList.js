import React, { Component } from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import FilterForm from './FilterForm'
import { Table, Filter } from '../../core/features/TablePagination'
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
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid container item spacing={3}>
              <Grid item xs={12}>
                <Paper variant='outlined'>
                  <Filter
                    withoutCardHeader
                    serviceName={listallService}
                    child={(tablepaginationOnChangeFilter, filter = {}) => (
                      <FilterForm
                        tablepaginationOnChangeFilter={tablepaginationOnChangeFilter}
                        listallService={listallService}
                      />
                    )}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Grid container item spacing={3}>
              <Grid item xs={12}>
                <Paper variant='outlined'>
                  <div style={{ padding: 10 }}>
                    <Table
                      withoutWrapper
                      listallServiceName={paginationConfig.serviceName}
                      fields={paginationConfig.fields}
                      columns={columns}
                      createHref={upsertPageUrl()}
                      createNewButtonLabel={createNewButtonLabel}
                      cardTitle={listallPageTitle}
                      withSearchField
                      widthSearchField={300}
                      apiVersion={2}
                    />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </ContentWrapper>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userPrivileges: state.myprofile.user_privileges,
    lang: state.app.lang
  }
}
export default connect(mapStateToProps)(Comp)
