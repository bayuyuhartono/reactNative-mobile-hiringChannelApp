import axios from 'axios';

export const fetchCompanysHome = url => ({
  type: 'FETCH_COMPANYS_HOME',
  payload: axios.get(url),
});

export const fetchEngineersHome = url => ({
  type: 'FETCH_ENGINEERS_HOME',
  payload: axios.get(url),
});
