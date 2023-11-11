import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Contract, Coach, User} from '../entities';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {CoachSortColumn, CoachSortDirection} from '../helpers';

interface SearchResult {
  coaches: Coach[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: CoachSortColumn;
  sortDirection: CoachSortDirection;
}

const compare = (v1: Contract | undefined | string | number | User,
                 v2: Contract | undefined | string | number | User) => {
  let result: number = 0;
  if (v1 && v2) {
    result = (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
  }
  return result;
}

function sort(coaches: Coach[], column: CoachSortColumn, direction: string): Coach[] {
  if (direction === '' || column === '') {
    return coaches;
  } else {
    return [...coaches].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(coach: Coach, term: string) {
  return (
    coach.coachType.toString().toLowerCase().includes(term.toLowerCase()) ||
    coach.surname.toLowerCase().includes(term.toLowerCase()) ||
    coach.name.toLowerCase().includes(term.toLowerCase()) ||
    coach.patronymic.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({providedIn: 'root'})
export class CoachModalService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _coaches$ = new BehaviorSubject<Coach[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  private _coaches: Coach[] = [];

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
        this._coaches$.next(result.coaches);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  set coaches(value: Coach[]) {
    this._coaches = value;
  }

  get coaches$() {
    return this._coaches$.asObservable();
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

  set sortColumn(sortColumn: CoachSortColumn) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: CoachSortDirection) {
    this._set({sortDirection});
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let coaches = sort(this._coaches, sortColumn, sortDirection);

    // 2. filter
    coaches = coaches.filter((coach) => matches(coach, searchTerm));
    const total = coaches.length;

    // 3. paginate
    coaches = coaches.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({coaches: coaches, total});
  }
}
