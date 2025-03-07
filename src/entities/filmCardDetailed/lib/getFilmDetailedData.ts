import {FILM_TYPES} from "#shared/lib/constants/index.ts";
import {getFormattedFilmLength} from "#shared/lib/utils/index.ts";
import {Film} from "#shared/api/filmTypes.ts";

export const getFilmDetailedData = (film: Film) => {
  return [
    {
      key: "Год выпуска",
      value: film?.year ? film.year : "—",
    },
    {
      key: "Категория",
      value: film?.type ? FILM_TYPES[film.type] : "—",
    },
    {
      key: "Слоган",
      value: film?.slogan ? film.slogan : "—",
    },
    {
      key: "Год производства",
      value: film?.startYear && film?.endYear ? `${film.startYear} - ${film.endYear}` : film?.startYear ? film.startYear : "—",
    },
    {
      key: "Рейтинг",
      value: film?.ratingKinopoisk ? film.ratingKinopoisk : "—",
    },
    {
      key: "Количество оценок",
      value: film?.ratingKinopoiskVoteCount ? film.ratingKinopoiskVoteCount.toLocaleString("ru-RU") : "—",
    },
    {
      key: "Страна",
      value: film?.countries?.length ? film.countries.map(item => item?.country).join(", ") : "—",
    },
    {
      key: "Жанры",
      value: film?.genres?.length ? film.genres.map(item => item?.genre).join(", ") : "—",
    },
    {
      key: "Продолжительность",
      value: film?.filmLength ? getFormattedFilmLength(film.filmLength) : "—",
    },
    {
      key: "Возрастные органичения",
      value: film?.ratingAgeLimits ? `${film.ratingAgeLimits.replace(/[a-z]/g, "")}+` : "—",
    },
  ]
}
