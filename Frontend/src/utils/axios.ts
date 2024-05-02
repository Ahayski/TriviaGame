import axios from "axios";

export const APIGO = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const ApiRockGo = axios.create({

  baseURL: "https://2b56-2404-8000-1095-99a-1d96-7db7-d90-5d0b.ngrok-free.app/",
});
