import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {PlayerService} from '../../services';
import {Player} from "../../entities/player";

@Component({
  selector: 'player-list',
  templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
  players?: Player[];
  isDeleting: boolean[] = [];

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    this.playerService.getAll()
      .pipe(first())
      .subscribe(players => this.players = players.sort(
        (a: Player, b: Player) => {
          let surnameA = a.surname.toUpperCase();
          let surnameB = b.surname.toUpperCase();
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          let patronymicA = a.patronymic ? a.patronymic.toUpperCase() : '';
          let patronymicB = b.patronymic ? b.patronymic.toUpperCase() : '';
          let birthDateA = a.birthDate ? a.birthDate.toUpperCase() : '';
          let birthDateB = b.birthDate ? b.birthDate.toUpperCase() : '';
          return (surnameA < surnameB) ? -1 : (surnameA > surnameB) ? 1 :
            (nameA < nameB) ? -1 : (nameA > nameB) ? 1 :
              (patronymicA < patronymicB) ? -1 : (patronymicA > patronymicB) ? 1 :
                (birthDateA < birthDateB) ? -1 : (birthDateA > birthDateB) ? 1 : 0;
        }));
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
