import React from 'react'
import moment from 'moment'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { toIdr } from 'core/Utils/Utils'
import TextField from '@material-ui/core/TextField'
import Button from '@mui/material/Button';


export default function BasicInputsComp(props) {
    const {setValues,values,classes} = props

    const handleChange = (prop) => (event, value) => {
        let val = value || event.target.value
        if(prop === 'expiredDate'){
            val = new Date(value || event.target.value).getTime()
        }
        if(prop === "payment_amount" && val === '0,00'){
          val=0
        }
        setValues({ ...values, [prop]:val})
    }
    
    const onChangeAddtionalBils = (prop) => (event,value) =>{
        const bills = values.otherBills
        const bill = bills.find(r=>r.billName === prop)
        
        if(bill){
            const newBills = (values.otherBills).map(r=>{
            return r.billName===prop 
                    ? { billName:prop, billAmount:(value || event.target.value)  === '0,00' ? 0 : (value || event.target.value) } 
                    : r 
            })
            
            setValues({ ...values,otherBill:{billName:prop,billAmount:(value || event.target.value) === '0,00' ? 0 : (value || event.target.value)},otherBills:newBills})  
        }else{
            setValues({ ...values, otherBill:{billName:prop,billAmount:(value || event.target.value) === '0,00' ? 0 : (value || event.target.value)},otherBills:[...values.otherBills,{billName:prop,billAmount:(value || event.target.value)}]})
        }
    }

    return (
        <>
            <div className="card-body overflow-scroll">
            <form>
                <div className="form-group">
                <TextField
                    id='outlined-basic'
                    label='ID Eksternal'
                    variant='outlined'
                    multiline
                    className="form-control"
                    onChange={handleChange('additionalData1')}
                    helperText="Identifikasi untuk merchant. contoh: No pesanan, dan lain-lain"
                />
                </div>
            {(!values.isSetExpired && 
                <div className="card mt-5">
                    <div className="col-md-8">
                        <strong>Jatuh Tempo Invoice (GMT+7)</strong>
                        <p>Jatuh tempo pada <b className="text-danger">{moment(values.expiredDate).format('LLL')}</b></p> 
                    </div>
                    <Button color="primary" variant="outlined" startIcon={<span className="fas fa-edit"/>} onClick={()=>setValues({...values,isSetExpired:true})}>Ubah</Button>  
                </div>
            )}
            {(values.isSetExpired && 
                <div className="mt-5">
                    <TextField
                    id="datetime-local"
                    label="Atur Tanggal Kadaluarsa"
                    type="datetime-local"
                    format="yyyy-MM-dd HH:mm:ss"
                    defaultValue={new Date().toISOString()}
                    
                    onChange={handleChange('expiredDate')}
                    sx={{ width: 250 }}
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    />
                </div>
            )}
            <div className="form-group mt-2">
                <label>Maksimal transaksi</label>
                <input className="form-control" type='number' min={1}  onChange={handleChange('maxTransaction')} defaultValue={1}/>
            </div>

            <div className="form-group">
                <label>Deskripsi (Opsional)</label>
                <textarea class="form-control" rows="3" placeholder="Deskripsi ..." onChange={handleChange('description')} ></textarea>
            </div>
            </form>
            <hr/>
            <div className="mt-1">
            <div className="col-md-12 row">
                <p className="col-4">Jumlah yang harus dibayar</p>
                <CurrencyTextField
                    label='Nominal'
                    variant='outlined'
                    currencySymbol='Rp'
                    onChange={handleChange('payment_amount')}
                    outputFormat='number'
                    textAlign='left'
                    decimalCharacter=','
                    digitGroupSeparator='.'
                    className="ml-auto col-5"
                    size="small"
                    minimumValue={'0'}
                    decimalPlaces={'0'}
                />
            </div>
            <div className="col-md-12 row">
                <p className="col-4">Biaya Admin (Opsional)</p>
                <CurrencyTextField
                    label='Nominal'
                    size="small"
                    variant='outlined'
                    currencySymbol='Rp'
                    onChange={onChangeAddtionalBils('Biaya Admin')}
                    outputFormat='number'
                    textAlign='left'
                    decimalCharacter=','
                    digitGroupSeparator='.'
                    className="ml-auto col-5"
                    minimumValue={'0'}
                    decimalPlaces={'0'}
                />
            </div>
            </div>
            <hr/>
            <div className="col-md-12 row">
                <strong className="col-4">Total</strong>
                <strong className="ml-auto col-5">{toIdr(values.paymentTotalAmount)}</strong>
            </div>
        </div></>
    )
}
