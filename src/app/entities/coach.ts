import {Contract, Person, User} from ".";

export class Coach extends Person {

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

  constructor(surname: string, name: string, patronymic: string, sex: string, birthDate: string, email: string, phoneNumber: string, photo: string, id: number, education: string, contract: Contract, coachType: string, user: User) {
    super(surname, name, patronymic, sex, birthDate, email, phoneNumber, photo);
    this.id = id;
    this.education = education;
    this.contract = contract;
    this.coachType = coachType;
    this.user = user;
  }
}
