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
import {PlayerSortableHeader} from "../../helpers";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbAlertModule,
    JsonPipe,
    PlayerSortableHeader,
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
