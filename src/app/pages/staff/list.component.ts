import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {CoachService} from '../../services';
import {Coach} from "../../entities/coach";

@Component({
  selector: 'coach-list',
  templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
  coaches?: Coach[];
  isDeleting: boolean[] = [];

  constructor(private coachService: CoachService) {
  }

  ngOnInit() {
    this.coachService.getAll()
      .pipe(first())
      .subscribe(coaches => this.coaches = coaches.sort(
        (a: Coach, b: Coach) => {
          let surnameA = a.surname.toUpperCase();
          let surnameB = b.surname.toUpperCase();
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          let patronymicA = a.patronymic ? a.patronymic.toUpperCase() : '';
          let patronymicB = b.patronymic ? b.patronymic.toUpperCase() : '';
          let birthDateA = a.birthDate ? a.birthDate.toUpperCase() : '';
          let birthDateB = b.birthDate ? b.birthDate.toUpperCase() : '';
          return (surnameA < surnameB) ? -1 : (surnameA > surnameB) ? 1 :
            (nameA < nameB) ? -1 : (nameA > nameB) ? 1 :
              (patronymicA < patronymicB) ? -1 : (patronymicA > patronymicB) ? 1 :
                (birthDateA < birthDateB) ? -1 : (birthDateA > birthDateB) ? 1 : 0;
        }));
  }

  deleteCoach(id: number) {
    const coach = this.coaches!.find(x => x.id === id);
    if (coach) {
      this.isDeleting[coach.id] = true;
      this.coachService.delete(id)
        .pipe(first())
        .subscribe(() => this.coaches = this.coaches!.filter(x => x.id !== id));
    }
  }
}
