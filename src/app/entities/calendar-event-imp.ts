import {CalendarEvent} from "angular-calendar";
import {EventAction, EventColor} from "calendar-utils";

/**
 * Реализация интерфейса CalendarEvent
 */
export class CalendarEventImp<MetaType = any> implements CalendarEvent {
  id?: string | number;
  start: Date;
  end?: Date;
  title: string;
  color?: EventColor;
  actions?: EventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  draggable?: boolean;
  meta?: MetaType;

  constructor(start: Date, title: string) {
    this.start = start;
    this.title = title;
  }
}
