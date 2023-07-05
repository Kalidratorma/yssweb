/**
 * Тип льда
 */
export enum IceType {
  /**
   * Весь лёд
   */
  FULL = "FULL",

  /**
   * Половина льда
   */
  HALF = "HALF",

  /**
   * Четверть льда
   */
  QUARTER = "QUARTER",

  /**
   * Поперек
   */
  CROSS = "CROSS"
}

/**
 * Возвращает отображение содержащее
 * весь набор значений перечисления
 */
export function getIceTypeMap(): Map<IceType, string> {
  let map = new Map<IceType, string>();

  map.set(IceType.FULL, "Весь лёд");
  map.set(IceType.HALF, "Половина льда");
  map.set(IceType.QUARTER, "Четверть льда");
  map.set(IceType.CROSS, "Поперек");

  return map;
}
