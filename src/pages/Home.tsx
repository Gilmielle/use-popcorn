import {useEffect, useState} from 'react'
import {FilmOrders} from "../shared/api/filmsList.ts";
import {Pagination} from "../shared/ui/pagination";
import {createPortal} from "react-dom";
import {Loader} from "../shared/ui/loader";
import {FilmCard} from "../entities/filmCard";
import {generatePath, Link} from "react-router";
import {routePaths} from "../shared/lib/constants";
import {useFilms} from "../shared/hooks/useFilms.ts";
import {Modal} from "../shared/ui/modal";


function Home() {
  // TODO: переделать на zustand, чтобы хранить между переходами на страницы
  // TODO: плюс там же параметры фильтра
  const [ getFilmsParams, setGetFilmsParams ] = useState({ order: FilmOrders.RATING })
  const [ isErrorModalOpen, setIsErrorModalOpen ] = useState(false)

  const {
    pages,
    currentPage,
    isError,
    isLoading,
    films
  } = useFilms(getFilmsParams);

  const onPaginationClick = async (pageNum) => {
    setGetFilmsParams({
      order: FilmOrders.RATING,
      page: pageNum,
    })
  };

  useEffect(() => {
    if (isError) {
      setIsErrorModalOpen(true)
    }
  }, [ isError ]);

  return (
    <div className={"space-y-24"}>
      {!!films.length && <ul className={"flex flex-row flex-wrap gap-16 justify-between"}>
        {films.map((film) => {
          return <li className={"basis-48/100"} key={film.kinopoiskId}>
            <Link to={generatePath(routePaths.filmDetailed, { filmId: film.kinopoiskId })} >
              <FilmCard {...film} />
            </Link>
          </li>
        })}
      </ul>}
      {!films.length && <p className={"text-3xl underline"}>Films list is empty</p>}
      <Pagination totalPages={pages} currentPage={currentPage} onPageClick={onPaginationClick} isLoading={isLoading} />
      {isLoading && createPortal(<Loader />, document.body)}
      {isError && <Modal
        defaultIsOpen={isErrorModalOpen}
        title={"Ошибка"}
      >
        <p>Что-то пошло не так, попробуйте позже</p>
      </Modal>}
    </div>
  )
}

export default Home
