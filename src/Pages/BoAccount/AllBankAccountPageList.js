import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { TableHeaderCon } from '../../features/BankAccount'
import {
  FilteringTable,
  Multiselect,
  Table,
  Filter
} from '../../core/features/TablePagination'
import {
  getAllBankAccount,
  fields,
  listallPageTitle,
  upsertPageUrl,
  createNewButtonLabel,
  getApprovedBankAccountColumns
} from './Manifest'
import AppConfig from '../../core/Config/AppConfig'
import styled from 'styled-components'

const Styles = styled.div``
class Comp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: getApprovedBankAccountColumns(props.history),
      startDate: props.startDate,
      endDate: props.endDate
    }
  }

  render () {
    const paginationConfig = {
      serviceName: getAllBankAccount,
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
        <div className='row'>
          <div className='col-md-12'>
            <Styles>
              <Filter
                withoutCardHeader
                serviceName={paginationConfig.serviceName}
                child={(tablepaginationOnChangeFilter, filter = {}) => (
                  <div className='form-group'>
                    <div className='d-flex flex-wrap flex-grow'>
                      <Multiselect
                        isMulti={false}
                        className='mr-3 mb-3 w-25'
                        label='Bank Code'
                        labelButton='Pilih'
                        labelColumn='Pilih'
                        placeholder='Kode Bank'
                        optionColumnValue='_id'
                        optionColumnLabel='bank_name'
                        getColumns={({ onChange }) => []}
                        listallServiceName='getAllBankCode'
                        fields='_id,bank_name,bank_code'
                        onChange={({ val }) => {
                          tablepaginationOnChangeFilter({
                            serviceName: paginationConfig.serviceName,
                            fieldName: 'bank_code',
                            fieldValue: val
                          })
                        }}
                        apiVersion={2}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <div class='input-group mr-3 mb-3 w-25'>
                        <select
                          class='custom-select'
                          id='statusFilter'
                          onChange={(e) => {
                            tablepaginationOnChangeFilter({
                              serviceName: paginationConfig.serviceName,
                              fieldName: 'status',
                              fieldValue: e.target.value
                            })
                          }}
                        >
                          <option value='' selected>All Status</option>
                          <option value='APPROVED'>Approved</option>
                          <option value='NEED_APPROVAL'>Need Approval</option>
                        </select>
                      </div>
                      <div class='input-group mr-3 mb-3 w-25'>
                        <input
                          id='account_name'
                          type='text'
                          className='form-control'
                          placeholder='Account Name'
                          onChange={(e) => {
                            tablepaginationOnChangeFilter({
                              serviceName: paginationConfig.serviceName,
                              fieldName: 'account_name',
                              fieldValue: e.target.value
                            })
                          }}
                        />
                      </div>
                      <div class='input-group mr-3 mb-3 w-25'>
                        <input
                          id='account_number'
                          type='text'
                          className='form-control'
                          placeholder='Account Number'
                          onChange={(e) => {
                            tablepaginationOnChangeFilter({
                              serviceName: paginationConfig.serviceName,
                              fieldName: 'account_number',
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
                return <TableHeaderCon />
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
