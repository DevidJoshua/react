import React from 'react'
import { connect } from 'react-redux'
import { SearchField as SearchFieldComp } from '../index'
import TablepaginationActions from '../redux'
const SearchField = connect(
  (state, ownProps) => ({
    stringToSearch: ((state.tablepagination.filter || {})[ownProps.listallService] || {}).string_to_search
  }),
  (dispatch) => ({ tablepaginationOnChangeFilter: data => dispatch(TablepaginationActions.tablepaginationOnChangeFilter(data)) }))((props) => {
  const { tablepaginationOnChangeFilter, stringToSearch, listallService, width = 100 } = props
  return (
    <SearchFieldComp
      width={width}
      value={stringToSearch || ''}
      tablepaginationOnChangeFilter={tablepaginationOnChangeFilter}
      listallService={listallService}
    />)
})
export default SearchField
