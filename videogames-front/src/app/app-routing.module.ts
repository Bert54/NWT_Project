import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoGameDetailsComponent } from './video-game-details/video-game-details.component';
import { VideoGameListComponent } from './video-game-list/video-game-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {LoggedInGameDetailsGuard} from './shared/guards/logged-in-game-details.guard';
import {LoggedOutGuard} from './shared/guards/logged-out.guard';

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: 'games', component: VideoGameListComponent },
  { path: 'games/:id', component: VideoGameDetailsComponent, canActivate: [LoggedInGameDetailsGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoggedOutGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
