import {Film} from "#shared/api/filmsList.ts";
import {StateCreator} from "zustand/vanilla";

export interface FilmsListSlice {
  filmsList: Array<Film>,
  setFilmsList: (filmsList: Array<Film>) => void,
}

export const createFilmsListSlice: StateCreator<
  FilmsListSlice,
  [],
  [],
  FilmsListSlice
> = (set) => {
  return {
    filmsList: [],
    setFilmsList: (filmsList) => set((state) => {
      return {
        ...state,
        filmsList: filmsList,
      }
    })
  }
}
