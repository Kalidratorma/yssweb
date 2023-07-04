import {GameFormat} from "./game-format";
import {Composition} from "./composition";
import {Coach} from "./coach";

/**
 * Команда
 */
export interface Team {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Название команды
   */
  name: String;

  /**
   * Год команды
   */
  teamYear: number;

  /**
   * Формат игры
   */
  gameFormat: GameFormat;

  /**
   * Главный тренер
   */
  headCoach: Coach;

  /**
   * Помощник главного тренера
   */
  assistantCoach: Coach;

  /**
   * Состав
   */
  unitList: Composition[];
}
