/**
 * Клуб соперника
 */
export class Club {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Наименование клуба соперника
   */
  name: string;

  /**
   * Сайт
   */
  siteUrl: string;

  /**
   * Контакты
   */
  contacts: string;


  constructor(id: number, name: string, siteUrl: string, contacts: string) {
    this.id = id;
    this.name = name;
    this.siteUrl = siteUrl;
    this.contacts = contacts;
  }
}
