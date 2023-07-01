import {Wrapper} from './wrapper';
export interface User extends Wrapper {
  id:        number;
  username:  string;
  email:     string;
  enabled?:  boolean;
  role?:     string;
  token?:    string;
}
