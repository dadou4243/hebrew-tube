import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordsService } from './services/words.service';
import { YoutubePlayerService } from './services/youtube-player.service';
import { YoutubeApiService } from './services/youtube-api.service';
import { SessionsService } from './services/sessions.service';
import { VideosService } from './services/videos.service';
import { UsersService } from './services/users.service';
import { JwtService } from './services/jwt.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { AppComponent } from './layout/app.component';
import { CollectionsService } from './services/collections.service';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { SearchResultComponent } from './search/search-result/search-result.component';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  declarations: [
    SidebarComponent,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HeaderComponent,
    SearchResultsComponent,
    SearchResultComponent
  ],
  providers: [
    WordsService,
    YoutubeApiService,
    YoutubePlayerService,
    SessionsService,
    VideosService,
    UsersService,
    JwtService,
    CollectionsService
  ]
})
export class CoreModule {}
