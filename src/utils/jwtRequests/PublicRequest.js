import axios from 'axios';
import AppProperty from '~/constants/AppProperties';

const PublicRequest = axios.create({
  baseURL: AppProperty.FOODEY_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default PublicRequest;
