import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {PlayerService} from '../../services';
import {Player} from "../../entities/player";

@Component({
  selector: 'player-list',
  templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  players?: Player[];
  isDeleting: boolean[] = [];

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    this.playerService.getAll()
      .pipe(first())
      .subscribe(players => this.players = players);
  }

  deletePlayer(id: number) {
    const player = this.players!.find(x => x.id === id);
    if (player) {
      this.isDeleting[player.id] = true;
      this.playerService.delete(id)
        .pipe(first())
        .subscribe(() => this.players = this.players!.filter(x => x.id !== id));
    }
  }
}
