import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {PositionsRoutingModule} from './positions-routing.module';
import {LayoutComponent} from './layout.component';
import {ListComponent} from './list.component';
import {AddEditComponent} from './add-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PositionsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent
  ]
})
export class PositionsModule {
}
