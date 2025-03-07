import "../style.css"
import {FilmCardDetailed} from "#entities/filmCardDetailed/index.ts";
import {useEffect, useState} from "react";
import {getFilmDetails} from "../api/getFilmDetails.ts";
import {Loader} from "#shared/ui/loader/index.ts";
import {Link} from "react-router";
import {ROUTE_PATHS} from "#shared/lib/constants/index.ts";
import {Film, SequelOrPrequel, SimilarFilm} from "#shared/api/filmTypes.ts";
import {ErrorBoundary} from "react-error-boundary";
import {Staff} from "#shared/api/staffTypes.ts";

interface FilmDetailedInfoProps {
  filmId: string,
}
export const FilmDetailedInfo = ({ filmId }: FilmDetailedInfoProps) => {
  const [filmData, setFilmData] = useState<Film>(null);
  const [filmStaff, setFilmStaff] = useState<Array<Staff>>([]);
  const [filmSimilars, setFilmSimilars] = useState<Array<SimilarFilm>>([]);
  const [filmSequelsAndPrequels, setFilmSequelsAndPrequels] = useState<Array<SequelOrPrequel>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

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

      if(details) {
        setFilmData(details)
      }

      if(staff) {
        setFilmStaff(staff)
      }

      if(staff) {
        const { items } = similars;
        setFilmSimilars(items)
      }

      if(sequelsAndPrequels) {
        setFilmSequelsAndPrequels(sequelsAndPrequels)
      }
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
    <ErrorBoundary
      fallback={<p>Film Details</p>}
    >
      {(!isError && !isLoading && !!filmData && !!filmStaff) && <FilmCardDetailed
        film={filmData}
        staff={filmStaff}
        sequelsAndPrequels={filmSequelsAndPrequels}
        similars={filmSimilars}
      />}
    </ErrorBoundary>
    {isLoading && <Loader/>}
    {isError && <div className={"flex flex-col justify-center min-h-[30dvh] text-center rounded-md bg-blue-300 p-40 shadow-md shadow-slate-700"}>
      <p className={"text-5xl mb-24 font-bold"}>Ошибка</p>
      <p className={"text-2xl mb-24"}>Что-то пошло не так, попробуйте позже</p>
      <p className={"text-3xl text-teal-600 hover:text-teal-800 transition-colors font-bold"}>
        <Link to={ROUTE_PATHS.main}>На главную</Link>
      </p>
    </div>}
  </div>
}
