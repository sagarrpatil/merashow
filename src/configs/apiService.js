import axios from 'axios'
import themeConfig from 'src/configs/themeConfig'
let baseApiURL = themeConfig.BaseApiURL

export const fetchAllEvents = () => {
  return axios
    .get(baseApiURL + 'api/getAllEvents')
    .then(response => {
      // Convert the response data (object) into an array
      const events = Object.keys(response.data).map(key => {
        return {
          key: key, // The key of the event
          ...response.data[key] // Spread the event details
        }
      })
      return events
    })
    .catch(err => {
      console.error('Error fetching events:', err)
      throw err
    })
}
export const fetchAllEventbuID = id => {
  return axios
    .get(baseApiURL + 'api/geteventbyID/' + id)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.error('Error fetching events:', err)
      throw err
    })
}
