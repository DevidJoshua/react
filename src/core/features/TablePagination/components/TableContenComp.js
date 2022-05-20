import React, { useEffect } from 'react'
import { useTable, usePagination } from 'react-table'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import TablepaginationActions from '../redux'

// import TableNavComp from './TableNavComp'
import config from '../config'

function Table (props) {
  const { distinct, fields, history, fetchData, serviceName, errors, columns, data, loading, pageCount: controlledPageCount, filter, whereCondition } = props
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
    initialState: { pageIndex: config.defaultPageIndex, pageSize: config.defaultPageSize },
    manualPagination: true,
    pageCount: controlledPageCount
  },
  usePagination
  )
  useEffect(() => {
    console.log('fetchDatafetchDatafetchDatafetchDatafetchData')
    fetchData({
      pageSize,
      pageIndex
    })
  }, [pageIndex, pageSize, filter, whereCondition])
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" {...getTableProps()}>
          
          <TableHead>
              {headerGroups.map((headerGroup, i) => (
                <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, j) => (
                    <TableCell key={j} {...column.getHeaderProps()}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell, j) => {
                      return 
                      <TableCell key={j} component="th" scope="row" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    })}
                  </TableRow>
                )
              })}
              {/* <tr> */}
                {/* {loading && (<td colSpan={columns.length}>Loading...</td>)}
                              {!loading && (<td colSpan={columns.length}>Showing {page.length} of ~ {count} results</td>)} */}
                {/* {!loading && <td colSpan={columns.length}>Showing {page.length} of ~ {count} results  Showing {page.length} of ~{controlledPageCount * pageSize}{' '} results  </td>} */}
              {/* </tr> */}
            </TableBody>
        </Table>
        <div className='dataTables_paginate paging_simple_numbers' id='example1_paginate' style={{ marginLeft: 10, marginTop: 10 }}>
          <ul className='pagination'>
            <li className={`paginate_button page-item previous ${!canPreviousPage ? 'disabled' : ''}`} id='example1_previous'>
              <a href='/#' aria-controls='example1' data-dt-idx={0} tabIndex={0} className='page-link' onClick={() => gotoPage(0)}>{'<<'}</a>
            </li>
            <li className={`paginate_button page-item ${!canPreviousPage ? 'disabled' : ''}`}><Link aria-controls='example1' data-dt-idx={3} tabIndex={0} className='page-link' onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</Link></li>
            <li className={`paginate_button page-item ${!canNextPage ? 'disabled' : ''}`}><Link aria-controls='example1' data-dt-idx={4} tabIndex={0} className='page-link' onClick={() => nextPage()}>{'>'}</Link></li>
            <li className={`paginate_button page-item next ${!canNextPage ? 'disabled' : ''}`} id='example1_next'>
              <Link aria-controls='example1' data-dt-idx={7} tabIndex={0} className='page-link' onClick={() => gotoPage(pageCount - 1)}>{'>>'}</Link>
            </li>
            <li className='paginate_button page-item'>
              <Link className='page-link'>{pageIndex + 1}/{pageOptions.length}</Link>
            </li>
            {/* <li className=''>
                    <div>
                      | Go to page:{' '}
                      <input
                        type='number'
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                          const page = e.target.value ? Number(e.target.value) - 1 : 0
                          gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                      />
                    </div>
                  </li> */}
            <li className='paginate_button page-item'>
              <select
                style={{ height: 38 }}
                className='page-link'
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Tampilkan {pageSize}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>
      </TableContainer>
    </>
  )
}

function TableContenComp (props) {
  const { pageIndex, pageSize, pageCount, loading, data, distinct, whereCondition, history, fields, filter, tablepaginationFetchData, serviceName, columns } = props
  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    tablepaginationFetchData({
      serviceName: serviceName,
      pageSize: pageSize || config.defaultPageSize,
      pageIndex: pageIndex || config.defaultPageIndex,
      filter,
      //   filter: Immutable.asMutable(filter || {}, { deep: true }),
      fields,
      history,
      whereCondition,
      distinct
    })
  }, [])
  return (
    <Table
      columns={columns}
      data={data}
      fetchData={fetchData}
      loading={loading}
      pageCount={pageCount}
      pageSize={pageSize}
      pageIndex={pageIndex}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  const errors = (state.tablepagination.errors || {})[(ownProps.paginationConfig || {}).serviceName] || []
  const loading = (state.tablepagination.loading || {})[(ownProps.paginationConfig || {}).serviceName] || false
  const data = (state.tablepagination.data || {})[(ownProps.paginationConfig || {}).serviceName] || []
  const count = (state.tablepagination.count || {})[(ownProps.paginationConfig || {}).serviceName] || 0
  const pageCount = (state.tablepagination.pageCount || {})[(ownProps.paginationConfig || {}).serviceName] || 0
  const filter = Immutable.asMutable((state.tablepagination.filter || {})[(ownProps.paginationConfig || {}).serviceName] || {}, { deep: true })

  const props = {
    // count,
    data,
    // filter,
    loading: loading,
    pageCount,
    pageSize: state.tablepagination.pageSize,
    pageIndex: state.tablepagination.pageIndex
    // errors
  }
  console.log('mapStateToProps=====', props)
  return props
}
const mapDispatchToProps = dispatch => {
  return {
    tablepaginationFetchData: data => dispatch(TablepaginationActions.tablepaginationFetchData(data))
    //   resetForm: data => dispatch(LoginActions.loginReset(data)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContenComp)
