import {Coach} from ".";

/**
 * Формат тренировки
 */
export class TrainingFormat {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Наименование
   */
  name: String;

  /**
   * Краткое наименование
   */
  shortName: String;

  /**
   * Описание
   */
  description: String;

  /**
   * Тренера
   */
  coaches: Set<Coach>;


  constructor(id: number, name: String, shortName: String, description: String, coaches: Set<Coach>) {
    this.id = id;
    this.name = name;
    this.shortName = shortName;
    this.description = description;
    this.coaches = coaches;
  }
}
