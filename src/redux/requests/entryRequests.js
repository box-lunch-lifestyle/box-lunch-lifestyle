import axios from 'axios';

export function callPostEntry(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/entry/postEntry', payload, config)
    .then(response => response.data[0].id)
    .catch(error => { throw error.response || error; })
};

export function callAllEntries() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/entry/getEntries')
    .then(response => response.data)
    .catch(error => { throw error.response || error; })
}

export function callEditEntry(action) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.put(`/api/entry/putEntry/${action.id}`, action.payload)
    .then(response => response)
    .catch(error => { throw error.response || error; })
}

export function callAdminPageEntries() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/entry/admin')
    .then(response => response.data)
    .catch(error => { throw error.response || error; })
}