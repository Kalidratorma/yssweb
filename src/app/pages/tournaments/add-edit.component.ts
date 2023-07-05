import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService, TournamentService} from '../../services';
import {getTournamentEnumMap, TournamentEnum} from "../../entities/tournament-enum";

@Component({templateUrl: './add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  tournamentEnumMap: Map<TournamentEnum, string> = getTournamentEnumMap();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tournamentService: TournamentService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      phoneNumber: [],
      email: ['', Validators.required],
      fullName: [''],
      siteUrl: [''],
      youtubeUrl: [''],
      type: ['', Validators.required],
      note: [''],
    });

    this.title = 'Добавить турнир';
    if (this.id) {
      // edit mode
      this.title = 'Редактировать турнир';
      this.loading = true;
      this.tournamentService.getById(this.id)
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
    this.save()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Турнир сохранен', {keepAfterRouteChange: true});
          this.router.navigateByUrl('/tournaments');
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private save() {
    // create or update user based on id param
    return this.id
      ? this.tournamentService.update(this.form.value)
      : this.tournamentService.create(this.form.value);
  }
}
