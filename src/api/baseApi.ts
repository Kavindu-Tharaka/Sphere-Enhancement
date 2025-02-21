import axios from "axios";

const API_BASE_URL = 'http://localhost:5037';

const baseApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

//TODO add interceptors

export default baseApi;