import React, { PureComponent } from 'react'
// import Loader from '../../../Components/Loader/Loader'
import PaginationNav from './PaginationNav'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default class TableViewTable extends PureComponent {
  render () {
    const {
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
      children,
      count
    } = this.props

    const childrenWithProps = React.Children.map(children, child => {
      // checking isValidElement is the safe way and avoids a typescript error too
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          headerGroups,
          getTableProps,
          getTableBodyProps,
          page,
          prepareRow
        })
      }
      return child
    })

    return (
      <>
        {!children &&
          <>
            <TableContainer component={Paper}>
              {!loading && errors && <div class='alert alert-danger' role='alert'><ul>{errors.map((v, i) => <li key={i}>{v.message}</li>)}</ul></div>}
              {data &&
              <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
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
                      <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} {...row.getRowProps()}>
                        {row.cells.map((cell, j) => {
                          return <TableCell key={j} component='th' scope='row' {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>}
            </TableContainer>
            <PaginationNav
              canPreviousPage={canPreviousPage}
              gotoPage={gotoPage}
              canNextPage={canNextPage}
              previousPage={previousPage}
              nextPage={nextPage}
              pageCount={pageCount}
              pageIndex={pageIndex}
              pageOptions={pageOptions}
              pageSize={pageSize}
              setPageSize={setPageSize}
              count={count}
              withPageSize
            />
          </>}
        {children && <>{childrenWithProps}</>}
      </>
    )
  }
}
