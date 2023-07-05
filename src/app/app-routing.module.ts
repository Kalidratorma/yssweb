import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home";
import {AuthGuard} from "./helpers";

const accountModule = () => import('./pages/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./pages/users/users.module').then(x => x.UsersModule);
const gameFormatModule = () => import('./pages/gameFormats/game-format.module').then(x => x.GameFormatModule);
const playersModule = () => import('./pages/players/players.module').then(x => x.PlayersModule);
const positionsModule = () => import('./pages/positions/positions.module').then(x => x.PositionsModule);
const parentsModule = () => import('./pages/parents/parents.module').then(x => x.ParentsModule);
const contractsModule = () => import('./pages/contracts/contracts.module').then(x => x.ContractsModule);
const teamYearsModule = () => import('./pages/teamYears/team-years.module').then(x => x.TeamYearsModule);
const coachesModule = () => import('./pages/staff/coaches.module').then(x => x.CoachesModule);

const seasonsModule = () => import('./pages/seasons/seasons.module').then(x => x.SeasonsModule);
const tournamentsModule = () => import('./pages/tournaments/tournaments.module').then(x => x.TournamentsModule);



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'gameFormats', loadChildren: gameFormatModule },
  { path: 'players', loadChildren: playersModule },
  { path: 'positions', loadChildren: positionsModule },
  { path: 'parents', loadChildren: parentsModule },
  { path: 'contracts', loadChildren: contractsModule },
  { path: 'teamYears', loadChildren: teamYearsModule },
  { path: 'staff', loadChildren: coachesModule },
  { path: 'seasons', loadChildren: seasonsModule },
  { path: 'tournaments', loadChildren: tournamentsModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
