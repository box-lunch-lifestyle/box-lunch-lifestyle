import axios from 'axios';

export function callPostComment(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
  return axios.post('/api/comment/postComment', payload, config)
    .then(response => response)
    .catch(error => { throw error.response || error; })
};

export function callAllComments() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/comment/getComments')
    .then(response => response.data)
    .catch(error => { throw error.response || error; })
};

export function callEditComments(action) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.put(`/api/comment/putComment/${action.id}`, action.payload)
    .then(response => response)
    .catch(error => { throw error.response || error; })
};

export function callDeleteComment(action) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
  return axios.delete(`/api/comment/deleteComment/${action.payload.id}`)
    .then(response => response.data)
    .catch(error => { throw error.response || error; })
};