import React from 'react'
import { useHistory } from 'react-router-dom'
import { FormattedMessage as T } from 'react-intl'
import TableCon from '../containers/TableCon'
import { CardWrapperCon } from '../containers'

const Table = (props) => {
  var history = useHistory()
  const {
    columns,
    createHref,
    createNewButtonLabel,
    whereCondition,
    cardHeader,
    tableMenus,
    cardTitle,
    // cardFooter,
    loadingOverlayOnly,
    withoutWrapper,
    distinct,
    listallServiceName,
    fields,
    children,
    widthSearchField,
    withSearchField,
    apiVersion,
    noWrapper,
    ignoreFields,
    tableId,
    additionalRequests,
    appendColumns
  } = props


  return (
    <>
      <CardWrapperCon
        noWrapper={!!noWrapper}
        formTitle={cardTitle}
        loadingOverlayOnly={!!loadingOverlayOnly}
        withoutWrapper={withoutWrapper}
        serviceName={listallServiceName}
        widthSearchField={widthSearchField}
        withSearchField={withSearchField}
        tableId={tableId}
      >
        {(!tableMenus && createHref) && (<button style={{ marginRight: 5 }} type='button' className='btn btn-info' onClick={() => history.push(createHref)}><i className='fas fa-plus' /> <T id={`${createNewButtonLabel || 'Create New'}`} /></button>)}
        {cardHeader && cardHeader()}
        <TableCon
          appendColumns={appendColumns}
          additionalRequests={additionalRequests}
          columns={columns}
          listallServiceName={listallServiceName}
          fields={fields}
          history={history}
          whereCondition={whereCondition}
          distinct={distinct}
          apiVersion={apiVersion}
          ignoreFields={ignoreFields}
          tableId={tableId}
        >
          {children && children}
        </TableCon>
      </CardWrapperCon>
    </>
  )
}
export default Table

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(injectIntl(TableComp))
