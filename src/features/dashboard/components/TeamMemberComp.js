import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

function Comp ({ teamMember }) {
  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Team Members
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {teamMember &&
                teamMember.map((user, i) => (
                  <Grid item xs={2} sm={3} md={3} key={i}>
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant='subtitle1' component='div'>
                          {user.full_name}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {user.email}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default Comp
