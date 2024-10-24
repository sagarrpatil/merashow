// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import MapMarkerRadius from 'mdi-material-ui/MapMarkerRadius'
import CalendarClockOutline from 'mdi-material-ui/CalendarClockOutline'
import useMediaQuery from '@mui/material/useMediaQuery'
import Twitter from 'mdi-material-ui/Twitter'
import StoreMarker from 'mdi-material-ui/StoreMarker'
import Facebook from 'mdi-material-ui/Facebook'
import Linkedin from 'mdi-material-ui/Linkedin'
import GooglePlus from 'mdi-material-ui/GooglePlus'
import moment from 'moment'
import ShareVariant from 'mdi-material-ui/ShareVariant'
import MapMarkerQuestionOutline from 'mdi-material-ui/MapMarkerOutline'
import { Divider } from '@mui/material'

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const EventByID = props => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const matches = useMediaQuery('(max-width:800px)')
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const lowestPrice = props.event.Pass.reduce(
    (minPrice, pass) => (!pass.addon && pass.price < minPrice ? pass.price : minPrice),
    Infinity
  )
  const shareOption = async () => {
    try {
      if (navigator.share) {
        // Use Web Share API if available
        await navigator.share({
          title: 'Invitation',
          text: `\nJoin event with me \n\n${props.event.title} \n\n${window.location.href}`
        })
      } else {
        window.open('whatsapp://send?text=Join Event with me \n\n' + window.location.href)
      }
    } catch (error) {
      console.error('Error sharing content:', error)
    }
  }

  return (
    <Card>
      <Grid container spacing={6}>
        <StyledGrid item md={12} xs={12} lg={12}>
          <img height={200} alt={props.event.title} src={props.event.img} width={matches ? '100%' : ''} />
        </StyledGrid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            paddingTop: ['0 !important', '0 !important', '1.5rem !important']
            // paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
          }}
        >
          <CardContent sx={{ p: 3, pb: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 1 }}>
              {props.event.title}
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 2 }}>
              <MapMarkerRadius sx={{ fontSize: 17, marginBottom: -0.8, color: 'primary.main', mr: 2 }} />{' '}
              {props.event.venue}
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 0 }}>
              <CalendarClockOutline sx={{ fontSize: 17, marginBottom: -0.8, color: 'primary.main', mr: 2 }} />{' '}
              {moment(props.event.startDate).format('ddd DD MMM YYYY - hh:mm a')} onwards
            </Typography>
          </CardContent>
          {/* <Divider  /> */}
          <CardActions className='card-action-dense'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 3, pl: 1.7 }}>
              <div>
                {!matches && (
                  <Typography sx={{ fontWeight: 500 }}>
                    Price: ₹{' '}
                    <Box component='span' sx={{ fontWeight: 'bold' }}>
                      {lowestPrice} onwards
                    </Box>
                  </Typography>
                )}
              </div>
              <div>
                <IconButton
                  id='long-button'
                  aria-label='share'
                  aria-haspopup='true'
                  aria-controls='long-menu'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={() => window.open(props.event.googleLocation)}
                >
                  <MapMarkerQuestionOutline fontSize='small' />
                </IconButton>
                <IconButton
                  id='long-button'
                  aria-label='share'
                  aria-haspopup='true'
                  aria-controls='long-menu'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={shareOption}
                >
                  <ShareVariant fontSize='small' />
                </IconButton>
              </div>
            </Box>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  )
}

export default EventByID
