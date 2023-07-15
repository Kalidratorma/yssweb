import {Game} from "./game";
import {GameEndEnum} from "./game-end-enum";
import {ContentFile} from "./content-file";

/**
 * Статистика игры
 */
export class StatGame {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Игра
   */
  game: Game;

  /**
   * Тип окончания игры (основное время, овертайм, буллиты)
   */
  gameEndType: GameEndEnum;

  /**
   * Общее количество набранных очков
   */
  points: number;

  /**
   * Количество заброшенных шайб
   */
  goals: number;

  /**
   * Количество пропущенных шайб
   */
  goalsAgainst: number;

  /**
   * Общее количество заброшенных и пропущенных шайб
   */
  totalGoals: number;

  /**
   * Количество минут штрафа
   */
  penaltiesInMinutes: number;

  /**
   * Количество минут штрафа соперника
   */
  penaltiesInMinutesAgainst: number;

  /**
   * Список файлов с протоколом
   */
  protocolFiles: ContentFile[];

  constructor(id: number,
              game: Game,
              gameEndType: GameEndEnum,
              points: number,
              goals: number,
              goalsAgainst: number,
              totalGoals: number,
              penaltiesInMinutes: number,
              penaltiesInMinutesAgainst: number,
              protocolFiles: ContentFile[]) {
    this.id = id;
    this.game = game;
    this.gameEndType = gameEndType;
    this.points = points;
    this.goals = goals;
    this.goalsAgainst = goalsAgainst;
    this.totalGoals = totalGoals;
    this.penaltiesInMinutes = penaltiesInMinutes;
    this.penaltiesInMinutesAgainst = penaltiesInMinutesAgainst;
    this.protocolFiles = protocolFiles;
  }
}
