import {Component, EventEmitter, Injectable, Input, Output} from '@angular/core';
import {NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
// @Injectable()
// export class CustomAdapter extends NgbDateAdapter<string> {
//   readonly DELIMITER = '.';
//
//   fromModel(value: string | null): NgbDateStruct | null {
//     if (value) {
//       const date = value.split(this.DELIMITER);
//       return {
//         day: parseInt(date[0], 10),
//         month: parseInt(date[1], 10),
//         year: parseInt(date[2], 10),
//       };
//     }
//     return null;
//   }

  // toModel(date: NgbDateStruct | null): string | null {
  //   return date;
  //     // ? (date.day < 10 ? '0' + date.day : date.day) +
  //     // this.DELIMITER +
  //     // (date.month < 10 ? '0' + date.month : date.month) +
  //     // this.DELIMITER +
  //     // date.year : null;
  // }
//}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '.';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? (date.day < 10 ? '0' + date.day : date.day) +
      this.DELIMITER +
      (date.month < 10 ? '0' + date.month : date.month) +
      this.DELIMITER +
      date.year : '';
  }
}


const I18N_VALUES = {
  ru: {
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ною', 'Дек'],
    weekLabel: 'sem',
  },
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'ru';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayLabel(weekday: number): string {
    return I18N_VALUES.ru.weekdays[weekday - 1];
  }

  override getWeekLabel(): string {
    return I18N_VALUES.ru.weekLabel;
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES.ru.months[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}.${date.month}.${date.year}`;
  }
}

@Component({
  selector: 'datepicker',
  templateUrl: 'datepicker-component.html',
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    //{provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})
export class Datepicker {
  @Input() dateStruct: NgbDateStruct = {} as NgbDateStruct;
  @Output() savedDate = new EventEmitter<NgbDateStruct>;

  onSave(event: NgbDateStruct) {
    this.savedDate.emit(event);
  }
}
