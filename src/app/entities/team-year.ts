/**
 * Год команды
 */
export class TeamYear {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Год команды
   */
  year: number;

  /**
   * Название команды
   */
  teamName: string;

  /**
   * Примечание
   */
  note: string;

  constructor(id: number, year: number, teamName: string, note: string) {
    this.id = id;
    this.year = year;
    this.teamName = teamName;
    this.note = note;
  }
}
