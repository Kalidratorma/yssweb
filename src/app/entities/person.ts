/**
 * Физическое лицо
 */
export class Person {

  /**
   * Фамилия
   */
  surname: string;

  /**
   * Имя
   */
  name: string;

  /**
   * Отчество
   */
  patronymic: string;

  /**
   * Пол
   */
  sex: string;

  /**
   * Дата рождения
   */
  birthDate: string;

  /**
   * Почта
   */
  email: string;

  /**
   * Телефон
   */
  phoneNumber: string;

  /**
   * Фото
   */
  photo: string;


  constructor(surname: string, name: string, patronymic: string, sex: string, birthDate: string, email: string, phoneNumber: string, photo: string) {
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;
    this.sex = sex;
    this.birthDate = birthDate;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.photo = photo;
  }
}
