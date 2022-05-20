import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper'

const CardWrapper = (props) => {
  const { collapsable, loadingOverlayOnly, withoutWrapper, serviceName, children, formTitle, Loading, SearchField, withSearchField, widthSearchField } = props
  if (withoutWrapper) return <>{children}</>
  console.log('width', widthSearchField)
  if (!loadingOverlayOnly) {
    return (
      <div className='card card-primary card-outline'>
        <div className='card-header'>
          <h3 className='card-title'>{formTitle}</h3>
          <div className='card-tools'>
            {withSearchField && <SearchField listallService={serviceName} width={widthSearchField} />}
            {collapsable && (
             <>
               <button type='button' class='btn btn-tool' data-card-widget='collapse'><i class='fas fa-minus' /></button>
               <button type='button' class='btn btn-tool' data-card-widget='remove'><i class='fas fa-remove' /></button>
             </>
            )}
          </div>
        </div>
        <div className='card-body'>
          {children}
        </div>
        <Loading serviceName={serviceName} />
      </div>
    )
  } else {
    return (
      <div>
        {children}
        <Loading serviceName={serviceName} />
      </div>
    )
  }
}

CardWrapper.propTypes = {
  Loading: PropTypes.object.isRequired,
  formTitle: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  withoutWrapper: PropTypes.bool
}

export default CardWrapper
