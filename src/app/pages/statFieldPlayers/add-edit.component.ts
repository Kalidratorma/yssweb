import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ObjectUtility} from "../../utility";

import {AlertService, GameService, PlayerService, StatFieldPlayerService} from '../../services';
import {Game, Player} from "../../entities";

@Component({templateUrl: './add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  gameId?: number;
  playerId?: number;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  players: Player[] = [];
  games: Game[] = [];

  routerLink: string = "/statFieldPlayers";

  protected readonly ObjectUtility = ObjectUtility;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private statFieldPlayerService: StatFieldPlayerService,
    private alertService: AlertService,
    private playerService: PlayerService,
    private gameService: GameService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.gameId = this.route.snapshot.params['gameId'];
    this.playerId = this.route.snapshot.params['playerId'];

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

    if (this.playerId && this.playerId > 0) {
      this.playerService.getById(this.playerId)
        .pipe(first())
        .subscribe(x => {
          this.players[0] = x;
          this.form.value.player = x;
        });
    } else {
      this.playerService.getAll()
        .pipe(first())
        .subscribe(x => {
          this.players = x;
        });
    }

    // form with validation rules
    this.form = this.formBuilder.group({
      id: [],
      player: [],
      game: [],
      date: [],
      goals: [0,],
      assists: [0,],
      points: [],
      penalties: [0,],
      powerPlayGoals: [],
      powerPlayAssists: [],
      shorthandedGoals: [],
      shorthandedAssists: [],
      isGameWinningGoals: [],
      isGameTyingGoals: [],
      emptyNetGoals: [],
      plusMinus: [],
      timeOnIce: [],
      shifts: [],
      shotsOnGoal: [0,],
      shootingPercentage: [],
      faceoffs: [0,],
      faceoffWins: [0,]
    });

    this.title = 'Добавить статистику игрока';
    if (this.id) {
      // edit mode
      this.title = 'Редактировать статистику игрока';
      this.loading = true;
      this.statFieldPlayerService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          this.loading = false;
        });
    } else if (this.gameId && this.gameId > 0 && this.playerId && this.playerId > 0) {
      this.routerLink = "/games/edit/" + this.gameId;
      this.statFieldPlayerService.getAllByGameIdAndPlayerId(this.gameId, this.playerId)
        .pipe(first())
        .subscribe(x => {
          if (x && x.id) {
            this.title = 'Редактировать статистику игрока';
            this.form.patchValue(x);
          }
          this.loading = false;
        });
    } else if (this.gameId && this.gameId > 0) {
      this.statFieldPlayerService.getAllByGameId(this.gameId)
        .pipe(first())
        .subscribe(x => {
          if (x && x.length > 0) {
            this.title = 'Редактировать статистику игрока';
            this.form.patchValue(x);
          }
          this.loading = false;
        });
    } else if (this.playerId && this.playerId > 0) {
      this.routerLink = "/players/edit/" + this.playerId;
      this.statFieldPlayerService.getAllByPlayerId(this.playerId)
        .pipe(first())
        .subscribe(x => {
          if (x && x.length > 0) {
            this.title = 'Редактировать статистику игрока';
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
          this.alertService.success('Статистику игрока сохранена', {keepAfterRouteChange: true});
          this.router.navigateByUrl(this.routerLink);
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private save() {
    if (this.playerId && this.playerId > 0) {
      this.form.value.player = this.players[0];
    }
    if (this.gameId && this.gameId > 0) {
      this.form.value.game = this.games[0];
    }
    // create or update user based on id param
    return this.id
      ? this.statFieldPlayerService.update(this.form.value)
      : this.statFieldPlayerService.create(this.form.value);
  }
}
