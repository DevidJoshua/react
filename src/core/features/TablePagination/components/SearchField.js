
import React from 'react'

const SearchField = ({ placeholder = 'cari', tablepaginationOnChangeFilter, listallService, value, width }) => (
  <div className='input-group input-group-sm' style={{ width }}>
    <input
      type='text'
      id='string_to_search'
      value={value || ''}
      name='table_search'
      className='form-control float-right'
      placeholder={placeholder}
      onChange={e => tablepaginationOnChangeFilter({ serviceName: listallService, fieldName: 'string_to_search', fieldValue: e.target.value })}
    />
    <div className='input-group-append'>
      <button type='submit' className='btn btn-default'>
        <i className='fas fa-search' />
      </button>
    </div>
  </div>
)

export default SearchField
