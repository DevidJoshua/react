import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { Table, Filter } from '../../core/features/TablePagination'
import AppConfig from '../../core/Config/AppConfig'
import { listallService, fields, listallPageTitle, upsertPageUrl, createNewButtonLabel, getColumns } from './Manifest'

const Styles = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }
`

class Comp extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      columns: getColumns(props.history, this.props.intl),
      startDate: '',
      endDate: ''
    }
  }

  render () {
    const { columns, startDate, endDate } = this.state
    const { lang } = this.props
    // console.log('this.statethis.statethis.state', this.state)
    return (
      <ContentWrapper
        pageTitle={listallPageTitle}
        breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: listallPageTitle, link: null, isActive: true }]}
        contentHeaderTitle={listallPageTitle}
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Styles>
              <Filter
                serviceName={listallService}
                child={(tablepaginationOnChangeFilter, filter = {}) => (
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        {/* <SearchField placeholder='Cari berdasarkan nama' width={300} value={filter.string_to_search || ''} tablepaginationOnChangeFilter={tablepaginationOnChangeFilter} listallService={listallService} /> */}
                        {/* <label htmlFor='string_to_search'>Cari</label>
                        <input type='text' className='form-control' value={filter.string_to_search || ''} id='string_to_search' placeholder='' onChange={e => tablepaginationOnChangeFilter({ serviceName: listallService, fieldName: 'string_to_search', fieldValue: e.target.value })} /> */}
                      </div>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='updated_at'>Tanggal Transaksi Mulai</label>
                            <DatePicker
                              style={{ width: '100%' }}
                              locale={lang}
                              className='form-control' selected={startDate} onChange={date => {
                                tablepaginationOnChangeFilter({ serviceName: listallService, fieldName: 'start_date', fieldValue: new Date(date).getTime() })
                                this.setState({ startDate: date })
                              }}
                            />
                            {/* <input id='filter_start_date' type='text' className='form-control' placeholder='' /> */}
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='updated_at'>Tanggal Transaksi Sampai</label>
                            <DatePicker
                              style={{ width: '100%' }}
                              className='form-control' selected={endDate} onChange={date => {
                                this.setState({ endDate: date })
                                tablepaginationOnChangeFilter({ serviceName: listallService, fieldName: 'start_date', fieldValue: new Date(date).getTime() })
                              }}
                            />
                            {/* <input id='filter_end_date' type='text' className='form-control' placeholder='' /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              />
            </Styles>
            <Table
              listallServiceName={listallService}
              fields={fields}
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
export default connect((state, ownProps) => ({ lang: state.app.lang }))(injectIntl(Comp))
