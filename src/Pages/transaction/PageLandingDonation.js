import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { PaymentPageCon } from '../../features/PaymentLink'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import './responsive_landing.css'


const theme = makeStyles
function PagePaymentStep1 (props) {
  const { match, loadingSubmitOrdercode, paymentlinkSubmitOrdercode, errorSubmitOrdercode, history } = props
  const [values, setValues] = React.useState({
    email: match.params.email,
    toko_id: match.params.toko_id,
    order_code: match.params.order_code,
    device_id: navigator.userAgent,
    history: history
  })
  const handleChange = (prop) => (event, value) => {
    setValues({ ...values, [prop]: value || event.target.value })
  }

  // Similar to componentDidMount and componentDidUpdate:
  const handleSubmit = (e) => {
    console.log('values==>', values)
    paymentlinkSubmitOrdercode(values)
  }

  return (
   <div>
      <div className="warpper-donation-link" >
        <div className="row">
          <div className="col-12 col-sm-4" style={{background:'linear-gradient(45deg, rgba(76,68,210,1) 0%, rgba(9,9,121,1) 100%, rgba(0,65,255,1) 100%)'}}>
            <div className="text-center mt-5">
              <img className="profile-user-img img-fluid img-circle" src="../../dist/img/user4-128x128.jpg" alt="User profile picture" />
            </div>
            <p className="text-white text-center mt-3">Bantuan paket internet mobile legend</p>
            {/* <p className="text-muted text-center">Software Engineer</p> */}
          </div>
          <div className="col-12 col-sm-8 pt-3 p-5">
            <p className="col-md-12">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terr.</p>
            <div className="row mt-4 ml-3 mr-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <TextField
                            id='outlined-basic'
                            label='First Name'
                            variant='outlined'
                            helperText='Leave this empty if you want to stay anonymous'
                            type="text"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <TextField
                            id='outlined-basic'
                            label='Last Name'
                            variant='outlined'
                            helperText='Leave this empty if you want to stay anonymous'
                            type="text"
                        />         
                    </div>
                </div>
                <div className="col-md-12">
                  <CurrencyTextField
                      label='Nominal'
                      variant='outlined'
                      currencySymbol='Rp'
                      outputFormat='number'
                      textAlign='left'
                      decimalCharacter=','
                      digitGroupSeparator='.'
                      className="form-control"
                  />   
                </div>        
              </div>
            <br/>        
            <hr/>
            <div className="bg-gray py-2 px-3 mt-4 p-12 mr-3 ml-3">
              <h2 className="mb-0">
                $80.00
              </h2>
              <h4 className="mt-0">
                <small>Ex Tax: $80.00 </small>
              </h4>
            </div>
            <div className="mt-4 mr-3 mb-3">
              <button className="btn btn-primary btn-lg btn-flat float-right" >
                <i className="fas fa-donate fa-lg mr-2" /> 
                {'Donate '}
              </button>
            </div>
          </div>
        </div>
      </div>
   </div>
  )
}

export default PaymentPageCon(PagePaymentStep1)
