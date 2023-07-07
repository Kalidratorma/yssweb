import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ObjectUtility} from "../../utility";

import {AlertService, GameService, PlayerService, StatFieldPlayerService} from '../../services';
import {Player} from "../../entities/player";
import {Game} from "../../entities/game";

@Component({templateUrl: './add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  players: Player[] = [];
  games: Game[] = [];

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
    this.playerService.getAll()
      .pipe(first())
      .subscribe(x => {
        this.players = x;
      });

    this.gameService.getAll()
      .pipe(first())
      .subscribe(x => {
        this.games = x;
      });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

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
          // this.games = this.games.filter(y => {
          //   return x.player ? y.teamYear.id == x.player.teamYear?.id : false;
          // });
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
          this.router.navigateByUrl('/statFieldPlayers');
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
      ? this.statFieldPlayerService.update(this.form.value)
      : this.statFieldPlayerService.create(this.form.value);
  }
}
