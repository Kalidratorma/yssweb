import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {StatGamesRoutingModule} from './stat-games-routing.module';
import {LayoutComponent} from './layout.component';
import {ListComponent} from './list.component';
import {AddEditComponent} from './add-edit.component';
import {UploadModule} from "../../components/upload/upload.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StatGamesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UploadModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent
  ]
})
export class StatGamesModule {
}
