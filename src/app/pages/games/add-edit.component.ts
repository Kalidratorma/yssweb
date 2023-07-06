import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ObjectUtility} from '../../utility/object-utility'

import {
  AlertService,
  TournamentService,
  GameService,
  SeasonService,
  TeamYearService,
  ClubTeamService
} from '../../services';
import {Tournament} from "../../entities/tournament";
import {Season} from "../../entities/season";
import {TeamYear} from "../../entities/team-year";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {DateUtility} from "../../utility/date-utility";
import {ClubTeam} from "../../entities/club-team";

@Component({templateUrl: './add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  tournaments: Tournament[] = [];
  seasons: Season[] = [];
  teamYears: TeamYear[] = [];
  clubTeams: ClubTeam[] = [];

  gameDate: NgbDateStruct = DateUtility.getNgbDateStructFromDate(new Date());

  protected readonly ObjectUtility = ObjectUtility;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private alertService: AlertService,
    private tournamentService: TournamentService,
    private seasonService: SeasonService,
    private teamYearService: TeamYearService,
    private clubTeamService: ClubTeamService
  ) {
    this.tournamentService.getAll()
      .pipe(first())
      .subscribe(x => {
        this.tournaments = x;
      });
    this.seasonService.getAll()
      .pipe(first())
      .subscribe(x => {
        this.seasons = x;
      });
    this.teamYearService.getAll()
      .pipe(first())
      .subscribe(x => {
        this.teamYears = x;
      });
    this.clubTeamService.getAll()
      .pipe(first())
      .subscribe(x => {
        this.clubTeams = x;
      });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      id: [],
      tournament: [null, Validators.required],
      date: [''],
      time: [''],
      season: [],
      arenaAddress: [''],
      teamYear: [],
      clubTeam: []
    });

    this.title = 'Добавить игру';
    if (this.id) {
      // edit mode
      this.title = 'Редактировать игру';
      this.loading = true;
      this.gameService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          if (x.date) {
            let eDate = DateUtility.getNgbDateStructFromDbFormat(x.date);
            if (eDate) {
              this.gameDate = eDate;
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
          this.alertService.success('Игра сохранена', {keepAfterRouteChange: true});
          this.router.navigateByUrl('/games');
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private save() {
    this.form.value.date = DateUtility.getDbFormatFromNgbDateStruct(this.gameDate);
    // create or update user based on id param
    return this.id
      ? this.gameService.update(this.form.value)
      : this.gameService.create(this.form.value);
  }
}
