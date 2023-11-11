import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {TrainingFormatService, AlertService} from '../../services';
import {Coach} from "../../entities";
import {CoachDialogComponent} from 'src/app/modals/coach-dialog/coach-dialog-component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {KeyValue} from "@angular/common";

@Component({templateUrl: './add-edit.component.html'})
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: number;
    name?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    checkedCoaches: Set<Coach> = new Set<Coach>();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private trainingFormatService: TrainingFormatService,
        private alertService: AlertService,
        public modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            id: [],
            name: ['', Validators.required],
            shortName: ['', Validators.required],
            description: ['', Validators.required],
            coaches: []
        });

        this.title = 'Добавить формат';
        if (this.id) {
            // edit mode
            this.title = 'Редактировать формат';
            this.loading = true;
            this.trainingFormatService.getByTrainingFormatId(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        this.saveTrainingFormat()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Формат тренировки сохранен', {keepAfterRouteChange: true});
                    this.router.navigateByUrl('/trainingFormats');
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveTrainingFormat() {
        // create or update user based on id param
        return this.name
            ? this.trainingFormatService.update(this.form.value)
            : this.trainingFormatService.create(this.form.value);
    }

    compareFn(a: KeyValue<number, Coach>, b: KeyValue<number, Coach>): number {
        let surnameA = a.value.surname.toUpperCase();
        let surnameB = b.value.surname.toUpperCase();
        let nameA = a.value.name.toUpperCase();
        let nameB = b.value.name.toUpperCase();
        let patronymicA = a.value.patronymic ? a.value.patronymic.toUpperCase() : '';
        let patronymicB = b.value.patronymic ? b.value.patronymic.toUpperCase() : '';
        let birthDateA = a.value.birthDate ? a.value.birthDate.toUpperCase() : '';
        let birthDateB = b.value.birthDate ? b.value.birthDate.toUpperCase() : '';
        return (surnameA < surnameB) ? -1 : (surnameA > surnameB) ? 1 :
            (nameA < nameB) ? -1 : (nameA > nameB) ? 1 :
                (patronymicA < patronymicB) ? -1 : (patronymicA > patronymicB) ? 1 :
                    (birthDateA < birthDateB) ? -1 : (birthDateA > birthDateB) ? 1 : 0;
    }

    openCoachDialog() {
        const modalRef = this.modalService.open(CoachDialogComponent, {size: 'lg'});
        modalRef.componentInstance.inputCoachs = this.checkedCoaches;
        modalRef.result.then(value => {
            this.checkedCoaches = value;
            this.form.value.coaches = Array.from(value.values());
        })
    }

    detach(coach: Coach) {
        this.checkedCoaches.delete(coach);
        const index = this.form.value.coaches.indexOf(coach, 0);
        if (index > -1) {
            this.form.value.coaches.splice(index, 1);
        }
    }
}
