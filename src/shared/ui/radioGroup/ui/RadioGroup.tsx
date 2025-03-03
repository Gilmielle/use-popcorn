import {useEffect, useState} from "react";
import "../style.css"

interface RadioProps {
  label: string,
  value: string | number,
}

interface OnRadioChangeArgProps extends RadioProps {
  name: string,
  isChecked: boolean,
}

interface RadioGroupProps {
  name: string,
  options: Array<RadioProps>,
  onRadioChange?: (radio: OnRadioChangeArgProps) => void,
  checkedValue?: string,
}

export const RadioGroup = ({ name, options, checkedValue, onRadioChange }: RadioGroupProps) => {
  const [ radios, setRadios ] = useState([])


  useEffect(() => {
    const adaptedOptions = options.map((option) => {
      return {
        name: name,
        value: option.value,
        label: option.label,
        isChecked: option.value === checkedValue,
      }
    })
    setRadios(adaptedOptions)
  }, [checkedValue, name, options])

  const handleRadioChange = (changedRadio) => {
    const updatedRadios = radios.map((radio) => {
      return {
        ...radio,
        isChecked: radio.value === changedRadio.value,
      }
    })

    setRadios(updatedRadios);
    if (typeof onRadioChange === "function") {
      onRadioChange(changedRadio)
    }
  }

  return <ul className={"radioGroup"}>
    {radios.map((radio, index) => {
      return <li key={index} className={"radioGroup__item"}>
        <label className={"radioGroup__itemWrapper"}>
          <input
            className={"radioGroup__itemInput"}
            type={"radio"}
            name={radio.name}
            value={radio.value}
            checked={radio.isChecked}
            onChange={() => handleRadioChange(radio)}
          />
          <span className={"radioGroup__itemEmulator"}/>
          <span className={"radioGroup__itemLabel"}>
            {radio.label}
          </span>
        </label>
      </li>
    })}
  </ul>
}
