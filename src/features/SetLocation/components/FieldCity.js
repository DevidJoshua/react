import React, { useEffect, useCallback } from 'react'
import _ from 'lodash'
import AppConfig from '../../../core/Config/AppConfig'
import Loader from '../../../core/Components/Loader/Loader'

function Comp (props) {
  const { defaultValue, onChange, provinceId, disabled, forProcess, withLabel } = props
  const [loading, setLoading] = React.useState(false)
  const [currentProvinceId, setCurrentProvinceId] = React.useState('')
  const [error, setError] = React.useState(null)
  const [listData, setListData] = React.useState([])
  const fetchData = useCallback((province) => {
    setLoading(true)
    setCurrentProvinceId(provinceId)
    Promise.all([fetch(AppConfig.hostBackend + '/api/v1/fetchdata-city?province=' + provinceId, { method: 'GET', headers: { key: 'a6d84c88b9fc6cbdf502972c57885da1' } })
      .then(res => res.json())
      .then((result) => {
        let er = null
        if (!result || result.error) er = 'Gagal load data. Klik untuk reload'
        setError(er)
        if (result.list_data) return setListData((result.list_data || []).map(v => ({ city_id: v.city_code, city_name: v.city_name })))
        setListData(((result || {}).rajaongkir || {}).results || [])
      }).catch(e => setError('Gagal load data. Klik untuk reload')).finally(() => setLoading(false))]).then(() => {}).catch(ex => console.error(ex))
  }, [provinceId])
  useEffect(() => {
    const ac = new AbortController()
    if (forProcess === 'display' && _.isEmpty(defaultValue)) return () => ac.abort()
    if (provinceId && provinceId !== currentProvinceId) fetchData()
    // if (provinceId !== currentProvinceId && listData.length === 0) fetchData()
    return () => ac.abort()
  }, [provinceId, forProcess, defaultValue, fetchData, currentProvinceId])

  const content = () => {
    if (loading) return <Loader loading type='rpmerah' />
    if (error) return <button onClick={(e) => fetchData()} type='button' className='btn bg-gradient-danger btn-xs'>{error}</button>
    if (forProcess === 'display') {
      return <span>{(_.find(listData, { city_id: defaultValue }) || {}).city_name || '-'}</span>
    } else {
      return (
        <select name='city' value={defaultValue} id='city' className='custom-select' onChange={e => onChange(e.target.value)} disabled={disabled}>
          <option value='-'>pilih</option>
          {listData.map((v, i) => (<option key={i} value={v.city_id}>{v.city_name}</option>))}
        </select>
      )
    }
  }
  if (!loading && listData.length <= 0 && !error) return forProcess === 'display' ? '-' : null
  if (withLabel) {
    return (
      <div className='form-group'>
        <label htmlFor='city'>Kota/Kabupaten</label>
        {content()}
      </div>)
  }
  return content()
}
export default Comp
