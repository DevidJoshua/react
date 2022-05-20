import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

function Comp ({ count }) {
  return (
    <Card>
      <Box sx={{ backgroundColor: '#fd7e14', '&:hover': { backgroundColor: '#fd7e14', opacity: [0.9, 0.8, 0.7] } }}>
        <CardContent>
          <Typography component='div' variant='h5' color='#fff'>
            {count || 0}
          </Typography>
          <Typography variant='subtitle1' color='#fff' component='div'>
            Payment Inprocess
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

export default Comp
