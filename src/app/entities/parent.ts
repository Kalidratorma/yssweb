import {Contract} from "./contract";
import {User} from "./user";
import {Person} from "./person";

/**
 * Родитель (клиент)
 */
export interface Parent extends Person {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Пользователь
   */
  user?: User;

  /**
   * Договора
   */
  contracts?: Contract[];
}
