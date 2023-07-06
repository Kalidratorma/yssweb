import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService, ClubService, ClubTeamService, TeamYearService} from '../../services';
import {Club} from "../../entities/club";
import {TeamYear} from "../../entities/team-year";
import {ObjectUtility} from "../../utility/object-utility";

@Component({templateUrl: './add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  clubs: Club[] = [];
  teamYears: TeamYear[] = [];

  protected readonly ObjectUtility = ObjectUtility;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clubTeamService: ClubTeamService,
    private alertService: AlertService,
    private clubService: ClubService,
    private teamYearService: TeamYearService
  ) {
    this.clubService.getAll()
      .pipe(first())
      .subscribe(x => {
        this.clubs = x;
      });

    this.teamYearService.getAll()
      .pipe(first())
      .subscribe(x => {
        this.teamYears = x;
      });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      id: [],
      club: [null, Validators.required],
      name: ['', Validators.required],
      contacts: [''],
      teamYear: [],
    });

    this.title = 'Добавить команду соперника';
    if (this.id) {
      // edit mode
      this.title = 'Редактировать команду соперника';
      this.loading = true;
      this.clubTeamService.getById(this.id)
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
          this.alertService.success('Команда соперника сохранена', {keepAfterRouteChange: true});
          this.router.navigateByUrl('/clubTeams');
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
      ? this.clubTeamService.update(this.form.value)
      : this.clubTeamService.create(this.form.value);
  }
}
