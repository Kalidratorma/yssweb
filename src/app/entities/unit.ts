import {Player} from "./player";

/**
 * Игровое Звено
 */
export interface Unit {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Номер состава
   */
  unitNumber: number;

  /**
   * Список игроков в звене
   */
  playerList: Player[];
}
