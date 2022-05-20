import React, { Component } from 'react'
// import { Line, Doughnut, Pie } from 'react-chartjs-2'
// import SummaryAction from '../../core/Containers/RpMerchant/Transaction/redux'
// import DashboardMerchantAction from '../../core/Containers/RpMerchant/Dashboard/redux'
import { _toRp, _formatClientDate, _filterSummaryHist } from './DasboardFunction'
import { connect } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
// import { getSession } from '../../core/Utils/Utils'
// import { injectIntl } from 'react-intl'
// import { withRouter } from 'react-router-dom'
import Loader from '../../core/Components/Loader/Loader'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { NewOrdersCon, SuccessPaymentCon, ProcessPaymentCon, PaymentFailedCon, DirectChatCont, ChartCon, TeamMemberCon } from 'features/dashboard'
import DashboardActions from '../../features/dashboard/redux'
import PaymentlinkManifest from '../../Pages/PaymentLink/Manifest'
import { Table } from '../../core/features/TablePagination'
import { PaymentLinkModalCon } from '../../features/PaymentLink'
// import MerchantActions, {MerchantSelectors} from '../../core/Containers/Dashboard/redux'
class PageHome extends Component {
  // componentWillMount () {
  //   const merchant_id = getSession('merchant_id')
  //   this.props.transactionSummaryFetch({ merchant_id })
  //   this.props.fetchdashboard({ merchant_id })
  // }

  _table (data = [], isRequesting) {
    console.log('isrequesting>>>', isRequesting)
    if (!isRequesting) {
      if (data.length > 0) {
        return (
          <div className='card-body table-responsive p-0' style={{ height: 300 }}>
            <table className='table table-hover text-nowrap'>
              <thead>
                <tr>
                  <th>Id Transaksi</th>
                  <th>Jumlah</th>
                  <th>Metode</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {_filterSummaryHist(data, 10).map((r, i) =>
                  <tr style={{ backgroundColor: '' }} key={i}>
                    <td>{r.transaction_id}</td>
                    <td>{_toRp(r.transaction_amount)}</td>
                    <td>{r.transaction_method}</td>
                    <td>{_formatClientDate(r.created_at)}</td>
                    <td>

                      {r.status === 'SETTLED' && <span style={{ padding: 5, borderRadius: 10, backgroundColor: '#28a745', color: '#fff' }}>Settled</span>}
                      {r.status === 'PENDING' && <span style={{ padding: 5, borderRadius: 10, backgroundColor: '#ffc107', color: '#000' }}>Pending</span>}
                      {r.status === 'CANCEL' && <span style={{ padding: 5, borderRadius: 10, backgroundColor: '#dc3545u', color: '#fff' }}>Cancel</span>}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      } else {
        return (
          <div className='card-body table-responsive p-0' style={{ height: 300 }}>
            <center>Maaf, Anda belum melakukan transaksi</center>
          </div>
        )
      }
    } else {
      return (
        <div className='card-body table-responsive p-0' style={{ height: 300 }}>
          {/* <table className="table table-head-fixed text-nowrap"> */}
          <center><Loader loading type='rpmerah' /> Fetching</center>
          {/* <center><Loader loading type='rpmerah' /> Fetching</center> */}
          {/* </table> */}
        </div>
      )
    }
  }

  componentDidMount () {
    console.log('PageHome componentDidMount')
    const { dashboardFetchData, userPrivileges } = this.props
    if (userPrivileges.includes('getDasbhoardData1')) dashboardFetchData({})
  }

  render () {
    console.log('PageHome renderrrr')
    const { data, isRequesting, userPrivileges, history } = this.props
    return (
      <ContentWrapper
        pageTitle='Home'
        breadcrumb={[{ title: 'Beranda' }]}
        contentHeaderTitle='Beranda'
        isNeedLoggedin
      >
        {userPrivileges.includes('getDasbhoardData1') &&
          <>
            <Paper elevation={0}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={2} sm={3} md={3}>
                    <NewOrdersCon />
                  </Grid>
                  <Grid item xs={2} sm={3} md={3}>
                    <SuccessPaymentCon />
                  </Grid>
                  <Grid item xs={2} sm={3} md={3}>
                    <ProcessPaymentCon />
                  </Grid>
                  <Grid item xs={2} sm={3} md={3}>
                    <PaymentFailedCon />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
            <br />
            {false &&
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card'>
                    <div className='card-header' data-card-widget='collapse'>
                      <h5 className='card-title'>Aktifitas Terakhir</h5>
                      <div className='card-tools'>
                        <button type='button' className='btn btn-tool' data-card-widget='collapse'>
                          <i className='fas fa-minus' />
                        </button>
                      </div>
                    </div>
                    <div className='card-body' style={{ paddingBottom: 3 }}>
                      <div className='row'>
                        {/* table */}
                        {/* {this._table(data)} */}
                        {this._table(data, isRequesting)}

                        {/* table */}
                      </div>

                    </div>
                    {/* /.box-header */}
                  </div>
                </div>
              </div>}
          </>}
        {userPrivileges.includes('chr') &&
          <Paper>
            <ChartCon />
          </Paper>}
        <br />
        {userPrivileges.includes('mem') &&
          <Paper>
            <TeamMemberCon />
          </Paper>}
        <br />
        {userPrivileges.includes('cht') &&
          <Paper>
            {/* <DirectChatCont /> */}
          </Paper>}

        {userPrivileges.includes('pli') &&
          <Table
            listallServiceName={PaymentlinkManifest.listallService}
            fields={PaymentlinkManifest.fields}
            columns={PaymentlinkManifest.getColumns(history)}
            // createHref={upsertPageUrl()}
            // createNewButtonLabel={createNewButtonLabel}
            cardTitle={PaymentlinkManifest.listallPageTitle}
            cardHeader={() => (<PaymentLinkModalCon buttonTriggerLabel='Buat Baru Payment Link' />)}
          />}

      </ContentWrapper>
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
//   console.log('mapStateToProps', state.dashboard)

//   return {
//     // error: state.rptransaction.errors,
//     // status: state.rptransaction.status,
//     // isRequestingDashboard: state.merchantdashboard.isRequesting,
//     // isRequesting: state.rptransaction.isRequesting,
//     data: []
//     // dashboard: state.merchantdashboard
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     transactionSummaryFetch: data => dispatch(SummaryAction.fetchTransaction(data)),
//     fetchdashboard: data => dispatch(DashboardMerchantAction.fetchMerchantDashboard(data))
//   }
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(
//   injectIntl(withRouter(PageHome))
// )
export default connect((state, ownProps) => ({ userPrivileges: state.myprofile.user_privileges }), dispatch => ({
  dashboardFetchData: data => dispatch(DashboardActions.dashboardFetchData(data))
}))((props) => {
  return <PageHome {...props} />
})
