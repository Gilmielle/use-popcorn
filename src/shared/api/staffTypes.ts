export enum ProfessionKeys {
  WRITER = "WRITER", // Сценарист
  OPERATOR = "OPERATOR", // Оператор
  EDITOR = "EDITOR", // Монтажер
  COMPOSER = "COMPOSER", // Композитор
  PRODUCER_USSR = "PRODUCER_USSR",
  TRANSLATOR = "TRANSLATOR",
  DIRECTOR = "DIRECTOR", // Режиссер
  DESIGN = "DESIGN", // Художник
  PRODUCER = "PRODUCER", // Продюсер
  ACTOR = "ACTOR", // Актёр
  VOICE_DIRECTOR = "VOICE_DIRECTOR", // Режиссер дубляжа
  UNKNOWN = "UNKNOWN",
}

export interface Staff {
  staffId: number,
  nameRu?: string,
  nameEn?: string,
  description?: string,
  posterUrl: string,
  professionText: string,
  professionKey: ProfessionKeys,
}
