import {ApiClient} from "#shared/lib/services/ApiClient.ts";
import {API_ENDPOINTS, API_URL_V1, API_URL_V2_1} from "#shared/lib/constants/index.ts";

export const getFilmDetails = (filmId: string) => {
  return Promise.allSettled([
    ApiClient.instance.get({
      url: API_ENDPOINTS.filmDetails + filmId,
    }),

    ApiClient.instance.get({
      url: API_ENDPOINTS.filmStaff + `?filmId=${filmId}`,
      differentBaseUrl: API_URL_V1
    }),

    ApiClient.instance.get({
      url: API_ENDPOINTS.filmSequelsAndPrequels(filmId),
      differentBaseUrl: API_URL_V2_1,
    }),

    ApiClient.instance.get({
      url: API_ENDPOINTS.filmSimilars(filmId),
    }),
  ]).then((data) => {
    const formattedData = data
      .map((item) => {
        if (item.status === "fulfilled") {
          return item.value
        } else {
          return null;
        }

      });

    const [ details, staff, sequelsAndPrequels, similars ] = formattedData
    console.debug({
      details,
      staff,
      sequelsAndPrequels,
      similars,
    })

    return {
      details,
      staff,
      sequelsAndPrequels,
      similars,
    }
  })
}
