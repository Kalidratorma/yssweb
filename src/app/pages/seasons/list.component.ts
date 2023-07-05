import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {Season} from "../../entities/season";
import {SeasonService} from "../../services";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  seasons?: Season[];
  isDeleting: boolean[] = [];

  constructor(private seasonService: SeasonService) {
  }

  ngOnInit() {
    this.seasonService.getAll()
      .pipe(first())
      .subscribe(seasons => this.seasons = seasons.sort(
        (a: Season, b: Season) => {
          const seasonA = a.season;
          const seasonB = b.season;
          return (seasonA < seasonB) ? -1 : (seasonA > seasonB) ? 1 : 0;
        }));
  }

  delete(id: number) {
    const season = this.seasons!.find(x => x.id === id);
    if (season) {
      this.isDeleting[season.id] = true;
      this.seasonService.delete(id)
        .pipe(first())
        .subscribe(() => this.seasons = this.seasons!.filter(x => x.id !== id));
    }
  }
}
