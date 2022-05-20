import React, { Component } from 'react'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { Table } from '../../core/features/TablePagination'
import { listallService, fields, listallPageTitle, getColumns, appendColumns } from './Manifest'
import AppConfig from '../../core/Config/AppConfig'
import { PaymentLinkModalCon } from '../../features/PaymentLink'
import { isNullOrUndefined } from 'util'
// import { getPage, getAuthorizedPathList } from '../../core/Utils/Pages'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

class Comp extends Component {
  constructor (props) {
    super(props)
    const { hash } = props.history
    this.state = {
      columns: getColumns(props.history)
    }
  }

  handleHash (hash) {
    window.location.hash = `#${hash}`
  }

  render () {
    const { columns } = this.state
    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary
    }))

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
                  <div style={{ padding: 10 }}>
                    <Table
                      overlayOnly
                      withoutWrapper
                      listallServiceName={listallService}
                      fields={fields}
                      columns={columns}
                      cardTitle={listallPageTitle}
                      cardHeader={() => <PaymentLinkModalCon  buttonTriggerLabel='Buat Payment Link Baru ' buttonIcon={(<span className='fas fa-link mr-2' />)} />}
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
export default Comp
