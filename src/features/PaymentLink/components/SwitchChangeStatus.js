import React from 'react'
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';

export default function SwitchChangeStatus(props) {
    const {isRequesting,idPaymentlink,changePaymentlinkStatus,serviceName,reload,status} = props
    return (
        <div>
            {isRequesting 
                ? <CircularProgress /> 
                : (
                    <Tooltip title={status===1 ? 'Non-Aktifkan Paymentlink' : 'Aktifkan Paymentlink'}>
                        <Switch label="aktif"  checked={status == 1 ? true : false } onChange={e=>changePaymentlinkStatus({serviceName,idPaymentlink,paymentlinkStatus:e.target.checked ? 1 : 0,reload})} />  
                    </Tooltip>
                )
            }
        </div>
    )
}
