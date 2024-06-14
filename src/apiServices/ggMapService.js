import axios from 'axios';

const API_KEY = 'AIzaSyA2IBpNwa2YG_nJxg2Ku0zca94IZdvstaM';

export const GeocodingService = {
  searchLocation: async (address) => {
    try {
      console.log('hello');
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: API_KEY,
        },
      });
      console.log(response.data);
      if (response.data.results.length > 0) {
        console.log('Founded');
        const { lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        console.log('Error: ' + response.data.error_message);
      }
      return null;
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
      return null;
    }
  },
};
