import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { Table, Filter } from '../../core/features/TablePagination'
import { listallService, fields, listallPageTitle, getColumns, exportDataOptions } from './Manifest'
import AppConfig from '../../core/Config/AppConfig'
import ExportDataCon from '../../features/ExportData/ExportDataCon'
import FilterForm from './FilterForm'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { sanitizeValue } from '../../core/Utils/Utils'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

function Comp (props) {
  const paginationConfig = {
    serviceName: listallService,
    fields: fields
  }
  const columns = getColumns(props.history)
  const { merchant, userPrivileges } = props
  const ignoreFields = []

  if (!userPrivileges.includes('getAllPlTransactions')) {
    ignoreFields.push('mercCd')
  } else {
    columns.push(
      { Header: 'Merchant Code', accessor: p => sanitizeValue(p.merchantCode) }
    )
  }
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
                      DatePicker={DatePicker}
                      merchant={merchant}
                      userPrivileges={userPrivileges}
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
                    cardTitle={listallPageTitle}
                    // cardHeader={() => {
                    //   return (<ExportDataCon fields={paginationConfig.fields} columns={columns} apiVersion={2} exportDataOptions={exportDataOptions} />)
                    // }}
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
const mapStateToProps = (state, ownProps) => {
  return {
    userPrivileges: state.myprofile.user_privileges,
    merchant: state.myprofile.merchant
  }
}
export default connect(mapStateToProps)(Comp)
