import React from 'react'
// import QrReader from 'react-qr-scanner'
import { QrReader } from 'react-qr-reader';

import { Button, Grid, Typography } from '@mui/material'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { makeStyles } from '@material-ui/styles';
import { useTheme, useMediaQuery } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';

const useStyles = (theme) => makeStyles({
    paper: {
      position: 'absolute',
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
const ModalqrisComp = (props) => {
    const {doPayQris,setOpenQrModal,setCloseQrModal,isOpenQr} = props
    const [isLoading,setIsLoading] = React.useState(false)
    const theme = useTheme()
    const classes = useStyles(theme)

    const [device,setDevice] = React.useState({});
    const [devices,setDevices] = React.useState([]);
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const handleChangeDevice = (event) => {
      const cam = devices[event.target.value]
      setDevice(cam);
    };
    
    
    const handleClose = () =>{
      setCloseQrModal()
    }
    const handleOpen = () =>{
      setOpenQrModal()
    }
    const previewStyle = {
      height: '100%',
      width: '100%',
    }

    React.useEffect(()=>{
      // if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
      //   console.log('loaded 1')
      //   navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack);
      // }

      // if (!navigator.enumerateDevices && navigator.enumerateDevices) {
      //   console.log('loaded 2')
      //     navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
      // }

      // if (!navigator.enumerateDevices) {
      //     console.log('loaded 3')
      //     return;
      // }
      navigator.mediaDevices.enumerateDevices().then(devices=>{
        const cameras = devices.filter(r=>r.kind === 'videoinput')
        return cameras
      }).then(cameras=>{
        setDevices(cameras)
        setDevice(cameras[0])
      })

      
    },[])

    return (
      <>
        <Button variant='outlined' onClick={handleOpen}  startIcon={<QrCodeScannerIcon/>} >Scan</Button>
        <Dialog onClose={handleClose} open={isOpenQr}>
          {/* <QrReader
            delay={3000}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
            facingmode={'rear'}
            showViewFinder={true}
            choosedeviceid={device.deviceId}
          /> */}
          <QrReader
            onResult={(result, error) => {
                if(result != null || result !=  undefined){
                    doPayQris({qrisData:result.text})
                }
                // console.error(error)
            }}
            style={{ width: '100%',height:'100%'}}
            scanDelay={900}
            constraints={{ facingMode: 'environment' }}
            containerStyle={{width:'70vh',height:'70vh'}}
            videoStyle={{width:'fit-content'}}
          />
          <DialogActions>
              <Grid container>
                  <Grid item xs={6}>
                  {/* {devices.length > 0 && 
                      <FormControl fullWidth size='small'>
                          <InputLabel id="demo-simple-select-label">Select Camera Device</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={device.deviceId}
                            label="Select Camera Device"
                            onChange={handleChangeDevice}
                          >
                              {devices.map((r,i)=><MenuItem key={i} value={r.deviceId}>{r.label}</MenuItem>)}
                          </Select>
                      </FormControl>} */}
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                      <Button autoFocus onClick={handleClose}>Tutup</Button>
                  </Grid>
              </Grid>
          </DialogActions>
        </Dialog>
      </>
    )
}

export default ModalqrisComp