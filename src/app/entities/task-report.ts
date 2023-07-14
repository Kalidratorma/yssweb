import {Task} from "./task";
import {Player} from "./player";
import {ContentFile} from "./content-file";

/**
 * Отчет по заданию тренера
 */
export interface TaskReport {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Дата отчета
   */
  reportDate: Date;

  /**
   * Задание тренера
   */
  task: Task;

  /**
   * Спортсмен
   */
  player: Player;

  /**
   * Дата задания
   */
  taskDate: string;

  /**
   * Текст отчета
   */
  report: String;

  /**
   * Список ссылок с фотографиями
   */
  photoLinks: ContentFile[];

  /**
   * Список видео ссылок
   */
  videoLinks: ContentFile[];
}
