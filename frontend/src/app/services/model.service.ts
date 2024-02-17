import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, of, Subject } from 'rxjs';
import { Model } from '../model/model';
import { Score, Settings, SettingsData } from '../utils/interfaces';

const BACKEND_URL = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  // default model
  model = new Model([], {
    fieldSize: 50,
    gameLevel: 50,
    gameOptions: 'Normal',
    playerOptions: 'Player',
  });

  constructor(private httpClient: HttpClient) {}
  // check and update model
  getModel = (scores: Score[], settings: Settings) => {
    // ping API to get scores
    // ping API to get settings
    // return scores and settings as Model{}
    console.log('check and update model fired');
  };

  updateModelScores = (scores: Score) => {
    // add to array of scores in model
    // post array of scores to API
  };

  updateModelSettings = (settings: Settings) => {
    // save to model
    // update API
  };

  // all the code for pinging the backend server (node.js) to save data to endpoints.

  getFromEndpoint = (endpoint: string): Observable<any> => {
    // create subject to return data from observable
    const subject = new Subject<any>();

    this.httpClient
      .get(`${BACKEND_URL}/${endpoint}`)
      // Catch error if Node js is not running. Return object if error
      .pipe(catchError(() => of({ error: true })))
      .subscribe((data: any) => {
        subject.next(data);
      });
    return subject.asObservable();
  };

  postScores = (scoreBody: Score): Observable<any> => {
    const subject = new Subject<any>();
    this.httpClient
      .post(`${BACKEND_URL}/scores`, scoreBody, httpOptions)
      // Catch error if Node js is not running
      .pipe(catchError(() => of([{ ok: false, error: true }])))
      .subscribe((data: any) => {
        subject.next(data);
      });
    return subject.asObservable();
  };

  postSettings = (settingsBody: SettingsData) => {
    // create subject to return data from observable
    const subject = new Subject<any>();

    this.httpClient
      .post(`${BACKEND_URL}/settings`, settingsBody, httpOptions)
      // Catch error if Node js is not running. Return object if error
      .pipe(catchError(() => of({ error: true })))
      .subscribe((data: any) => {
        subject.next(data);
      });
    return subject.asObservable();
  };
}
