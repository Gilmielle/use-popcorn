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

export enum FilmsRatingKeys {
  ratingFrom = "ratingFrom",
  ratingTo = "ratingTo",
}

export enum FilmsYearKeys {
  yearFrom = "yearFrom",
  yearTo = "yearTo",
}

export enum FilmRelationTypes {
  SEQUEL = "SEQUEL",
  PREQUEL = "PREQUEL",
  REMAKE = "REMAKE",
  UNKNOWN = "UNKNOWN",
}

export interface SimilarFilm {
  filmId: number,
  nameRu?: string
  nameEn?: string,
  nameOriginal?: string,
  posterUrl: string
  posterUrlPreview: string,
  relationType: "SIMILAR",
}

export interface SequelOrPrequel {
  filmId: number,
  nameRu:	string,
  nameEn:	string,
  nameOriginal:	string,
  posterUrl: string,
  posterUrlPreview:	string,
  relationType:	FilmRelationTypes,
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

