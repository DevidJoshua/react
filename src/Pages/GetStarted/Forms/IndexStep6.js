import React from 'react'
import _ from 'lodash'
import GetStartedStep6Perusahaan from './GetStartedStep6Perusahaan'
import GetStartedStep6Individual from './GetStartedStep6Individual'
export default function IndexStep2(props) {
  const {getStartedMerchantCategory} = props
  return (
    <>
        {!_.isNil(getStartedMerchantCategory)
            ?   (
                    <>
                            {getStartedMerchantCategory === 'perusahaan' &&  <GetStartedStep6Perusahaan {...props}/> }
                            {getStartedMerchantCategory === 'individual' &&  <GetStartedStep6Individual {...props}/> }
                    </>
                )
            :
            <h5>Form Not Found</h5>
        }
    </>
  )
}
