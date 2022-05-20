import React, { Component } from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Table, Filter } from '../../core/features/TablePagination'
import AppConfig from '../../core/Config/AppConfig'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { listallService, fields, listallPageTitle, upsertPageUrl, createNewButtonLabel, getColumns } from 'Pages/Merchant/Manifest'
import FilterForm from 'Pages/Merchant/FilterForm'

const paginationConfig = {
  serviceName: listallService,
  fields: fields
}
export default function MerchantNeedApprovalPageList (props) {
  const columns = getColumns(props.history)
  return (
    <ContentWrapper
      pageTitle='Merchant Need Approval'
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: 'Merchant Need Approval', link: null, isActive: true }
      ]}
      contentHeaderTitle='Merchant Need Approval'
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
