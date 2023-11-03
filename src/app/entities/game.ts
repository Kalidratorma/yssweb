import {Tournament} from "./tournament";
import {TeamYear} from "./team-year";
import {Season} from "./season";
import {ClubTeam} from "./club-team";
import {Player} from "./player";

/**
 * Игра
 */
export class Game {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Турнир
   */
  tournament: Tournament;

  /**
   * Дата игры
   */
  date: string;

  /**
   * Время игры (начало)
   */
  time: string;

  /**
   * Сезон
   */
  season: Season;

  /**
   * Адрес арены
   */
  arenaAddress: string;

  /**
   * Год команды
   */
  teamYear: TeamYear;

  /**
   * Команда Соперника
   */
  clubTeam: ClubTeam;

  /**
   * Спортсмены
   */
  players: Set<Player>;

  constructor(id: number, tournament: Tournament, date: string, time: string, season: Season, arenaAddress: string, teamYear: TeamYear, clubTeam: ClubTeam, players: Set<Player>) {
    this.id = id;
    this.tournament = tournament;
    this.date = date;
    this.time = time;
    this.season = season;
    this.arenaAddress = arenaAddress;
    this.teamYear = teamYear;
    this.clubTeam = clubTeam;
    this.players = players;
  }
}
