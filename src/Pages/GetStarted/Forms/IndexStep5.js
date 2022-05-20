import React from 'react'
import GetStartedStep5Perusahaan from './GetStartedStep5Perusahaan'
import _ from 'lodash'
import GetStartedStep5Individual from './GetStartedStep5Individual'
export default function IndexStep2(props) {
  const {getStartedMerchantCategory} = props
  return (
    <>
        {!_.isNil(getStartedMerchantCategory)
            ?   (
                    <>
                            {getStartedMerchantCategory === 'perusahaan' &&  <GetStartedStep5Perusahaan {...props}/> }
                            {getStartedMerchantCategory === 'individual' &&  <GetStartedStep5Individual {...props}/> }
                    </>
                )
            :
            <h5>Form Not Found</h5>
        }
    </>
  )
}
