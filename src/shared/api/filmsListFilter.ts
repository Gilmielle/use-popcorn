import {ApiClient} from "#shared/lib/services/ApiClient.ts";
import {API_ENDPOINTS} from "#shared/lib/constants/index.ts";
import {Country, Genre} from "./filmsList.ts";

export interface getFilmsListFilterResp {
  genres: Array<Required<Genre>>,
  countries: Array<Required<Country>>,
}
export const getFilmsListFilter = () => {
  return ApiClient.instance.get({
    url: API_ENDPOINTS.filmsListFilter,
  }).then((resp: getFilmsListFilterResp) => {
    console.debug(resp)
  })
}
