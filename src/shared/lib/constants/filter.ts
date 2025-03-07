import {FilmsRatingKeys, FilmsYearKeys} from "#shared/api/filmTypes.ts";

const FILTER_SELECT_NAMES = {
  order: "order",
  type: "type",
}

const FILTER_RANGE_SLIDER_NAMES = {
  rating: {
    ratingFrom: FilmsRatingKeys.ratingFrom,
    ratingTo: FilmsRatingKeys.ratingTo,
  },
  year: {
    yearFrom: FilmsYearKeys.yearFrom,
    yearTo: FilmsYearKeys.yearTo,
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
  FILTER_SELECT_NAMES,
  FILTER_RANGE_SLIDER_NAMES,
  RATING_VALUES,
  YEAR_VALUES,
  YEAR_MIN_MAX_VALUES,
  SEARCH_INPUT_NAME
}
