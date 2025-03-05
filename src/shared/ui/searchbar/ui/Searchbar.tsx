import {forwardRef, useImperativeHandle, useState} from "react";
import IconSearch from "#public/icon-search.svg?react"
import IconClose from "#public/icon-close.svg?react"
import "../style.css";

export interface SearchbarProps {
  extraClasses?: string,
  name: string,
  initialValue: string,
  placeholder: string,
  onSubmit?: (value: string, name: string) => void,
  onChange?: (value: string, name: string) => void,
  onReset?: () => void,
  isNeedSubmitBtn?: boolean,
  isDisabled?: boolean,
}

export const Searchbar = forwardRef(({
  extraClasses = "",
  name = "",
  initialValue = "",
  placeholder = "",
  onSubmit,
  onChange,
  onReset,
  isNeedSubmitBtn = true,
  isDisabled = false,
}: SearchbarProps, ref) => {
  const [value, setValue] = useState(initialValue)

  const handleSubmit = () => {
    if (typeof onSubmit === "function") {
      onSubmit(value, name)
    }
  }
  const handleKeyUp = (e) => {
    if(e.key === "Enter") {
      if (typeof onSubmit === "function") {
        onSubmit(value, name)
      }
    }
  }

  const handleChange = (e) => {
    const { target } = e
    setValue(target.value)
    if (typeof onChange === "function") {
      onChange(target.value, name)
    }
  }

  const handleReset = () => {
    setValue("")
    if(isNeedSubmitBtn) {
      if (typeof onSubmit === "function") {
        onSubmit("", name)
      }
    } else {
      if (typeof onChange === "function") {
        onChange("", name)
      }
    }
    if (typeof onReset === "function") {
      onReset()
    }
  }

  useImperativeHandle(ref,() => {
    return {
      reset: () => handleReset(),
    }
  })

  return <div className={`searchbar ${extraClasses}`}>
    {!!isNeedSubmitBtn && <div className={"searchbar__submitBtn"}>
      <button type={"submit"} onClick={handleSubmit}>
        <IconSearch/>
      </button>
    </div>}
    <div className={"searchbar__inputWrapper"}>
      <input
        className={"searchbar__input"}
        type={"text"}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyUp={handleKeyUp}
        disabled={isDisabled}
      />
      <button
        type={"button"}
        onClick={handleReset}
        className={`searchbar__resetBtn ${value.length ? "isShown" : ""}`}
      >
        <IconClose/>
      </button>
    </div>
  </div>
})
