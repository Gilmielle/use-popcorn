import {useEffect, useState} from "react";
import {getFilmsListProps, getFilmsLit} from "../api/filmsList.ts";

export const useFilms = (props: getFilmsListProps) => {
  const [films, setFilms] = useState([])
  const [pages, setPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)


  useEffect(() => {
    setIsLoading(true)
    setIsError(false)

    getFilmsLit(props)
      .then((resp) => {
        const { items, totalPages } = resp
        setFilms(items);
        setPages(totalPages);
        if(props.page) {
          setCurrentPage(props.page);
        }
      })
      .catch((err) => {
        console.debug(err)
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [ props ])

  return {
    films,
    pages,
    currentPage,
    isLoading,
    isError,
  }
}
