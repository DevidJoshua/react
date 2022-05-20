import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import moment from 'moment'
import { connect } from 'react-redux'
// import { Multiselect } from '../../core/features/TablePagination'
// import MerchantManifest from '../Merchant/Manifest'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import paymentMethods from '../../data/paymentMethod.json'
// import paymentStatuses from '../../data/paymentStatus.json'
paymentMethods.unshift({ value: '', label: 'All' })

function Comp ({
  tablepaginationOnChangeFilter,
  listallService,
  DatePicker,
  merchant,
  userPrivileges,
  filter
}) {
  const [startDate, setStartDate] = useState(filter.createdAtStart || null)
  const [endDate, setEndDate] = useState(filter.createdAtEnd || null)
  const [paymentMethod, setPaymentMethod] = useState(filter.pymtMethodCd)
  const [paymentStatus, setPaymentStatus] = useState(filter.status)
  const [merchantCode, setMerchantCode] = useState(filter.merchantCode)
  const [merchantRefNo, setMerchantRefNo] = useState(filter.merchant_ref_no)
  const [externalId, setExternalId] = useState(filter.external_id)
  
  // const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'))
  // useEffect(() => {
  //   document.title = `You clicked ${count} times`;
  // });
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete='off'
      >
        <div>
          <TextField
            id='outlined-select-payment-method'
            size='small'
            select
            label='Payment Method'
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value)
              tablepaginationOnChangeFilter({
                serviceName: listallService,
                fieldName: 'pymtMethodCd',
                fieldValue: e.target.value
              })
            }}
            // helperText='Payment Method'
          >
            {paymentMethods.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <DateTimePicker
            clearable
            label='Start Trx Date'
            value={startDate}
            inputFormat='yyyy-MM-dd HH:mm:ss'
            onChange={(e) => {
              var d = moment(e)
              if (d.isValid()) setStartDate(moment(d).format('YYYY-MM-DD HH:mm:ss'))
              tablepaginationOnChangeFilter({
                serviceName: listallService,
                fieldName: 'createdAtStart',
                fieldValue: d.isValid() ? moment(d).format('YYYY-MM-DD HH:mm:ss.SSS ZZ') : ''
                // fieldValue: d.isValid() ? d.format('YYYY-MM-DD HH:mm:ss') : ''
              })
            }}
            renderInput={(params) => <TextField size='small' {...params} />}
          />
          <DateTimePicker
            clearable
            label='End Trx Date'
            value={endDate}
            inputFormat='yyyy-MM-dd HH:mm:ss'
            onChange={(e) => {
              var d = moment(e)
              if (d.isValid()) setEndDate(moment(d).format('YYYY-MM-DD HH:mm:ss'))
              tablepaginationOnChangeFilter({
                serviceName: listallService,
                fieldName: 'createdAtEnd',
                fieldValue: d.isValid() ? moment(d).format('YYYY-MM-DD HH:mm:ss.SSS ZZ') : ''
                // fieldValue: d.isValid() ? d.format('YYYY-MM-DD HH:mm:ss') : ''
              })
            }}
            renderInput={(params) => <TextField size='small' {...params} />}
          />
          {userPrivileges.includes('getAllPlTransactions') &&
            <TextField
              size='small'
              id='merchant_code'
              label='Merchant Code'
              value={merchantCode}
              onChange={(e) => {
                setMerchantCode(e.target.value)
              }}
              onBlur={(e) => {
                if (filter.merchantCode !== e.target.value) {
                  // setMerchantCode(e.target.value)
                  tablepaginationOnChangeFilter({
                    serviceName: listallService,
                    fieldName: 'merchantCode',
                    fieldValue: e.target.value
                  })
                }
              }}
              onKeyDown={(e) => {
                var code = (e.keyCode ? e.keyCode : e.which)
                if (code === 13) { // Enter keycode
                  // setMerchantCode(e.target.value)
                  tablepaginationOnChangeFilter({
                    serviceName: listallService,
                    fieldName: 'merchantCode',
                    fieldValue: e.target.value
                  })
                }
              }}
            />}
          {/* <TextField
            id='merchant-ref-no'
            label='Merchant Ref No'
            defaultValue=''
            onBlur={(e) => {
              if (e.target.value !== merchantRefNo) {
                setMerchantRefNo(e.target.value)
                tablepaginationOnChangeFilter({
                  serviceName: listallService,
                  fieldName: 'merchantRefNo',
                  fieldValue: e.target.value
                })
              }
            }}
            onKeyDown={(e) => {
              var code = (e.keyCode ? e.keyCode : e.which)
              if (code === 13) { // Enter keycode
                setMerchantRefNo(e.target.value)
                tablepaginationOnChangeFilter({
                  serviceName: listallService,
                  fieldName: 'merchantRefNo',
                  fieldValue: e.target.value
                })
              }
            }}
          /> */}
        </div>
      </Box>
    </LocalizationProvider>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    filter: state.tablepagination.filter.getAllTransactionfee || {}
  }
}
export default connect(mapStateToProps)(injectIntl(Comp))
