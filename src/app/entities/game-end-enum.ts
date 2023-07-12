/**
 * Типы окончания игры
 */
export enum GameEndEnum {

  /**
   * Игра окончилась в основное время
   */
  REGULAR = "REGULAR",

  /**
   * Игра окончилась в дополнительное время
   */
  OVERTIME = "OVERTIME",

  /**
   * Игра окончилась по буллитам
   */
  SHOOTOUTS = "SHOOTOUTS"
}

/**
 * Возвращает отображение содержащее
 * весь набор значений перечисления
 */
export function getGameEndEnumMap(): Map<GameEndEnum, string> {
  let map = new Map<GameEndEnum, string>();

  map.set(GameEndEnum.REGULAR, "Основное время");
  map.set(GameEndEnum.OVERTIME, "Овертайм");
  map.set(GameEndEnum.SHOOTOUTS, "Буллиты");

  return map;
}
