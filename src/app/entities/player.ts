import {Contract} from "./contract";
import {Parent} from "./parent";
import {Physiology} from "./physiology";
import {Position} from "./position";
import {Stat} from "./stat";

export interface Player {
  id?:             number;
  surname?:        string;
  name?:           string;
  patronymic?:     string;
  birthDate?:      Date;
  parents?:        Parent[];
  sex?:            string;
  number?:         number;
  teamYear?:       number;
  photo?:          string;
  position?:       Position;
  contract?:       Contract;
  physiologyList?: Physiology[];
  stats?:          Stat[];
}
