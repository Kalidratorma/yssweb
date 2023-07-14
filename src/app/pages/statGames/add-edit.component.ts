import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ObjectUtility} from "../../utility";

import {AlertService, GameService, PlayerService, StatGameService} from '../../services';
import {Game, GameEndEnum, getGameEndEnumMap} from "../../entities";

@Component({templateUrl: './add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  gameId?: number;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  games: Game[] = [];

  routerLink: string = "/statGames";

  protected readonly ObjectUtility = ObjectUtility;

  gameEndEnumMap: Map<GameEndEnum, string> = getGameEndEnumMap();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private statGameService: StatGameService,
    private alertService: AlertService,
    private playerService: PlayerService,
    private gameService: GameService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.gameId = this.route.snapshot.params['gameId'];

    if (this.gameId && this.gameId > 0) {
      this.gameService.getById(this.gameId)
        .pipe(first())
        .subscribe(x => {
          this.games[0] = x;
          this.form.value.game = x;
        });
    } else {
      this.gameService.getAll()
        .pipe(first())
        .subscribe(x => {
          this.games = x;
        });
    }
    // form with validation rules
    this.form = this.formBuilder.group({
      id: [],
      game: [],
      gameEndType:[],
      points:[0],
      goals: [0],
      goalsAgainst: [0],
      totalGoals: [0,],
      penaltiesInMinutes: [0,],
      penaltiesInMinutesAgainst: [0,]
    });

    this.title = 'Добавить статистику игры';
    if (this.id) {
      // edit mode
      this.title = 'Редактировать статистику игры';
      this.loading = true;
      this.statGameService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          if (x) {
            this.form.patchValue(x);
          }
          this.loading = false;
        });
    } else if (this.gameId && this.gameId > 0) {
      this.statGameService.getByGameId(this.gameId)
        .pipe(first())
        .subscribe(x => {
          if (x) {
            this.title = 'Редактировать статистику игры';
            this.form.patchValue(x);
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
          this.alertService.success('Статистику игры сохранена', {keepAfterRouteChange: true});
          this.router.navigateByUrl(this.routerLink);
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private save() {
    if (this.gameId && this.gameId > 0) {
      this.form.value.game = this.games[0];
    }
    // create or update user based on id param
    return this.id
      ? this.statGameService.update(this.form.value)
      : this.statGameService.create(this.form.value);
  }
}
