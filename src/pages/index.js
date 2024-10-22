import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ShowCardOnDashboard from 'src/views/cards/ShowCardOnDashboard'
import { fetchAllEvents } from 'src/configs/apiService'

const Dashboard = ({ events }) => {
  console.log(events)
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {events.map(event => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={event.key}>
            <ShowCardOnDashboard event={event} />
          </Grid>
        ))}
      </Grid>
    </ApexChartWrapper>
  )
}

// Fetch data on the server side
export async function getServerSideProps() {
  try {
    // Call your API service to fetch events
    const events = await fetchAllEvents()
    return { props: { events } }
  } catch (error) {
    console.error('Error fetching events:', error)
    return { props: { events: [] } } // Return an empty array in case of error
  }
}

export default Dashboard
