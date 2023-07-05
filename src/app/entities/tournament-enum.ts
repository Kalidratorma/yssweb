/**
 * Тип турнира
 */
export enum TournamentEnum {

  /**
   * Коммерческий
   */
  COMMERCIAL = "COMMERCIAL",

  /**
   * Официальный
   */
  OFFICIAL = "OFFICIAL"
}

/**
 * Возвращает отображение содержащее
 * весь набор значений перечисления
 */
export function getTournamentEnumMap(): Map<TournamentEnum, string> {
  let map = new Map<TournamentEnum, string>();

  map.set(TournamentEnum.COMMERCIAL, "Коммерческий");
  map.set(TournamentEnum.OFFICIAL, "Официальный");

  return map;
}
