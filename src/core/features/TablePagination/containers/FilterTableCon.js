import React, { useEffect } from 'react'
import { useTable, usePagination } from 'react-table'
// import _ from 'lodash'
// import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
// import { isImmutable } from 'seamless-immutable'
import TablepaginationActions from '../redux'
// import Loader from '../../../Components/Loader/Loader'
import TableViewTable from '../components/TableViewTable'

// import TableNavComp from './TableNavComp'
import config from '../config'

function ListAllContent (props) {
  const { reload, whereCondition, filter, children, fetchData, errors, columns, data, loading, pageCount: controlledPageCount, pageSize: xPageSize } = props
  //   console.log('data=====>', data)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: config.defaultPageIndex, pageSize: xPageSize || config.defaultPageSize },
    manualPagination: true,
    pageCount: controlledPageCount
  },
  usePagination
  )
  const [reloadTable, setReloadTable] = React.useState(false)

  useEffect(() => {
    if (reload !== undefined && !reload) return
    setReloadTable(true)
  }, [reload])
  useEffect(() => {
    if (reloadTable) {
      setReloadTable(false)
      fetchData({
        pageSize,
        pageIndex,
        filter,
        whereCondition
      })
    }
  }, [fetchData, pageIndex, pageSize, filter, whereCondition, reloadTable])
  useEffect(() => {
    setReloadTable(true)
  }, [pageIndex, pageSize, filter, whereCondition])

  // inject data ke dalam children
  const childrenWithProps = React.Children.map(children, child => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        columns,
        loading,
        errors,
        data,
        headerGroups,
        getTableProps,
        getTableBodyProps,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageIndex,
        pageOptions,
        gotoPage,
        pageCount,
        previousPage,
        nextPage,
        pageSize,
        setPageSize
      })
    }
    return child
  })
  return (
    <>
      {/* render children yang sudah di inject data */}
      {childrenWithProps}
    </>
  )
}
function TableCon (props) {
  const {
    pageIndex,
    pageSize,
    pageCount,
    loading,
    data,
    distinct,
    whereCondition,
    history,
    fields,
    filter,
    tablepaginationFetchData,
    listallServiceName,
    columns,
    children,
    reload,
    listName,
    apiVersion
  } = props
  console.log('malmmmmmpageSizepageSizepageSize', pageSize)
  const fetchData = React.useCallback(({ pageSize, pageIndex, filter, whereCondition }) => {
    let whereCond = ''
    if (typeof whereCondition === 'string') whereCond = JSON.parse(whereCondition || '{}')
    else whereCond = whereCondition
    for (var param in whereCond) {
      // console.log('paramssss=>' + param + '====>' + whereCond[param])
      if (!whereCond[param]) {
        // jika salah satu dari parameter where condition nya kosong, maka jangan dihit fetch Data
        return null
      }
    }

    // jika function hit fetch data belum ready, maka jangan dihit fetch data
    if (!tablepaginationFetchData) return
    // hit fetch data
    tablepaginationFetchData({
      apiVersion: apiVersion,
      listName: listName,
      serviceName: listallServiceName,
      pageSize: pageSize || config.defaultPageSize,
      pageIndex: pageIndex || config.defaultPageIndex,
      filter,
      // filter: Immutable.asMutable(filter || {}, { deep: true }),
      fields,
      history,
      whereCondition: whereCond,
      distinct
    })
  }, [listName, distinct, fields, history, listallServiceName, tablepaginationFetchData])
  return (
    <ListAllContent
      columns={columns}
      data={data || []}
      fetchData={fetchData}
      loading={loading}
      reload={reload}
      filter={filter}
      pageCount={pageCount}
      pageSize={pageSize}
      pageIndex={pageIndex}
      whereCondition={whereCondition}
    >
      {/* jika ada children maka render children, biasanya di passing dari component PageList */}
      {children && children}
      {/* kalau tidak ada children maka kita render component default nya yaitu TableViewTable artinya list data yang ditampilkan dalam bentuk table */}
      {!children && <TableViewTable />}
    </ListAllContent>
  )
}
const mapStateToProps = (state, ownProps) => {
  const errors = (state.tablepagination.errors || {})[ownProps.listName || ownProps.listallServiceName]
  const loading = (state.tablepagination.loading || {})[ownProps.listName || ownProps.listallServiceName]
  const reload = (state.tablepagination.reload || {})[ownProps.listName || ownProps.listallServiceName]
  const data = (state.tablepagination.data || {})[ownProps.listName || ownProps.listallServiceName]
  const pageCount = (state.tablepagination.pageCount || {})[ownProps.listName || ownProps.listallServiceName]
  const pageSize = (state.tablepagination.pageSize || {})[ownProps.listName || ownProps.listallServiceName] || ownProps.pageSize
  const filter = (state.tablepagination.filter || {})[ownProps.listName || ownProps.listallServiceName]
  const props = {
    reload,
    data,
    filter,
    loading: loading,
    pageCount,
    pageSize: pageSize,
    pageIndex: state.tablepagination.pageIndex,
    errors
  }
  return props
}
const mapDispatchToProps = dispatch => {
  return {
    tablepaginationFetchData: data => dispatch(TablepaginationActions.tablepaginationFetchData(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableCon)
