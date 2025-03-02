import {Film} from "#shared/api/filmsList.ts";
import {getFilmDisplayedName} from "#shared/lib/utils/index.ts";

export const FilmCard = (props: Film) => {

  return <div className={"rounded-md bg-blue-300 p-16 shadow-md shadow-slate-700"}>
    <div className={"flex gap-8 text-start"}>
      <div className={"rounded-md overflow-hidden w-135 h-200"}>
        <img className={"object-cover w-100/100 h-100/100 object-center"} src={props.posterUrlPreview} width={135} height={200} alt={`"Постер для "${getFilmDisplayedName(props)}`}/>
      </div>
      <div className={"flex flex-col gap-8 items-start"}>
        <p className={"text-xl mb-8"}>
          <span className={"font-bold text-3xl"}>{getFilmDisplayedName(props)}</span>, {props.year}
        </p>
        {!!props.ratingKinopoisk && <p className={"text-xl"}>Рейтинг: <span className={`font-bold ${props.ratingKinopoisk < 4.9 && "text-red-600"} ${props.ratingKinopoisk > 8.4 && "text-green-700"}`}>{props.ratingKinopoisk}</span></p>}
        {!!props.countries?.length && <p>Страна: {props.countries.map(item => item.country).join(", ")}</p>}
        {!!props.genres?.length && <p>Жанры: {props.genres.map(item => item.genre).join(", ")}</p>}
      </div>
    </div>
  </div>
}
