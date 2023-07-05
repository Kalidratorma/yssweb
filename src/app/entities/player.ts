import {Contract} from "./contract";
import {Parent} from "./parent";
import {Physiology} from "./physiology";
import {Position} from "./position";
import {Stat} from "./stat";
import {Person} from "./person";
import {TeamYear} from "./team-year";

/**
 * Спортсмен
 */
export interface Player extends Person {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Ограничения
   */
  restrictions?: string;

  /**
   * Родители
   */
  parents: Parent[];

  /**
   * Игровой номер
   */
  number?: number;

  /**
   * Год команды
   */
  teamYear?: TeamYear;

  /**
   * Амплуа/позиция
   */
  position?: Position;

  /**
   * Договора
   */
  contract?: Contract;

  /**
   * Физиология
   */
  physiologyList?: Physiology[];

  /**
   * Статистика
   */
  stats?: Stat[];
}
