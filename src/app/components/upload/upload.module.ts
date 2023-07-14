import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, JsonPipe} from '@angular/common';
import {
  NgbActiveModal,
  NgbAlertModule,
  NgbHighlight,
  NgbModalModule,
  NgbPagination,
  NgbProgressbar
} from "@ng-bootstrap/ng-bootstrap";
import {UploadComponent} from "./upload-component";
import {NgbdSortableHeader} from "../../helpers/player.sortable.directive";

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
    NgbPagination,
    NgbProgressbar
  ],
  declarations: [
    UploadComponent
  ],
  exports: [
    UploadComponent
  ],
  providers: [NgbActiveModal]
})
export class UploadModule {
}
