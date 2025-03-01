import {Link, useParams} from "react-router";
import {API_ENDPOINTS, routePaths} from "../shared/lib/constants";
import {useEffect, useState} from "react";
import {ApiClient} from "../shared/lib/services/ApiClient.ts";
import {FilmCardDetailed} from "../entities/filmCardDetailed";
import {Film} from "../shared/api/filmsList.ts";
import IconArrowLeft from "../../public/icon-arrow-left.svg?react"
function FilmDetailed() {

  const { filmId } = useParams();
  const [filmData, setFilmData] = useState({});

  useEffect(() => {
    ApiClient.instance.get({
      url: API_ENDPOINTS.filmDetails + filmId,
    }).then((resp: Film) => {
      console.debug(resp)
      setFilmData(resp)
    })
  }, [filmId])

  return (
    <div className={"flex flex-col gap-32 text-start"}>
      <p className={"text-bold text-white text-2xl"}>
        <Link to={routePaths.main}>
          <span className={"flex flex-row gap-6 items-center"}>
            <IconArrowLeft /> Назад к списку фильмов
          </span>
        </Link>
      </p>
      <FilmCardDetailed {...filmData} />
    </div>
  )
}

export default FilmDetailed
