import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home";
import {AuthGuard} from "./helpers";

const accountModule = () => import('./pages/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./pages/users/users.module').then(x => x.UsersModule);
const gameFormatModule = () => import('./pages/formats/game-format.module').then(x => x.GameFormatModule);
const playersModule = () => import('./pages/players/players.module').then(x => x.PlayersModule);
const positionsModule = () => import('./pages/positions/positions.module').then(x => x.PositionsModule);



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'gameFormats', loadChildren: gameFormatModule },
  { path: 'players', loadChildren: playersModule },
  { path: 'positions', loadChildren: positionsModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
