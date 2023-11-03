import {Player} from "./player";

/**
 * Игровое Звено
 */
export class Unit {

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
  players: Set<Player>;

  constructor(id: number, unitNumber: number, players: Set<Player>) {
    this.id = id;
    this.unitNumber = unitNumber;
    this.players = players;
  }
}
