import { makeStyles } from "@mui/styles"
import { blue } from "@mui/material/colors"
import {grey} from "@mui/material/colors"
import { width } from "@mui/system"

export const useStyles = makeStyles((theme)=>({
    root: {
        height: "100vh",
        width:'100%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column'
    },
    boxRegister:{
        display:'flex',
        flexDirection:'column',
        boxSizing:'content-box',
        justifyContent:'center',
        width:'100%',
        [theme.breakpoints.down('xs')]: {
            maxWidth:'90%'
        },
        [theme.breakpoints.down('md')]: {
            maxWidth:'90%'
        },
        [theme.breakpoints.up('md')]: {
            maxWidth:'40%'
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth:'30%'
        },
    },
    signupWrapper:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    },
    pageTitle:{
        fontWeight:800,
        color:theme.palette.primary.main
    },
    input:{
        ['>:not(style)']:{
            margin:0
        },
        [`& fieldset`]: {
            borderRadius: '3rem',
        },
        [`input`]:{
            margin:0,
            [`&: -webkit-autofill`]:{
                '-webkit-transition-delay': '9999999s',
                background:'#fff'
            }
        },
    },
    submitSignup:{
        borderRadius:'3rem'
    },
    signupLink:{
        textDecoration:'none',
        color:grey[700]  
    }
}))