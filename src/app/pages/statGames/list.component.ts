import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {StatGame} from "../../entities";
import {StatGameService} from "../../services";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  statGames?: StatGame[];
  isDeleting: boolean[] = [];

  constructor(private statGameService: StatGameService) {
  }

  ngOnInit() {
    this.statGameService.getAll()
      .pipe(first())
      .subscribe(statGames => this.statGames = statGames.sort(
        (a: StatGame, b: StatGame) => {
          const nameA = a.game.tournament.name.toUpperCase();
          const nameB = b.game.tournament.name.toUpperCase();
          const seasonA = a.game.season ? a.game.season.season : 0;
          const seasonB = b.game.season ? b.game.season.season : 0;
          const dateA = a.game.date ? a.game.date.toUpperCase() : '';
          const dateB = b.game.date ? b.game.date.toUpperCase() : '';
          const timeA = a.game.time ? a.game.time.toUpperCase() : '';
          const timeB = b.game.time ? b.game.time.toUpperCase() : '';
          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 :
            (seasonA < seasonB) ? -1 : (seasonA > seasonB) ? 1 :
              (dateA < dateB) ? -1 : (dateA > dateB) ? 1 :
                (timeA < timeB) ? -1 : (timeA > timeB) ? 1 : 0;
        }));
  }

  delete(id: number) {
    const statGame = this.statGames!.find(x => x.id === id);
    if (statGame) {
      this.isDeleting[statGame.id] = true;
      this.statGameService.delete(id)
        .pipe(first())
        .subscribe(() => this.statGames = this.statGames!.filter(x => x.id !== id));
    }
  }
}
