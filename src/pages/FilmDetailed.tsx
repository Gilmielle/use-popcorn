import {Link, useParams} from "react-router";
import {ROUTE_PATHS} from "#shared/lib/constants/index.ts";
import IconArrowLeft from "#public/icon-arrow-left.svg?react"
import {FilmDetailedInfo} from "#widgets/filmDetailedInfo/index.ts";
function FilmDetailed() {

  const { filmId } = useParams();

  return (
    <div className={"flex flex-col gap-32 text-start"}>
      <p className={"text-bold text-white text-2xl"}>
        <Link to={ROUTE_PATHS.main}>
          <span className={"flex flex-row gap-6 items-center"}>
            <IconArrowLeft /> Назад к списку фильмов
          </span>
        </Link>
      </p>
      {!!filmId && <FilmDetailedInfo filmId={filmId}/>}
    </div>
  )
}

export default FilmDetailed
