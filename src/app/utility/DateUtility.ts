import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export class DateUtility {
  static getNgbDateStructFromDate(date: Date): NgbDateStruct {
    const newDate: Date = new Date(date);
    return {
      year: newDate.getUTCFullYear(),
      month: newDate.getUTCMonth() + 1,
      day: newDate.getUTCDate()
    } as NgbDateStruct;
  }

  static getDateFromNgbDateStruct(ngbDate: NgbDateStruct): Date {
    return new Date(ngbDate.year, ngbDate.month-1, ngbDate.day, 3);
  }
}
