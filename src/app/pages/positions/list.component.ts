import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {Position} from "../../entities/position";
import {PositionService} from "../../services";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  positions?: Position[];
  isDeleting: boolean[] = [];

  constructor(private positionService: PositionService) {
  }

  ngOnInit() {
    this.positionService.getAll()
      .pipe(first())
      .subscribe(positions => this.positions = positions);
  }

  delete(id: number) {
    const position = this.positions!.find(x => x.id === id);
    if (position) {
      this.isDeleting[position.id] = true;
      this.positionService.delete(id)
        .pipe(first())
        .subscribe(() => this.positions = this.positions!.filter(x => x.id !== id));
    }
  }
}
