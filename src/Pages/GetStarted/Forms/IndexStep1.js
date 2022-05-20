import React from 'react'
import _ from 'lodash'
import GetStartedStep1Individual from './GetStartedStep1Individual'
export default function IndexStep2(props) {
    const {getStartedMerchantCategory} = props  
    return (
        <>
            {!_.isNil(getStartedMerchantCategory)
                ?   
                    <GetStartedStep1Individual {...props}/>
                :
                    <h5>Form Not Found</h5>
            }
        </>
    )
}
