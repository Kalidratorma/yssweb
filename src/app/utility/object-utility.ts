/**
 * Утилитарный класс для работы с объектами
 */
export class ObjectUtility {

  /**
   * Сравнение объектов по id
   * @param a первый объект сравнения
   * @param b второй объект сравнения
   * @return Равенство объектов
   */
  public static objectIdComparer(a: { id: number }, b: { id: number }): boolean {
    if (a && b && "id" in a && "id" in b) {
      return a.id === b.id;
    } else {
      return false;
    }
  }
}
