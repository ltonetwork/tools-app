import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const EXT_URL = import.meta.env.VITE_EXT_URL;

export const serviceClient = axios.create({
  baseURL: BASE_URL,
});
