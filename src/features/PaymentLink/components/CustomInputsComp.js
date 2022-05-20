import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add'
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core/styles'



const useStyles = makeStyles((theme) => ({
    wrapper:{
        display:'flex',
        marginTop:'1rem',
        marginBottom:'1rem',
        flexDirection:'column'
    },
    itemWrapper:{
        marginTop:'1rem',
        marginBottom:'1rem',
    }
}))

export default function CustomInputsComp() {
    const [customInputs,setCustomInputs] = React.useState({})
    const classes = useStyles()
    const inputs = [
        {
            defaultValue:'',
            id:'',
            label:'',
            items:[{}]}
    ]
    const inputItem = (props) =>{
        const {defaultValue,inputName,inputType,items,key} = props       
        return (
            <Box spacing={2}>
                <TextField
                    id='outlined-basic'
                    label='ID Eksternal'
                    variant='outlined'
                    multiline
                    className="form-control"
                    size='small'
                />
               <select key={key} className="form-control" style={{width: '100%'}}>
                    {/* loop options */}
                    {items.map((r,i)=><option key={i} value={r.value} >{r.label}</option>)}
                </select>
            </Box>
        )
    }
    return (
        <Box className={classes.wrapper}>
            <Stack direction="column" justifyContent="center" spacing={2}>
                {inputs.map(r=><inputItem items />)}
                <Button fullWidth startIcon={<AddIcon/>}>Add Input</Button>
            </Stack>
        </Box>
    )
}






