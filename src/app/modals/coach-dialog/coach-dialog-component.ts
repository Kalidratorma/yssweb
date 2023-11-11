import {AfterContentInit, Component, Input, QueryList, ViewChildren} from '@angular/core';
import {Coach} from "../../entities";
import {CoachService} from "../../services";
import {Observable} from "rxjs";
import {CoachSortableHeader, CoachSortEvent} from "../../helpers";
import {CoachModalService} from "../../services";
import {first} from "rxjs/operators";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'coach-dialog',
  templateUrl: 'coach-dialog-component.html'
})
export class CoachDialogComponent implements AfterContentInit {
  @Input() inputCoaches: Set<Coach> = new Set<Coach>();

  checkedArray: boolean[] = [];

  coaches$: Observable<Coach[]> = new Observable<Coach[]>();
  total$: Observable<number> = new Observable<number>();

  @ViewChildren(CoachSortableHeader) headers: QueryList<CoachSortableHeader> = new QueryList<CoachSortableHeader>();

  constructor(public coachService: CoachService,
              public coachModalService: CoachModalService,
              public modal: NgbActiveModal) {
    this.coachService.getAll()
      .pipe(first())
      .subscribe(x => {
        this.coachModalService.coaches = x;
        this.coaches$ = coachModalService.coaches$;
        this.total$ = coachModalService.total$;
      });
  }

  ngAfterContentInit() {
    this.coachModalService.pageSize = 5;
  }

  ngOnInit() {

  }

  onSort({ column, direction }: CoachSortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.coachModalService.sortColumn = column;
    this.coachModalService.sortDirection = direction;
  }

  change(coach: Coach, event: boolean) {
    if(event && !this.inputCoaches.has(coach)) {
      this.inputCoaches.add(coach);
    } else if (!event && this.inputCoaches.has(coach)) {
      this.inputCoaches.delete(coach);
    }
  }
}
