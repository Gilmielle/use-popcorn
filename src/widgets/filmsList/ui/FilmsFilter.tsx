import {StoreType} from "#app/providers/StoreProvider/model/store.ts";
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {StoreContext} from "#shared/config/storeContext.ts";
import {Accordion, AccordionButton, AccordionItem, AccordionPanel,} from "@chakra-ui/accordion"
import {RadioGroup} from "#shared/ui/radioGroup/index.ts";
import {
  getAdaptedAccordionData,
  getAdaptedData,
  getAdaptedOrderSelectOptions,
  getAdaptedTypeSelectOptions
} from "#widgets/filmsList/lib/getAdaptedData.ts";
import Select from "react-select";
import {
  FILTER_RANGE_SLIDER_NAMES,
  FILTER_SELECT_NAMES,
  RATING_VALUES, SEARCH_INPUT_NAME, YEAR_MIN_MAX_VALUES,
  YEAR_VALUES
} from "#shared/lib/constants/index.ts";
import {RangeSlider} from "#shared/ui/rangeSlider/index.ts";
import {rangeSliderNames} from "#shared/ui/rangeSlider/model/types.ts";
import {getDebouncedFn} from "#shared/lib/utils/index.ts";
import {filmsRatingKeys, filmsYearKeys} from "#shared/api/filmsList.ts";
import {createPortal} from "react-dom";
import {Searchbar} from "#shared/ui/searchbar/index.ts";
import {ErrorBoundary} from "react-error-boundary";

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
  const accordionData = useMemo(() => getAdaptedAccordionData(genres, countries), [ genres, countries ])

  const orderSelectOptions = useMemo(() => getAdaptedOrderSelectOptions(filterParams), [])
  const typeSelectOptions = useMemo(() => getAdaptedTypeSelectOptions(filterParams), [])

  const [selectedOrderOption, setSelectedOrderOption] = useState(orderSelectOptions.defaultOption);
  const [selectedTypeOption, setSelectedTypeOption] = useState(typeSelectOptions.defaultOption);

  const ratingRangeSliderRef = useRef(null)
  const ratingRangeSliderInitialValues = useMemo(() => {
    return {
      min: Number(filterParams[filmsRatingKeys.ratingFrom] ? filterParams[filmsRatingKeys.ratingFrom] : RATING_VALUES.min),
      max: Number(filterParams[filmsRatingKeys.ratingTo] ? filterParams[filmsRatingKeys.ratingTo] : RATING_VALUES.max),
    }
  }, [filterParams])

  const yearRangeSliderRef = useRef(null)
  const yearRangeSliderInitialValues = useMemo(() => {
    return {
      min: Number(filterParams[filmsYearKeys.yearFrom] ? filterParams[filmsYearKeys.yearFrom] : YEAR_VALUES.min),
      max: Number(filterParams[filmsYearKeys.yearTo] ? filterParams[filmsYearKeys.yearTo] : YEAR_VALUES.max),
    }
  }, [filterParams])

  useEffect(() => {
    searchbarContainerRef.current = document.getElementById("header-searchbar");
  }, []);

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

  const handleSearchSubmit = useCallback((value, name) => {
    setFilterParams({
      [name]: value,
    })
  }, [setFilterParams])

  return <div className={"filmsFilter p-24 rounded-lg space-y-24"}>
    <Accordion allowToggle>
      {accordionData.map((accordionItem, index) => {
        if(!accordionItem.options.length) {
          return null;
        }
        const radioGroupOptions = getAdaptedData(accordionItem.options, accordionItem.optionLabelProp)

        return <AccordionItem key={index}>
          <h2 className={"font-bold text-white text-xl"}>
            <AccordionButton>{accordionItem.label} <span className={"chakra-accordion__icon"} /></AccordionButton>
          </h2>
          <AccordionPanel>
            <RadioGroup
              name={accordionItem.name}
              options={radioGroupOptions}
              onRadioChange={handleRadioChange}
              checkedValue={filterParams[accordionItem.name] ?? null}
            />
          </AccordionPanel>
        </AccordionItem>
      })}
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
    {!!searchbarContainerRef.current && <ErrorBoundary fallback={<p>Here should be searchbar</p>}>
      {createPortal(<Searchbar
        name={SEARCH_INPUT_NAME}
        initialValue={filterParams.keyword ? filterParams.keyword : ""}
        onSubmit={handleSearchSubmit}
        placeholder={"Введите название фильма"}
      />, searchbarContainerRef.current)}
    </ErrorBoundary>}

    <button className={"bg-amber-400 p-16 w-100/100 rounded-lg font-bold text-lg"} onClick={handleReset}>
      Сбросить
    </button>
  </div>
}
