import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { TableHeaderCon } from '../../features/AccountNeedApproval'
import {
  FilteringTable,
  Table,
  Filter
} from '../../core/features/TablePagination'
import {
  listallService,
  fields,
  listallPageTitle,
  upsertPageUrl,
  createNewButtonLabel,
  getColumns
} from './Manifest'
import AppConfig from '../../core/Config/AppConfig'
import {
  BalanceCon,
  TotalAmountCon,
  TotalTrxCon
} from 'features/NeedApproval'
import styled from 'styled-components'

const Styles = styled.div``
class Comp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: getColumns(props.history),
      startDate: props.startDate,
      endDate: props.endDate
    }
  }

  render () {
    const { history } = this.props
    const paginationConfig = {
      serviceName: listallService,
      fields: fields
    }
    const { columns } = this.state
    return (
      <ContentWrapper
        pageTitle={listallPageTitle}
        breadcrumb={[
          { title: 'Beranda', link: AppConfig.appHomePage },
          { title: listallPageTitle, link: null, isActive: true }
        ]}
        contentHeaderTitle={listallPageTitle}
        isNeedLoggedin
      >
        {/* <div className='row'>
          <div className='col-lg-3 col-6'>
            <BalanceCon />
          </div>
          <div className='col-lg-6 col-9'>
            <TotalAmountCon />
          </div>
          <div className='col-lg-3 col-6'>
            <TotalTrxCon />
          </div>
        </div> */}
        <div className='row'>
          <div className='col-md-12'>
            <Styles>
              <Filter
                withoutCardHeader
                serviceName={listallService}
                child={(tablepaginationOnChangeFilter, filter = {}) => (
                  <div className='form-group'>
                    <div className='d-flex justify-content-start'>
                      <div class='mr-3' style={{ width: '10 rem' }}>
                        <select
                          class='custom-select'
                          id='bankFilter'
                          onChange={(e) => {
                            tablepaginationOnChangeFilter({
                              serviceName: listallService,
                              fieldName: 'bank_code',
                              fieldValue: e.target.value
                            })
                          }}
                        >
                          <option selected value=''>All Bank</option>
                          <option value='014'>BCA</option>
                          <option value='022'>CIMB Niaga</option>
                          <option value='008'>Mandiri</option>
                          <option value='028'>OCBC NISP</option>
                        </select>
                      </div>

                      <div class='mr-3' style={{ width: '10 rem' }}>
                        <select
                          class='custom-select'
                          id='statusFilter'
                          onChange={(e) => {
                            tablepaginationOnChangeFilter({
                              serviceName: listallService,
                              fieldName: 'status',
                              fieldValue: e.target.value
                            })
                          }}
                        >
                          <option selected value=''>All Status</option>
                          <option value='OPEN'>Open</option>
                          <option value='NEED_APPROVAL'>Need Approval</option>
                          <option value='APPROVED'>Approved</option>
                          <option value='PENDING'>Pending</option>
                          <option value='SUCCESS'>Success</option>
                          <option value='FAILED'>Failed</option>
                        </select>
                      </div>

                      <DatePicker
                        onFocus={e => e.target.blur()}
                        style={{ width: '10 rem' }}
                        className='form-control'
                        placeholderText='Start Date'
                        dateFormat='dd/MM/yyyy'
                        selected={this.state.startDate}
                        onChange={(date) => {
                          this.setState({ startDate: date })
                          tablepaginationOnChangeFilter({
                            serviceName: listallService,
                            fieldName: 'startDate',
                            fieldValue: moment(date).format('YYYY-MM-DD')
                          })
                        }}
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                      />

                      <div class='mt-1 mr-2 ml-2'>-</div>

                      <DatePicker
                        onFocus={e => e.target.blur()}
                        style={{ width: '10 rem' }}
                        className='form-control'
                        placeholderText='End Date'
                        dateFormat='dd/MM/yyyy'
                        selected={this.state.endDate}
                        onChange={(date) => {
                          this.setState({ endDate: date })
                          tablepaginationOnChangeFilter({
                            serviceName: listallService,
                            fieldName: 'endDate',
                            fieldValue: moment(date).format('YYYY-MM-DD')
                          })
                        }}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        minDate={this.state.startDate}
                      />

                      <div
                        class='input-group mb-3 ml-3'
                        style={{ width: '30%' }}
                      >
                        <input
                          id='merchant_name'
                          type='text'
                          className='form-control'
                          placeholder='Account Name'
                          onChange={(e) => {
                            tablepaginationOnChangeFilter({
                              serviceName: listallService,
                              fieldName: 'merchant_name',
                              fieldValue: e.target.value
                            })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              />
            </Styles>
            <Table
              listallServiceName={paginationConfig.serviceName}
              fields={paginationConfig.fields}
              columns={columns}
              // createHref={upsertPageUrl()}
              // createNewButtonLabel={createNewButtonLabel}
              // whereCondition={{ status: 'NEED_APPROVAL' }}
              apiVersion={2}
              cardHeader={() => {
                return <button type='button' className='btn btn-warning' onClick={() => history.push('/form-disbursement-transaction')}><i className='fas fa-plus' /> Create New </button>
              }}
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
