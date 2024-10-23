// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports\
import BorderColor from 'mdi-material-ui/BorderColor'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardBodyEvent = ({ events }) => {
  return (
    <Card>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={7}>
          <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
            <Typography variant='h6' sx={{ marginBottom: 1 }}>
              About
            </Typography>
            <Typography
              variant='body2'
              dangerouslySetInnerHTML={{ __html: events.about }}
              sx={{ marginBottom: 3.5 }}
            ></Typography>
            <Typography variant='h6' sx={{ marginBottom: 1 }}>
              Terms And Conditions
            </Typography>
            <Typography variant='body2' dangerouslySetInnerHTML={{ __html: events.TermsConditions }}></Typography>
            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Grid container spacing={12}>
              <Grid item xs={12} sm={12}>
                <StyledBox>
                  <Typography variant='h6' sx={{ marginBottom: 2 }}>
                    For More inquiries
                  </Typography>
                  {events.offlinePass.map(val => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                      <Typography variant='body2' sx={{ paddingRight: 2 }}>
                        {val.name}
                      </Typography>
                      <Typography variant='body2'>{val.phone}</Typography>
                    </Box>
                  ))}
                </StyledBox>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CardBodyEvent
