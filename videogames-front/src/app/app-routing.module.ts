import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoGameDetailsComponent } from './video-game-details/video-game-details.component';
import { VideoGameListComponent } from './video-game-list/video-game-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: 'games', component: VideoGameListComponent },
  { path: 'games/:id', component: VideoGameDetailsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
