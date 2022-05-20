import React, { useEffect, useCallback } from 'react'
import _ from 'lodash'
import AppConfig from '../../../core/Config/AppConfig'
import Loader from '../../../core/Components/Loader/Loader'

function Comp (props) {
  const { tokoSubcity, shippingSubcity, weight, defaultValue, onChange, currierVendorId, disabled, forProcess, withLabel } = props
  const [loading, setLoading] = React.useState(false)
  const [currentCurrierVendorId, setCurrentCurrierVendorId] = React.useState('')
  const [error, setError] = React.useState(null)
  const [listData, setListData] = React.useState([])
  const fetchData = useCallback(() => {
    setLoading(true)
    setCurrentCurrierVendorId(currierVendorId)
    if (typeof currierVendorId !== 'undefined' && currierVendorId !== '') {
      const body = {
        origin: tokoSubcity,
        originType: 'subdistrict',
        destinationType: 'subdistrict',
        destination: shippingSubcity,
        weight: parseFloat(weight),
        courier: currierVendorId
      }
      console.log('bodybody=>', body)
      Promise.all([
        fetch(AppConfig.hostBackend + '/api/v1/fetchdata-cost',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(body)
          })
          .then(res => res.json())
          .then(
            (result) => {
              if (!result || result.error) setError('Gagal load data. Klik untuk reload')
              let er = null
              const status = (((result || {}).rajaongkir || {}).status || {}).code
              const description = (((result || {}).rajaongkir || {}).status || {}).description
              if (status !== 200) {
                if ((description || '').includes('Weight harus lebih besar dari 0')) {
                  er = 'Berat barang tidak boleh kurang dari 1 Gram.'
                  // setError(null)
                  // return alert('Berat barang tidak boleh kurang dari 1 Gram.')
                } else {
                  er = description
                }
                // return alert(description)
              }

              if (er) {
                setError(er)
                alert(er)
              } else {
                setError(null)
              }

              setLoading(false)
              const datas = (((result || {}).rajaongkir || {}).results[0] || {}).costs
              setListData(datas.map(v => ({ value: v.service, label: v.service, origin: v })))
              // setListData(((result || {}).rajaongkir || {}).results || [])
              //   if (defaultValue) onChange(defaultValue)
              //   fetchCity(defaultValue)
            })
          .catch(e => setError('Gagal load data. Klik untuk reload'))
          .finally(() => setLoading(false))]).then(() => {}).catch(ex => console.error(ex))
    } else {
      setListData([])
      setLoading(false)
    }
  }, [currierVendorId, shippingSubcity, tokoSubcity, weight])
  useEffect(() => {
    const ac = new AbortController()
    if (forProcess === 'display' && _.isEmpty(defaultValue)) return () => ac.abort()
    if (currierVendorId && currierVendorId !== currentCurrierVendorId) fetchData()
    return () => ac.abort()
  }, [currierVendorId, defaultValue, fetchData, forProcess, currentCurrierVendorId])

  const content = () => {
    if (loading) return <Loader loading type='rpmerah' />
    if (error) return <button onClick={(e) => fetchData()} type='button' className='btn bg-gradient-danger btn-xs'>{error}</button>
    if (forProcess === 'display') {
      return <span>{(_.find(listData, { value: defaultValue }) || {}).label || '-'}</span>
    } else {
      return (
        <select name='shipping_currier' value={defaultValue} id='shipping_currier' className='custom-select' onChange={e => onChange(e.target.value, listData)} disabled={disabled}>
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
        <label htmlFor='shipping_currier'>Kurir</label>
        {content()}
      </div>)
  }
  return content()
}
export default Comp
