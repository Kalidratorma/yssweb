import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {Coach} from "../entities";

export type CoachSortColumn = keyof Coach | '';
export type CoachSortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: CoachSortDirection } = {asc: 'desc', desc: '', '': 'asc'};

export interface CoachSortEvent {
  column: CoachSortColumn;
  direction: CoachSortDirection;
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class CoachSortableHeader {
  @Input() sortable: CoachSortColumn = '';
  @Input() direction: CoachSortDirection = '';
  @Output() sort = new EventEmitter<CoachSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
