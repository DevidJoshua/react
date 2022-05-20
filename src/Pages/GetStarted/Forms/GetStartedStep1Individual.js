import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MerchantKeyActions from 'features/merchantKey/redux'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import { useHistory } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import { Paper } from '@mui/material'

import MerchantCategoryIcon from './MerchantCategoryIcon'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}))

function Comp (props) {
  const { pageTitle,getStartedMerchantCategory,loadingUpdateCurrentCallbackUrl, isReloading, tablePaginationSetReload, merchantkeyUpdateCurrentCallbackUrl, keyId, backendCallbackUrl, frontendCallbackUrl, merchantId, merchantCode, merchantkeyFetchCurrentMerchantKey } = props
  const [expanded, setExpanded] = React.useState('panel1')
  var history = useHistory()
  console.log("merch=======>",pageTitle)
  
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  return (
    <Paper elevation={4} style={{padding:'2rem'}}>
      <Typography variant='h6' style={{marginBottom:'2rem'}} color='textSecondary'>
          {pageTitle} <MerchantCategoryIcon merchantCategory={getStartedMerchantCategory}/> 
      </Typography>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography>Prismalink Payment Products</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link
            target='_blank'
            rel='noopener'
            href='https://merchant.plink.co.id/produk/'
          >
                Payment Method
          </Link>
          <Typography variant='subtitle2' gutterBottom component='div'>
                Virtual Account
          </Typography>
          <Typography variant='subtitle2' gutterBottom component='div'>
                Credit Card Payment
          </Typography>
          <Typography variant='subtitle2' gutterBottom component='div'>
                Debit Instan
          </Typography>
          <Typography variant='subtitle2' gutterBottom component='div'>
                Retail Booth
          </Typography>
          <Typography variant='subtitle2' gutterBottom component='div'>
                QRIS
          </Typography>
          <br />
          <Typography variant='body2'>
                Metode pembayaran yang langsung dapat digunakan pada saat aktivasi adalah:
          </Typography>
          <Typography variant='subtitle2' gutterBottom component='div'>
                Virtual Account
          </Typography>
          <Chip icon={<CheckCircleIcon />} label='Mandiri' />
          <Chip icon={<CheckCircleIcon />} label='BRI' />
          <Chip icon={<CheckCircleIcon />} label='BNI' />
          <Chip icon={<CheckCircleIcon />} label='Permata' />
          <Chip icon={<CheckCircleIcon />} label='Danamon' />
          <Chip icon={<CheckCircleIcon />} label='Maybank' />
          <Chip icon={<CheckCircleIcon />} label='CIMB Niaga' />
          <Chip icon={<CheckCircleIcon />} label='OCBC NISP' />

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
          <Typography>Membuat Transaksi Pembayaran </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body2'>Anda dapat membuat pembayaran melalui "Payment Link":</Typography>
          <Link
            component='button'
            onClick={() => history.push('/link-payment')}
          >
                Create Payment Link
          </Link>
          <br />
          <Typography variant='body2'>Anda dapat membuat pembayaran melalui API:</Typography>
          <Link
            target='_blank'
            rel='noopener'
            href='https://docs.google.com/document/d/1_GTgzzzeFEEl2eiTHSLE4xNE6OAn63b1gTQmvYa7qVE/edit?usp=sharing'
          >
                Document Spesifikasi API
          </Link>
          <br />
          <Typography variant='body2'>Anda dapat membuat pembayaran melalui Plugin CMS:</Typography>
          <Link
            target='_blank'
            rel='noopener'
            href='https://www.support.prismalink.co.id/plugin-prismalink'
          >
                Plugin CMS
          </Link>
        </AccordionDetails>
      </Accordion>
    </Paper>
  )
}
export default connect((state, ownProps) => ({
  merchantId: state.myprofile.merchant.id,
  merchantCode: state.myprofile.merchant.merchant_code,
  backendCallbackUrl: state.myprofile.integration_params.backend_callback_url,
  frontendCallbackUrl: state.myprofile.integration_params.frontend_callback_url,
  keyId: state.myprofile.integration_params.key_id,
  loadingUpdateCurrentCallbackUrl: state.merchantkey.loadingUpdateCurrentCallbackUrl,
  isReloading: state.tablepagination.reloadDetail.settingsDevelopment
}), dispatch => ({
  merchantkeyFetchCurrentMerchantKey: data => dispatch(MerchantKeyActions.merchantkeyFetchCurrentMerchantKey(data)),
  merchantkeyUpdateCurrentCallbackUrl: data => dispatch(MerchantKeyActions.merchantkeyUpdateCurrentCallbackUrl(data))
}))(Comp)
