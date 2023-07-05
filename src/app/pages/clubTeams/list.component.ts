import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {ClubTeam} from "../../entities/club-team";
import {ClubTeamService} from "../../services";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  clubTeams?: ClubTeam[];
  isDeleting: boolean[] = [];

  constructor(private clubTeamService: ClubTeamService) {
  }

  ngOnInit() {
    this.clubTeamService.getAll()
      .pipe(first())
      .subscribe(clubTeams => this.clubTeams = clubTeams.sort(
        (a: ClubTeam, b: ClubTeam) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        }));
  }

  delete(id: number) {
    const clubTeam = this.clubTeams!.find(x => x.id === id);
    if (clubTeam) {
      this.isDeleting[clubTeam.id] = true;
      this.clubTeamService.delete(id)
        .pipe(first())
        .subscribe(() => this.clubTeams = this.clubTeams!.filter(x => x.id !== id));
    }
  }
}
