import {Contract} from "./contract";
import {Parent} from "./parent";
import {Physiology} from "./physiology";
import {Position} from "./position";
import {Stat} from "./stat";
import {Person} from "./person";
import {TeamYear} from "./team-year";

/**
 * Спортсмен
 */
export class Player extends Person {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Ограничения
   */
  restrictions?: string;

  /**
   * Родители
   */
  parents: Set<Parent>;

  /**
   * Игровой номер
   */
  number?: number;

  /**
   * Год команды
   */
  teamYear?: TeamYear;

  /**
   * Амплуа/позиция
   */
  position?: Position;

  /**
   * Договора
   */
  contract?: Contract;

  /**
   * Физиология
   */
  physiologyList?: Physiology[];

  /**
   * Статистика
   */
  stats?: Stat[];

  constructor(surname: string, name: string, patronymic: string, sex: string, birthDate: string, email: string, phoneNumber: string, photo: string, id: number, restrictions: string, parents: Set<Parent>, number: number, teamYear: TeamYear, position: Position, contract: Contract, physiologyList: Physiology[], stats: Stat[]) {
    super(surname, name, patronymic, sex, birthDate, email, phoneNumber, photo);
    this.id = id;
    this.restrictions = restrictions;
    this.parents = parents;
    this.number = number;
    this.teamYear = teamYear;
    this.position = position;
    this.contract = contract;
    this.physiologyList = physiologyList;
    this.stats = stats;
  }
}
