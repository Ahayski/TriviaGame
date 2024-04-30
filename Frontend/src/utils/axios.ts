import axios from "axios";

export const APIGO = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const ApiRockGo = axios.create({
  baseURL: "https://7c57-2404-8000-1003-2003-a55c-5cdc-a778-2bb.ngrok-free.app",
});
