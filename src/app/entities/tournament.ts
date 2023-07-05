import {TournamentEnum} from "./tournament-enum";

/**
 * Турнир
 */
export class Tournament {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Название турнира
   */
  name: string;

  /**
   * Контакты организаторов
   */
  phoneNumber: string;

  /**
   * Электронная почта
   */
  email: string;

  /**
   * ФИО организатора
   */
  fullName: string;

  /**
   * Ссылка на сайт
   */
  siteUrl: string;

  /**
   * Ссылка на Youtube
   */
  youtubeUrl: string;

  /**
   * Тип турнира
   */
  type: TournamentEnum;

  /**
   * Примечание
   */
  note: string

  constructor(id: number, name: string, phoneNumber: string, email: string, fullName: string, siteUrl: string, youtubeUrl: string, type: TournamentEnum, note: string) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.fullName = fullName;
    this.siteUrl = siteUrl;
    this.youtubeUrl = youtubeUrl;
    this.type = type;
    this.note = note;
  }
}
