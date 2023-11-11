import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {TrainingFormatRoutingModule} from './training-format-routing.module';
import {LayoutComponent} from './layout.component';
import {ListComponent} from './list.component';
import {AddEditComponent} from './add-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TrainingFormatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent
  ]
})
export class TrainingFormatModule {
}
