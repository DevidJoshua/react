import React, { Component } from 'react'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { Table } from '../../core/features/TablePagination'
import { listallService, fields, listallPageTitle, getColumns } from './Manifest'
import AppConfig from '../../core/Config/AppConfig'
import { PaymentLinkModalCon } from '../../features/DonationLink'
import { isNullOrUndefined } from 'util'
// import { getPage, getAuthorizedPathList } from '../../core/Utils/Pages'
class Comp extends Component {
  constructor (props) {
    super(props)  
    const {hash} = props.history
    this.state = {
      columns: getColumns(props.history)    }
  }

  handleHash(hash){
    window.location.hash = `#${hash}`;
  }

  render () {
    const { columns } = this.state
    
    return (
      <ContentWrapper
        pageTitle={listallPageTitle}
        breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: listallPageTitle, link: null, isActive: true }]}
        contentHeaderTitle={listallPageTitle}
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <div className="card card-primary card-tabs">
              <div className="card-header p-0 pt-1">
                <div className="px-3 py-3 pb-4 row">
                    <PaymentLinkModalCon className={'ml-3 btn btn-default'} buttonTriggerLabel='Buat Donation Link Baru' buttonIcon={(<span className="fas fa-heart mr-2"/>)} />
                </div>
                </div>
              <div className="card-body">
                <div className="tab-content">
                    <Table
                      loadingOverlayOnly
                      // withoutWrapper
                      listallServiceName={listallService}
                      fields={fields}
                      columns={columns}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
export default Comp
