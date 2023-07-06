import {Club} from "./club";
import {TeamYear} from "./team-year";

/**
 * Команда клуба соперников
 */
export class ClubTeam {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Клуб
   */
  club: Club;

  /**
   * Наименование команды
   */
  name: string;

  /**
   * Контакты
   */
  contacts: string;

  /**
   * Год команды
   */
  teamYear: TeamYear;


  constructor(id: number, club: Club, name: string, contacts: string, teamYear: TeamYear) {
    this.id = id;
    this.club = club;
    this.name = name;
    this.contacts = contacts;
    this.teamYear = teamYear;
  }
}
