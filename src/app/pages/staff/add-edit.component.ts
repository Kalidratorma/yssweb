import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService, CoachService} from '../../services';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {DateUtility} from "../../utility/date-utility";

@Component({templateUrl: './add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  birthDate: NgbDateStruct = DateUtility.getNgbDateStructFromDate(new Date());

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coachService: CoachService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      id: [],
      surname: ['', Validators.required],
      name: ['', Validators.required],
      patronymic: [''],
      sex: [null, Validators.required],
      birthDate: [null],
      email: [null],
      phoneNumber: ['', Validators.required],
      photo: [''],
      education: [null],
      contract: [null],
      coachType: ['', Validators.required],
      user: [null]
    });

    this.title = 'Добавить тренера';
    if (this.id) {
      // edit mode
      this.title = 'Редактировать тренера';
      this.loading = true;
      this.coachService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          if (x.birthDate) {
            let eDate = DateUtility.getNgbDateStructFromDbFormat(x.birthDate);
            if (eDate) {
              this.birthDate = eDate;
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
    this.save()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Тренер сохранен', {keepAfterRouteChange: true});
          this.router.navigateByUrl('/staff');
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private save() {

    this.form.value.birthDate = DateUtility.getDbFormatFromNgbDateStruct(this.birthDate);

    // create or update user based on id param
    return this.id
      ? this.coachService.update(this.form.value)
      : this.coachService.create(this.form.value);
  }
}
