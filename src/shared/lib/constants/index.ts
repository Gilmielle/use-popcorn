import {routePaths} from "./routes.ts";
import {FilmOrders, FilmTypes, FilmTypesFilter} from "#shared/api/filmsList.ts";

const API_ENDPOINTS = {
  filmsList: "/films",
  filmDetails: "/films/",
  filmsListFilter: "/films/filters",
};

const API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2";
const API_KEY = import.meta.env.VITE_API_KEY ?? "";

const FILM_TYPES = {
  [FilmTypes.VIDEO]: "Видео",
  [FilmTypes.FILM]: "Фильм",
  [FilmTypes.TV_SERIES]: "Сериал",
  [FilmTypes.MINI_SERIES]: "Мини-сериал",
  [FilmTypes.TV_SHOW]: "ТВ шоу",
} as const;

const FILM_ORDER_OPTIONS = {
  [FilmOrders.RATING]: "По рейтингу",
  [FilmOrders.NUM_VOTE]: "По количеству голосов",
  [FilmOrders.YEAR]: "По году",
} as const;

const FILM_TYPE_OPTIONS = {
  [FilmTypesFilter.ALL]: "Все",
  [FilmTypes.FILM]: "Фильм",
  [FilmTypes.TV_SHOW]: "ТВ шоу",
  [FilmTypes.MINI_SERIES]: "Мини сериал",
  [FilmTypes.TV_SERIES]: "ТВ сериал",
} as const;

const FILTER_SELECT_NAMES = {
  order: "order",
  type: "type",
}

export {
  routePaths,
  API_ENDPOINTS,
  API_KEY,
  API_URL,
  FILM_TYPES,
  FILM_ORDER_OPTIONS,
  FILTER_SELECT_NAMES,
  FILM_TYPE_OPTIONS,
}
