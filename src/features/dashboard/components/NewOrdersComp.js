import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { toIdr } from '../../../core/Utils/Utils'

function Comp ({ count }) {
  return (
    <Card>
      <Box sx={{ backgroundColor: 'primary.dark', '&:hover': { backgroundColor: 'primary.main', opacity: [0.9, 0.8, 0.7] } }}>
        <CardContent>
          <Typography component='div' variant='h5' color='#fff'>
            {toIdr(count || 0)}
          </Typography>
          <Typography variant='subtitle1' color='#fff' component='div'>
            Total Transaction Amount
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

export default Comp
