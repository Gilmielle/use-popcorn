import {useCallback, useRef, useState} from "react";
import {Searchbar} from "#shared/ui/searchbar/index.ts";
import {SearchbarProps} from "#shared/ui/searchbar/ui/Searchbar.tsx";
import {getFilmSuggests} from "../api/getFilmSuggests.ts";
import {getDebouncedFn, getFilmDisplayedName} from "#shared/lib/utils/index.ts";
import {generatePath, useNavigate} from "react-router";
import {Film} from "#shared/api/filmTypes.ts";
import {ROUTE_PATHS} from "#shared/lib/constants/index.ts";
import "../style.css"
import {useOutsideClick} from "#shared/hooks/useOutsideClick.tsx";

interface HeaderSearchProps extends SearchbarProps {
  searchbarExtraClasses?: string,
}

export const HeaderSearch = ({
  name,
  initialValue,
  onChange,
  onSubmit,
  placeholder,
  isNeedSubmitBtn = true,
  extraClasses = "",
  searchbarExtraClasses = "",
}: HeaderSearchProps) => {
  const [suggests, setSuggests] = useState<Array<Film>>([])
  const [isSuggestsVisible, setIsSuggestsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const searchbarRef = useRef(null)
  const headerSearchRef = useRef(null)
  const controllerRef = useRef(new AbortController());
  const navigate = useNavigate()

  const createNewAbortController = () => {
    controllerRef.current?.abort("getFilmSuggests aborted: user clicked reset button");
    controllerRef.current = new AbortController();
  };

  useOutsideClick(headerSearchRef, () => setIsSuggestsVisible(false));

  const handleInputChange = (currentSearchbarValue, currentSearchbarName) => {
    if (currentSearchbarValue.length > 3) {
      setIsLoading(true)
      setIsError(false)
      setSuggests([])
      setIsSuggestsVisible(false)

      createNewAbortController();

      getFilmSuggests({ keyword: currentSearchbarValue }, controllerRef.current.signal)
        .then((resp) => {
          const { items } = resp
            setSuggests(items.slice(0, 5));
            setIsSuggestsVisible(true)
        })
        .catch((err) => {

          if (err.name === 'AbortError') {
            console.error('Request was aborted:', err.message);
          } else {
            console.error('Fetch error:', err);
            setIsError(true)
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsSuggestsVisible(false)
    }

    if (typeof onChange === "function") {
      onChange(currentSearchbarValue, currentSearchbarName)
    }
  }

  const debouncedHandleInputChange = getDebouncedFn(handleInputChange, 400)

  const handleInputReset = () => {
    controllerRef.current.abort("getFilmSuggests aborted: user clicked reset button");
    setIsLoading(false)
    setIsError(false)
    setSuggests([])
    setIsSuggestsVisible(false)
  }

  const handleInputSubmit = (value, name) => {
    if(typeof onSubmit === "function") {
      onSubmit(value, name)
      setIsSuggestsVisible(false)
      searchbarRef.current.blur()
    }
  }

  const handleInputFocus = (value) => {
    if(value.length) {
      setIsSuggestsVisible(true)
    }
  }

  const getSuggestExtraParams = useCallback((suggest: Film) => {
    const extraParams = [ suggest?.nameOriginal, suggest?.year, suggest?.countries[0]?.country ]
      .filter((item) => !!item)
      .join(", ");
    return <span>{extraParams}</span>
  }, [])

  const handleSuggestionClick = (e, path) => {
    e.stopPropagation()
    e.preventDefault();
    navigate(path)
    setIsSuggestsVisible(false)
  }

  return <div className={`headerSearch ${extraClasses}`} ref={headerSearchRef}>
    <div className={"headerSearch__searchbar"}>
      <Searchbar
        name={name}
        initialValue={initialValue}
        onChange={debouncedHandleInputChange}
        onSubmit={handleInputSubmit}
        placeholder={placeholder}
        isNeedSubmitBtn={isNeedSubmitBtn}
        extraClasses={searchbarExtraClasses}
        ref={searchbarRef}
        onReset={handleInputReset}
        isDisabled={isLoading}
        onFocus={handleInputFocus}
      />
    </div>
    <div className={"headerSearch__suggests"}>
      {isSuggestsVisible && <div className={"headerSearch__suggestsWrapper"}>
        {(!isLoading && isError) && <div>Что-то пошло не так, попробуйте позже</div>}
        {(!isLoading && !isError && !!suggests.length) && <ul className={"headerSearch__suggestsList"}>
          {suggests.map((suggest, index) => {
            return <li key={index} className={"headerSearch__suggestsItem"}>
              <a
                className={"headerSearch__suggestLink"}
                onClick={(e) => handleSuggestionClick(e, generatePath(ROUTE_PATHS.filmDetailed, {filmId: suggest.kinopoiskId.toString()}))}>
                <div className={"flex flex-col text-start"}>
                  <p>
                    <span className={"font-bold"}>{getFilmDisplayedName(suggest.nameRu, suggest.nameEn, suggest.nameOriginal)}</span>
                  </p>
                  {(!!suggest.ratingKinopoisk || suggest.year || suggest.countries.length) && <p className={""}>
                    {!!suggest.ratingKinopoisk && <span className={"font-bold mr-4"}>{suggest.ratingKinopoisk}</span>}
                    {getSuggestExtraParams(suggest)}
                  </p>}
                </div>
              </a>
            </li>
          })}
        </ul>}
        {(!isLoading && !isError && !suggests.length) && <div className={"headerSearch__noResult"}>
          Результатов не найдено, попробуйте изменить параметры поиска
        </div>}
      </div>}
    </div>
  </div>
}
