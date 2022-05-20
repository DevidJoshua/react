import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import moment from 'moment'
import { Multiselect } from '../../core/features/TablePagination'
import MerchantManifest from '../Merchant/Manifest'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'


function Comp ({
  tablepaginationOnChangeFilter,
  listallService,
  DatePicker,
  merchant
}) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete='off'
    >
      <div>
        <div className='row'>
          <div className='col-sm-6'>
            <div className='form-group'>
              <select
                class='custom-select'
                id='pymtMethodCd'
                onChange={(e) => {
                  tablepaginationOnChangeFilter({
                    serviceName: listallService,
                    fieldName: 'pymtMethodCd',
                    fieldValue: e.target.value
                  })
                }}
              >
                <option value='' selected>All Payment Method</option>
                <option value='CC'>Credit Card</option>
                <option value='DD'>Debitin</option>
                <option value='VA'>Virtual Account</option>
                <option value='QR'>QRIS</option>
                <option value='PL'>Paylater</option>
              </select>
            </div>
            <div className='form-group'>
              <select
                class='custom-select'
                id='status'
                onChange={(e) => {
                  tablepaginationOnChangeFilter({
                    serviceName: listallService,
                    fieldName: 'status',
                    fieldValue: e.target.value
                  })
                }}
              >
                <option value='' selected>All Payment Status</option>
                <option value='SETLD'>Settled</option>
                <option value='PNDNG'>Pending</option>
                <option value='CANCL'>Cancel</option>
                <option value='REJEC'>Reject</option>
              </select>
            </div>
            <div className='form-group'>
              <div className='input-group mb-3'>
                <DatePicker
                  // onFocus={e => e.target.blur()}
                  // style={{ width: '10 rem' }}
                  className='form-control'
                  placeholderText='Start Created Date'
                  dateFormat='yyyy-MM-dd HH:mm:ss'
                  showTimeSelect
                  selected={startDate}
                  onChange={(date) => {
                    var d = moment(date)
                    setStartDate(date)
                    tablepaginationOnChangeFilter({
                      serviceName: listallService,
                      fieldName: 'startDate',
                      fieldValue: d.isValid() ? d.format('YYYY-MM-DD HH:mm:ss') : ''
                    })
                  }}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                <div className='mt-1 mr-2 ml-2'>-</div>
                <DatePicker
                  // onFocus={e => e.target.blur()}
                  // style={{ width: '10 rem' }}
                  className='form-control'
                  placeholderText='End Created Date'
                  dateFormat='yyyy-MM-dd HH:mm:ss'
                  showTimeSelect
                  selected={endDate}
                  onChange={(date) => {
                    var d = moment(date)
                    setEndDate(date)
                    tablepaginationOnChangeFilter({
                      serviceName: listallService,
                      fieldName: 'endDate',
                      fieldValue: d.isValid() ? d.format('YYYY-MM-DD HH:mm:ss') : ''
                    })
                  }}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </div>
            </div>
            <div className='form-group'>
              <input
                id='merchant_ref_no'
                type='text'
                className='form-control'
                placeholder='Merchant Ref No'
                onChange={(e) => {
                  tablepaginationOnChangeFilter({
                    serviceName: listallService,
                    fieldName: 'merchant_ref_no',
                    fieldValue: e.target.value
                  })
                }}
              />
            </div>
            <div className='form-group'>
              <input
                id='no_pesanan'
                type='text'
                className='form-control'
                placeholder='Eksternal Id'
                onChange={(e) => {
                  tablepaginationOnChangeFilter({
                    serviceName: listallService,
                    fieldName: 'external_id',
                    fieldValue: e.target.value
                  })
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='pgateway_id'>Pilih Merchant</label>
              <br />
              <Multiselect
                isMulti={false}
                className='form-control'
                label='Pilih Merchant'
                labelButton='Pilih'
                labelColumn='Pilih'
                placeholder='Pilih'
                optionColumnValue='_id'
                optionColumnLabel='title'
                payloadValue={merchant.id}
                defaultValueOriginal={merchant.id}
                getColumns={({ onChange }) => []}
                listallServiceName={MerchantManifest.listallService}
                fields={MerchantManifest.fields}
                onChange={({ val }) => {
                  tablepaginationOnChangeFilter({ serviceName: listallService, fieldName: 'merchant_id', fieldValue: val })
                }}
              />
            </div>
            <div className='form-group'>
              <TextField
                id='merchant_code'
                label='Merchant Code'
                defaultValue=''
              />
              <TextField
                id='merchant_code2'
                label='Merchant Code2'
                defaultValue=''
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}
export default injectIntl(Comp)
