import {Contract} from "./contract";
import {User} from "./user";
import {Person} from "./person";

export interface Coach extends Person {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Образование
   */
  education: string;

  /**
   * Договор
   */
  contract: Contract;

  /**
   * Тип тренера
   */
  coachType: string;

  /**
   * Пользователь
   */
  user: User;
}
