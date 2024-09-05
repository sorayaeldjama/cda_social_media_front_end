// import axios from "axios";

// export const makeRequest = axios.create({
//   baseURL: "http://localhost:8900/api/",
//   withCredentials: true,
// });

import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://cda-social-media-back-end.onrender.com",
  withCredentials: true,
});
