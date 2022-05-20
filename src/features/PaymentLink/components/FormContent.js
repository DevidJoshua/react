import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import { green } from '@material-ui/core/colors'
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { toIdr } from 'core/Utils/Utils'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { red } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const FormData = (props) => {
  const { onSubmitForm, loadingOnSubmitForm,handleClose, userId, merchantId, deviceId,idCode} = props
  const [values, setValues] = React.useState({
    paymentTotalAmount:0,
    payment_amount: 0,
    additionalData1: null,
    additionalData2: [],
    isSetExpired:false,
    otherBills:[{billName:'Biaya Admin',billAmount:0}],
    description:'',
    otherBill:{},
    maxTransaction:1,
    isAdvancedOption:false
  })

  const handleSubmit = (e) => {
    let errs = []
    values.userId = userId
    values.merchantId = merchantId
    values.deviceId = deviceId
    errs=[]
    
    if(values.additionalData1===null || values.additionalData1 === '') errs.push("Pastikan ID Eksternal sudah terisi")
    if(values.paymentTotalAmount<10000) errs.push("Jumlah yang harus dibayar minimal Rp. 10.000")
    if(values.expiredDate<=new Date().getTime())errs.push("Waktu kedaluwarsa tidak boleh sebelum tanggal hari ini")
    if(errs.length>0) values.formErrors = errs
    if(errs.length<1) values.formErrors = []


    const amountValue = values.payment_amount || 0
    const otherBillValue = values.otherBill.billAmount || 0
    onSubmitForm({...values,amountValue,otherBillValue,additionalData2:JSON.stringify(values.additionalData2).replace(/"/g, '\\"')})
  }

  const resetDateExpiredToDefault = () =>{
    const now = new Date()
    let expiredDate = now.setDate(now.getDate()+1)
    expiredDate = new Date(expiredDate).getTime()
    setValues({...values,isSetExpired:false,expiredDate})
  }

  useEffect(()=>{
      // var totBills = 0
      // const otherBills = values.otherBills
      // otherBills.map(r=>totBills += r.billAmount)
      // setValues({...values,paymentTotalAmount:(totBills+values.payment_amount)})
      const amount = values.payment_amount || 0
      const otherBill = values.otherBill.billAmount || 0
      setValues({...values,paymentTotalAmount:(amount+otherBill)})
      
  },[values.otherBill,values.other_bills,values.payment_amount])  

  useEffect(()=>{
      resetDateExpiredToDefault()
  },[])


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

  const onChangeAdditionalData2 = (event,prop) =>{

  }
  const addAdditionalData2 = (props) =>{
    const data = values.additionalData2
    const latestData = (values.additionalData2)[((values.additionalData2).length)-1]

    data.push({id:(values.additionalData2).length > 0 ? (latestData.id+1)  : 1, inputLabel:'Input', inputType:'text' })
    setValues({...values,additionalData2:data})
  }
  const onChangeDataAdditionalData2 = (event,prop,id) =>{
    const dataFound = (values.additionalData2).find(r=>r.id === id)
    dataFound[prop] = event.target.value
    const finalData = (values.additionalData2).map(r=>{
        if(r.id === dataFound.id) return dataFound
        else return r
    })

    setValues({...values,additionalData2:finalData})
  }
  
  const removeAdditionalData2 = (id) =>{
    const filteredData = (values.additionalData2).filter(r=>r.id!=id) || []
    setValues({...values,additionalData2:filteredData})
  }
  const dataTypes = [
      {value:'number',label:'Angka'},
      {value:'text',label:'Teks'}
  ]
  
  
  return (
    <>
    <Box sx={{ width: '100%' }}>
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
            `   <div className="col-md-12 row">
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
              <div className='col-md-12 mt-3'>
                    <FormControlLabel control={<Checkbox checked={values.isAdvancedOption} onChange={e=>setValues({...values,additionalData2:e.target.value ? values.additionalData2 : [],isAdvancedOption:e.target.checked})} />} label="Gunakan Opsi Lanjutan" />
                    <hr/>
                    {values.isAdvancedOption &&
                        <div>
                            {(values.additionalData2).map((r,i)=>
                                <div className='md-10 card p-2' key={i}>
                                    <label key={0}><center>{`Input ${i+1}`}</center></label>
                                    <TextField
                                        key={1}
                                        id='outlined-basic'
                                        label='Nama Input'
                                        variant='outlined'
                                        multiline
                                        className="form-control"
                                        size='small'
                                        onChange={e=>onChangeDataAdditionalData2(e,'inputLabel',r.id)}
                                    />
                                    <FormControl fullWidth size='small' sx={{marginTop:'1rem'}}>
                                        <InputLabel id="demo-simple-select-label">Tipe data</InputLabel>
                                        <Select
                                        label="Tipe data"
                                        onChange={e=>onChangeDataAdditionalData2(e,'inputType',r.id)}
                                        >
                                            {dataTypes.map((r,i)=><MenuItem key={i} value={r.value}>{r.label}</MenuItem>)}
                                        </Select>
                                    </FormControl>

                                    <Button fullWidth color='error' endIcon={<RemoveCircleIcon color='error'/>} onClick={()=>removeAdditionalData2(r.id)}>Remove</Button>
                                </div>
                            )}
                            <Button color='primary'  variant="contained" fullWidth endIcon={<AddIcon/>} onClick={()=>addAdditionalData2()}/>
                        </div>
                    }
              </div>
          </div>
        <DialogActions>
            <Button color="secondary" variant="contained" disabled={!values.isSetExpired} onClick={resetDateExpiredToDefault}>Reset Tangggal Kadaluarsa</Button>
            <Button onClick={handleClose} color="error" variant="contained" disabled={loadingOnSubmitForm}>Batal</Button>
            {(values.paymentTotalAmount !== 0 || values.payment_amount !== 0             
                ? <LoadingButton onClick={handleSubmit} endIcon={<SaveIcon />} loading={loadingOnSubmitForm} loadingPosition="end" variant="contained" >Simpan</LoadingButton> 
                : <Button color="primary" variant="contained"disabled={true}>{'Simpan'}</Button>
            )}
        </DialogActions>
      </Box>   
    </>
  )
}


export default FormData
