import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ObjectUtility} from '../../utility'

import {
  AlertService,
  TournamentService,
  GameService,
  SeasonService,
  TeamYearService,
  ClubTeamService
} from '../../services';
import {Tournament, Season, TeamYear, ClubTeam, Player} from "../../entities";
import {NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DateUtility} from "../../utility";
import {PlayerDialogComponent} from "../../components";
import {KeyValue} from "@angular/common";

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

  checkedPlayers: Set<Player> = new Set<Player>();

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
    private clubTeamService: ClubTeamService,
    public modalService: NgbModal
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
      clubTeam: [],
      playerList: []
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

  onSave() {
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

  compareFn(a: KeyValue<number, Player>, b: KeyValue<number, Player>): number {
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

  openPlayerDialog() {
    const modalRef = this.modalService.open(PlayerDialogComponent, { size: 'lg' });
    modalRef.componentInstance.inputPlayers = this.checkedPlayers;
    modalRef.result.then( value => {
      this.checkedPlayers = value;
      this.form.value.playerList = Array.from(value.values());
    })
  }

  detach(player: Player) {
    this.checkedPlayers.delete(player);
    const index = this.form.value.playerList.indexOf(player, 0);
    if (index > -1) {
      this.form.value.playerList.splice(index, 1);
    }
  }
}
