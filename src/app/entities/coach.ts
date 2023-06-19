import {Contract} from "./contract";
import {User} from "./user";

export interface Coach {
  id:          number;
  surname:     string;
  name:        string;
  patronymic:  string;
  phoneNumber: string;
  sex:         string;
  education:   string;
  contract:    Contract;
  coachType:   string;
  user:        User;
}
