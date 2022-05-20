import React, { useEffect, useCallback } from 'react'
import _ from 'lodash'
// import AppConfig from '../../../core/Config/AppConfig'
import Loader from '../../../core/Components/Loader/Loader'

function Comp (props) {
  const { defaultValue, onChange, subcityId, disabled, forProcess, withLabel } = props
  const [loading, setLoading] = React.useState(false)
  const [currentSubcityId, setCurrentSubcityId] = React.useState('')
  const [error] = React.useState(null)
  const [listData, setListData] = React.useState([])
  const fetchData = useCallback(() => {
    setLoading(true)
    setCurrentSubcityId(subcityId)
    console.log('subcityIdsubcityIdsubcityIdsubcityId=>', subcityId)
    if (typeof subcityId !== 'undefined' && subcityId !== '') {
      setListData([
        { value: 'jne', label: 'jne' },
        { value: 'jnt', label: 'jnt' },
        { value: 'tiki', label: 'tiki' },
        { value: 'sicepat', label: 'sicepat' },
        { value: 'wahana', label: 'wahana' },
        { value: 'ninja', label: 'ninja' },
        { value: 'pos', label: 'pos' }
      ])
    } else {
      setListData([])
    }
    setLoading(false)
  }, [subcityId])
  useEffect(() => {
    const ac = new AbortController()
    if (forProcess === 'display' && _.isEmpty(defaultValue)) return () => ac.abort()
    if (subcityId && subcityId !== currentSubcityId) fetchData()
    return () => ac.abort()
  }, [subcityId, defaultValue, fetchData, forProcess, currentSubcityId])

  const content = () => {
    if (loading) return <Loader loading type='rpmerah' />
    if (error) return <button onClick={(e) => fetchData()} type='button' className='btn bg-gradient-danger btn-xs'>{error}</button>
    if (forProcess === 'display') {
      return <span>{(_.find(listData, { value: defaultValue }) || {}).label || '-'}</span>
    } else {
      return (
        <select name='shipping_currier_vendor' value={defaultValue} id='shipping_currier_vendor' className='custom-select' onChange={e => onChange(e.target.value)} disabled={disabled}>
          <option value='-'>pilih</option>
          {listData.map((v, i) => (<option key={i} value={v.value}>{v.label}</option>))}
        </select>
      )
    }
  }

  if (!loading && listData.length <= 0 && !error) return forProcess === 'display' ? '-' : null
  if (withLabel) {
    return (
      <div className='form-group'>
        <label htmlFor='shipping_currier_vendor'>Kurir Vendor</label>
        {content()}
      </div>)
  }
  return content()
}
export default Comp
