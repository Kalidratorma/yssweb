import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {Player} from "../entities";

export type PlayerSortColumn = keyof Player | '';
export type PlayerSortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: PlayerSortDirection } = {asc: 'desc', desc: '', '': 'asc'};

export interface PlayerSortEvent {
  column: PlayerSortColumn;
  direction: PlayerSortDirection;
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
export class PlayerSortableHeader {
  @Input() sortable: PlayerSortColumn = '';
  @Input() direction: PlayerSortDirection = '';
  @Output() sort = new EventEmitter<PlayerSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
