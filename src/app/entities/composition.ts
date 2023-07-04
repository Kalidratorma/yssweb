import {Unit} from "./unit";
import {Team} from "./team";

/**
 * Состав
 */
export interface Composition {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Номер состава
   */
  compositionNumber: number;

  /**
   * Звенья
   */
  units: Unit[];

  /**
   * Команда
   */
  team: Team;
}
