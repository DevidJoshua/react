import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { path } from 'ramda'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { Table, Filter, Multiselect } from '../../core/features/TablePagination'
import { listallService, fields, listallPageTitle, getColumns, exportDataOptions } from './Manifest'
import AppConfig from '../../core/Config/AppConfig'
// import styled from 'styled-components'
import ExportDataCon from '../../features/ExportData/ExportDataCon'
import MerchantManifest from '../Merchant/Manifest'
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
    const { merchant, userPrivileges } = this.props
    const ignoreFields = []
    var cols = []

    if(!userPrivileges.includes('getAllPlTransactions')) {
      ignoreFields.push('mercCd')
      cols =  columns
    } else {
      const columnToAdd = { Header: 'Merchant Code', accessor: p => sanitizeValue(p.mercCd) }
      const placingIndex = 2 
      const columnsLength =  columns.length + 1

    
      for(var i = 0 ; i < columnsLength ; i++ ){
        if(i === placingIndex){
          cols.push(columnToAdd)
        }else{
          cols.push(columns[i])
        }
      }
      console.log('cols =====>',cols)

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
                        // filterGetAllPlTransactions={path(['getAllPlTransactions'], filter) || {}}
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
                      columns={cols}
                      cardTitle={listallPageTitle}
                      cardHeader={() => {
                        return (<ExportDataCon exportOptions={exportDataOptions} />)
                      }}
                      // createHref={upsertPageUrl()}
                      // createNewButtonLabel={createNewButtonLabel}
                      // withSearchField\
                      // widthSearchField={300}
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
    merchant: state.myprofile.merchant
  }
}
export default connect(mapStateToProps)(Comp)
