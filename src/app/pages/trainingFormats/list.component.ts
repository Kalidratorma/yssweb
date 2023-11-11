import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {TrainingFormatService} from '../../services';
import {TrainingFormat} from "../../entities";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  trainingFormats?: TrainingFormat[];
  isDeleting: boolean[] = [];

  constructor(private trainingFormatService: TrainingFormatService) {
  }

  ngOnInit() {
    this.trainingFormatService.getAll()
      .pipe(first())
      .subscribe(trainingFormats => this.trainingFormats = trainingFormats.sort(
        (a: TrainingFormat, b: TrainingFormat) => {
          const shortNameA = a.shortName.toUpperCase();
          const shortNameB = b.shortName.toUpperCase();
          return (shortNameA < shortNameB) ? -1 : (shortNameA > shortNameB) ? 1 : 0;
        }));
  }

  delete(id: number) {
    const trainingFormat = this.trainingFormats!.find(x => x.id === id);
    if (trainingFormat) {
      this.isDeleting[trainingFormat.id] = true;
      this.trainingFormatService.delete(id)
        .pipe(first())
        .subscribe(() => this.trainingFormats = this.trainingFormats!.filter(x => x.id !== id));
    }
  }
}
