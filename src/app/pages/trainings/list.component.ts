import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {TrainingService} from '../../services';
import {Training} from "../../entities";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
    trainings?: Training[];
    isDeleting: boolean[] = [];

    constructor(private trainingService: TrainingService) {
    }

    ngOnInit() {
        this.trainingService.getAll()
            .pipe(first())
            .subscribe(trainings => this.trainings = trainings.sort(
                (a: Training, b: Training) => {
                    const dateA = a.date.toUpperCase();
                    const dateB = b.date.toUpperCase();
                    const timeA = a.time.toUpperCase();
                    const timeB = b.time.toUpperCase();
                    const teamYearA = a.teamYear.teamName.toUpperCase();
                    const teamYearB = b.teamYear.teamName.toUpperCase();
                    return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 :
                        (timeA < timeB) ? -1 : (timeA > timeB) ? 1 :
                            (teamYearA < teamYearB) ? -1 : (teamYearA > teamYearB) ? 1 :0;
                }));
    }

    delete(id: number) {
        const training = this.trainings!.find(x => x.id === id);
        if (training) {
            this.isDeleting[training.id] = true;
            this.trainingService.delete(id)
                .pipe(first())
                .subscribe(() => this.trainings = this.trainings!.filter(x => x.id !== id));
        }
    }
}
