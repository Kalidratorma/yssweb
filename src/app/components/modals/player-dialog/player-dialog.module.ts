import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, JsonPipe} from '@angular/common';
import {NgbActiveModal, NgbAlertModule, NgbHighlight, NgbModalModule, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {PlayerDialogComponent} from "./player-dialog-component";
import {NgbdSortableHeader} from "../../../helpers/player.sortable.directive";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbAlertModule,
    JsonPipe,
    NgbdSortableHeader,
    NgbHighlight,
    NgbPagination
  ],
  declarations: [
    PlayerDialogComponent
  ],
  exports: [
    PlayerDialogComponent
  ],
  providers: [NgbActiveModal]
})
export class PlayerDialogModule {
}
