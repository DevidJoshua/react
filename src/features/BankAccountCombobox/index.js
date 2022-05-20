import React, { Component } from 'react'
import { connect } from 'react-redux'
import ComboboxComp from '../../core/Components/Combobox/FormCombobox'
import { injectIntl } from 'react-intl'


export class index extends Component {
    render() {
        const { 
            //redux
            bank_data,isRequesting,
            //outside
            onComboboxChange
        } = this.props
        
        console.log("data props combobox>>>>>>",this.props)
        return (
            <div>
                <ComboboxComp  onChange={onComboboxChange} cbData={bank_data} isLoading={isRequesting} {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bank_data:state.listbankcombobox.bank_data || [],
    isRequesting: state.listbankcombobox.isRequesting,
    errors: state.listbankcombobox.errors,
    status: state.listbankcombobox.status
})


export default connect(mapStateToProps,null)(injectIntl(index))
