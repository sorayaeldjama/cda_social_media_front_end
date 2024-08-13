import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8900/api/",
  withCredentials: true,
});