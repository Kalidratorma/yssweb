import {Contract} from "./contract";
import {User} from "./user";

export interface Parent {
  id?:          number;
  surname?:     string;
  name?:        string;
  patronymic?:  string;
  phoneNumber?: string;
  sex?:         string;
  user?:        User;
  contracts?:   Contract[];
}
