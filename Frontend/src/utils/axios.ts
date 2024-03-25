import axios from "axios";

export const APIGO = axios.create({
  baseURL: "http://127.0.0.1:9000/api",
});

export const ApiRockGo = axios.create({
  baseURL: "https://0b08-2404-8000-1095-99a-4456-777b-9ee9-5746.ngrok-free.app",
});
