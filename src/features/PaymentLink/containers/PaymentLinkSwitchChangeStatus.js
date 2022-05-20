import React, { Component } from 'react'
import { connect } from 'react-redux'
import PaymentlinkActions from '../redux'
import SwitchChangeStatus from '../components/SwitchChangeStatus'
import Immutable from 'seamless-immutable'
class PaymentLinkSwitchChangeStatus extends Component {
    render() {
        const {isRequesting,idPaymentlink,serviceName,changePaymentlinkStatus,reload,status} = this.props
        return (<SwitchChangeStatus serviceName={serviceName} reload={reload} status={status} isRequesting={isRequesting} idPaymentlink={idPaymentlink} changePaymentlinkStatus={changePaymentlinkStatus}/>)
    }

}
const mapStateToProps = (state, ownProps) => {
    const {idPaymentlink} = ownProps
    const toogleRows = Immutable.asMutable(state.paymentlink.toogleRow)
    return {
        isRequesting:  toogleRows.includes(idPaymentlink),
        reloadTable: state.tablepagination.reload
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePaymentlinkStatus: data => dispatch(PaymentlinkActions.paymentlinkToogleRowData(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentLinkSwitchChangeStatus)
  