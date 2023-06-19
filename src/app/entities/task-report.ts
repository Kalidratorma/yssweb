import {Task} from "./task";
import {Player} from "./player";
import {Link} from "./link";

export interface TaskReport {
  id: number;
  reportDate: Date;
  task: Task;
  player: Player;
  taskDate: Date;
  report: String;
  photoLinks: Link[];
  videoLinks: Link[];
}
