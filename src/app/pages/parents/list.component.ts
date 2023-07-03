import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {Parent} from "../../entities/parent";
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
      .subscribe(parents => this.parents = parents);
  }

  delete(id: number) {
    const parent = this.parents!.find(x => x.id === id);
    if(parent) {
      this.isDeleting[parent.id] = true;
      this.parentService.delete(id)
        .pipe(first())
        .subscribe(() => this.parents = this.parents!.filter(x => x.id !== id));
    }
  }
}
