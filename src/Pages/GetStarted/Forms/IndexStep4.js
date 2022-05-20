import React from 'react'
import GetStartedStep4Perusahaan from './GetStartedStep4Perusahaan'
import _ from 'lodash'
import GetStartedStep4Individual from './GetStartedStep4Individual'
export default function IndexStep2(props) {
  const {getStartedMerchantCategory} = props
  return (
    <>
        {!_.isNil(getStartedMerchantCategory)
            ?   (
                    <>
                            {getStartedMerchantCategory === 'perusahaan' &&  <GetStartedStep4Perusahaan {...props}/> }
                            {getStartedMerchantCategory === 'individual' &&  <GetStartedStep4Individual {...props}/> }
                    </>
                )
            :
            <h5>Form Not Found</h5>
        }
    </>
  )
}
