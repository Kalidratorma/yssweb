/**
 * Физическое лицо
 */
export interface Person {

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
}
