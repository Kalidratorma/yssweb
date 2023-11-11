import {Coach, TeamYear, TrainingFormat} from ".";

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
  teamYear: TeamYear;

  /**
   * Дата и время тренировки
   */
  date: string;

  /**
   * Время тренировки (начало)
   */
  time: string;

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

  constructor(id: number, trainingFormat: TrainingFormat, team: TeamYear, date: string, time: string, duration: number, mainCoach: Coach, coaches: Set<Coach>) {
    this.id = id;
    this.trainingFormat = trainingFormat;
    this.teamYear = team;
    this.date = date;
    this.time = time;
    this.duration = duration;
    this.mainCoach = mainCoach;
    this.coaches = coaches;
  }
}
