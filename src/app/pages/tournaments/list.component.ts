import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {Tournament} from "../../entities/tournament";
import {TournamentService} from "../../services";
import {getTournamentEnumMap, TournamentEnum} from "../../entities/tournament-enum";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  tournaments?: Tournament[];
  isDeleting: boolean[] = [];
  tournamentEnumMap: Map<TournamentEnum, string> = getTournamentEnumMap();

  constructor(private tournamentService: TournamentService) {
  }

  ngOnInit() {
    this.tournamentService.getAll()
      .pipe(first())
      .subscribe(tournaments => this.tournaments = tournaments.sort(
        (a: Tournament, b: Tournament) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        }));
  }

  delete(id: number) {
    const tournament = this.tournaments!.find(x => x.id === id);
    if (tournament) {
      this.isDeleting[tournament.id] = true;
      this.tournamentService.delete(id)
        .pipe(first())
        .subscribe(() => this.tournaments = this.tournaments!.filter(x => x.id !== id));
    }
  }
}
