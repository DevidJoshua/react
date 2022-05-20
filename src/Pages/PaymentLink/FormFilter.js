import React from 'react';
import { Filter } from '../../core/features/TablePagination'
import paymentMethod  from '../../data/paymentMethod.json'
export default function FormFilter(props) {
    const {serviceName} = props
    
    return  <Filter
                    serviceName={serviceName}
                    child={(tablepaginationOnChangeFilter, filter = {}) => (
                        <div className='row mt-3'>
                            <div className='ml-3 form-group'>
                                <select
                                className='custom-select'
                                id='pymtMethodCd'
                                onChange={(e) => {
                                    tablepaginationOnChangeFilter({
                                    serviceName: serviceName,
                                    fieldName: 'pymtMethodCd',
                                    fieldValue: e.target.value
                                    })
                                }}
                                >
                                    <option value='' >All Payment Method</option>
                                    {paymentMethod.map(r=><option value={r.value}>{r.label}</option>)}
                                </select>
                            </div>
                            <div className='ml-3 form-group'>
                                <select
                                    className='custom-select'
                                    id='status'
                                    onChange={(e) => {
                                    tablepaginationOnChangeFilter({
                                        serviceName: serviceName,
                                        fieldName: 'status',
                                        fieldValue: e.target.value
                                    })
                                    }}
                                >
                                    <option value=''>Payment Status</option>
                                    <option value='SETLD'>Settled</option>
                                    <option value='PNDNG'>Pending</option>
                                    <option value='CANCL'>Cancel</option>
                                    <option value='REJEC'>Reject</option>
                                </select>
                            </div>
                            <div className='ml-3 form-group'>
                                <input
                                id='merchant_ref_no'
                                type='text'
                                className='form-control'
                                placeholder='Search by Id'
                                onChange={(e) => {
                                    tablepaginationOnChangeFilter({
                                    serviceName: serviceName,
                                    fieldName: 'invoiceNumber',
                                    fieldValue: e.target.value
                                    })
                                }}
                                />
                            </div>
                        </div>
                        )} 
                />;
}
