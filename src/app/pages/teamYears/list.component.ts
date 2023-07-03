import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {TeamYear} from "../../entities/team-year";
import {TeamYearService} from "../../services";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  teamYears?: TeamYear[];
  isDeleting: boolean[] = [];

  constructor(private teamYearService: TeamYearService) {
  }

  ngOnInit() {
    this.teamYearService.getAll()
      .pipe(first())
      .subscribe(teamYears => this.teamYears = teamYears.sort(
        (a: TeamYear, b: TeamYear) => {
          const yearA = a.year;
          const yearB = b.year;
          const teamNameA = a.teamName.toUpperCase();
          const teamNameB = b.teamName.toUpperCase();
          const noteA = a.note.toUpperCase();
          const noteB = b.note.toUpperCase()
          return (yearA < yearB) ? -1 : (yearA > yearB) ? 1 :
            (teamNameA < teamNameB) ? -1 : (teamNameA > teamNameB) ? 1 :
              (noteA < noteB) ? -1 : (noteA > noteB) ? 1 : 0;
        }));
  }

  delete(id: number) {
    const teamYear = this.teamYears!.find(x => x.id === id);
    if (teamYear) {
      this.isDeleting[teamYear.id] = true;
      this.teamYearService.delete(id)
        .pipe(first())
        .subscribe(() => this.teamYears = this.teamYears!.filter(x => x.id !== id));
    }
  }
}
