import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {Club} from "../../entities/club";
import {ClubService} from "../../services";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  clubs?: Club[];
  isDeleting: boolean[] = [];

  constructor(private clubService: ClubService) {
  }

  ngOnInit() {
    this.clubService.getAll()
      .pipe(first())
      .subscribe(clubs => this.clubs = clubs.sort(
        (a: Club, b: Club) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        }));
  }

  delete(id: number) {
    const club = this.clubs!.find(x => x.id === id);
    if (club) {
      this.isDeleting[club.id] = true;
      this.clubService.delete(id)
        .pipe(first())
        .subscribe(() => this.clubs = this.clubs!.filter(x => x.id !== id));
    }
  }
}
