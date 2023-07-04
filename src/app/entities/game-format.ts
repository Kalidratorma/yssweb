import {IceType} from "./ice-type";

/**
 * Формат игры
 */
export interface GameFormat {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Название формата
   */
  name: String;

  /**
   * Коммерческая/некоммерческая игра
   */
  isCommercial: Boolean

  /**
   * Тип льда
   */
  iceType: IceType;

  /**
   * Количество игроков в команде
   */
  numberOfPlayers: number;
}
