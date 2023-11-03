import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {Parent} from "../../entities";
import {ParentService} from "../../services";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  parents?: Parent[];
  isDeleting: boolean[] = [];

  constructor(private parentService: ParentService) {
  }

  ngOnInit() {
    this.parentService.getAll()
      .pipe(first())
      .subscribe(parents => this.parents = parents.sort(
        (a: Parent, b: Parent) => {
          const surnameA = a.surname.toUpperCase();
          const surnameB = b.surname.toUpperCase();
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          const patronymicA = a.patronymic ? a.patronymic.toUpperCase() : '';
          const patronymicB = b.patronymic ? b.patronymic.toUpperCase() : '';
          const birthDateA = a.birthDate ? a.birthDate.toUpperCase() : '';
          const birthDateB = b.birthDate ? b.birthDate.toUpperCase() : '';
          return (surnameA < surnameB) ? -1 : (surnameA > surnameB) ? 1 :
            (nameA < nameB) ? -1 : (nameA > nameB) ? 1 :
              (patronymicA < patronymicB) ? -1 : (patronymicA > patronymicB) ? 1 :
                (birthDateA < birthDateB) ? -1 : (birthDateA > birthDateB) ? 1 : 0;
        }));
  }

  delete(id: number) {
    const parent = this.parents!.find(x => x.id === id);
    if (parent) {
      this.isDeleting[parent.id] = true;
      this.parentService.delete(id)
        .pipe(first())
        .subscribe(() => this.parents = this.parents!.filter(x => x.id !== id));
    }
  }
}
