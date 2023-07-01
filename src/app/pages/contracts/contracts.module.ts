import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {ContractsRoutingModule} from './contracts-routing.module';
import {LayoutComponent} from './layout.component';
import {ListComponent} from './list.component';
import {AddEditComponent} from './add-edit.component';
import {DatepickerModule} from "../../components/datepicker/datepicker.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContractsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent
  ]
})
export class ContractsModule {
}
