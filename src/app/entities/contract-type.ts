/**
 * Тип договора
 */
export enum ContractType {

  /**
   * Клиент
   */
  CLIENT = "CLIENT",

  /**
   * Тренер
   */
  COACH = "COACH",

  /**
   * Контрагент
   */
  CONTRACTOR = "CONTRACTOR"
}

/**
 * Возвращает отображение содержащее
 * весь набор значений перечисления
 */
export function getContractTypeMap(): Map<ContractType, string> {
  let map = new Map<ContractType, string>();

  map.set(ContractType.CLIENT, "Клиент");
  map.set(ContractType.COACH, "Тренер");
  map.set(ContractType.CONTRACTOR, "Контрагент");

  return map;
}
