import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {TrainingService, AlertService, TeamYearService, TrainingFormatService, CoachService} from '../../services';
import {Coach, TeamYear, TrainingFormat} from "../../entities";
import {CoachDialogComponent} from 'src/app/modals/coach-dialog/coach-dialog-component';
import {NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {KeyValue} from "@angular/common";
import {DateUtility, ObjectUtility} from "../../utility";

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
    teamYears: TeamYear[] = [];
    trainingFormats: TrainingFormat[] = [];
    coachDictionary: Coach[] = [];

    protected readonly ObjectUtility = ObjectUtility;

    trainingDate: NgbDateStruct = DateUtility.getNgbDateStructFromDate(new Date());

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private trainingService: TrainingService,
        private trainingFormatService: TrainingFormatService,
        private teamYearService: TeamYearService,
        private coachService: CoachService,
        private alertService: AlertService,
        public modalService: NgbModal
    ) {
        this.teamYearService.getAll()
            .pipe(first())
            .subscribe(x => {
                this.teamYears = x;
            });

        this.trainingFormatService.getAll()
            .pipe(first())
            .subscribe(x => {
                this.trainingFormats = x;
            });

        this.coachService.getAll()
            .pipe(first())
            .subscribe(x => {
                this.coachDictionary = x;
            });
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            id: [],
            trainingFormat: [null, Validators.required],
            teamYear: [null, Validators.required],
            date: [],
            time: ['', Validators.required],
            duration: [40, Validators.required],
            mainCoach: [],
            coaches: []
        });

        this.title = 'Добавить тренировку';
        if (this.id) {
            // edit mode
            this.title = 'Редактировать тренировку';
            this.loading = true;
            this.trainingService.getByTrainingId(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    if (x.date) {
                        let eDate = DateUtility.getNgbDateStructFromDbFormat(x.date);
                        if (eDate) {
                            this.trainingDate = eDate;
                        }
                    }
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
        this.saveTraining()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Тренировка сохранена', {keepAfterRouteChange: true});
                    this.router.navigateByUrl('/trainings');
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveTraining() {
        this.form.value.date = DateUtility.getDbFormatFromNgbDateStruct(this.trainingDate);
        // create or update user based on id param
        return this.name
            ? this.trainingService.update(this.form.value)
            : this.trainingService.create(this.form.value);
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
