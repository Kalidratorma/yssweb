import {Game} from "./game";
import {Player} from "./player";

/**
 * Статистика спортсмена за игру
 */
export class StatFieldPlayer {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Спортсмен
   */
  player: Player;

  /**
   * Игра
   */
  game: Game;

  /**
   * Дата
   */
  date: string;

  /**
   * Г (голы), или Ш (шайбы) / G (Goals)
   */
  goals: number;

  /**
   * П (голевые пасы / передачи), или А (ассистировал) / A (Assists)
   */
  assists: number;

  /**
   * О (очки) / Pts (Points) — сумма голов и голевых пасов
   */
  points: number;

  /**
   * Штр (штрафное время в минутах) / PIM (Penalties in minutes)
   */
  penalties: number;

  /**
   * +/- (плюс/минус, показатель полезности) / P/M (Plus/minus)
   */
  plusMinus: number;

  /**
   * ГБ (голы в большинстве) / PPG (Power play goals)
   */
  powerPlayGoals: number;

  /**
   * ПБ (голевые пасы в большинстве) / PPA (Power play assists)
   */
  powerPlayAssists: number;

  /**
   * ГМ (голы в меньшинстве) / SHG (Shorthanded goals)
   */
  shorthandedGoals: number;

  /**
   * ПМ (голевые пасы в меньшинстве) / SHA (Shorthanded assists)
   */
  shorthandedAssists: number;

  /**
   * ПГ (забил победный гол) / GWG (Game-winning goal) — решающие гол, например третий гол победителя при счёте 2:2.
   */
  isGameWinningGoals: boolean;

  /**
   * РБ (забил решающий послематчевый буллит) / GTG (Game-tying goal)
   */
  isGameTyingGoals: boolean;

  /**
   * ПВ (голы в пустые ворота) / ENG (Empty net goals)
   */
  emptyNetGoals: number;

  /**
   * ВП (общее время на площадке) / TOI (Time on ice)
   */
  timeOnIce: number;

  /**
   * Количество смен / Shifts
   */
  shifts: number;

  /**
   * БВ (броски по воротам) / SOG (Shots on goal)
   */
  shotsOnGoal: number;

  /**
   * %БВ (процент реализованных бросков) / Shooting Percentage
   */
  shootingPercentage: number;

  /**
   * Вбр (вбрасывания) / FO - Faceoffs
   */
  faceoffs: number;

  /**
   * ВВбр (Количество выигранных вбрасываний) / Faceoff Wins
   */
  faceoffWins: number;


  constructor(id: number, player: Player, game: Game, date: string, goals: number, assists: number, points: number, penalties: number, powerPlayGoals: number, powerPlayAssists: number, shorthandedGoals: number, shorthandedAssists: number, isGameWinningGoals: boolean, isGameTyingGoals: boolean, emptyNetGoals: number, plusMinus: number, timeOnIce: number, shifts: number, shotsOnGoal: number, shootingPercentage: number, faceoffs: number, faceoffWins: number) {
    this.id = id;
    this.player = player;
    this.game = game;
    this.date = date;
    this.goals = goals;
    this.assists = assists;
    this.points = points;
    this.penalties = penalties;
    this.powerPlayGoals = powerPlayGoals;
    this.powerPlayAssists = powerPlayAssists;
    this.shorthandedGoals = shorthandedGoals;
    this.shorthandedAssists = shorthandedAssists;
    this.isGameWinningGoals = isGameWinningGoals;
    this.isGameTyingGoals = isGameTyingGoals;
    this.emptyNetGoals = emptyNetGoals;
    this.plusMinus = plusMinus;
    this.timeOnIce = timeOnIce;
    this.shifts = shifts;
    this.shotsOnGoal = shotsOnGoal;
    this.shootingPercentage = shootingPercentage;
    this.faceoffs = faceoffs;
    this.faceoffWins = faceoffWins;
  }
}
