import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";
import "../style.css"
import {ChangeEvent, forwardRef, useCallback, useImperativeHandle, useState} from "react";
import {rangeSliderNames} from "../model/types.ts";

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

  const handleSliderChange = useCallback((value: Array<number>) => {
    setRangeValue(value);
    if (typeof onValueChange === "function") {
      onValueChange(value, names);
    }
  }, [onValueChange, names]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, rangePosition: string) => {
    const { target } = e;
    let newValue = Number(target.value);

    if (isNaN(newValue)) return;
    newValue = Math.min(Math.max(newValue, min), max);

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
      <input
        className="basis-48/100 max-w-48/100 bg-white px-16 py-8 rounded-md"
        type="text"
        value={rangeValue[0]}
        onChange={(e) => handleInputChange(e, "min")}
      />
      <input
        className="basis-48/100 max-w-48/100 bg-white px-16 py-8 rounded-md"
        type="text"
        value={rangeValue[1]}
        onChange={(e) => handleInputChange(e, "max")}
      />
    </div>
  </div>
});
