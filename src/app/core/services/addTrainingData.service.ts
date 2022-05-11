import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddTrainingDataResponse, AddTrainingData } from '../models/addTrainingData';

@Injectable({
  providedIn: 'root'
})
export class AddTrainingDataService {

  private apiURL = environment.apiUrl + '/td/update_td';
  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'No-Auth': 'True',
      // 'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': '*',
      // 'Cross-Origin': 'true',
      // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
     // 'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAddTrainingDatas(): Observable<AddTrainingDataResponse> {
    //Get authorization 

    if (localStorage.getItem('jwt') != null) {
      console.warn(`Token from localstorage`, localStorage.getItem('jwt'));
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'No-Auth': 'True',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      });
    }
    return this.httpClient.get<AddTrainingDataResponse>(this.apiURL, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      })
    });
  }
  getAddTrainingData(id): Observable<AddTrainingDataResponse> {
    return this.httpClient.get<AddTrainingDataResponse>(this.apiURL + '/addTrainingData/' + id);
  }

  createAddTrainingData(addTrainingData): Observable<AddTrainingData> {
    
    if (localStorage.getItem('jwt') != null) {
      console.warn(`Token from localstorage`, localStorage.getItem('jwt'));
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'No-Auth': 'True',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      });
    }
    return this.httpClient.post<AddTrainingData>(this.apiURL, JSON.stringify(addTrainingData))
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateAddTrainingData(id, addTrainingData): Observable<AddTrainingData> {
    return this.httpClient.post<AddTrainingData>(this.apiURL + '/addTrainingData/' + id, JSON.stringify(addTrainingData))
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteSchool(id) {
    return this.httpClient.delete<AddTrainingDataResponse>(this.apiURL + '/addTrainingData/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      console.log('Client Side Error', errorMessage);
    } else {
      errorMessage = `Server Side Error Code: ${error.status}\n Message: ${error.message}`;
      console.log(errorMessage);
    }
    return throwError(error);
  }
}

