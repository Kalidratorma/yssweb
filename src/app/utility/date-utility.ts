import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

/**
 * Утилитарный класс для работы с Датами
 */
export class DateUtility {
  static readonly DB_FORMAT_DELIMITER = '-';

  /**
   * Получить структуру NgbDateStruct из даты
   *
   * @param date дата
   * @return структура NgbDateStruct
   */
  static getNgbDateStructFromDate(date: Date): NgbDateStruct {
    const newDate: Date = new Date(date);
    return {
      year: newDate.getUTCFullYear(),
      month: newDate.getUTCMonth() + 1,
      day: newDate.getUTCDate()
    } as NgbDateStruct;
  }

  /**
   * Получить структуру NgbDateStruct из строки
   *
   * @param value дата в виде строки
   * @return структура NgbDateStruct либо null
   */
  static getNgbDateStructFromDbFormat(value: string): NgbDateStruct | null {
    let ngbDateStruct: NgbDateStruct | null = null;
    if (value) {
      const date = value.split(DateUtility.DB_FORMAT_DELIMITER);
      ngbDateStruct = {
        year: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        day: parseInt(date[2], 10)
      } as NgbDateStruct;
    }
    return ngbDateStruct;
  }

  /**
   * Получить дату в виде строки из структуры NgbDateStruct
   *
   * @param date структура NgbDateStruct либо null
   * @return дата в виде строки
   */
  static getDbFormatFromNgbDateStruct(date: NgbDateStruct | null): string {
    return date ? date.year +
      DateUtility.DB_FORMAT_DELIMITER +
      (date.month < 10 ? '0' + date.month : date.month) +
      DateUtility.DB_FORMAT_DELIMITER +
      (date.day < 10 ? '0' + date.day : date.day) : '';
  }
}
