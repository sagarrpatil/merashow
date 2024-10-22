import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ShowCardOnDashboard from 'src/views/cards/ShowCardOnDashboard'
import { fetchAllEvents } from 'src/configs/apiService'

const Dashboard = ({ events = [], error }) => {
  if (error) {
    return <p>Error loading events: {error}</p>
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {events.length > 0 ? (
          events.map(event => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={event.key}>
              <ShowCardOnDashboard event={event} />
            </Grid>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </Grid>
    </ApexChartWrapper>
  )
}

// Fetch data on the server side
export async function getServerSideProps() {
  try {
    const events = await fetchAllEvents()
    
    return { props: { events } }
  } catch (error) {
    console.error('Error fetching events:', error)
    
    return { props: { events: [], error: 'Failed to fetch events' } }
  }
}

export default Dashboard
