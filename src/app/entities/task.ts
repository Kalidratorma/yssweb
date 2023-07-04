import {Player} from "./player";
import {JustDate} from "./just-date";
import {Coach} from "./coach";
import {ContentFile} from "./сontent-file";

/**
 * Задание тренера
 */
export interface Task {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Наименование задания
   */
  name: string;

  /**
   * Текст задания
   */
  description: string;

  /**
   * Длительность задания в минутах
   */
  minutes: number;

  /**
   * Количество повторений
   */
  qty: number;

  /**
   * Ссылки на видео
   */
  videoLinks: ContentFile[];

  /**
   * Ссылки на фото
   */
  photoLinks: ContentFile[];

  /**
   * Расписание
   */
  schedule: JustDate[];

  /**
   * Игроки
   */
  players: Player[];

  /**
   * Тренер
   */
  coach: Coach;
}
