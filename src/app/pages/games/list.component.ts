import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {Game} from "../../entities/game";
import {GameService} from "../../services";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  games?: Game[];
  isDeleting: boolean[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.getAll()
      .pipe(first())
      .subscribe(games => this.games = games.sort(
        (a: Game, b: Game) => {
          const nameA = a.tournament.name.toUpperCase();
          const nameB = b.tournament.name.toUpperCase();
          const seasonA = a.season.season;
          const seasonB = b.season.season;
          const dateA = a.date.toUpperCase();
          const dateB = b.date.toUpperCase();
          const timeA = a.time.toUpperCase();
          const timeB = b.time.toUpperCase();
          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 :
            (seasonA < seasonB) ? -1 : (seasonA > seasonB) ? 1 :
            (dateA < dateB) ? -1 : (dateA > dateB) ? 1 :
              (timeA < timeB) ? -1 : (timeA > timeB) ? 1 : 0;
        }));
  }

  delete(id: number) {
    const game = this.games!.find(x => x.id === id);
    if (game) {
      this.isDeleting[game.id] = true;
      this.gameService.delete(id)
        .pipe(first())
        .subscribe(() => this.games = this.games!.filter(x => x.id !== id));
    }
  }
}
