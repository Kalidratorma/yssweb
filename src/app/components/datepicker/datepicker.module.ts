import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, JsonPipe} from '@angular/common';
import {Datepicker} from "../../components";
import {NgbAlertModule, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbAlertModule,
    JsonPipe
  ],
  declarations: [
    Datepicker
  ],
  exports: [
    Datepicker
  ]
})
export class DatepickerModule {
}
