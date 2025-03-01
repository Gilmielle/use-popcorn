import "../styles.css";

interface PaginationProps {
  totalPages: number,
  currentPage: number,
  onPageClick: (pageNum: number) => void,
  isLoading: boolean,
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageClick,
  isLoading,
 }: PaginationProps) => {

  const handleClick = (pageNum) => {
    if (onPageClick) {
      onPageClick(pageNum)
    }
  }

  if (totalPages < 2) {
    return null;
  }

  return <ul className={"pagination flex gap-x-8 justify-center"}>
    {Array.from({ length: totalPages }).map((_, index) => {
      return <li key={index} className={'pagination__item'}>
        <button
          type={"button"}
          disabled={(index + 1 === currentPage) || isLoading}
          onClick={() => handleClick(index + 1)}
          className={`pagination__btn flex px-16 py-8 text-lg font-bold flex text-black rounded-xl ${(index + 1 === currentPage) ? "bg-violet-400" : "bg-teal-400"}`}
        >
          {index + 1}
        </button>
      </li>
    })}
  </ul>
}
