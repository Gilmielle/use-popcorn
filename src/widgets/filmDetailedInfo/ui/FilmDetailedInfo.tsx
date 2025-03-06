import "../style.css"
import {FilmCardDetailed} from "#entities/filmCardDetailed/index.ts";
import {useEffect, useState} from "react";
import {ApiClient} from "#shared/lib/services/ApiClient.ts";
import {API_ENDPOINTS} from "#shared/lib/constants/index.ts";
import {Film} from "#shared/api/filmsList.ts";

interface FilmDetailedInfoProps {
  filmId: string,
}
export const FilmDetailedInfo = ({ filmId }: FilmDetailedInfoProps) => {
  const [filmData, setFilmData] = useState({});

  useEffect(() => {
    ApiClient.instance.get({
      url: API_ENDPOINTS.filmDetails + filmId,
    }).then((resp: Film) => {
      console.debug(resp)
      setFilmData(resp)
    })
  }, [filmId])


  return <div className={"filmDetailedInfo"}>
    <FilmCardDetailed {...filmData} />
  </div>
}
