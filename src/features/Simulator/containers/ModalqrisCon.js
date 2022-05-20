import React from 'react'
import ModalqrisComp from '../components/ModalqrisComp'
import SimulorActions from '../redux'
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
      loadingVa: state.simulator.loadingVa,
      loadingQr: state.simulator.loadingQr,
      isOpenQr:state.simulator.isOpenModalQr,
      statusVa:state.simulator.statusVa,
      statusQr:state.simulator.statusQr
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      setOpenQrModal: data => dispatch(SimulorActions.setOpenQrModal()),
      setCloseQrModal: data => dispatch(SimulorActions.setCloseQrModal()),
      doPayQris: data => dispatch(SimulorActions.doPayQris(data)),
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModalqrisComp)
  