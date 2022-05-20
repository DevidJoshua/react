import React from 'react'
import { Chart } from '../../../core/features/TablePagination'
import { listallService, getColumns } from './Manifest'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const bull = (
  <Box
    component='span'
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
)

function Comp ({ count, history }) {
  return (
    <>
      <Chart
        listName='cart1'
        cartTitle='Tokopedia - Debitin Payment Hourly'
        columns={getColumns(history)}
        listallServiceName='getChart1'
        fields='_id,count,yvalue,xvalue'
        history={history}
        whereCondition={JSON.stringify({ chart_code: 'DEBITIN-PAYMENT' })}
        pageSize={50000}
        apiVersion={2}
        labelMap={{ 'Total Otp Req M': 'Otp Request', 'Succ Otp Req M': 'Otp Request Success', 'Total Otp Val M': 'Otp Validation', 'Succ Otp Val M': 'Otp Validation Success' }}
        xValueTransform={(x) => {
          const splt = x.split(' ')
          const splt2 = splt[0].split('-')
          return splt2[2] + '/' + splt2[1] + '\n' + splt[1] + ':00'
        }}
      />
      <Box sx={{ justifyContent: 'center', display: 'flex' }}>
        <Box sx={{ alignItems: 'center', margin: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <Typography variant='body2'>
              "Otp Request" adalah jumlah request OTP yang masuk ke server Prismalink.
          </Typography>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            "Otp Request Success" adalah jumlah request OTP yang berhasil di proses oleh server Prismalink.
          </Typography>
          <Typography variant='body2'>
              "Otp Validation" adalah jumlah validasi OTP yang masuk ke server Prismalink.
          </Typography>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            "Otp Validation Success" adalah jumlah validasi OTP yang berhasil di proses oleh server Prismalink.
          </Typography>
        </Box>
      </Box>
      <hr />
      <Chart
        listName='cart2'
        cartTitle='Payment Success Hourly'
        columns={getColumns(history)}
        listallServiceName='getChart2'
        fields='_id,count,yvalue,xvalue'
        history={history}
        whereCondition={JSON.stringify({ chart_code: 'PAYMENT-SUCCESS' })}
        pageSize={50000}
        apiVersion={2}
        labelMap={{}}
        xValueTransform={(x) => {
          const splt = x.split(' ')
          const splt2 = splt[0].split('-')
          return splt2[2] + '/' + splt2[1] + '\n' + splt[1] + ':00'
        }}
      />
      {/* <Chart
        listName='cart2'
        cartTitle='Payment Monitoring'
        columns={getColumns(history)}
        listallServiceName={listallService}
        fields='_id,trx_code,elipse_time,process_name,transaction_id,'
        history={history}
        whereCondition={JSON.stringify({ trx_code: '02' })}
        pageSize={50000}
      /> */}
    </>
  )
}

export default Comp
