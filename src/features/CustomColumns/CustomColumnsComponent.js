import React from 'react'
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { useTheme, useMediaQuery } from '@mui/material'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import Tooltip from '@mui/material/Tooltip'
import DialogActions from '@mui/material/DialogActions'
import CancelIcon from '@mui/icons-material/Cancel'
import Alert from '@mui/material/Alert'
import _ from 'lodash'

const useStyles = (theme) => makeStyles({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: 'fit-content',
    minWidth: '100vw',
    overflow: 'scroll'
  },
  modContent: {
    width: 'fit-content'
  },
  buttonAdd: {
    marginTop: '2rem',
    marginLeft: '2rem'
  }

})

export default function CustomColumnsComponent (props) {
  const { columns, onSubmit, toogleCustColDialog, isOpen, tableId, removeColumns, reduxCustomColumns } = props
  const [columnsData, setColumnsData] = React.useState([])
  const [message, setMessage] = React.useState('')
  const theme = useTheme()
  const classes = useStyles(theme)()
  const handleClose = () => {
    toogleCustColDialog({ isOpen: false, tableId })
  }

  React.useEffect(() => {
    setColumnsData(reduxCustomColumns)
  }, [reduxCustomColumns])

  React.useEffect(() => {
    const isUnique = (arr) => arr.some((val, i) => arr.indexOf(val) !== i)
    if (isUnique(columnsData)) setMessage('Tidak boleh ada kolom yang sama. Kolom yang sama akan digabungkan')
    else setMessage('')
  }, [columnsData])

  const uniquefyColumns = (arr) => {
    return _.uniq(arr, r => JSON.stringify(r))
  }

  const handleOpen = () => {
    toogleCustColDialog({ isOpen: true, tableId })
  }

  const handleReset = () => {
    setColumnsData([])
    removeColumns({ tableId })
  }

  const handleSubmit = () => {
    setColumnsData(uniquefyColumns(columnsData))
    const finalData = (_.remove(columnsData, null)).map(r => columns.find(data => data.headerKey === r))
    onSubmit(uniquefyColumns(finalData))
  }

  const handleRemoveColumn = (id) => {
    const col = columnsData
    col.splice(id, 1)
    setColumnsData([...uniquefyColumns(col)])
  }

  const handleOnchangeColumn = (e, index) => {
    const dat = columnsData
    dat[index] = e.target.value
    setColumnsData([...dat])
  }

  const handleAddColumn = () => {
    const col = columnsData
    columnsData.push(null)
    setColumnsData([...columnsData])
  }
  return (
    <>
      <Button size='small' onClick={handleOpen} variant='outlined' endIcon={<SettingsInputCompositeIcon />}>Sesuaikan Kolom</Button>

      <Dialog open={isOpen} maxWidth='md' fullWidth>
        <DialogTitle>Atur Kolom</DialogTitle>
        <DialogContent>
          <div className='card-body overflow-scroll'>
            {columnsData.length > 0
              ? (
                <Stack direction='column' spacing={2}>
                  {/* loop input */}
                  {columnsData.map((s, j) => <Stack direction='row' key={j} spacing={2}>
                    <Avatar key={j + 3}>{j + 1}</Avatar>
                    <select key={j + 4} className='form-control' style={{ width: '100%' }} aria-hidden={s} onChange={e => handleOnchangeColumn(e, j)} value={s}>
                      {/* loop options */}
                      <option key='genesis' value={null}>Pilih Kolom</option>
                      {columns.map((r, i) => <option key={i} value={r.headerKey}>{_.isEmpty(r.Header) ? r.alias : r.Header}</option>)}
                    </select>
                    <IconButton key={j + 5} aria-label='Delete Column' onClick={() => handleRemoveColumn(j)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                  )}
                  {message != '' && <Alert severity='warning'>{message}</Alert>}
                  <Button fullWidth startIcon={<AddIcon />} onClick={() => handleAddColumn()}>Tambah Kolom</Button>
                </Stack>
              )
              : (
                <div className='form-group mb-3'>
                  <Button className={classes.buttonAdd} startIcon={<AddIcon />} onClick={handleAddColumn}>Tambah Kolom</Button>
                </div>
              )}
          </div>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={handleSubmit} endIcon={<SaveIcon />} loadingPosition='end' variant='contained' disabled={!(columnsData.length > 0)}>Simpan</LoadingButton>
          <LoadingButton onClick={handleReset} endIcon={<RestartAltIcon />} loadingPosition='end' color='secondary' variant='contained' disabled={!(columnsData.length > 0)}>Atur Ulang</LoadingButton>
          <Button onClick={handleClose} endIcon={<CancelIcon />} color='error' variant='outlined'>Tutup</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
