import axios from "axios";

const host = ''

const headers = {
  "PRIVATE-TOKEN": "dy6DevfXXfLMmibwToxc"
};

export default {
  get: function(url, params) {
    const options = {
      headers,
      params
    };
    return axios.get(`${host}${url}`, options);
  },
  post: function(url, data) {
    const options = {
      headers
    };
    return axios.post(`${host}${url}`, data, options);
  },
  delete: function(url) {
    const options = {
      headers
    };
    return axios.delete(`${host}${url}`, options);
  },
  put: function(url, data) {
    const options = {
      headers
    };
    return axios.put(`${host}${url}`, data, options);
  },
  patch: function(url, data) {
    const options = {
      headers
    };
    return axios.patch(`${host}${url}`, data, options);
  }
};
