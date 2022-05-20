import React from 'react'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { Chart } from '../../core/features/TablePagination'
import { listallService, getColumns } from './Manifest'
import AppConfig from '../../core/Config/AppConfig'

function PageMonitoringDebitin (props) {
  const { history } = props
  return (
    <ContentWrapper
      pageTitle='Monitoring'
      breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: 'Monitoring' }]}
      isNeedLoggedin
    >
      <Chart
        listName='cart1'
        cartTitle='Binding Card Monitoring'
        columns={getColumns(history)}
        listallServiceName={listallService}
        fields='_id,trx_code,elipse_time,process_name,transaction_id,'
        history={history}
        whereCondition={JSON.stringify({ trx_code: '03' })}
        pageSize={50000}
      />
      <Chart
        listName='cart2'
        cartTitle='Payment Monitoring'
        columns={getColumns(history)}
        listallServiceName={listallService}
        fields='_id,trx_code,elipse_time,process_name,transaction_id,'
        history={history}
        whereCondition={JSON.stringify({ trx_code: '02' })}
        pageSize={50000}
      />
    </ContentWrapper>
  )
}
export default PageMonitoringDebitin
