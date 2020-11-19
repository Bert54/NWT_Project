import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { VideoGameListComponent } from './video-game-list/video-game-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { VideoGameDetailsComponent } from './video-game-details/video-game-details.component';


@NgModule({
  declarations: [
    AppComponent,
    VideoGameListComponent,
    VideoGameDetailsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
