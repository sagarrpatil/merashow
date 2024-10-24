// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import moment from 'moment/moment'
import { useRouter } from 'next/router'

const ShowCardOnDashboard = ({ event }) => {
  const lowestPrice = event.Pass.reduce(
    (minPrice, pass) => (!pass.addon && pass.price < minPrice ? pass.price : minPrice),
    Infinity
  )
  const router = useRouter()
  return (
    <Card sx={{ cursor: 'pointer' }} onClick={() => router.push(`/events/${event.key}`)}>
      <CardMedia sx={{ height: '8.375rem', width: '100%' }} image={event.img} />
      <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 0 }}>
        <div style={{ textAlign: 'center', paddingTop: '4px', textTransform: 'uppercase', fontWeight: 400 }}>
          <Typography variant='body2' sx={{ color: 'rgb(205, 0, 131)', fontSize: 10 }}>
            {moment(event.startDate).format('MMM')}
          </Typography>
          <Typography variant='h6' component='div'>
            {moment(event.startDate).format('DD')}
          </Typography>
          <Typography variant='body2' sx={{ fontSize: 10 }}>
            {moment(event.startDate).format('ddd')}
          </Typography>
        </div>

        <Divider orientation='vertical' flexItem sx={{ mx: 1 }} />

        <div style={{ paddingLeft: 10 }}>
          <Typography variant='body1' style={{ fontSize: 15 }}>
            {event.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            ₹ {lowestPrice} onwards
          </Typography>
          <Typography variant='body2' sx={{ fontSize: 10 }}>
            Venue: {event.venue}
          </Typography>
        </div>
      </CardContent>

      <Button variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        Buy Ticket
      </Button>
    </Card>
  )
}

export default ShowCardOnDashboard
