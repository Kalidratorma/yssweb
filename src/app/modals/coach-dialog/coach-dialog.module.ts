import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, JsonPipe} from '@angular/common';
import {NgbActiveModal, NgbAlertModule, NgbHighlight, NgbModalModule, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {CoachDialogComponent} from "./coach-dialog-component";
import {CoachSortableHeader} from "../../helpers";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbAlertModule,
    JsonPipe,
    CoachSortableHeader,
    NgbHighlight,
    NgbPagination
  ],
  declarations: [
    CoachDialogComponent
  ],
  exports: [
    CoachDialogComponent
  ],
  providers: [NgbActiveModal]
})
export class CoachDialogModule {
}
