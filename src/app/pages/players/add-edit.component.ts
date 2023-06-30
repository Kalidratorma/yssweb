import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';

import {PlayerService, AlertService} from '../../services';
import {Player} from "../../entities/player";
import {GripType} from "../../entities/grip-type";
import {Physiology} from "../../entities/physiology";
import {throwError} from "rxjs";
import {Sex} from "../../entities/sex";

@Component({
  selector: 'player-details',
  templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {
  id?: number;
  title!: string;
  photo?: string;
  @Input() player?: Player;
  loading = false;
  submitting = false;
  submitted = false;

  height?: number;
  weight?: number;
  grip?: GripType;

  savedHeight?: number;
  savedWeight?: number;
  savedGrip?: GripType;

  grips: GripType[];
  sexArray: Sex[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private alertService: AlertService
  ) {
    this.grips = Object.values(GripType);
    this.sexArray = Object.values(Sex);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.title = 'Добавить игрока';
    if (this.id) {
      // edit mode
      this.title = 'Редактировать игрока';
      this.loading = true;
      this.playerService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.player = x;
          if (this.player.physiologyList != null) {
            let listLength = this.player.physiologyList.length-1;
            this.height = this.player.physiologyList[listLength].height;
            this.weight = this.player.physiologyList[listLength].weight;
            this.grip = this.player.physiologyList[listLength].grip;

            this.savedHeight = this.height;
            this.savedWeight = this.weight;
            this.savedGrip = this.grip;
          }
          this.loading = false;
        });
    }
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
    this.submitting = true;
    this.savePlayer()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Игрок сохранен', {keepAfterRouteChange: true});
          this.router.navigateByUrl('/players').then(r => false);
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private savePlayer() {
    if (this.player == null) {
      return throwError(() => "Ошибка обработки. Невозможно сохранить!");
    }
    if (this.player.physiologyList != null &&
      (this.savedHeight != this.height ||
        this.savedWeight != this.weight ||
        this.savedGrip != this.grip)
    ) {
      this.player.physiologyList?.push(new Physiology(this.height!, this.weight!, this.grip!))
    }

    if (this.player.id != null) {
      return this.playerService.update(this.player);
    } else {
      return this.playerService.create(this.player);
    }
  }
}
