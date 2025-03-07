import {ProfessionKeys} from "#shared/api/staffTypes.ts";

type professionConst = {
  [key: keyof typeof ProfessionKeys]: [ string, string ]
}

const PROFESSIONS: professionConst = {
  [ProfessionKeys.WRITER]: ["Сценарист", "Сценаристы"],
  [ProfessionKeys.OPERATOR]: ["Оператор", "Операторы"],
  [ProfessionKeys.EDITOR]: ["Монтажер", "Монтажеры"],
  [ProfessionKeys.COMPOSER]: ["Композитор", "Композиторы"],
  [ProfessionKeys.PRODUCER_USSR]: ["Продюсер", "Продюсеры"],
  [ProfessionKeys.TRANSLATOR]: ["Переводчик", "Переводчики"],
  [ProfessionKeys.DIRECTOR]: ["Режиссер", "Режиссеры"],
  [ProfessionKeys.DESIGN]: ["Художник", "Художники"],
  [ProfessionKeys.PRODUCER]: ["Продюсер", "Продюсеры"],
  [ProfessionKeys.ACTOR]: ["Актёр", "Актёры"],
  [ProfessionKeys.VOICE_DIRECTOR]: ["Режиссер дубляжа", "Режиссеры дубляжа"],
  [ProfessionKeys.UNKNOWN]: ["Низвестно", "Низвестно"],
}

export {
  PROFESSIONS,
}
