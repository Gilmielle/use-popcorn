import {ProfessionKeys, Staff} from "#shared/api/staffTypes.ts";
import {PROFESSIONS} from "#shared/lib/constants/index.ts";

type staffMapType = Map<keyof typeof ProfessionKeys, Array<Staff>>
export const getFilmStaffAdaptedList = (staff: Array<Staff>): {[p: keyof typeof ProfessionKeys]: Array<Staff>} => {
  const staffMap: staffMapType = new Map();

  staff.forEach((staffItem) => {
    const professionNamesKey = PROFESSIONS[staffItem.professionKey] ? staffItem.professionKey : ProfessionKeys.UNKNOWN
    if (staffMap.has(professionNamesKey)) {
      staffMap.get(professionNamesKey).push(staffItem)
    } else {
      staffMap.set(professionNamesKey, [])
      staffMap.get(professionNamesKey).push(staffItem)
    }
  })

  return Object.fromEntries(staffMap.entries());
}
