import React, { PureComponent } from 'react'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import DisplayPictures from './Display'

class PictureUploadComp extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      // setFileArray: [],
      currentFileArray: []
    }
    // this.setFileArray = this.setFileArray.bind(this)
    this.setCurrentFileArray = this.setCurrentFileArray.bind(this)
  }

  // setFileArray (v) {
  //   // this.setState({ fileArray: v })
  // }

  setCurrentFileArray (v) {
    this.setState({ currentFileArray: v })
  }

  componentDidMount () {
    // onChange({ currentFileIds: currentFileArray, newFiles: fileArray })
    this.setCurrentFileArray(this.props.currentFileIds || [])
  }

  render () {
    const props = this.props
    console.log('render PictureUploadComp===', props)
    const { multiple, onChange, label, buttonLabel } = props
    const { currentFileArray } = this.state
    let fileArray = this.props.fileArray || []
    // const [fileArray, setFileArray] = React.useState([])
    // const [countFileArray, setCountFileArray] = React.useState(0)

    // const [currentFileArray, setCurrentFileArray] = React.useState([])
    // const [currentCountFileArray, setCurrentCountFileArray] = React.useState(0)

    const deletePicture = (ix) => {
      console.log('delete index ', ix)
      const newArr = []
      for (let i = 0; i < fileArray.length; i++) {
        if (ix !== i) newArr.push(fileArray[i])
      }
      // this.setFileArray(newArr)
      // setCountFileArray(newArr.length)
      onChange({ currentFileIds: currentFileArray, newFiles: newArr })
    }
    const deleteCurrentPicture = (ix) => {
      console.log('delete index ', ix)
      const newArr = []
      for (let i = 0; i < currentFileArray.length; i++) {
        if (ix !== i) newArr.push(currentFileArray[i])
      }
      this.setCurrentFileArray(newArr)
      // setCurrentCountFileArray(newArr.length)
      // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'image_ids', fieldValue: newArr.map(v => '' + v._id) })
      onChange({ currentFileIds: newArr, newFiles: fileArray })
    }

    // useEffect(() => {
    //   // onChange({ currentFileIds: currentFileArray, newFiles: fileArray })
    //   // window.bootstrapFileStyle()
    // })

    // useEffect(() => {
    //   // this.setCurrentFileArray(currentFileIds || [])
    //   // setCurrentCountFileArray((currentFileIds || []).length)
    // }, [currentFileIds])

    return (
      <div className='form-group'>
        <label htmlFor='fileUploadInput'>{label}</label>
        <div className='input-group' style={{ zIndex: 0 }}>
          {/* <div className='custom-file'> */}
          {/* <button type='button' className='btn bg-gradient-warning' onclick="document.getElementById('fileUploadInput').click();"><T id='label-addpicture' /></button> */}
          <label className='btn btn-default'>
            <T id={buttonLabel || 'label-addpicture'} />
            <input
              type='file' className='custom-file-input' id='fileUploadInput'
              onChange={(e) => {
                const fileObj = []
                // const data = new FormData()
                fileObj.push(e.target.files)
                for (let i = 0; i < fileObj[0].length; i++) {
                  console.log('image ke ' + i)
                  // fileArray.push(fileObj[0][i])
                  fileArray = [...fileArray, fileObj[0][i]]
                }
                // if(setCountFileArray) setCountFileArray(fileArray.length)
                // if(setFileArray) setFileArray(fileArray)
                // if(onChange) onChange({ fileArray })
                // this.setFileArray(fileArray)
                onChange({ currentFileIds: currentFileArray, newFiles: fileArray })
                // window.onClickUploadFileV2({
                //   onChange: ({ fileArray }) => {
                //     this.setFileArray(fileArray)
                //     // setCountFileArray((fileArray || []).length)
                //     onChange({ currentFileIds: currentFileArray, newFiles: fileArray })
                //   },
                //   fileArray,
                //   e
                // })
              }}
              multiple={multiple}
              hidden
            />
          </label>
          {/* <label id='fileUploadLabel' className='custom-file-label' htmlFor='fileUploadInput'><T id='label-addpicture' /></label> */}
          {/* </div> */}
        </div>
        <hr />
        <DisplayPictures
          currentFileArray={currentFileArray}
          fileArray={fileArray}
          deleteCurrentPicture={deleteCurrentPicture}
          deletePicture={deletePicture}
        />
      </div>
    )
  }
}

// export default PictureUploadComp
export default injectIntl(PictureUploadComp)
