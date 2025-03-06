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
        value: props.startYear && props.endYear ? `${props.startYear} - ${props.endYear}` : props.startYear ? props.startYear : "—",
      },
      {
        key: "Рейтинг",
        value: props.ratingKinopoisk ? props.ratingKinopoisk : "—",
      },
      {
        key: "Количество оценок",
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
        value: props.ratingAgeLimits ? `${props.ratingAgeLimits.replace(/[a-z]/g, "")}+` : "—",
      },
    ]
  }

  const filmData = getFilmDetailedData()

  return <div className={"rounded-md bg-zinc-800 p-48 shadow-md shadow-slate-700 text-white"}>
    <div className={"flex gap-56 text-start"}>
      <div className={"rounded-md overflow-hidden w-400 h-600 shrink-0"}>
        <img className={"object-cover w-100/100 h-100/100 object-center"} src={props.posterUrl} width={400} height={600} alt={`"Постер для "${getFilmDisplayedName(props)}`}/>
      </div>
      <div className={"flex flex-col gap-16 items-start"}>
        <div className={"text-xl mb-40"}>
          <h1 className={"font-bold text-6xl mb-16"}>{getFilmDisplayedName(props)}{!!props.year &&` (${props.year})`}</h1>
          {!!props.slogan && <p className={"text-3xl mb-16"}>
            {props.slogan}
          </p>}
          {(!!props.nameOriginal || !!props.nameEn) && <p>
            <span className={"text-lg font-light text-gray-400"}>{props.nameOriginal ? props.nameOriginal : props.nameEn}</span>
          </p>}
        </div>
        {!!props.description && <p className={"mb-24"}>
          <span className={"text-xl"}>{props.description}</span>
        </p>}
        <dl className={"flex flex-col gap-6 text-xl"}>
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
