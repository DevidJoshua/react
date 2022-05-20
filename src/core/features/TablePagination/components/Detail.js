import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import DetailCon from '../containers/DetailCon'
import { CardWrapperCon } from '../containers'
class DetailComp extends PureComponent {
  render () {
    console.log('DetailCompDetailCompDetailComp')
    const {
      formTitle,
      children,
      childFunc,
      fields,
      upsertServiceName,
      detailServiceName,
      updatePageUrl,
      createPageUrl,
      redirectAfterDelete,
      customFooterButtons,
      deleteServiceName,
      id,
      withoutWrapper,
      preProcessPatchData,
      apiVersion,
      buttonAction,
      collapsable
    } = this.props
    console.log('upsertServiceNameupsertServiceNameupsertServiceNameupsertServiceName', upsertServiceName)
    return (
      <CardWrapperCon
        collapsable={collapsable}
        formTitle={formTitle}
        withoutWrapper={withoutWrapper}
        serviceName={detailServiceName}
      >
        <DetailCon
          preProcessPatchData={preProcessPatchData}
          updatePageUrl={updatePageUrl}
          createPageUrl={createPageUrl}
          upsertServiceName={upsertServiceName}
          detailServiceName={detailServiceName}
          deleteServiceName={deleteServiceName}
          fields={fields}
          childFunc={childFunc}
          id={id}
          redirectAfterDelete={redirectAfterDelete}
          apiVersion={apiVersion}
          buttonAction={buttonAction}
        >
          {children && children}
        </DetailCon>
      </CardWrapperCon>
    )
  }
}

export default injectIntl((props) => {
  var history = useHistory()
  return <DetailComp history={history} {...props} />
})
