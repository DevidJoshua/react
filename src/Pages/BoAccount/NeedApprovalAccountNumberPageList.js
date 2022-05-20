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
  entity,
  needApprovalAccountNumberlistallService,
  fields,
  needApprovalListallPageTitle as listallPageTitle,
  upsertPageUrl,
  createNewButtonLabel,
  getNeedApprovalBankAccountColumns,
  opApproveAccountNumberService,
  opRejectAccountNumberService
} from './Manifest'
import AppConfig from '../../core/Config/AppConfig'
import styled from 'styled-components'
import NeedApprovalActions from '../../features/NeedApproval/redux'



const Styles = styled.div``
class Comp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: getNeedApprovalBankAccountColumns(props.history),
      startDate: props.startDate,
      endDate: props.endDate
    }
  }

  componentWillMount () {
    this.props.resetCheckbox()
  }
  
  debounce(func, wait, immediate) {
    var timeout;
  
    return function executedFunction() {
      var context = this;
      var args = arguments;
        
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      var callNow = immediate && !timeout;
    
      clearTimeout(timeout);
  
      timeout = setTimeout(later, wait);
    
      if (callNow) func.apply(context, args);
    };
  };
  // TODO web page - account need approval http://jira.plink.co.id:9000/browse/BS-57
  render () {
    const paginationConfig = {
      serviceName: needApprovalAccountNumberlistallService,
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
                    <div className='d-flex justify-content-start'>
                      <div class='input-group mb-3 ml-3' style={{ width: '40%' }}>
                        <input
                          id='account_number'
                          type='text'
                          className='form-control'
                          placeholder='Search'
                          onChange={(e) => 
                          this.debounce(
                            tablepaginationOnChangeFilter({
                              serviceName: paginationConfig.serviceName,
                              fieldName: ['account_number','account_name'],
                              fieldValue: e.target.value
                            }),2000,true)}

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
                return <TableHeaderCon  
                apiver={2}
                rejectServiceEntity={opRejectAccountNumberService}
                approveServiceEntity={opApproveAccountNumberService}/>
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

const mapDispatchtoProps = dispatch => {
  return {
    resetCheckbox: () => dispatch(NeedApprovalActions.needapprovalResetCheckbox())
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Comp)
