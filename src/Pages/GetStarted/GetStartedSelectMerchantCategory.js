import React from 'react'
import { Paper,Grid,Card,Box,Radio,RadioGroup,CardActions,CardContent,Button,Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

import ApartmentIcon from '@mui/icons-material/Apartment';
import StoreIcon from '@mui/icons-material/Store';
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { blue } from '@mui/material/colors';
import { connect } from 'react-redux';
import Actions from '../../features/GetStarted/redux'
import _ from 'lodash'
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    upRoot:{
        display:'block',
        textAlign:'center'
    },
    root:{
        display:'flex',
        justifyContent:'center',
        marginTop:'2rem'
    },
    itemWrapper:{
        
    },
    card:{
        display:'flex',
        flexDirection:'column',
        borderRadius: '1rem',
        padding:'1rem',
        margin:'1rem',
        borderColor:'#fff',
        borderWidth:'3px',
        borderStyle:'solid',
       '&:hover': {
            borderColor:theme.palette.primary.main,
            borderWidth:'3px',
            borderStyle:'solid',
            cursor:'pointer'
        },
    },
    radioGroup:{
        display:'flex',
        flexDirection:'row'
    },
    cardContent:{ 
        display: 'flex',
        width:'10rem',
        flexDirection:'column',
        alignItems: 'left'
    },
    cardWrapper:{
        display:'flex',
    },
    cardIcon:{
        fontSize:'10rem'
    },
    rb:{
        background:'none'
    }
}))


function GetStartedSelectMerchantCategory(props) {
    const classes = useStyles()
    const { submitMerchantCategory,merchantId,mercCategory,loading,reloadStep,skeleton } = props
    const [merchantCategory,setMerchantCategory] = React.useState(mercCategory || null)
    const merchantCategories =[
        { value:'individual',label:'Individual',desc:'Bisnis yang dimiliki oleh Individu dan belum berbadan hukum.  Metode pembayaran yang dapat diaktifkan adalah Virtual Account, QRIS, PayLater & OVO.',icon:<StoreIcon style={{ fontSize:'10rem' }}/> },
        { value:'perusahaan',label:'Perusahaan',desc:'Bisnis yang dimiliki oleh perusahaan (sudah berbadan hukum) seperti perusahaan, CV, Yayasan, Asosiasi dan lainnya. Dapat mengaktifkan seluruh metode pembayaran.',icon:<ApartmentIcon style={{ fontSize:'10rem' }}/> }
    ]
    const handleClick = () =>{
        if(!_.isNil(mercCategory)){
            Swal.fire({
                title: 'Konfirmasi',
                text: "Merubah kategori dapat menghapus perubahaan sebelumnya",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya!'
            }).then((result) => {
                submitMerchantCategory({merchantCategory,merchantId,reloadStep })    
            })
        }
        else{
            submitMerchantCategory({merchantCategory,merchantId,reloadStep })
        }  
    }

    return (
        !loading
        ? <Grid className={classes.upRoot}>
            <Typography variant='h4' align='center'>Select Merchant Category</Typography>
            <Grid className={classes.root}>
                {merchantCategories.map(r=>{
                    return(
                        <Card style={r.value === merchantCategory ? { borderColor:blue[600], borderWidth:'3px', borderStyle:'solid', cursor:'pointer' } : null} className={classes.card} elevation={4} onClick={()=>setMerchantCategory(r.value)}>
                            <Box className={classes.cardWrapper}>
                                <Box className={classes.cardContent}>
                                    <Typography gutterBottom variant="h4">{r.label}</Typography>
                                    <Typography variant='body2' textAlign='left' color='text.secondary'>{r.desc}</Typography>
                                </Box>
                                <Box>{r.icon}</Box>
                            </Box>
                            <Radio disabled={loading} disableRipple checked={r.value === merchantCategory } className={classes.rb} />
                        </Card>
                    )
                })}
            </Grid>
            <br/>
            <Grid container  justifyContent={'center'} >
                { _.isNil(merchantCategory)
                    ? <></> 
                    : <Alert variant="outlined" severity="warning"> Mengganti kategori merchant akan menghapus data yang anda sudah input sebelumnnya </Alert>
                }
            </Grid>
            <br/>
            <LoadingButton disabled={merchantCategory === null || merchantCategory === mercCategory} loading={loading} variant="contained" size='large' onClick={handleClick}>Simpan</LoadingButton>
        </Grid>
        : skeleton
    )
}

export default connect((state, ownProps) => ({
    loading:state.getstarted.stepTabLoading.fetchKycProgress,
    mercCategory:state.getstarted.merchantCategory,
    merchantId: state.myprofile.merchant.id,
}), dispatch => ({
      submitMerchantCategory:data=>dispatch(Actions.setMerchantCategory(data)),
  }))(GetStartedSelectMerchantCategory)
