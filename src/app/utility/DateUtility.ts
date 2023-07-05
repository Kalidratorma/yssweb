import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export class DateUtility {
  static readonly DB_FORMAT_DELIMITER = '-';

  static getNgbDateStructFromDate(date: Date): NgbDateStruct {
    const newDate: Date = new Date(date);
    return {
      year: newDate.getUTCFullYear(),
      month: newDate.getUTCMonth() + 1,
      day: newDate.getUTCDate()
    } as NgbDateStruct;
  }

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

  static getDbFormatFromNgbDateStruct(date: NgbDateStruct | null): string {
    return date ? date.year +
      DateUtility.DB_FORMAT_DELIMITER +
      (date.month < 10 ? '0' + date.month : date.month) +
      DateUtility.DB_FORMAT_DELIMITER +
      (date.day < 10 ? '0' + date.day : date.day) : '';
  }
}
