import {create} from "zustand/react";
import {createFilmsFilterSlice, createFilmsListSlice} from "#widgets/filmsList/index.tsx";
import {FilmsFilterSlice} from "#widgets/filmsList/model/slice/filmsFilterSlice.ts";
import {FilmsListSlice} from "#widgets/filmsList/model/slice/filmsListSlice.ts";

export type StoreType = FilmsFilterSlice & FilmsListSlice

export const useAppStore = create<StoreType>()((...store) => {
  return {
    ...createFilmsFilterSlice(...store),
    ...createFilmsListSlice(...store),
  }
})
