import {ApiClient} from "#shared/lib/services/ApiClient.ts";
import {API_ENDPOINTS} from "#shared/lib/constants/index.ts";
import {Film, FilmOrders, FilmTypes, FilmTypesFilter} from "#shared/api/filmsList.ts";

type AllFilmTypes = FilmTypes | FilmTypesFilter;

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
