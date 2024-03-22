import axios from "axios";

export const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const API_Golang = axios.create({
  baseURL: "http://localhost:9000",
});

export const API_Tes = axios.create({
  baseURL: "https://db8d-118-99-107-173.ngrok-free.app",
});
