import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";
import "../style.css"
import {ChangeEvent, forwardRef, useCallback, useEffect, useImperativeHandle, useState} from "react";
import {rangeSliderNames} from "../model/types.ts";
import {getDebouncedFn} from "#shared/lib/utils/index.ts";
import {IMaskInput} from "react-imask";

interface RangeSliderProps {
  names: rangeSliderNames,
  min: number,
  max: number,
  initialValue: Array<number>,
  onValueChange?: (values: Array<number>, names: rangeSliderNames) => void,
}

export const RangeSlider = forwardRef(({
  names = "",
  min = 1,
  max = 10,
  initialValue = [1, 10],
  onValueChange,
}: RangeSliderProps, ref) => {
  const [ rangeValue, setRangeValue ] = useState<Array<number>>(initialValue)

  useImperativeHandle(
    ref,
    () => {
      return {
        reset: () => {
          setRangeValue([min, max]);
        }
      };
    },
    [min, max]
  );

  useEffect(() => {
    if (typeof onValueChange === "function") {
      onValueChange(rangeValue, names);
    }
  }, [rangeValue]);

  const handleSliderChange = useCallback((value: Array<number>) => {
    setRangeValue(value);

  }, [names]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, rangePosition: string) => {
    const { target } = e;
    const newValue = Number(target.value.replaceAll(" ", ""));

    if (isNaN(newValue)) return;

    setRangeValue(prevValue => {
      if (rangePosition === "min") {
        const newMinValue = Math.min(newValue, prevValue[1])
        const newMaxValue = Math.max(newValue, prevValue[1])
        return [newMinValue, newMaxValue];
      } else {
        const newMinValue = Math.min(newValue, prevValue[0])
        const newMaxValue = Math.max(newValue, prevValue[0])
        return [newMinValue, newMaxValue];
      }

    });
  };

  return <div className={"rangeSlider flex flex-col gap-8"}>
    <Root
      className={"rangeSlider__root"}
      defaultValue={[min, max]}
      value={rangeValue}
      min={min}
      max={max}
      step={1}
      minStepsBetweenThumbs={1}
      onValueChange={handleSliderChange}
    >
      <Track className={"rangeSlider__sliderTrack"}>
        <Range className={"rangeSlider__sliderRange"} />
      </Track>
      <Thumb className={"rangeSlider__sliderThumb"} aria-label="Volume" />
      <Thumb className={"rangeSlider__sliderThumb"} aria-label="Volume" />
    </Root>
    <div className={"rangeSlider__inputs flex flex-row gap-16"}>
      <IMaskInput
        className="basis-48/100 max-w-48/100 bg-white px-16 py-8 rounded-md"
        mask={Number}
        radix="."
        value={rangeValue[0].toString()}
        unmask={true}
        onBlur={(e) => handleInputChange(e, "min")}
        placeholder={min.toLocaleString("ru-RU")}
        padFractionalZeros={true}
        thousandsSeparator={" "}
        scale={0}
        min={min}
        max={max - 1}
        autofix={true}
      />
      <IMaskInput
        className="basis-48/100 max-w-48/100 bg-white px-16 py-8 rounded-md"
        mask={Number}
        radix="."
        value={rangeValue[1].toString()}
        unmask={true}
        onBlur={(e) => handleInputChange(e, "max")}
        placeholder={min.toLocaleString("ru-RU")}
        padFractionalZeros={true}
        thousandsSeparator={" "}
        scale={0}
        min={min + 1}
        max={max}
        autofix={true}
      />
    </div>
  </div>
});
