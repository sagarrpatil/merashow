import Head from 'next/head'
import Grid from '@mui/material/Grid'
import EventByID from 'src/views/cards/EventByID'
import CardBodyEvent from 'src/views/cards/CardBodyEvent'
import { fetchAllEventbuID } from 'src/configs/apiService'

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
          <Grid item xs={12} sm={12} lg={12}>
            <EventByID event={event} />
            <CardBodyEvent events={event} />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
        <CardVerticalRatings />
      </Grid> */}
          {/* <Grid item xs={12} sm={6} md={4}>
        <CardSupport />
      </Grid> */}
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
