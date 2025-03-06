import {forwardRef, useImperativeHandle, useRef, useState} from "react";
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
  onReset?: (name: string) => void,
  onFocus?: (value: string) => void,
  onBlur?: () => void,
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
  onFocus,
  onBlur,
  isNeedSubmitBtn = true,
  isDisabled = false,
}: SearchbarProps, ref) => {
  const [value, setValue] = useState(initialValue)
  const searchbarRef = useRef(null)
  const searchbarInputRef = useRef(null)

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
    if (typeof onReset === "function") {
      onReset(name)
    }
  }

  const handleFocus = () => {
    if (typeof onFocus === "function") {
      onFocus(value)
    }
  }

  const handleBlur = () => {
    if (typeof onBlur === "function") {
      onBlur()
    }
  }

  useImperativeHandle(ref,() => {
    return {
      current: searchbarRef.current,
      reset: () => handleReset(),
      blur: () => searchbarInputRef.current.blur()
    }
  })

  return <div className={`searchbar ${extraClasses}`} ref={searchbarRef}>
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={searchbarInputRef}
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

Searchbar.displayName = "Searchbar"
