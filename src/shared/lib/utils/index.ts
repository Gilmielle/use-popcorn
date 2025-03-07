import {FixedLengthArray} from "#shared/lib/types.ts";

type StringOrFalsy = string | null | undefined
/**
 * Returns film name depending on what is present in data
 * @param nameRu{StringOrFalsy}
 * @param nameEn{StringOrFalsy}
 * @param nameOriginal{StringOrFalsy}
 * @returns {String}
 */
export const getFilmDisplayedName = (nameRu?:	StringOrFalsy, nameEn?:	StringOrFalsy, nameOriginal?:	StringOrFalsy): string => {
  switch (true) {
    case !!nameRu:
      return nameRu!;
    case !!nameOriginal:
      return nameOriginal!;
    case !!nameEn:
      return nameEn!;
    default:
      return "—"
  }
};

/**
 * Defines the right word form suitable for number provided
 * @param number{Number} - number
 * @param declensions{[String]} - declensions
 * @returns {String}
 */
export function getWordDeclination(number: number, declensions: FixedLengthArray<[string, string, string]>) {
  const cases = [2, 0, 1, 1, 1, 2];
  return declensions[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
    ];
}

/**
 * Returns film length in human-understandable format
 * @param filmLength{number}
 * @returns {String}
 */
export const getFormattedFilmLength = (filmLength: number): string => {
  const minutesWords: FixedLengthArray<[string, string, string]> = ["минута", "минуты", "минут"] as FixedLengthArray<[string, string, string]>;
  const hoursWords: FixedLengthArray<[string, string, string]> = ["час", "часа", "часов"] as FixedLengthArray<[string, string, string]>;
  if (filmLength < 60) {
    return `${filmLength} ${getWordDeclination(filmLength, minutesWords)}`
  }
  const hours = Math.floor(filmLength / 60);
  const minutes = filmLength % 60;

  return `${hours} ${getWordDeclination(hours, hoursWords)} ${minutes} ${getWordDeclination(minutes, minutesWords)}`
}

/**
 * Gets a function that is executed no more than once in a specified period of time
 * @param cb{Function} - source function
 * @param wait{Number=} - interval of execution
 * @return {function}
 */
export const getDebouncedFn = (cb, wait = 250) => {
  let timeout;
  return function executedFunction() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const later = function () {
      timeout = null;
      cb.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
