import {StoreType} from "#app/providers/StoreProvider/model/store.ts";
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {StoreContext} from "#shared/config/storeContext.ts";
import {Accordion, AccordionButton, AccordionItem, AccordionPanel,} from "@chakra-ui/accordion"
import {RadioGroup} from "#shared/ui/radioGroup/index.ts";
import {
  getAdaptedOrderSelectOptions,
  getAdaptedRadioData,
  getAdaptedTypeSelectOptions
} from "#widgets/filmsList/lib/getAdaptedData.ts";
import Select from "react-select";
import {
  FILTER_RANGE_SLIDER_NAMES,
  FILTER_SELECT_NAMES,
  RATING_VALUES,
  YEAR_MIN_MAX_VALUES,
  YEAR_VALUES
} from "#shared/lib/constants/index.ts";
import {RangeSlider} from "#shared/ui/rangeSlider/index.ts";
import {rangeSliderNames} from "#shared/ui/rangeSlider/model/types.ts";
import {getDebouncedFn} from "#shared/lib/utils/index.ts";
import {FilmsRatingKeys, FilmsYearKeys} from "#shared/api/filmTypes.ts";
import {Searchbar} from "#shared/ui/searchbar/index.ts";

export const FilmsFilter = () => {
  const store: StoreType = useContext(StoreContext);
  const {
    countries,
    genres,
    filterParams,
    setFilterParams,
    clearFilterParams,
  } = store;
  const searchbarContainerRef = useRef(document.getElementById("header-searchbar"));
  const [ filteredGenres, setFilteredGenres ] = useState(genres ?? []);
  const [ filteredCountries, setFilteredCountries ] = useState(countries ?? []);

  const orderSelectOptions = useMemo(() => getAdaptedOrderSelectOptions(filterParams), [])
  const typeSelectOptions = useMemo(() => getAdaptedTypeSelectOptions(filterParams), [])

  const [selectedOrderOption, setSelectedOrderOption] = useState(orderSelectOptions.defaultOption);
  const [selectedTypeOption, setSelectedTypeOption] = useState(typeSelectOptions.defaultOption);

  const ratingRangeSliderRef = useRef(null)
  const ratingRangeSliderInitialValues = useMemo(() => {
    return {
      min: Number(filterParams[FilmsRatingKeys.ratingFrom] ? filterParams[FilmsRatingKeys.ratingFrom] : RATING_VALUES.min),
      max: Number(filterParams[FilmsRatingKeys.ratingTo] ? filterParams[FilmsRatingKeys.ratingTo] : RATING_VALUES.max),
    }
  }, [filterParams])

  const yearRangeSliderRef = useRef(null)
  const yearRangeSliderInitialValues = useMemo(() => {
    return {
      min: Number(filterParams[FilmsYearKeys.yearFrom] ? filterParams[FilmsYearKeys.yearFrom] : YEAR_VALUES.min),
      max: Number(filterParams[FilmsYearKeys.yearTo] ? filterParams[FilmsYearKeys.yearTo] : YEAR_VALUES.max),
    }
  }, [filterParams])

  useEffect(() => {
    searchbarContainerRef.current = document.getElementById("header-searchbar");
  }, []);

  useEffect(() => {
    setFilteredGenres(genres)
  }, [genres]);

  useEffect(() => {
    setFilteredCountries(countries)
  }, [countries]);

  const handleRadioChange = (checkedRadio) => {
    setFilterParams({
      [checkedRadio.name]: checkedRadio.value,
      page: 1
    })
  }

  const handleReset = useCallback(() => {
    clearFilterParams();

    setSelectedOrderOption(orderSelectOptions.resetOption);
    setSelectedTypeOption(typeSelectOptions.resetOption);

    if(ratingRangeSliderRef.current && typeof ratingRangeSliderRef.current.reset === "function") {
      ratingRangeSliderRef.current.reset()
    }
    if(yearRangeSliderRef.current && typeof yearRangeSliderRef.current.reset === "function") {
      yearRangeSliderRef.current.reset()
    }
  }, [clearFilterParams, orderSelectOptions.resetOption, typeSelectOptions.resetOption]);

  const handleSelectChange = useCallback((selectName, option, setValueFn) => {
    setValueFn(option);

    setFilterParams({
      [selectName]: option.value,
    })
  }, [setFilterParams]);

  const handleRangeSliderChange = useCallback((rangeValue: Array<number>, names: rangeSliderNames) => {
    const [ nameFrom, nameTo ] = names

    setFilterParams({
      [nameFrom]: rangeValue[0],
      [nameTo]: rangeValue[1],
    })
  }, [setFilterParams]);

  const debouncedHandleRangeSliderChange = getDebouncedFn(handleRangeSliderChange)

  const handleSearchRadios = useCallback((value, name) => {
    const searchValue = value.trim().toLowerCase()
    if(name === "genres") {
      const newGenres = genres.filter((genreItem) => {
        return genreItem.genre.toLowerCase().includes(searchValue)
      })
      setFilteredGenres(newGenres)
    }
    if (name === "countries") {

      const newCountries = countries.filter((countryItem) => {
        return countryItem.country.toLowerCase().includes(searchValue)
      })
      setFilteredCountries(newCountries)
    }
  }, [countries, genres])

  const handleSearchRadiosReset = useCallback((name) => {
    if(name === "genres") {
      setFilteredGenres(genres)
    }
    if (name === "countries") {
      setFilteredCountries(countries)
    }
  }, [countries, genres])

  return <div className={"filmsFilter p-24 rounded-lg space-y-24"}>
    <Accordion allowToggle>

      <AccordionItem>
        <h2 className={"font-bold text-white text-xl"}>
          <AccordionButton>Жанры <span className={"chakra-accordion__icon"} /></AccordionButton>
        </h2>
        <AccordionPanel>
          <Searchbar
            name={"genres"}
            initialValue={""}
            placeholder={"Введите жанр"}
            onChange={handleSearchRadios}
            onReset={handleSearchRadiosReset}
            extraClasses={"searchbar--isSmall"}
            isNeedSubmitBtn={false}
          />
          {filteredGenres.length ?
            <RadioGroup
              name={"genres"}
              options={getAdaptedRadioData(filteredGenres, "genre")}
              onRadioChange={handleRadioChange}
              checkedValue={filterParams.genres?.toString() ?? null}
            /> :
            <p>К сожалению, опции отсустствуют</p>
          }
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2 className={"font-bold text-white text-xl"}>
          <AccordionButton>Страны <span className={"chakra-accordion__icon"} /></AccordionButton>
        </h2>
        <AccordionPanel>
          <Searchbar
            name={"countries"}
            initialValue={""}
            placeholder={"Введите страну"}
            onChange={handleSearchRadios}
            onReset={handleSearchRadiosReset}
            extraClasses={"searchbar--isSmall"}
            isNeedSubmitBtn={false}
          />
          {filteredCountries.length ?
            <RadioGroup
              name={"countries"}
              options={getAdaptedRadioData(filteredCountries, "country")}
              onRadioChange={handleRadioChange}
              checkedValue={filterParams.countries?.toString() ?? null}
            /> :
            <p>К сожалению, опции отсустствуют</p>
          }
        </AccordionPanel>
      </AccordionItem>
    </Accordion>

    <label className={"flex flex-col gap-8"}>
      <span className={"text-white text-lg font-bold"}>Сортировать по:</span>
      <Select
        name={FILTER_SELECT_NAMES.order}
        options={orderSelectOptions.options}
        value={selectedOrderOption}
        onChange={(option) => handleSelectChange(FILTER_SELECT_NAMES.order, option, setSelectedOrderOption)}
      />
    </label>

    <label className={"flex flex-col gap-8"}>
      <span className={"text-white text-lg font-bold"}>Тип:</span>
      <Select
        name={FILTER_SELECT_NAMES.type}
        options={typeSelectOptions.options}
        value={selectedTypeOption}
        onChange={(option) => handleSelectChange(FILTER_SELECT_NAMES.type, option, setSelectedTypeOption)}
      />
    </label>

    <div className={"flex flex-col gap-8"}>
      <label className={"text-white text-lg font-bold"}>Рейтинг:</label>
      <RangeSlider
        names={[ FILTER_RANGE_SLIDER_NAMES.rating.ratingFrom, FILTER_RANGE_SLIDER_NAMES.rating.ratingTo ]}
        min={RATING_VALUES.min}
        max={RATING_VALUES.max}
        initialValue={[ratingRangeSliderInitialValues.min, ratingRangeSliderInitialValues.max]}
        onValueChange={debouncedHandleRangeSliderChange}
        ref={ratingRangeSliderRef}
      />
    </div>

    <div className={"flex flex-col gap-8"}>
      <label className={"text-white text-lg font-bold"}>Год:</label>
      <RangeSlider
        names={[ FILTER_RANGE_SLIDER_NAMES.year.yearFrom, FILTER_RANGE_SLIDER_NAMES.year.yearTo ]}
        min={YEAR_MIN_MAX_VALUES.min}
        max={YEAR_MIN_MAX_VALUES.max}
        initialValue={[yearRangeSliderInitialValues.min, yearRangeSliderInitialValues.max]}
        onValueChange={debouncedHandleRangeSliderChange}
        ref={yearRangeSliderRef}
      />
    </div>

    <button className={"bg-amber-400 p-16 w-100/100 rounded-lg font-bold text-lg"} onClick={handleReset}>
      Сбросить
    </button>
  </div>
}
