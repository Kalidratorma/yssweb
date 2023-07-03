import {Contract} from "./contract";
import {User} from "./user";
import {Sex} from "./sex";

export interface Parent {
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
