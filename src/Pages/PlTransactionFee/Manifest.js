import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import AppConfig from '../../core/Config/AppConfig'
import { toIdr, toDateTime, sanitizeValue } from '../../core/Utils/Utils'
import localBankData from '../../data/localBankCode.json'
const basePath = AppConfig.basePath

const serviceEntity = 'PlTransactionFee'

export const redirectAfterCreate = '/report/transaction-fee-detail'
export const redirectAfterDelete = '/report/all-fee-transaction'
export const detailPageUrl = (id) => (`/report/transaction-fee-detail/${id}`)
export const listallPageUrl = () => ('/report/all-transaction')
export const listallPageTitle = 'Transaction Fee'
export const detailPageTitle = 'Transaction Fee Detail'

export const detailService = 'getDetail' + serviceEntity
export const listallService = 'getAllTransactionfee'

export const fields = ' id, plinkRefNo, merchantRefNo, transactionAmount, settled, paymentMethod,partnerCode, merchantCode, pymtMethodNm, pymtMethodCd, mdrAmount, mdrType, pphAmount, ppnAmount, createdAt, updatedAt, paymentDate, transactionDate, vaNumber'
const localBankCode = Object.assign({}, ...localBankData.map(({ code, name }) => ({ [code]: name.replace(/BANK /, '') })))
const stat = [
  { status: 'Y', text: 'Ya', class: 'btn-success btn-sm' },
  { status: 'N', text: 'Tidak', class: 'btn-default btn-sm' }
]

const isSettledData = status => {
  const found = stat.find(r => r.status === status)
  return found.class ? found : { status: 'N', text: 'Unknown', class: 'btn-default btn-sm' }
}

const calcSettledAmount = (trxAmount, mdr, ppn, pph) => {
  return parseInt(trxAmount) - parseInt(mdr) - parseInt(ppn) + parseInt(pph)
}

const methodName = (methodCode, bankCode) => {
  switch (methodCode) {
    case 'CC':
      return `${methodCode} ${localBankCode[bankCode]}`
      break
    case 'DD':
      return `${methodCode} ${localBankCode[bankCode]}`
      break 
    case 'VA':
      return `${methodCode} ${localBankCode[bankCode]}`
      break 
    case 'QR':
      return 'QRIS'
      break 
    case 'PL':
      return 'Paylater'
      break
    default:
      return methodCode
      break
  }
}

export const getColumns = (history) => [
  // {
  //   Header: '',
  //   accessor: 'id',
  //   Cell: p => (
  //     <div className='btn-group'>
  //       <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
  //         <span className='sr-only'>Toggle Dropdown</span>
  //       </button>
  //       <div className='dropdown-menu' role='menu'>
  //         <Link className='dropdown-item' to={`${basePath}${redirectAfterCreate}/${p.cell.value}`}>Detail</Link>
  //       </div>
  //     </div>)
  // },
  { Header: 'Transaction Date', accessor: p => sanitizeValue(p.transactionDate) },
  { Header: 'Plink Ref No', accessor: p => sanitizeValue(p.plinkRefNo) },
  { Header: 'Merchant Ref No', accessor: p => sanitizeValue(p.merchantRefNo) },
  { Header: 'VA Number', accessor: p => sanitizeValue(p.vaNumber) },
  { Header: 'Method', accessor: p => sanitizeValue(methodName(p.pymtMethodCd, p.partnerCode)) },
  { Header: 'Amount', accessor: p => sanitizeValue(toIdr(p.transactionAmount)) },
  { Header: 'MDR', accessor: p => sanitizeValue(toIdr(p.mdrAmount)) },
  { Header: 'PPN', accessor: p => sanitizeValue(toIdr(p.ppnAmount)) },
  { Header: 'PPH', accessor: p => sanitizeValue(toIdr(p.pphAmount)) },
  { Header: 'Settled Amount', accessor: p => sanitizeValue(toIdr(calcSettledAmount(p.transactionAmount, p.mdrAmount, p.ppnAmount, p.pphAmount))) }

  // { Header: 'MDR Type', accessor: p=>sanitizeValue(p.mdrType)},
  // { Header: 'Partner Code', accessor: p=>sanitizeValue(p.partnerCode)},
  // { Header: 'Is Settled', accessor: p=><span className={isSettledData(p.isSettled).class}><strong>{sanitizeValue(isSettledData(p.isSettled).text)}</strong></span>}
]

export const exportDataOptions = {
  serviceName: listallService,
  fileTableHeader: [
    'Id',
    'Eksternal Id',
    'Merchant Ref No',
    'Plink Ref No',
    'Bank Ref No',
    'Payment Method',
    'Amount',
    'Created Date',
    'Payment Date',
    'Status'],
  fileName: 'Transaction Report',
  fileTitle: 'Transaction Report',
  reshapeData: (data) => {
    return data.map(r => {
      return {
        Id: sanitizeValue(r.invoiceNumber, 'excel'),
        externalId: sanitizeValue(r.externalId, 'excel'),
        mercRefNo: sanitizeValue(r.mercRefNo, 'excel'),
        ecommRefNo: sanitizeValue(r.ecommRefNo, 'excel'),
        payBnkRefNo: sanitizeValue(r.payBnkRefNo, 'excel'),
        pymtMethodCd: sanitizeValue(r.pymtMethodCd),
        trxAmt: r.trxAmt,
        trxCreationDt: toDateTime(r.trxCreationDt),
        payDt: toDateTime(r.payDt),
        paySts: sanitizeValue(r.paySts)
      }
    })
  }
}

export default {
  redirectAfterCreate,
  redirectAfterDelete,
  detailPageUrl,
  listallPageTitle,
  detailPageTitle,
  detailService,
  listallService,
  fields,
  getColumns,
  listallPageUrl
}
