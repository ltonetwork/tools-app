import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const EXT_URL = import.meta.env.VITE_EXT_URL;
export const EXT_URL2 = import.meta.env.VITE_EXT_URL2;
export const SCRIPT = import.meta.env.VITE_SCRIPT;
export const STATS = import.meta.env.VITE_STATS;

export const serviceClient = axios.create({
  baseURL: BASE_URL,
});
