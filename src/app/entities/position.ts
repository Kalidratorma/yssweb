/**
 * Амплуа/Позиция
 */
export class Position {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Сокращенное название
   */
  shortName: string;

  /**
   * Расширенное название
   */
  name: string;

  constructor(id: number, shortName: string, name: string) {
    this.id = id;
    this.shortName = shortName;
    this.name = name;
  }
}
