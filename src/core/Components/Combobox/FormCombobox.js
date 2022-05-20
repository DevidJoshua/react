import React from 'react'

const Combobox = (props) => {
  const {
    onChange,
    cbData,
    detailData,
    isLoading,
    isLabelWithCode,
    elID
  } = props
  return (
    <>
      {isLoading
        ? (<select>
          <option value='0'>Fetch combobox data ...</option>
        </select>)
        : (
          <select disabled={!!(cbData.length == 0 && !isLoading)} className='custom-select from-control' id={elID} onChange={e => onChange(e)}>
            {typeof detailData.code === 'undefined' ? <option value=''>Select bank account</option> : <></>}
            {cbData.map((r, i) => (
              detailData.bank_code == r.code
                ? <option value={r.code} selected key={i}>{isLabelWithCode ? `${r.code} - ${r.name}` : r.name}</option>
                : <option value={r.code} key={i}>{isLabelWithCode ? `${r.code} - ${r.name}` : r.name}</option>
            ))}
          </select>
        )}
    </>
  )
}

export default Combobox
