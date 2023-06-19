import {Link} from "./link";
import {Player} from "./player";
import {JustDate} from "./just-date";
import {Coach} from "./coach";

export interface Task {
  id:          number;
  name:        string;
  description: string;
  minutes:     number;
  qty:         number;
  videoLinks:  Link[];
  photoLinks:  Link[];
  schedule:    JustDate[];
  players:     Player[];
  coach:       Coach;
}
