import {GameFormat} from "./game-format";
import {Composition} from "./composition";
import {Coach} from "./coach";
import {TeamYear} from "./team-year";

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
  teamYear: TeamYear;

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
