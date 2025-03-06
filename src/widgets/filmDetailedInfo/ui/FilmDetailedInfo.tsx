import "../style.css"
import {FilmCardDetailed} from "#entities/filmCardDetailed/index.ts";
import {useEffect, useState} from "react";
import {getFilmDetails} from "../api/getFilmDetails.ts";
import {Loader} from "#shared/ui/loader/index.ts";
import {Link} from "react-router";
import {routePaths} from "#shared/lib/constants/index.ts";

interface FilmDetailedInfoProps {
  filmId: string,
}
export const FilmDetailedInfo = ({ filmId }: FilmDetailedInfoProps) => {
  const [filmData, setFilmData] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    getFilmDetails(filmId).then((data) => {
      const {
        details,
        staff,
        sequelsAndPrequels,
        similars,
      } = data;

      if(!details && !staff && !sequelsAndPrequels && !similars) {
        throw Error("FilmDetailedInfo: all data is empty")
      }

      setFilmData(details)
    })
      .catch((err) => {
        console.debug(err)
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [filmId])


  return <div className={"filmDetailedInfo"}>
    {!isError && !isLoading && <FilmCardDetailed {...filmData} />}
    {isLoading && <Loader/>}
    {isError && <div className={"flex flex-col justify-center min-h-[30dvh] text-center rounded-md bg-blue-300 p-40 shadow-md shadow-slate-700"}>
      <p className={"text-5xl mb-24 font-bold"}>Ошибка</p>
      <p className={"text-2xl mb-24"}>Что-то пошло не так, попробуйте позже</p>
      <p className={"text-3xl text-teal-600 hover:text-teal-800 transition-colors font-bold"}>
        <Link to={routePaths.main}>На главную</Link>
      </p>
    </div>}
  </div>
}
