import { makeStyles } from "@mui/styles"
import { blue } from "@mui/material/colors"
import {grey} from "@mui/material/colors"

export const useStyles = makeStyles((theme)=>({
    root: {
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width:'100%',
        display:'flex',
        alignItems: "center",
        justifyContent: "center"
    },
    boxLogin:{
        display:'flex',
        flexDirection:'column',
        boxSizing:'content-box'
    },
    loginWrapper:{
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
    pageTitle:{
        fontWeight:800,
        color:blue[900]
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
    submitLogin:{
        borderRadius:'3rem'
    },
    loginLink:{
        textDecoration:'none',
        color:grey[700]  
    },
    loginLinkClick:{
        textDecoration:'none',
        color:theme.palette.primary.main
    }
}))