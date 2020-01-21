import axios from 'axios';

export const fetchEngineers = url => ({
  type: 'FETCH_ENGINEERS',
  payload: axios.get(url),
});

export const fetchEngineerSingle = url => ({
  type: 'FETCH_SINGLE_ENGINEER',
  payload: axios.get(url),
});

export const moreEngineers = url => ({
  type: 'MORE_ENGINEERS',
  payload: axios.get(url),
});
