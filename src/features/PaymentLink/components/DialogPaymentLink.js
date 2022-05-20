import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle';
import FormContent from './FormContent'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import {connect} from 'react-redux'

const PaymentlinkDialog = (props)=>{
    return(
        <>
            <Button></Button>
        </>
    )
}
const PaymentlinkDialogCon = () =>{

    const mapStateToProps = (state, ownProps) => {
        return {
        fileArray
        }
    }
  
    const mapDispatchToProps = dispatch => {
        return {
        tablepaginationDeleteData: data => dispatch(TablepaginationActions.tablepaginationDeleteData(data))
        }
    }
  
    return connect(mapStateToProps,mapDispatchToProps)(PaymentlinkDialog)
}
export default withMobileDialog()(PaymentlinkDialog)

