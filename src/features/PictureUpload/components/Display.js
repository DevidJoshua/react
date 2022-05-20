import React from 'react'
import AppConfig from '../../../core/Config/AppConfig'

function DisplayPictures (props) {
  console.log('render DisplayPictures===', props)
  const { deletePicture, deleteCurrentPicture } = props
  const currentFileArray = props.currentFileArray || []
  const fileArray = props.fileArray || []
  return (
    <div className='form-group multi-preview'>
      <div className='container'>
        <div className='row row-cols-3'>
          {
            currentFileArray.map((v, k) => (
              <div key={k} className='col' style={{ maxWidth: '50%' }}>
                <div className='card'>
                  <img width='100%' src={`${AppConfig.hostBackend}/api/renderfile/${v.filename || ''}.${v.file_type || ''}`} alt='...' />
                  <div className='card-body'>
                    {deleteCurrentPicture && <button onClick={() => deleteCurrentPicture(k)} type='button' className='btn btn-danger btn-block btn-sm'><i className='fa fa-trash' /></button>}
                  </div>
                </div>
              </div>
            ))
          }
          {fileArray.map((file, k) => (
            <div key={k} className='col' style={{ maxWidth: '50%' }}>
              <div className='card'>
                <img width='100%' src={URL.createObjectURL(file)} alt='...' />
                <div className='card-body'>
                  {deletePicture && <button onClick={() => deletePicture(k)} type='button' className='btn btn-danger btn-block btn-sm'><i className='fa fa-trash' /></button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DisplayPictures
