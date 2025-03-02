import {Film} from "#shared/api/filmsList.ts";
import {FixedLengthArray} from "#shared/lib/types.ts";

/**
 * Returns film name depending on what is present in data
 * @param props{Film}
 * @returns {String}
 */
export const getFilmDisplayedName = (props: Film): string => {
  switch (true) {
    case !!props.nameRu:
      return props.nameRu!;
    case !!props.nameOriginal:
      return props.nameOriginal!;
    case !!props.nameEn:
      return props.nameEn!;
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
