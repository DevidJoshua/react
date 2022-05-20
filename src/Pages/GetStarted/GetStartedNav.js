import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { Typography } from '@mui/material'
import Skeleton from '@mui/material/Skeleton';
import kycVerificationList from '../../data/kycVerifications.json'
import Alert from '@material-ui/lab/Alert'
import { AlertTitle } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { borderRadius } from '@mui/system'
import _ from 'lodash'
const useStyles = makeStyles((theme) => ({
    alertItem:{
        marginTop:'0.5rem',
        padding:'0.5rem',
        background:props=>{
            return props.isComplete ? theme.palette.success.main : theme.palette.warning.main
        },
        boxShadow:2,
        color:'#fff',
        borderRadius:'0.5rem'
    }
}))
  
export default function GetStartedNav(props) {
    const {pageTitle,setStep,step,stepTabLoading,kycProgress,loading,getStartedMerchantCategory} = props
    const subTitleItem = (text) => ( <Typography variant='h7' style={{opacity:0.8}} color='textSecondary'>{text}</Typography>)    
    const ItemSkeleton = (<Skeleton> <ListItem button id='submenu1' > <ListItemText primary='Skeleton Title For' secondary={subTitleItem('Sub-Skeleton')}/> </ListItem> </Skeleton>)

    let isComplete =((kycProgress.totalStep2|| []).length) % ((kycProgress.step2 || []).length)  == 0 && 
                    ((kycProgress.totalStep3|| []).length) % ((kycProgress.step3 || []).length)  == 0 && 
                    ((kycProgress.totalStep4|| []).length) % ((kycProgress.step4 || []).length)  == 0 && 
                    ((kycProgress.totalStep5|| []).length) % ((kycProgress.step5 || []).length)  == 0 && 
                    ((kycProgress.totalStep6|| []).length) % ((kycProgress.step6 || []).length)  == 0

    const classes = useStyles({isComplete})

    const generateNavStep = () =>{

        const externalNavStep = [
            {step:2,primaryText:pageTitle()['step2'][getStartedMerchantCategory]['nav']},
            {step:3,primaryText:pageTitle()['step3'][getStartedMerchantCategory]['nav']},
            {step:4,primaryText:pageTitle()['step4'][getStartedMerchantCategory]['nav']},
            {step:5,primaryText:pageTitle()['step5'][getStartedMerchantCategory]['nav']},
            {step:6,primaryText:pageTitle()['step6'][getStartedMerchantCategory]['nav']}
        ]
        
        console.log('kycProgress========>',isComplete,"====>",isComplete? 'Terimakasih sudah melengkapi data-data yang dibutuhkan untuk proses selanjutnya. Petugas kami akan melakukan verifikasi data dan akan mengirim email status approval' : 'Mohon diperiksa kelengkapan dokumen anda' )

        return(
            <>
                {externalNavStep.map(r=>{
                    return <>
                                <Divider />
                                {!stepTabLoading[`step${r.step}`]
                                    ?   (<ListItem key={r.step} button id={`submenu${r.step}`} onClick={() => setStep(r.step)} selected={step === r.step} >
                                            <ListItemText primary={r.primaryText} secondary={subTitleItem(`${(kycProgress[`step${r.step}`] || []).length} / ${(kycProgress[`totalStep${r.step}`]||[]).length}`)} />
                                        </ListItem>)
                                    : ItemSkeleton
                                }   
                            </>
                })}
            </>
        )
    }
    return (
        loading
        ?
            ItemSkeleton
        : (<>
            <List component='nav' aria-label='Device settings' sx={{ bgcolor: 'background.paper' }} >
                <ListItem key={22} button id='submenu1' onClick={() => setStep(1)} selected={step === 1} >
                    <ListItemText primary='Explore Prismalink' />
                </ListItem>
                <Divider/>
                {!stepTabLoading.step1 
                    ?   (<ListItem key={0} button id='submenu0' onClick={() => setStep(0)} selected={step === 0} >
                            <ListItemText primary='Setup Merchant Category'  />
                        </ListItem>)
                    : ItemSkeleton
                }
                <Divider/>
                {generateNavStep()}
                <ListItem key={44} className={classes.alertItem} id='submenu5'>
                    <ListItemText primary={isComplete ? 'Terimakasih sudah melengkapi data-data yang dibutuhkan untuk proses selanjutnya. Petugas kami akan melakukan verifikasi data dan akan mengirim email status approval' : 'Mohon diperiksa kelengkapan dokumen anda' } />
                </ListItem>
                
            </List>
        </>)
    )
}
