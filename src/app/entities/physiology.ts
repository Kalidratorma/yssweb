import {GripType} from "./grip-type";

export class Physiology {
  id?:     number;
  date?:   Date;
  height: number;
  weight: number;
  grip:   GripType;

  constructor(height: number, weight: number, grip: GripType) {
    this.height = height;
    this.weight = weight;
    this.grip = grip;
  }
}

