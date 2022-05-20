import React, { PureComponent } from 'react'
// import { Link } from 'react-router-dom'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

export default function PaginationNav (props) {
  const {
    canPreviousPage,
    gotoPage,
    canNextPage,
    previousPage,
    nextPage,
    pageCount,
    pageIndex,
    pageOptions,
    pageSize,
    setPageSize,
    withPageSize,
    count
  } = props
  const handleChangePage = (event, newPage) => {
    // alert(newPage)
    gotoPage(newPage)
  }
  const handleChangeRowsPerPage = (e) => {
    setPageSize(Number(e.target.value))
    gotoPage(0)
  }
  return (
    <TablePagination
      rowsPerPageOptions={[10, 20, 30, 40, 50, { label: 'All', value: -1 }]}
      colSpan={3}
      count={count}
      rowsPerPage={pageSize}
      page={pageIndex}
      // SelectProps={{
      //   inputProps: {
      //     'aria-label': 'rows per page'
      //   },
      //   native: true
      // }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}
