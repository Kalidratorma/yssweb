import {Contract} from "./contract";
import {User} from "./user";
import {Wrapper} from "./wrapper";
import {Sex} from "./sex";

export interface Parent extends Wrapper {
  id:           number;
  surname:      string;
  name:         string;
  patronymic?:  string;
  birthDate:    Date;
  phoneNumber?: string;
  sex:          Sex;
  user?:        User;
  contracts?:   Contract[];
}
