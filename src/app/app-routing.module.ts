import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
const clubsModule = () => import('./pages/clubs/clubs.module').then(x => x.ClubsModule);
const clubTeamsModule = () => import('./pages/clubTeams/club-teams.module').then(x => x.ClubTeamsModule);
const gamesModule = () => import('./pages/games/games.module').then(x => x.GamesModule);
const statFieldPlayersModule = () => import('./pages/statFieldPlayers/stat-field-players.module').then(x => x.StatFieldPlayersModule);
const statGamesModule = () => import('./pages/statGames/stat-games.module').then(x => x.StatGamesModule);
const trainingFormatModule = () => import('./pages/trainingFormats/training-format.module').then(x => x.TrainingFormatModule);
const trainingModule = () => import('./pages/trainings/training.module').then(x => x.TrainingModule);
const mainCalendarModule = () => import('./pages/calendar/main-calendar.module').then(x => x.MainCalendarModule);


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'users', loadChildren: usersModule, canActivate: [AuthGuard]},
  {path: 'account', loadChildren: accountModule},
  {path: 'gameFormats', loadChildren: gameFormatModule, canActivate: [AuthGuard]},
  {path: 'players', loadChildren: playersModule, canActivate: [AuthGuard]},
  {path: 'positions', loadChildren: positionsModule, canActivate: [AuthGuard]},
  {path: 'parents', loadChildren: parentsModule, canActivate: [AuthGuard]},
  {path: 'contracts', loadChildren: contractsModule, canActivate: [AuthGuard]},
  {path: 'teamYears', loadChildren: teamYearsModule, canActivate: [AuthGuard]},
  {path: 'staff', loadChildren: coachesModule, canActivate: [AuthGuard]},
  {path: 'seasons', loadChildren: seasonsModule, canActivate: [AuthGuard]},
  {path: 'tournaments', loadChildren: tournamentsModule, canActivate: [AuthGuard]},
  {path: 'clubs', loadChildren: clubsModule, canActivate: [AuthGuard]},
  {path: 'clubTeams', loadChildren: clubTeamsModule, canActivate: [AuthGuard]},
  {path: 'games', loadChildren: gamesModule, canActivate: [AuthGuard]},
  {path: 'statFieldPlayers', loadChildren: statFieldPlayersModule, canActivate: [AuthGuard]},
  {path: 'statGames', loadChildren: statGamesModule, canActivate: [AuthGuard]},
  {path: 'trainingFormats', loadChildren: trainingFormatModule, canActivate: [AuthGuard]},
  {path: 'trainings', loadChildren: trainingModule, canActivate: [AuthGuard]},
  {path: 'calendar', loadChildren: mainCalendarModule, canActivate: [AuthGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
