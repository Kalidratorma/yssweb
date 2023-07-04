/**
 * Статистика спортсмена
 */
export interface Stat {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Дата
   */
  date: string;

  /**
   * Голы
   */
  goal: number;

  /**
   * Пасы
   */
  assist: number;

  /**
   * Очки
   */
  points: number;

  /**
   * Штрафы
   */
  penalty: number;
}
