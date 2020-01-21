import axios from 'axios';

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};

export const fetchProfile = url => ({
  type: 'FETCH_PROFILE',
  payload: axios.get(url),
});

export const updateAccount = (url, formData) => ({
  type: 'UPDATE_ACCOUNT',
  payload: axios.put(url, formData),
});

export const updateAvatar = (url, formData) => ({
  type: 'UPDATE_AVA',
  payload: axios.put(url, formData, config),
});

export const deleteAccount = url => ({
  type: 'DELETE_ACCOUNT',
  payload: axios.delete(url),
});
