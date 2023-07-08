import {AfterContentInit, Component, Input, QueryList, ViewChildren} from '@angular/core';
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
export class PlayerDialogComponent implements AfterContentInit {
  @Input() inputPlayers: Set<Player> = new Set<Player>();

  checkedArray: boolean[] = [];

  players$: Observable<Player[]> = new Observable<Player[]>();
  total$: Observable<number> = new Observable<number>();

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> = new QueryList<NgbdSortableHeader>();

  constructor(public playerService: PlayerService,
              public playerModalService: PlayerModalService,
              public modal: NgbActiveModal) {
    this.playerService.getAll()
      .pipe(first())
      .subscribe(x => {
        this.playerModalService.players = x;
        this.players$ = playerModalService.players$;
        this.total$ = playerModalService.total$;
      });
  }

  ngAfterContentInit() {
    this.playerModalService.pageSize = 5;
  }

  ngOnInit() {

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
