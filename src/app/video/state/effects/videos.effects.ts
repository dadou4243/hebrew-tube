import { WordsService } from '../../../core/services/words.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  LOAD_VIDEOS,
  LoadVideosSuccess,
  CREATE_VIDEO,
  CreateVideo,
  CreateVideoSuccess,
  DELETE_VIDEO,
  DeleteVideo,
  DeleteVideoSuccess
} from '../actions/videos.actions';
import { VideosService } from 'src/app/core/services/videos.service';
import { Router } from '@angular/router';

@Injectable()
export class VideosEffects {
  constructor(
    private actions$: Actions,
    private videosService: VideosService,
    private router: Router
  ) {}

  @Effect()
  getVideos$ = this.actions$.pipe(
    ofType(LOAD_VIDEOS),
    switchMap(() => {
      // console.log('LOAD VIDEOS');
      return this.videosService
        .getVideos()
        .pipe(map((videos: any) => new LoadVideosSuccess(videos.data)));
      // catchError(error => new LoadWordsFail(error));
    })
  );

  @Effect()
  createVideo$ = this.actions$.pipe(
    ofType(CREATE_VIDEO),
    switchMap((action: CreateVideo) => {
      console.log('CREATE VIDEO EFFECT', action.payload);
      return this.videosService.createVideo(action.payload).pipe(
        map((videos: any) => {
          this.router.navigate(['/videos']);
          return new CreateVideoSuccess(videos.data);
        })
        // catchError(error => new LoadWordsFail(error));
      );
    })
  );

  @Effect()
  deleteVideo$ = this.actions$.pipe(
    ofType(DELETE_VIDEO),
    switchMap((action: DeleteVideo) => {
      console.log('DELETE VIDEO EFFECT', action.payload);
      return this.videosService.deleteVideo(action.payload).pipe(
        map(res => {
          console.log('videoID', res);
          return new DeleteVideoSuccess(res.videoID);
        })
        // catchError(error => new LoadWordsFail(error));
      );
    })
  );
}
