import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE,
});

export default api;
