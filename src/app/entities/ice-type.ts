/**
 * Тип льда
 */
export enum IceType {
  /**
   * Весь лёд
   */
  FULL="FULL",

  /**
   * Половина льда
   */
  HALF="HALF",

  /**
   * Четверть льда
   */
  QUARTER="QUARTER",

  /**
   * Поперек
   */
  CROSS="CROSS"
}

export function getIceTypeMap(): Map<IceType, string> {
  let newMap = new Map<IceType, string>;

  newMap.set(IceType.FULL, "Весь лёд");
  newMap.set(IceType.HALF, "Половина льда");
  newMap.set(IceType.QUARTER, "Четверть льда");
  newMap.set(IceType.CROSS, "Поперек");

  return newMap;
}
