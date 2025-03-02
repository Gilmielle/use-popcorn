import {ApiClient} from "#shared/lib/services/ApiClient.ts";
import {API_ENDPOINTS} from "#shared/lib/constants/index.ts";

export interface Country {
  "country": string,
  "id"?: number,
}

export interface Genre {
  "genre": string,
  "id"?: number,
}

export enum FilmTypes {
  "VIDEO"  = "VIDEO",
  "FILM" = "FILM",
  "TV_SERIES" = "TV_SERIES",
  "MINI_SERIES" = "MINI_SERIES",
  "TV_SHOW" = "TV_SHOW",
}

export enum FilmTypesFilter {
  "ALL" = "ALL",
  "TV_SHOW" = "TV_SHOW",
}

type AllFilmTypes = FilmTypes | FilmTypesFilter;

export enum FilmTypesUi {
  "VIDEO"  = "Видео",
  "FILM" = "Фильм",
  "TV_SERIES" = "Сериал",
  "MINI_SERIES" = "Мини-сериал",
  "TV_SHOW" = "ТВ шоу",
}

export enum FilmOrders {
  "RATING" = "RATING",
  "NUM_VOTE" = "NUM_VOTE",
  "YEAR" = "YEAR",
}

export enum FilmProductionStatus {
  "FILMING" = "FILMING" ,
  "PRE_PRODUCTION" = "PRE_PRODUCTION",
  "COMPLETED" = "COMPLETED",
  "ANNOUNCED" = "ANNOUNCED",
  "UNKNOWN" = "UNKNOWN",
  "POST_PRODUCTION" = "POST_PRODUCTION",
}

export interface Film {
  "kinopoiskId": number,
  "kinopoiskHDId": number | null,
  "imdbId": string | null,
  "nameRu": string | null,
  "nameEn": string | null,
  "nameOriginal": string | null,
  "posterUrl": string,
  "posterUrlPreview": string,
  "coverUrl": string | null,
  "logoUrl": string | null,
  "reviewsCount": number,
  "ratingGoodReview": number | null,
  "ratingGoodReviewVoteCount": number | null,
  "ratingKinopoisk": number | null,
  "ratingKinopoiskVoteCount": number | null,
  "ratingImdb": number | null,
  "ratingImdbVoteCount": number | null,
  "ratingFilmCritics": number | null,
  "ratingFilmCriticsVoteCount": number | null,
  "ratingAwait": number | null,
  "ratingAwaitCount": number | null,
  "ratingRfCritics": number | null,
  "ratingRfCriticsVoteCount": number | null,
  "webUrl": string,
  "year": number | null,
  "filmLength": number | null,
  "slogan": string | null,
  "description": string | null,
  "shortDescription": string | null,
  "editorAnnotation": string | null,
  "isTicketsAvailable": boolean,
  "productionStatus": FilmProductionStatus | null,
  "type": FilmTypes,
  "ratingMpaa": string | null,
  "ratingAgeLimits": string | null,
  "hasImax": boolean | null,
  "has3D": boolean | null,
  "lastSync": string,
  "countries": Array<Country>,
  "genres": Array<Genre>,
  "startYear": number | null,
  "endYear": number | null,
  "serial": boolean | null,
  "shortFilm": boolean | null,
  "completed": boolean | null,
}

interface getFilmsLitResp {
  items: Array<Film>,
  total: number,
  totalPages: number,
}

export interface getFilmsListProps {
  countries?: number,
  genres?: number,
  order?: FilmOrders,
  type?: AllFilmTypes,
  ratingFrom?: number,
  ratingTo?: number,
  yearFrom?: number,
  yearTo?: number,
  imdbId?: string,
  keyword?: string,
  page?: number,
}

export const getFilmsLit = (props: getFilmsListProps) => {
  const urlSearchParams = new URLSearchParams(JSON.parse(JSON.stringify(props)))

  return ApiClient.instance.get({
    url: API_ENDPOINTS.filmsList + "?" + urlSearchParams.toString(),
  }).then((resp: getFilmsLitResp) => {
    const { items, total, totalPages } = resp
    return {
      items,
      total,
      totalPages
    }
  })
}

