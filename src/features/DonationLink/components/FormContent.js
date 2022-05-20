import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material'
import TextField from '@mui/material/TextField'
import { green } from '@mui/material/colors'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import moment from 'moment'


const useStyles = (theme) => makeStyles({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
      width: '100%'
    }
  },
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  buttonSuccess: {
    width: '100%',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  }
})

const FormData = (props) => {
  const { onSubmitForm, loadingSubmitForm,handleClose } = props
  const theme = useTheme()
  const classes = useStyles(theme)()
  const [values, setValues] = React.useState({
    isExpired:false
  })
  const [success] = React.useState(true)
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  })

  const handleChange = (prop) => (event, value) => {
    setValues({ ...values, [prop]: value || event.target.value || event.target.checked })
  }
  const handleSubmit = (e) => {
    onSubmitForm(values)
  }

  console.warn("form values=====>",values)
  return (
    <>
        <div className="card-body col-md-12 overflow-scroll">
            <div className="row">
              <div className="col-md-6">
                  <div className="form-group">
                      <TextField
                          id='outlined-basic'
                          label='Link donasi'
                          variant='outlined'
                          helperText='Adalah identifikasi untuk url donationlink. Contoh: bantu-alo, bantuan-bencana-alam'
                          type="text"
                      />
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="form-group">
                    <label>Tanggal Kadaluarsa</label> &nbsp;&nbsp;
                    <FormControlLabel control={<Switch />} onChange={handleChange('isExpired')} label={values.isExpired ? 'Gunakan Tanggal Kadaluarsa' : 'Tanpa Tanggal Kadaluarsa'} />
                  </div>
                  <div className="form-group">
                    {(values.isExpired && 
                      <TextField
                        id="datetime-local"
                        label="Atur Tanggal Kadaluarsa"
                        type="datetime-local"
                        format="dd/MM/yyyy h:mm:ss"
                        defaultValue={moment()}
                        onChange={handleChange('expireDate')}
                        sx={{ width: 250 }}
                        InputLabelProps={{
                          shrink: true,
                        }} 
                      />
                    )}
                  </div>
              </div>
              <TextField
                id="filled-multiline-flexible"
                label="Deskripsi"
                multiline
                helperText="Adalah deskripsi yang untuk link donasi anda."
                maxRows={10}
                fullWidth={true}
                onChange={handleChange('caption')}
                variant="filled"
              />
            </div>
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained" disabled={loadingSubmitForm}>Batal</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" autoFocus disabled={loadingSubmitForm}>{loadingSubmitForm ? 'Menyimpan ..' : 'Simpan'}</Button>
        </DialogActions>
    </>
  )
}


export default FormData
