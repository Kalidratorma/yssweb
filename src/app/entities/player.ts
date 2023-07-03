import {Contract} from "./contract";
import {Parent} from "./parent";
import {Physiology} from "./physiology";
import {Position} from "./position";
import {Stat} from "./stat";
import {Sex} from "./sex";

export interface Player {
  id: number;
  surname: string;
  name: string;
  patronymic?: string;
  birthDate: Date;
  restrictions?: string;
  parents: Parent[];
  sex: Sex;
  number?: number;
  teamYear?: number;
  photo?: string;
  position?: Position;
  contract?: Contract;
  physiologyList?: Physiology[];
  stats?: Stat[];
}
