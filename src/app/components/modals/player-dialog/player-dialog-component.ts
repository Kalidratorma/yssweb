import {Component, Input, QueryList, ViewChildren} from '@angular/core';
import {Player} from "../../../entities";
import {PlayerService} from "../../../services";
import {Observable} from "rxjs";
import {NgbdSortableHeader, SortEvent} from "../../../helpers/player.sortable.directive";
import {PlayerModalService} from "../../../services/player.modal.service";
import {first} from "rxjs/operators";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'player-dialog',
  templateUrl: 'player-dialog-component.html'
})
export class PlayerDialogComponent {
  @Input() inputPlayers: Set<Player> = new Set<Player>();

  checkedPlayerMap = new Map<number, boolean>();

  checkedArray: boolean[] = [];

  players$: Observable<Player[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> = new QueryList<NgbdSortableHeader>();

  constructor(public playerService: PlayerService,
              public playerModalService: PlayerModalService,
              public modal: NgbActiveModal) {
    this.players$ = playerModalService.players$;
    this.total$ = playerModalService.total$;
  }

  ngOnInit() {
    this.playerService.getAll()
      .pipe(first())
      .subscribe(x => {
        this.playerModalService.players = x;
      });
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.playerModalService.sortColumn = column;
    this.playerModalService.sortDirection = direction;
  }

  change(player: Player, event: boolean) {
    if(event && !this.inputPlayers.has(player)) {
      this.inputPlayers.add(player);
    } else if (!event && this.inputPlayers.has(player)) {
      this.inputPlayers.delete(player);
    }
  }
}
