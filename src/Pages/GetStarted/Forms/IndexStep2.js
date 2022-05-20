import React from 'react'
import GetStartedStep2Perusahaan from './GetStartedStep2Perusahaan'
import _ from 'lodash'
import GetStartedStep2Individual from './GetStartedStep2Individual'
export default function IndexStep2(props) {
 const {getStartedMerchantCategory} = props
  return (
    <>
        {!_.isNil(getStartedMerchantCategory)
            ?   (
                  <>
                      {getStartedMerchantCategory === 'perusahaan' &&  <GetStartedStep2Perusahaan {...props}/> }
                      {getStartedMerchantCategory === 'individual' &&  <GetStartedStep2Individual {...props}/> }
                  </>
                )
            :
            <h5>Form Not Found</h5>
        }
    </>
  )
}
