import {Film} from "#shared/api/filmTypes.ts";
import {ApiClient} from "#shared/lib/services/ApiClient.ts";
import {API_ENDPOINTS} from "#shared/lib/constants/index.ts";

interface getFilmSuggestsResp {
  items: Array<Film>,
}

export interface getFilmSuggestsProps {
  keyword?: string,
}

export const getFilmSuggests = (props: getFilmSuggestsProps, signal: AbortSignal) => {
  const urlSearchParams = new URLSearchParams(JSON.parse(JSON.stringify(props)))

  return ApiClient.instance.get(
    {
      url: API_ENDPOINTS.filmsList + "?" + urlSearchParams.toString(),
    },
    signal
  )
    .then((resp: getFilmSuggestsResp) => {
      const { items} = resp
      return {
        items,
      }
    })
}
