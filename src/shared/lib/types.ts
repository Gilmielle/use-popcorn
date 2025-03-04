type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
export type FixedLengthArray<T extends any[]> =
  Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
  & { [Symbol.iterator]: () => IterableIterator< ArrayItems<T> > }


export enum filmsRatingKeys {
  ratingFrom = "ratingFrom",
  ratingTo = "ratingTo",
}

export enum filmsYearKeys {
  yearFrom = "yearFrom",
  yearTo = "yearTo",
}
