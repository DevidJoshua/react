import React from 'react'
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import { DialogContent, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTheme, useMediaQuery } from '@mui/material'


const useStyles = (theme) => makeStyles({
   overlayContent:{
       flexDirection:'row',
       padding:'2rem',
       background: theme.palette.info.main
   }
})
export default function OverlayOnPaying(props) {
    const {open} = props
    const theme = useTheme()
    const classes = useStyles(theme)
    const [counter,setCounter] = React.useState(0)
    const [dots,setDots] = React.useState([])
    
    React.useEffect(()=>{
        setTimeout(()=>{
            if(counter > 3){    
                setDots([])
                setCounter(0)
            }else{
                setDots([...dots,'.'])
                setCounter(counter+1)
            } 
        },500)
    },[counter])
    return (
        <Dialog open={open}>
            <DialogContent className={classes.overlayContent}>
                <Grid>
                    <Typography variant='h6'>Memproses Pembayaran{dots.join('')}</Typography>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}
