import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Contract, Parent, Physiology, Player, Position, Stat, TeamYear} from '../entities';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {PlayerSortColumn, PlayerSortDirection} from '../helpers';

interface SearchResult {
  players: Player[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: PlayerSortColumn;
  sortDirection: PlayerSortDirection;
}

const compare = (v1: Contract | undefined | string | Physiology[] | number | Stat[] | TeamYear | Position | Set<Parent>,
                 v2: Contract | undefined | string | Physiology[] | number | Stat[] | TeamYear | Position | Set<Parent>) => {
  let result: number = 0;
  if (v1 && v2) {
    result = (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
  }
  return result;
}

function sort(players: Player[], column: PlayerSortColumn, direction: string): Player[] {
  if (direction === '' || column === '') {
    return players;
  } else {
    return [...players].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(player: Player, term: string) {
  return (
    player.surname.toLowerCase().includes(term.toLowerCase()) ||
    player.name.toLowerCase().includes(term) ||
    player.teamYear?.year.toString().toLowerCase().includes(term) ||
    player.position?.name.toLowerCase().includes(term)
  );
}

@Injectable({providedIn: 'root'})
export class PlayerModalService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _players$ = new BehaviorSubject<Player[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  private _players: Player[] = [];

  constructor() {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => {
        this._players$.next(result.players);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  set players(value: Player[]) {
    this._players = value;
  }

  get players$() {
    return this._players$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({page});
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set sortColumn(sortColumn: PlayerSortColumn) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: PlayerSortDirection) {
    this._set({sortDirection});
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let players = sort(this._players, sortColumn, sortDirection);

    // 2. filter
    players = players.filter((player) => matches(player, searchTerm));
    const total = players.length;

    // 3. paginate
    players = players.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({players, total});
  }
}
