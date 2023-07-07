import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {StatFieldPlayer} from "../../entities/stat-field-player";
import {StatFieldPlayerService} from "../../services";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  statFieldPlayers?: StatFieldPlayer[];
  isDeleting: boolean[] = [];

  constructor(private statFieldPlayerService: StatFieldPlayerService) {
  }

  ngOnInit() {
    this.statFieldPlayerService.getAll()
      .pipe(first())
      .subscribe(statFieldPlayers => this.statFieldPlayers = statFieldPlayers.sort(
        (a: StatFieldPlayer, b: StatFieldPlayer) => {
          let surnameA = a.player.surname.toUpperCase();
          let surnameB = b.player.surname.toUpperCase();
          let nameA = a.player.name.toUpperCase();
          let nameB = b.player.name.toUpperCase();
          let patronymicA = a.player.patronymic ? a.player.patronymic.toUpperCase() : '';
          let patronymicB = b.player.patronymic ? b.player.patronymic.toUpperCase() : '';
          let birthDateA = a.player.birthDate ? a.player.birthDate.toUpperCase() : '';
          let birthDateB = b.player.birthDate ? b.player.birthDate.toUpperCase() : '';
          let gameDateA = a.game ? a.game.date.toUpperCase() : '';
          let gameDateB = b.game ? b.game.date.toUpperCase() : '';
          return (surnameA < surnameB) ? -1 : (surnameA > surnameB) ? 1 :
            (nameA < nameB) ? -1 : (nameA > nameB) ? 1 :
              (patronymicA < patronymicB) ? -1 : (patronymicA > patronymicB) ? 1 :
                (birthDateA < birthDateB) ? -1 : (birthDateA > birthDateB) ? 1 :
                  (gameDateA < gameDateB) ? -1 : (gameDateA > gameDateB) ? 1 : 0;
        }));
  }

  delete(id: number) {
    const statFieldPlayer = this.statFieldPlayers!.find(x => x.id === id);
    if (statFieldPlayer) {
      this.isDeleting[statFieldPlayer.id] = true;
      this.statFieldPlayerService.delete(id)
        .pipe(first())
        .subscribe(() => this.statFieldPlayers = this.statFieldPlayers!.filter(x => x.id !== id));
    }
  }
}
