import {FilmOrders, FilmRelationTypes, FilmTypes, FilmTypesFilter} from "#shared/api/filmTypes.ts";

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

const FILM_RELATION_TYPES = {
  [FilmRelationTypes.SEQUEL]: "Сиквел",
  [FilmRelationTypes.PREQUEL]: "Приквел",
  [FilmRelationTypes.REMAKE]: "Ремейк",
  [FilmRelationTypes.UNKNOWN]: "Неизвестно",
} as const;

export {
  FILM_TYPES,
  FILM_ORDER_OPTIONS,
  FILM_TYPE_OPTIONS,
  FILM_RELATION_TYPES,
}
