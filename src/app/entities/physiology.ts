import {GripType} from "./grip-type";

/**
 * Физические показатели на определенную дату
 */
export class Physiology {

  /**
   * Идентификатор
   */
  id?: number;

  /**
   * Дата
   */
  date?: Date;

  /**
   * Рост
   */
  height: number;

  /**
   * Вес
   */
  weight: number;

  /**
   * Хват
   */
  grip: GripType;

  constructor(height: number, weight: number, grip: GripType) {
    this.height = height;
    this.weight = weight;
    this.grip = grip;
  }
}

