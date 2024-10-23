// ** MUI Imports
import Grid from '@mui/material/Grid'
import EventByID from 'src/views/cards/EventByID'
import CardBodyEvent from 'src/views/cards/CardBodyEvent'
import { fetchAllEventbuID } from 'src/configs/apiService'

const Events = ({ event = {}, error }) => {
  console.log(event)
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}>
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
    return { props: { events: [], error: 'Failed to fetch events' } }
  }
}
