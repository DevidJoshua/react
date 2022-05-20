import React, { useEffect, useCallback } from 'react'
import _ from 'lodash'
import AppConfig from '../../../core/Config/AppConfig'
import Loader from '../../../core/Components/Loader/Loader'

function Comp (props) {
  const { defaultValue, onChange, cityId, disabled, forProcess, withLabel } = props
  const [loading, setLoading] = React.useState(false)
  const [currentCityId, setCurrentCityId] = React.useState('')
  const [error, setError] = React.useState(null)
  const [listData, setListData] = React.useState([])
  const fetchData = useCallback(() => {
    setLoading(true)
    setCurrentCityId(cityId)
    Promise.all([
      fetch(AppConfig.hostBackend + '/api/v1/fetchdata-subcity?city=' + cityId, { method: 'GET', headers: { key: 'a6d84c88b9fc6cbdf502972c57885da1' } })
        .then(res => res.json())
        .then(
          (result) => {
            let er = null
            if (!result || result.error) er = 'Gagal load data. Klik untuk reload'
            setError(er)
            setLoading(false)
            if (result.list_data) return setListData((result.list_data || []).map(v => ({ subdistrict_id: v.subcity_code, subdistrict_name: v.subcity_name })))
            setListData(((result || {}).rajaongkir || {}).results || [])
            //   if (defaultValue) onChange(defaultValue)
            //   fetchCity(defaultValue)
          }).catch(e => setError('Gagal load data. Klik untuk reload')).finally(() => setLoading(false))]).then(() => {}).catch(ex => console.error(ex))
  }, [cityId])
  useEffect(() => {
    const ac = new AbortController()
    if (forProcess === 'display' && _.isEmpty(defaultValue)) return () => ac.abort()
    if (cityId && cityId !== currentCityId) fetchData()
    return () => ac.abort()
  }, [cityId, defaultValue, fetchData, forProcess, currentCityId])

  const content = () => {
    if (loading) return <Loader loading type='rpmerah' />
    if (error) return <button onClick={(e) => fetchData()} type='button' className='btn bg-gradient-danger btn-xs'>{error}</button>
    if (forProcess === 'display') {
      return <span>{(_.find(listData, { subdistrict_id: defaultValue }) || {}).subdistrict_name || '-'}</span>
    } else {
      return (
        <select name='subcity' value={defaultValue} id='subcity' className='custom-select' onChange={e => onChange(e.target.value)} disabled={disabled}>
          <option value='-'>pilih</option>
          {listData.map((v, i) => (<option key={i} value={v.subdistrict_id}>{v.subdistrict_name}</option>))}
          {/* {listData.map((v, i) => (<option key={i} value={v.city_id} selected={defaultValue === v.city_id}>{v.city_name}</option>))} */}
        </select>
      )
    }
  }

  if (!loading && listData.length <= 0 && !error) return forProcess === 'display' ? '-' : null
  if (withLabel) {
    return (
      <div className='form-group'>
        <label htmlFor='subcity'>Kecamatan</label>
        {content()}
      </div>)
  }
  return content()
}
export default Comp
