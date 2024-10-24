import Head from 'next/head'
import Grid from '@mui/material/Grid'
import EventByID from 'src/views/cards/EventByID'
import CardBodyEvent from 'src/views/cards/CardBodyEvent'
import { fetchAllEventbuID } from 'src/configs/apiService'
import Button from '@mui/material/Button'
import { styled } from '@mui/system'
import { Card } from '@mui/material'

const FixedButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  borderRadius: '20px 0 0 20px',
  bottom: theme.spacing(10), // Adjusts the distance from the bottom
  right: theme.spacing(0), // Adjusts the distance from the right
  zIndex: 1000 // Ensures it stays above other content
}))

const FixedButtonLeft = styled(Card)(({ theme }) => ({
  position: 'fixed',
  borderRadius: '0px 20px 20px 0px',
  bottom: theme.spacing(10), // Adjusts the distance from the bottom
  left: theme.spacing(0), // Adjusts the distance from the right
  zIndex: 1000,
  color: '#000',
  background: '#ffe8ec',
  padding: 10,
  width: 'auto',
  display: 'flex',
  fontWeight: '700'
}))

const Events = ({ event = null, error }) => {
  if (error) {
    return <p>Error loading events: {error}</p>
  } else
    return event !== null ? (
      <>
        <Head>
          <title>{event.title}</title>
          <meta name='description' content={event.about} />
          <link rel='apple-touch-icon' sizes='180x180' href={event.img} />
          <link rel='icon' type='image/png' sizes='32x32' href={event.img} />
          <link rel='icon' type='image/png' sizes='16x16' href={event.img} />
          <link rel='shortcut icon' href={event.img} />
        </Head>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} lg={12} sx={{ mb: 25 }}>
            <EventByID event={event} />
            <CardBodyEvent events={event} />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
        <CardVerticalRatings />
      </Grid> */}
          {/* <Grid item xs={12} sm={6} md={4}>
        <CardSupport />
      </Grid> */}
          <FixedButtonLeft variant='contained' disabled>
            ₹{' '}
            {event.Pass.reduce(
              (minPrice, pass) => (!pass.addon && pass.price < minPrice ? pass.price : minPrice),
              Infinity
            )}{' '}
            onwards
          </FixedButtonLeft>
          <FixedButton variant='contained'>Book Now</FixedButton>
        </Grid>
      </>
    ) : (
      <p>No events available.</p>
    )
}

export default Events

export async function getServerSideProps(context) {
  const { id } = context.query

  try {
    const event = await fetchAllEventbuID(id)

    return { props: { event } }
  } catch (error) {
    console.error('Error fetching events:', error)

    return { props: { events: null, error: 'Failed to fetch events' } }
  }
}
