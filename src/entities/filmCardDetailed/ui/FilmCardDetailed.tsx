import {Film} from "#shared/api/filmsList.ts";
import {getFilmDisplayedName, getFormattedFilmLength} from "#shared/lib/utils/index.ts";
import {FILM_TYPES} from "#shared/lib/constants/index.ts";

export const FilmCardDetailed = (props: Film) => {

  const getFilmDetailedData = () => {
    return [
      {
        key: "Год выпуска",
        value: props.year ? props.year : "—",
      },
      {
        key: "Категория",
        value: props.type ? FILM_TYPES[props.type] : "—",
      },
      {
        key: "Слоган",
        value: props.slogan ? props.slogan : "—",
      },
      {
        key: "Год производства",
        value: props.startYear && props.endYear ? `${props.startYear} - ${props.endYear}` : "—",
      },
      {
        key: "Рейтинг",
        value: props.ratingKinopoisk ? props.ratingKinopoisk : "—",
      },
      {
        key: "Количество голосов",
        value: props.ratingKinopoiskVoteCount ? props.ratingKinopoiskVoteCount.toLocaleString("ru-RU") : "—",
      },
      {
        key: "Страна",
        value: props.countries?.length ? props.countries.map(item => item.country).join(", ") : "—",
      },
      {
        key: "Жанры",
        value: props.genres?.length ? props.genres.map(item => item.genre).join(", ") : "—",
      },
      {
        key: "Продолжительность",
        value: props.filmLength ? getFormattedFilmLength(props.filmLength) : "—",
      },
      {
        key: "Возрастные органичения",
        value: props.ratingAgeLimits ? props.ratingAgeLimits : "—",
      },
    ]
  }

  const filmData = getFilmDetailedData()

  return <div className={"rounded-md bg-zinc-800 p-16 shadow-md shadow-slate-700 text-white"}>
    <div className={"flex gap-32 text-start"}>
      <div className={"rounded-md overflow-hidden w-320 h-480 shrink-0"}>
        <img className={"object-cover w-100/100 h-100/100 object-center"} src={props.posterUrl} width={256} height={456} alt={`"Постер для "${getFilmDisplayedName(props)}`}/>
      </div>
      <div className={"flex flex-col gap-16 items-start"}>
        <div className={"text-xl mb-16"}>
          <h1 className={"font-bold text-4xl"}>{getFilmDisplayedName(props)}{!!props.year &&` (${props.year})`}</h1>
          {(!!props.nameOriginal || !!props.nameEn) && <p>
            <span className={"text-sm font-light text-gray-400"}>{props.nameOriginal ? props.nameOriginal : props.nameEn}</span>
          </p>}
        </div>
        {!!props.description && <p className={"mb-32"}>
          <span className={"text-2xl"}>{props.description}</span>
        </p>}
        <dl className={"flex flex-col gap-6"}>
          {filmData.map((filmDataItem, index) => {
            return <div className={"flex flex-row gap-8"} key={index}>
              <dt>{filmDataItem.key}: </dt>
              <dd>{filmDataItem.value}</dd>
            </div>
          })}
        </dl>
      </div>
    </div>
  </div>
}
