import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import TablepaginationActions from '../redux'
import Paper from '@mui/material/Paper'

function CardBody ({ tablepaginationOnChangeFilter, child, filter }) {
  return child(tablepaginationOnChangeFilter, filter)
}
function Filter (props) {
  const {
    child,
    tablepaginationOnChangeFilter,
    filter,
    withoutCardHeader,
    style
  } = props
  // console.log("tablePaginationFilter", tablepaginationOnChangeFilter)
  return (
    <form
      style={{ ...style }}
      // role='form'
      onSubmit={e => { e.preventDefault() }}
    >
      {/* <Paper variant='outlined'> */}
      {/* <div className='card'> */}
      {!withoutCardHeader &&
        <div className='card-header' data-card-widget='collapse'>
          <h3 className='card-title'>Filter</h3>
          <div className='card-tools'>
            {/* <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button> */}
            {/* <button type='button' className='btn btn-tool' data-card-widget='remove'><i className='fas fa-times' /></button> */}
          </div>
        </div>}

      {/* <div className='card-body'> */}
      <CardBody tablepaginationOnChangeFilter={tablepaginationOnChangeFilter} filter={filter} child={child} />
      {/* </div> */}
      {/* </div> */}
      {/* </Paper> */}
    </form>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    filter: (state.tablepagination.filter || {})[ownProps.serviceName]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tablepaginationOnChangeFilter: data => dispatch(TablepaginationActions.tablepaginationOnChangeFilter(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Filter))
