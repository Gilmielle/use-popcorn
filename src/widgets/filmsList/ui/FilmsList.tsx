import {createPortal} from "react-dom";
import {useContext, useEffect, useState} from "react";
import {StoreContext} from "#shared/config/storeContext.ts";
import {StoreType} from "#app/providers/StoreProvider/model/store.ts";
import {Pagination} from "#shared/ui/pagination/index.ts";
import {Loader} from "#shared/ui/loader/index.ts";
import {Modal} from "#shared/ui/modal/index.ts";
import {FilmOrders} from "#shared/api/filmsList.ts";
import {getFilmsListFilter} from "../api/getFilmsListFilter.ts";
import {useFilms} from "../lib/useFilms.ts";
import {FilmCardsList} from "./FilmCardsList.tsx";
import {FilmsFilter} from "./FilmsFilter.tsx";
import "../style.css"

export const FilmsList = () => {
  const [ isErrorModalOpen, setIsErrorModalOpen ] = useState(false)
  const store: StoreType = useContext(StoreContext);
  const {
    countries,
    setCountries,
    genres,
    setGenres,
    filmsList,
    setFilmsList,
    filterParams,
    setFilterParams
  } = store;

  const {
    pages,
    currentPage,
    isError,
    isLoading,
    films
  } = useFilms(filterParams);

  useEffect(() => {
    if(!countries.length || !genres.length) {
      getFilmsListFilter().then((resp) => {
        setCountries(resp.countries)
        setGenres(resp.genres)
      })
    }
  }, [ countries, genres, setCountries, setGenres ]);

  useEffect(() => {
    setFilmsList(films)
  }, [films, filterParams, setFilmsList]);

  const onPaginationClick = async (pageNum) => {
    setFilterParams({
      order: FilmOrders.RATING,
      page: pageNum,
    })
  };

  useEffect(() => {
    if (isError) {
      setIsErrorModalOpen(true)
    }
  }, [ isError ]);

  return <div className={"filmsList flex flex-row gap-40"}>
    <div className={"filmsList__aside basis-320 shrink-0"}>
      <FilmsFilter />
    </div>
    <div className={"filmsList__content space-y-24 grow-1"}>
      <FilmCardsList films={filmsList}/>
      {pages > 1 && <Pagination totalPages={pages} currentPage={currentPage} onPageClick={onPaginationClick} isLoading={isLoading}/>}
      {isLoading && createPortal(<Loader/>, document.body)}
      {isError && <Modal
        defaultIsOpen={isErrorModalOpen}
        title={"Ошибка"}
      >
        <p>Что-то пошло не так, попробуйте позже</p>
      </Modal>}
    </div>
  </div>
}
