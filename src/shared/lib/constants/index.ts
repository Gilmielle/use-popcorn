import {routePaths} from "./routes.ts";

const API_ENDPOINTS = {
  filmsList: "/films",
  filmDetails: "/films/",
  filmsListFilter: "/films/filters",
};

const API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2";
const API_KEY = import.meta.env.VITE_API_KEY ?? "";


export {
  routePaths,
  API_ENDPOINTS,
  API_KEY,
  API_URL,
}
