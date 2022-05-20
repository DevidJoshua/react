import React, { useEffect } from 'react'
import { useTable, usePagination } from 'react-table'
import { connect } from 'react-redux'
import TablepaginationActions, { setColumns } from '../redux'
import TableViewTable from '../components/TableViewTable'
import config from '../config'
import Immutable from 'seamless-immutable'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import _ from 'lodash'

function ListAllContent (props) {
  const { count, reload, filter, children, fetchData, errors, columns, data, loading, pageCount: controlledPageCount, pageSize: xPageSize } = props
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
        pageSize: (pageSize < 0) ? config.defaultMaxPageSize : pageSize,
        pageIndex,
        filter
        // whereCondition
      })
    }
  }, [fetchData, pageIndex, pageSize, filter, reloadTable])

  useEffect(() => {
    setReloadTable(true)
  }, [pageIndex, pageSize, filter])

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
        setPageSize,
        count
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
    children,
    reload,
    listName,
    apiVersion,
    ignoreFields,
    tableColumns,
    additionalRequests,
    appendColumns,
    dataDetail,
    tableData,
    tablePaginationSetReload,
    tablePaginationSetColumns,
    isReloading,
    count
  } = props
  const fetchData = React.useCallback(({ pageSize, pageIndex, filter }) => {
    let whereCond = {}
    if (typeof whereCondition === 'string') whereCond = JSON.parse(whereCondition || '{}')
    else whereCond = whereCondition
    // jika function hit fetch data belum ready, maka jangan dihit fetch data
    if (!tablepaginationFetchData) return
    // hit fetch data
    tablepaginationFetchData({
      ignoreFields,
      apiVersion: apiVersion,
      listName: listName,
      serviceName: listallServiceName,
      pageSize: pageSize || config.defaultPageSize,
      pageIndex: pageIndex || config.defaultPageIndex,
      filter,
      additionalRequests,
      // filter: Immutable.asMutable(filter || {}, { deep: true }),
      fields,
      history,
      whereCondition: whereCond,
      distinct
    })
  }, [listName, distinct, fields, history, listallServiceName, tablepaginationFetchData, whereCondition, isReloading])
  useEffect(() => {
    tablePaginationSetReload({ serviceName: listName || listallServiceName, isReload: false })
  }, [])

  return (
    <ListAllContent
      columns={_.uniq(tableData.tableColumns, 'Header') || []}
      data={tableData.tableRow || []}
      fetchData={fetchData}
      loading={loading}
      reload={reload}
      filter={filter}
      pageCount={pageCount}
      pageSize={pageSize}
      pageIndex={pageIndex}
      count={count}
    >
      {/* jika ada children maka render children, biasanya di passing dari component PageList */}
      {children && children}
      {/* kalau tidak ada children maka kita render component default nya yaitu TableViewTable artinya list data yang ditampilkan dalam bentuk table */}
      {!children && <TableViewTable />}
    </ListAllContent>
  )
}
const mapStateToProps = (state, ownProps) => {
  const { columns, tableData, tableId, appendColumns } = ownProps

  const errors = (state.tablepagination.errors || {})[ownProps.listName || ownProps.listallServiceName]
  const loading = (state.tablepagination.loading || {})[ownProps.listName || ownProps.listallServiceName]
  const reload = (state.tablepagination.reload || {})[ownProps.listName || ownProps.listallServiceName]
  const reloadDetail = (state.tablepagination.reloadDetail || {})[ownProps.listName || ownProps.listallServiceName]

  const data = (state.tablepagination.data || {})[ownProps.listName || ownProps.listallServiceName]
  const pageCount = (state.tablepagination.pageCount || {})[ownProps.listName || ownProps.listallServiceName]
  const count = (state.tablepagination.count || {})[ownProps.listName || ownProps.listallServiceName]
  const pageSize = (state.tablepagination.pageSize || {})[ownProps.listName || ownProps.listallServiceName] || ownProps.pageSize
  const filter = (state.tablepagination.filter || {})[ownProps.listName || ownProps.listallServiceName]
  const dataDetail = state.tablepagination.dataDetail

  // custom columns
  const customCol = state.customcolumns.custom_columns[tableId]

  let tableColumns = []

  const tColumns = appendColumns ? appendColumns('columns', (data || []), Immutable.asMutable(columns), dataDetail) : (columns || [])
  const tData = appendColumns ? appendColumns('data', (data || []), Immutable.asMutable(columns), dataDetail) : (data || [])

  if (customCol != undefined) {
    if (customCol.length > 0) {
      tableColumns = state.customcolumns.custom_columns[tableId]
    } else {
      tableColumns = tColumns
    }
  }else {
    tableColumns = tColumns
  }

  const props = {
    tableData: { tableRow: tData, tableColumns: _.without(tableColumns, undefined) },
    tableColumns: Immutable.asMutable(tableColumns),
    reload,
    isReloading: reloadDetail,
    data,
    filter,
    loading: loading,
    pageCount,
    pageSize: pageSize,
    pageIndex: state.tablepagination.pageIndex,
    errors,
    count
  }
  return props
}
const mapDispatchToProps = dispatch => {
  return {
    tablePaginationSetReload: data => dispatch(TablepaginationActions.setReloadDetail(data)),
    tablepaginationFetchData: data => dispatch(TablepaginationActions.tablepaginationFetchData(data)),
    tablePaginationSetColumns: data => dispatch(TablepaginationActions.tablePaginationSetColumns(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableCon)
