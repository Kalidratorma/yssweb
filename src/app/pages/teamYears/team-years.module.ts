import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {TeamYearsRoutingModule} from './team-years-routing.module';
import {LayoutComponent} from './layout.component';
import {ListComponent} from './list.component';
import {AddEditComponent} from './add-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TeamYearsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent
  ]
})
export class TeamYearsModule {
}
