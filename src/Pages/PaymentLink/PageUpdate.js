import React, { Suspense } from 'react'
import { Detail } from '../../core/features/TablePagination'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { redirectAfterUpsert,detailService, upsertService, fields, createPageTitle, upsertPageTitle, listallPageUrl, redirectAfterDelete, listallPageTitle } from './Manifest'
import AppConfig from '../../core/Config/AppConfig'
import TextField from '@mui/material/TextField'
import moment from 'moment'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import _ from 'lodash'
import {muiInputDatetimeFormat,toIdr} from '../../core/Utils/Utils'
import Paper from '@mui/material/Paper'

const FormUpdate = (props) => {
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    id,
    tablepaginationResetForm
  } = props
  
  let {idCode,additionalData1,amount,totalAmount,otherBills,description,expiredDateTime} = dataDetail
  React.useEffect(() => {
    const defaultFormValue = {}
    if (id) defaultFormValue.id = id
    tablepaginationResetForm({ redirectAfterUpsert, isInitialReset: true, apiVersion:3, serviceName: upsertServiceName, defaultFormValue })
  }, [tablepaginationResetForm, upsertServiceName, id])  
  if(otherBills != null) otherBills = otherBills.length > 0 && otherBills[0]['billAmount'] !== undefined ? otherBills[0]['billAmount'] : 0
  const total = (payload.amount || amount || 0)+ (payload.biayaAdm || otherBills || 0)




  return (
      <div className='row'>
        <div className='col-sm-12'>
          {/* <div className='form-group'>
              <CurrencyTextField
                  decimalPlaces={0}
                  label='Nominal'
                  variant='outlined'
                  currencySymbol='Rp'
                  onChange={(e,value)=>{
                    tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'zone', fieldValue: Intl.DateTimeFormat().resolvedOptions().timeZone })
                    tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'amount', fieldValue: (value||e.target.value) })
                  }}
                  value={amount}
                  outputFormat='number'
                  textAlign='left'
                  decimalCharacter=','
                  digitGroupSeparator='.'
                  className="ml-auto col-5"
                  size="small"
                  minimumValue={0}
              />
          </div>
          <div className='form-group'>
            <CurrencyTextField
                  decimalPlaces={0}
                  label='Biaya Admin'
                  variant='outlined'
                  currencySymbol='Rp'
                  onChange={(e,value)=>{
                    tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'zone', fieldValue: Intl.DateTimeFormat().resolvedOptions().timeZone })
                    tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'biayaAdm', fieldValue: (value||e.target.value) })
                  }}
                  value={otherBills}
                  outputFormat='number'
                  textAlign='left'
                  decimalCharacter=','
                  digitGroupSeparator='.'
                  className="ml-auto col-5"
                  size="small"
                  minimumValue={0}
              />
          </div>
          <div className='form-group'>
              <strong>&#9;&#9;{`Total : ${toIdr(total)}`}</strong>
          </div>
          <hr/> */}
          <div className='form-group'>
            <div className='input-group'>
              {!_.isUndefined(expiredDateTime) &&
                      
                <TextField
                clearable
                ampm={false}
                id="datetime-local"
                label="Atur Tanggal Kadaluarsa"
                type="datetime-local"
                ampm={false}
                format="DD-MM-YYYY"

                onChange={e=>{
                  tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'zone', fieldValue: Intl.DateTimeFormat().resolvedOptions().timeZone })
                  tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'expiredDateTime', fieldValue: new Date(e.target.value).getTime() })
                }}
                type="datetime-local"
                defaultValue={muiInputDatetimeFormat(expiredDateTime)}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }} 
              />
     
              }
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='title'>Keterangan</label>
            <textarea type='text' defaultValue={payload.description || description} className='form-control' id='title' placeholder=' ' onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'description', fieldValue: e.target.value })} />
          </div>
        </div>
      </div>
  )
}
function Comp (props) {
  const { match } = props
  console.log("page update payyment link")
  return (
    <ContentWrapper
      pageTitle={createPageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: listallPageTitle, link: listallPageUrl() },
        { title: upsertPageTitle, link: null, isActive: true }
      ]}
      contentHeaderTitle={createPageTitle}
      isNeedLoggedin
    >
      <Paper variant='outlined'>
        <div style={{ padding: 10 }}>
          <Detail
            withoutWrapper
            detailServiceName={detailService}
            upsertServiceName={upsertService}
            fields={fields}
            apiVersion={3}
            id={match.params._id}
            formTitle={upsertPageTitle}
            redirectAfterDelete={redirectAfterDelete}
          >
              <FormUpdate />
          </Detail>
        </div>
      </Paper>
    </ContentWrapper>
  )
}
export default Comp
