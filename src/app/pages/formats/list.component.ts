import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {GameFormatService} from '../../services';
import {GameFormat} from "../../entities/game-format";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  gameFormats?: GameFormat[];
  isDeleting: boolean[] = [];

  constructor(private gameFormatService: GameFormatService) {
  }

  ngOnInit() {
    this.gameFormatService.getAll()
      .pipe(first())
      .subscribe(gameFormats => this.gameFormats = gameFormats);
  }

  delete(id: number) {
    const gameFormat = this.gameFormats!.find(x => x.id === id);
    if (gameFormat) {
      this.isDeleting[gameFormat.id] = true;
      this.gameFormatService.delete(id)
        .pipe(first())
        .subscribe(() => this.gameFormats = this.gameFormats!.filter(x => x.id !== id));
    }
  }
}
