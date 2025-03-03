import {Country, Genre} from "#shared/api/filmsList.ts";
import {StateCreator} from "zustand/vanilla";
import {getFilmsListProps} from "#widgets/filmsList/api/getFilmsLit.ts";

export interface FilmsFilterSlice {
  countries: Array<Required<Country>>,
  setCountries: (countriesList: Array<Required<Country>>) => void,
  genres: Array<Required<Genre>>,
  setGenres: (genresList: Array<Required<Genre>>) => void,
  filterParams: getFilmsListProps,
  setFilterParams: (filterParams: getFilmsListProps) => void,
  clearFilterParams: () => void,
}

export const createFilmsFilterSlice: StateCreator<
  FilmsFilterSlice,
  [],
  [],
  FilmsFilterSlice
> = (set) => {
  return {
    countries: [],
    setCountries: (countriesList) => set((state) => {
      return {
        ...state,
        countries: countriesList
      }
    }),
    genres: [],
    setGenres: (genresList) => set((state) => {
      return {
        ...state,
        genres: genresList
      }
    }),
    filterParams: {},
    setFilterParams: (filterParams) => set((state) => {
      return {
        ...state,
        filterParams: {
          ...state.filterParams,
          ...filterParams
        }
      }
    }),
    clearFilterParams: () => set((state) => {
      return {
        ...state,
        filterParams: {}
      }
    })
  }
}
