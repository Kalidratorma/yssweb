import {Contract} from "./contract";
import {User} from "./user";
import {Person} from "./person";
import {Player} from "./player";

/**
 * Родитель (клиент)
 */
export class Parent extends Person {

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
  contracts: Set<Contract>;

  /**
   * Игроки
   */
  playerList: Set<Player>;

  constructor(surname: string, name: string, patronymic: string, sex: string, birthDate: string, email: string, phoneNumber: string, photo: string, id: number, user: User, contracts: Set<Contract>, playerList: Set<Player>) {
    super(surname, name, patronymic, sex, birthDate, email, phoneNumber, photo);
    this.id = id;
    this.user = user;
    this.contracts = contracts;
    this.playerList = playerList;
  }
}
