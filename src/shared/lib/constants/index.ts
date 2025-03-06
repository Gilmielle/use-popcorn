import {routePaths} from "./routes.ts";
import {FilmOrders, FilmTypes, FilmTypesFilter} from "#shared/api/filmsList.ts";
import {filmsRatingKeys, filmsYearKeys} from "#shared/api/filmsList.ts";

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

const FILTER_RANGE_SLIDER_NAMES = {
  rating: {
    ratingFrom: filmsRatingKeys.ratingFrom,
    ratingTo: filmsRatingKeys.ratingTo,
  },
  year: {
    yearFrom: filmsYearKeys.yearFrom,
    yearTo: filmsYearKeys.yearTo,
  },
}

const RATING_VALUES = {
  min: 1,
  max: 10,
}

const YEAR_VALUES = {
  min: 2000,
  max: new Date().getFullYear(),
}

const YEAR_MIN_MAX_VALUES = {
  min: 1895,
  max: 2100,
}

const SEARCH_INPUT_NAME = "keyword"

export {
  routePaths,
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
}
