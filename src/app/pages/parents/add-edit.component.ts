import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService, ParentService} from '../../services';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {DateUtility} from "../../utility/DateUtility";

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
    private accountService: ParentService,
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
      birthDate: [null],
      phoneNumber: ['', Validators.required],
      sex: [null, Validators.required],
      user: [null],
      contracts: [null],
    });

    this.title = 'Добавить родителя';
    if (this.id) {
      // edit mode
      this.title = 'Редактировать родителя';
      this.loading = true;
      this.accountService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          if (x.birthDate) {
            this.birthDate = DateUtility.getNgbDateStructFromDate(x.birthDate);
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
          this.alertService.success('Родитель сохранен', {keepAfterRouteChange: true});
          this.router.navigateByUrl('/parents');
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private save() {

    this.form.value.birthDate = DateUtility.getDateFromNgbDateStruct(this.birthDate);

    // create or update user based on id param
    return this.id
      ? this.accountService.update(this.form.value)
      : this.accountService.create(this.form.value);
  }
}
