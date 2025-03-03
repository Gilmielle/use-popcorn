import {StoreType} from "#app/providers/StoreProvider/model/store.ts";
import {useContext, useMemo, useState} from "react";
import {StoreContext} from "#shared/config/storeContext.ts";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/accordion"
import {RadioGroup} from "#shared/ui/radioGroup/index.ts";
import {
  getAdaptedAccordionData,
  getAdaptedData,
  getAdaptedOrderSelectOptions, getAdaptedTypeSelectOptions
} from "#widgets/filmsList/lib/getAdaptedData.ts";
import Select from "react-select";
import {FILTER_SELECT_NAMES} from "#shared/lib/constants/index.ts";

export const FilmsFilter = () => {
  const store: StoreType = useContext(StoreContext);
  const {
    countries,
    genres,
    filterParams,
    setFilterParams,
    clearFilterParams,
  } = store;

  const accordionData = useMemo(() => getAdaptedAccordionData(genres, countries), [ genres, countries ])
  const orderSelectOptions = useMemo(() => getAdaptedOrderSelectOptions(filterParams), [])
  const typeSelectOptions = useMemo(() => getAdaptedTypeSelectOptions(filterParams), [])

  const [selectedOrderOption, setSelectedOrderOption] = useState(orderSelectOptions.defaultOption);
  const [selectedTypeOption, setSelectedTypeOption] = useState(typeSelectOptions.defaultOption);

  const handleRadioChange = (checkedRadio) => {
    setFilterParams({
      [checkedRadio.name]: checkedRadio.value,
      page: 1
    })
  }

  const handleReset = () => {
    clearFilterParams();

    setSelectedOrderOption(orderSelectOptions.resetOption);
    setSelectedTypeOption(typeSelectOptions.resetOption);
  }

  const handleSelectChange = (selectName, option, setValueFn) => {
    setValueFn(option);

    setFilterParams({
      [selectName]: option.value,
    })
  }

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

    {/*<label className={"flex flex-col gap-8"}>*/}
    {/*  <span className={"text-white text-lg font-bold"}>Рейтинг:</span>*/}
    {/*  <Slider defaultValue={[0, 10]} min={0} max={10} />*/}
    {/*</label>*/}

    <button className={"bg-amber-400 p-16 w-100/100 rounded-lg font-bold text-lg"} onClick={handleReset}>
      Сбросить
    </button>
  </div>
}
