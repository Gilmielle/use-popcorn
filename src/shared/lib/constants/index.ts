import {ROUTE_PATHS} from "./routes.ts";
import {
  FILM_TYPES,
  FILM_ORDER_OPTIONS,
  FILM_TYPE_OPTIONS
} from "./film.ts"
import {
  FILTER_SELECT_NAMES,
  FILTER_RANGE_SLIDER_NAMES,
  RATING_VALUES,
  YEAR_VALUES,
  YEAR_MIN_MAX_VALUES,
  SEARCH_INPUT_NAME
} from "./filter.ts"
import { PROFESSIONS } from "./staff.ts"

const API_ENDPOINTS = {
  filmsList: "/films",
  filmDetails: "/films/",
  filmsListFilter: "/films/filters",
  filmStaff: "/staff",
  filmSimilars: (id) => `films/${id}/similars`,
  filmSequelsAndPrequels: (id) => `films/${id}/sequels_and_prequels`,
};

const API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2";
const API_URL_V1 = "https://kinopoiskapiunofficial.tech/api/v1";
const API_URL_V2_1 = "https://kinopoiskapiunofficial.tech/api/v2.1";
const API_KEY = import.meta.env.VITE_API_KEY ?? "";

export {
  ROUTE_PATHS,
  API_ENDPOINTS,
  API_KEY,
  API_URL,
  API_URL_V1,
  API_URL_V2_1,
  FILM_TYPES,
  FILM_ORDER_OPTIONS,
  FILTER_SELECT_NAMES,
  FILTER_RANGE_SLIDER_NAMES,
  FILM_TYPE_OPTIONS,
  RATING_VALUES,
  YEAR_VALUES,
  YEAR_MIN_MAX_VALUES,
  SEARCH_INPUT_NAME,
  PROFESSIONS,
}
