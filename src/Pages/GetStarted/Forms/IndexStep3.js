import React from 'react'
import GetStartedStep3Perusahaan from './GetStartedStep3Perusahaan'
import _ from 'lodash'
import GetStartedStep3Individual from './GetStartedStep3Individual'
export default function IndexStep2(props) {
  const {getStartedMerchantCategory} = props
  return (
    <>
        {!_.isNil(getStartedMerchantCategory)
            ?   (
                    <>
                            {getStartedMerchantCategory === 'perusahaan' &&  <GetStartedStep3Perusahaan {...props}/> }
                            {getStartedMerchantCategory === 'individual' &&  <GetStartedStep3Individual {...props}/> }
                    </>
                )
            :
            <h5>Form Not Found</h5>
        }
    </>
  )
}
