import React, { useEffect } from 'react'
// import _ from 'lodash'
import AppConfig from '../../../core/Config/AppConfig'
import { getAccessToken } from '../../../core/Utils/Utils'

function FieldTextArea (props) {
  const { placeholder, textEditor, defaultValue, initValue, onChange, idElement, dataId } = props
  // const [isFirstLoad, setIsFirstLoad] = React.useState(undefined)
  useEffect(() => {
    console.log('valuevaluevalue initValue=>', initValue)
    console.log('valuevaluevalue id=>', dataId)
    if (textEditor) {
      let isReset = false
      // if (initValue === defaultValue && ) {
      //   isReset = true
      // }
      // setCurrentValue(defaultValue)
      if (typeof dataId !== 'undefined' && typeof defaultValue !== 'undefined') {
        console.log('valuevaluevalue reloadddd=>', defaultValue)
        window.activateEditorV2({
          idElement,
          hostBackend: AppConfig.hostBackend,
          at: getAccessToken(),
          cb: (content) => {
            onChange(content)
          },
          isReset,
          defaultValue
        })
      }
      if (typeof dataId === 'undefined') {
        window.activateEditorV2({
          idElement,
          hostBackend: AppConfig.hostBackend,
          at: getAccessToken(),
          cb: (content) => {
            onChange(content)
          },
          isReset,
          defaultValue
        })
      }
    }
    // setIsFirstLoad(false)
  // })
  }, [defaultValue, dataId, idElement, onChange, textEditor, initValue])

  // if (forProcess === 'update' && _.isEmpty(dataId)) return null
  // if (forProcess === 'update' && (dataId === 'undefined' || _.isEmpty(dataId))) return null
  // if (forProcess === 'update' && dataId === '') return null

  if (typeof dataId !== 'undefined' && !dataId) return null

  // console.log('FieldTextAreaFieldTextAreaFieldTextAreaFieldTextArea dataId=>', dataId)
  // console.log('FieldTextAreaFieldTextAreaFieldTextAreaFieldTextArea defaultValue=>', defaultValue)
  // console.log('FieldTextAreaFieldTextAreaFieldTextAreaFieldTextArea forProcess=>', forProcess)
  // console.log('FieldTextAreaFieldTextAreaFieldTextAreaFieldTextArea renderrrr=>')
  return (
    <div className='row'>
      <div className='col-12'>
        <div style={{ position: 'relative' }}>
          {textEditor && <div style={{ backgroundColor: 'black', position: 'absolute', width: '100%', height: '100%', top: 0 }}><center><span style={{ color: 'green', fontSize: 30, marginTop: 200 }}>Gambar sedang diupload...</span></center></div>}
          <div id='texareaWrapper' style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: 1 }}>
            <textarea className='textarea' id={idElement} placeholder={placeholder || 'Isi keterangan'} value={defaultValue} style={{ width: '100%' }} onChange={(e) => onChange(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
    // <textarea className='textarea' id={idElement} placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} value={defaultValue} onChange={(e) => onChange(e.target.value)} />
  )
}
export default FieldTextArea
