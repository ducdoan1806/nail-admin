import axios from "axios";

export const API_URL = "http://127.0.0.1:8000/";
const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "Application/json",
  },
});
export default http;
