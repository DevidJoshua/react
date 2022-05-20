import React, { useEffect } from 'react'
import _ from 'lodash'
import AppConfig from '../../../core/Config/AppConfig'
import Loader from '../../../core/Components/Loader/Loader'

function Comp (props) {
  const { defaultValue, onChange, disabled, forProcess, withLabel } = props
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [listData, setListData] = React.useState([])
  const fetchData = (isMounted) => {
    setLoading(true)
    fetch(AppConfig.hostBackend + '/api/v1/fetchdata-province', { method: 'GET', headers: { key: 'a6d84c88b9fc6cbdf502972c57885da1' } })
      .then(res => res.json())
      .then(
        (result) => {
          let er = null
          if (!result || result.error) er = 'Gagal load data. Klik untuk reload'
          setLoading(false)
          setError(er)
          if (result.list_data) return setListData((result.list_data || []).map(v => ({ province_id: v.province_code, province: v.province_name })))
          setListData(((result || {}).rajaongkir || {}).results || [])
          //   if (defaultValue) onChange(defaultValue)
          //   fetchCity(defaultValue)
        }).catch(e => setError('Gagal load data. Klik untuk reload'))
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    // setTimeout(() => {console.log('okeee'); setLoading(false)}, 3000)
    // Promise.all([
    //     fetch('http://placekitten.com/1000/1000', {signal: ac.signal}),
    //     fetch('http://placekitten.com/2000/2000', {signal: ac.signal})
    //   ]).then(() => setFetched(true))
    //     .catch(ex => console.error(ex));
    //   return () => ac.abort() // Abort both fetches on unmount

    // fetch(AppConfig.hostBackend + '/api/v1/fetchdata-province', { method: 'GET', headers: { key: 'a6d84c88b9fc6cbdf502972c57885da1' } })
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       if (!result) setError('Gagal load data. Klik untuk reload')
    //       setLoading(false)
    //       setListData(((result || {}).rajaongkir || {}).results || [])
    //     //   if (defaultValue) onChange(defaultValue)
    //     //   fetchCity(defaultValue)
    //     }
    //   )
  }
  useEffect(() => {
    // const ac = new AbortController()
    // if (forProcess === 'display' && _.isEmpty(defaultValue)) return () => ac.abort()
    // Promise.all([
    // fetchData()
    // ]).then(() => {}).catch(ex => console.error(ex))
    // return () => ac.abort()
    let isMounted = true // note this flag denote mount status
    if (listData.length === 0) {
      fetchData(isMounted)
    }
    return () => { isMounted = false }
  }, [defaultValue, forProcess, listData.length])

  const content = () => {
    if (loading) return <Loader loading type='rpmerah' />
    if (error) return <button onClick={(e) => fetchData()} type='button' className='btn bg-gradient-danger btn-xs'>{error}</button>
    if (forProcess === 'display') {
      return <span>{(_.find(listData, { province_id: defaultValue }) || {}).province || '-'}</span>
    } else {
      return (
        <select name='province' value={defaultValue} id='province' className='custom-select' onChange={(e) => onChange(e.target.value)} disabled={disabled}>
          <option value='-'>pilih</option>
          {listData.map((v, i) => (<option key={i} value={v.province_id}>{v.province}</option>))}
        </select>
      )
    }
  }

  if (!loading && listData.length <= 0 && !error) return forProcess === 'display' ? '-' : null
  if (withLabel) {
    return (
      <div className='form-group'>
        <label htmlFor='province'>Provinsi</label>
        {content()}
      </div>)
  }
  return content()
}
export default Comp
