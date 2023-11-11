import {Coach, Team, TrainingFormat} from ".";
import {Time} from "@angular/common";

/**
 * Тренировка
 */
export class Training {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Формат тренировки
   */
  trainingFormat: TrainingFormat;

  /**
   * Команда
   */
  team: Team;

  /**
   * Дата и время тренировки
   */
  date: Date;

  /**
   * Время тренировки (начало)
   */
  time: Time;

  /**
   * Длительность тренировки в минутах
   */
  duration: number;

  /**
   * Главный тренер
   */
  mainCoach: Coach;

  /**
   * Помощники тренера
   */
  coaches: Set<Coach>;

  constructor(id: number, trainingFormat: TrainingFormat, team: Team, date: Date, time: Time, duration: number, mainCoach: Coach, coaches: Set<Coach>) {
    this.id = id;
    this.trainingFormat = trainingFormat;
    this.team = team;
    this.date = date;
    this.time = time;
    this.duration = duration;
    this.mainCoach = mainCoach;
    this.coaches = coaches;
  }
}
