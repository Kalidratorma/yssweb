import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {GamesRoutingModule} from './games-routing.module';
import {LayoutComponent} from './layout.component';
import {ListComponent} from './list.component';
import {AddEditComponent} from './add-edit.component';
import {DatepickerModule} from "../../components/datepicker/datepicker.module";
import {PlayerDialogModule} from "../../modals/player-dialog/player-dialog.module";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GamesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DatepickerModule,
        PlayerDialogModule
    ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent
  ]
})
export class GamesModule {
}
