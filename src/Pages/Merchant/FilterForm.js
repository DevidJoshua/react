import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
// import { Multiselect } from '../../core/features/TablePagination'
// import MerchantManifest from '../Merchant/Manifest'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

function Comp ({
  tablepaginationOnChangeFilter,
  listallService,
  userPrivileges
}) {
  const [merchantName, setMerchantName] = useState('')
  const [merchantCode, setMerchantCode] = useState('')
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
            size='small'
            id='merchant_code'
            label='Merchant Code'
            defaultValue=''
            onBlur={(e) => {
              if (e.target.value !== merchantCode) {
                setMerchantCode(e.target.value)
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
                setMerchantCode(e.target.value)
                tablepaginationOnChangeFilter({
                  serviceName: listallService,
                  fieldName: 'merchant_code',
                  fieldValue: e.target.value
                })
              }
            }}
          />
          <TextField
            size='small'
            id='merchant_name'
            label='Merchant Name'
            defaultValue=''
            onBlur={(e) => {
              if (e.target.value !== merchantName) {
                setMerchantName(e.target.value)
                tablepaginationOnChangeFilter({
                  serviceName: listallService,
                  fieldName: 'merchant_name',
                  fieldValue: e.target.value
                })
              }
            }}
            onKeyDown={(e) => {
              var code = (e.keyCode ? e.keyCode : e.which)
              if (code === 13) { // Enter keycode
                setMerchantName(e.target.value)
                tablepaginationOnChangeFilter({
                  serviceName: listallService,
                  fieldName: 'merchant_name',
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
export default injectIntl(Comp)
