import axios from 'axios';

export const fetchCompanys = url => ({
  type: 'FETCH_COMPANYS',
  payload: axios.get(url),
});

export const fetchCompanySingle = url => ({
  type: 'FETCH_SINGLE_COMPANY',
  payload: axios.get(url),
});
