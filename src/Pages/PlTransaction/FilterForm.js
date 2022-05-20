import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import moment from 'moment'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { connect } from 'react-redux'
const paymentMethods = [
  { value: '', label: 'All' },
  { value: 'CC', label: 'Credit Card' },
  { value: 'DD', label: 'Debitin' },
  { value: 'VA', label: 'Virtual Account' },
  { value: 'QR', label: 'QRIS' },
  { value: 'PL', label: 'Paylater' }
]
const paymentStatuses = [
  { value: '', label: 'All' },
  { value: 'SETLD', label: 'Settled' },
  { value: 'PNDNG', label: 'Pending' },
  { value: 'CANCL', label: 'Cancel' },
  { value: 'REJEC', label: 'Reject' }
]

function Comp ({
  tablepaginationOnChangeFilter,
  listallService,
  DatePicker,
  merchant,
  userPrivileges,
  filter
}) {
  const [startDate, setStartDate] = useState(filter.startDate || null)
  const [endDate, setEndDate] = useState(filter.endDate || null)
  const [paymentMethod, setPaymentMethod] = useState(filter.pymtMethodCd)
  const [paymentStatus, setPaymentStatus] = useState(filter.status)
  const [merchantCode, setMerchantCode] = useState(filter.merchant_code)
  const [merchantRefNo, setMerchantRefNo] = useState(filter.merchant_ref_no)
  const [externalId, setExternalId] = useState(filter.external_id)
  // const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'))
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
            size='small'
            id='outlined-select-payment-method'
            select
            label='Payment Method'
            value={filter.pymtMethodCd}
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
          <TextField
            size='small'
            id='outlined-select-payment-status'
            select
            label='Payment Status'
            value={paymentStatus}
            onChange={(e) => {
              setPaymentStatus(e.target.value)
              tablepaginationOnChangeFilter({
                serviceName: listallService,
                fieldName: 'status',
                fieldValue: e.target.value
              })
            }}
            // helperText='Payment Method'
          >
            {paymentStatuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <DateTimePicker
            label='Start Trx Date'
            value={startDate}
            inputFormat='yyyy-MM-dd HH:mm:ss'
            onChange={(e) => {
              var d = moment(e)
              // console.log('dateeeeeee e', moment(d).format('YYYY-MM-DD HH:mm:ss'))
              if (d.isValid()) setStartDate(moment(d).format('YYYY-MM-DD HH:mm:ss'))
              else setStartDate(null)
              tablepaginationOnChangeFilter({
                serviceName: listallService,
                fieldName: 'startDate',
                fieldValue: d.isValid() ? moment(d).format('YYYY-MM-DD HH:mm:ss.SSS ZZ') : ''
                // fieldValue: d.isValid() ? d.format('YYYY-MM-DD HH:mm:ss') : ''
              })
            }}
            renderInput={(params) => <TextField size='small' {...params} />}
          />
          <DateTimePicker
            label='End Trx Date'
            value={endDate}
            inputFormat='yyyy-MM-dd HH:mm:ss'
            onChange={(e) => {
              var d = moment(e)
              if (d.isValid()) setEndDate(moment(d).format('YYYY-MM-DD HH:mm:ss'))
              else setEndDate(null)
              tablepaginationOnChangeFilter({
                serviceName: listallService,
                fieldName: 'endDate',
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
                if (merchantCode !== e.target.value) {
                  // setMerchantCode(e.target.value)
                  tablepaginationOnChangeFilter({
                    serviceName: listallService,
                    fieldName: 'merchant_code',
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
                    fieldName: 'merchant_code',
                    fieldValue: e.target.value
                  })
                }
              }}

            />}
          <TextField
            size='small'
            id='merchant-ref-no'
            label='Merchant Ref No'
            value={merchantRefNo}
            onChange={(e) => {
              setMerchantRefNo(e.target.value)
            }}
            onBlur={(e) => {
              console.log("on blureed");
              if (e.target.value !== merchantRefNo) {
                tablepaginationOnChangeFilter({
                  serviceName: listallService,
                  fieldName: 'merchant_ref_no',
                  fieldValue: e.target.value
                })
              }
            }}
            onKeyDown={(e) => {
              var code = (e.keyCode ? e.keyCode : e.which)
              if (code === 13) { // Enter keycode
                tablepaginationOnChangeFilter({
                  serviceName: listallService,
                  fieldName: 'merchant_ref_no',
                  fieldValue: e.target.value
                })
              }
            }}
          />
          <TextField
            size='small'
            id='no_pesanan'
            label='Eksternal Id'
            value={externalId}
            onChange={(e) => {
              setExternalId(e.target.value)
            }}
            onBlur={(e) => {
              if (e.target.value !== externalId) {
                // setExternalId(e.target.value)
                tablepaginationOnChangeFilter({
                  serviceName: listallService,
                  fieldName: 'external_id',
                  fieldValue: e.target.value
                })
              }
            }}
            onKeyDown={(e) => {
              var code = (e.keyCode ? e.keyCode : e.which)
              if (code === 13) { // Enter keycode
                // setExternalId(e.target.value)
                tablepaginationOnChangeFilter({
                  serviceName: listallService,
                  fieldName: 'external_id',
                  fieldValue: e.target.value
                })
              }
            }}
          />
        </div>
      </Box>
    </LocalizationProvider>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    filter: state.tablepagination.filter.getAllPlTransactions || {}
  }
}
export default connect(mapStateToProps)(injectIntl(Comp))
