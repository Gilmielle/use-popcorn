import {Country, FilmOrders, FilmTypesFilter, Genre} from "#shared/api/filmsList.ts";
import {FILM_ORDER_OPTIONS, FILM_TYPE_OPTIONS} from "#shared/lib/constants/index.ts";
import {getFilmsListProps} from "#widgets/filmsList/api/getFilmsLit.ts";

type radioDataOption = Required<Country> | Required<Genre>

export const getAdaptedData = (options: Array<radioDataOption>, labelProp: string) => {
  return options.map((option) => {
    return {
      value: option.id,
      label: option[labelProp]
    }
  }).filter((option) => !!option.label);
}

export const getAdaptedAccordionData = (genres: Array<Required<Genre>>, countries: Array<Required<Country>>) => {
  return [
    {
      label: "Жанры",
      name: "genres",
      optionLabelProp: "genre",
      options: genres ?? [],
    },
    {
      label: "Страны",
      name: "countries",
      optionLabelProp: "country",
      options: countries ?? [],
    },
  ]
}

export const getAdaptedOrderSelectOptions = (filterParams: getFilmsListProps) => {
  const options = Object.entries(FILM_ORDER_OPTIONS).map(([ key, value ]) => {
    return {
      label: value,
      value: key
    }
  })
  const resetOption = options.find((option) => option.value === FilmOrders.RATING)

  const defaultOption = options.find((option) => {
    return filterParams.order ? option.value === filterParams.order?.toString() : option.value === FilmOrders.RATING
  })

  return {
    options,
    defaultOption,
    resetOption
  }
}

export const getAdaptedTypeSelectOptions = (filterParams: getFilmsListProps) => {
  const options = Object.entries(FILM_TYPE_OPTIONS).map(([ key, value ]) => {
    return {
      label: value,
      value: key
    }
  })
  const resetOption = options.find((option) => option.value === FilmTypesFilter.ALL)

  const defaultOption = options.find((option) => {
    return filterParams.type ? option.value === filterParams.type?.toString() : option.value === FilmTypesFilter.ALL
  })

  return {
    options,
    defaultOption,
    resetOption
  }
}
