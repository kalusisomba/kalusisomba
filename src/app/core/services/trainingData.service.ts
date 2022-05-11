import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TrainingDataResponse, TrainingData } from '../models/trainingData';

@Injectable({
  providedIn: 'root'
})
export class TrainingDataService implements PreloadingStrategy {

  private apiURL = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Credentials' : 'true',
      // 'Access-Control-Allow-Origin': '*',
      // 'Cross-Origin': 'true',
      // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      // 'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
    })
  };

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return fn();
    }else {
      return of(null);
    }
  }
  constructor(private httpClient: HttpClient) { }

  getTrainingDatas(): Observable<TrainingDataResponse> {

    if (localStorage.getItem('jwt') != null) {
      console.warn(`Token from localstorage`, localStorage.getItem('jwt'));
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'No-Auth': 'True',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      });
    }

    return this.httpClient.get<TrainingDataResponse>(this.apiURL + '/schools/false', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      })
    });  
  }

  createTrainingData(prepareTrainingData): Observable<TrainingData> {

    if (localStorage.getItem('jwt') != null) {
      console.warn(`Token from localstorage`, localStorage.getItem('jwt'));
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'No-Auth': 'True',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      });
    }
    return this.httpClient.post<TrainingData>(this.apiURL + '/td/update_td', JSON.stringify(prepareTrainingData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateTrainingData(id, prepareTrainingData): Observable<TrainingData> {
    return this.httpClient.put<TrainingData>(this.apiURL + '/prepareTrainingData/' + id, JSON.stringify(prepareTrainingData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteTrainingData(id) {
    return this.httpClient.delete<TrainingDataResponse>(this.apiURL + '/prepareTrainingData/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error:HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      console.log('Client Side Error',errorMessage);
    } else {
      errorMessage = `Server Side Error Code: ${error.status}\n Message: ${error.message}`;
      console.log(errorMessage);
    }
    return throwError(error);
  }
}
