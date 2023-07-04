import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AccountService, AlertService} from '../../services';

@Component({templateUrl: './add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  username?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    this.username = this.route.snapshot.params['username'];

    // form with validation rules
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      role: ['', Validators.required],
      username: ['', Validators.required],
      enabled: [],
      // password only required in add mode
      password: ['', [Validators.minLength(6), ...(!this.username ? [Validators.required] : [])]]
    });

    this.title = 'Добавить пользователя';
    if (this.username) {
      // edit mode
      this.title = 'Редактировать пользователя';
      this.loading = true;
      this.accountService.getByUsername(this.username)
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
    this.saveUser()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Пользователь сохранен', {keepAfterRouteChange: true});
          this.router.navigateByUrl('/users');
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private saveUser() {
    // create or update user based on id param
    return this.username
      ? this.accountService.update(this.username!, this.form.value)
      : this.accountService.register(this.form.value);
  }
}
