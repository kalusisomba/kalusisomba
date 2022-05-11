import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddSearchKeywordResponse, AddSearchKeyword } from '../models/addSearchKeyword';

@Injectable({
  providedIn: 'root'
})
export class AddSearchKeywordService {

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

  constructor(private httpClient: HttpClient) { }

  getAddSearchKeywords(): Observable<AddSearchKeywordResponse> {

    if (localStorage.getItem('jwt') != null) {
      console.warn(`Token from localstorage`, localStorage.getItem('jwt'));
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'No-Auth': 'True',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      });
    }

    return this.httpClient.get<AddSearchKeywordResponse>(this.apiURL + '/addSearchKeyword', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      })
    });  
  }

  getAddSearchKeyword(id): Observable<AddSearchKeywordResponse> {
    return this.httpClient.get<AddSearchKeywordResponse>(this.apiURL + '/addSearchKeyword/' + id);
  }

  createAddSearchKeyword(addSearchKeyword): Observable<AddSearchKeyword> {
    return this.httpClient.post<AddSearchKeyword>(this.apiURL + '/addSearchKeyword/', JSON.stringify(addSearchKeyword), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateAddSearchKeyword(id, addSearchKeyword): Observable<AddSearchKeyword> {
    return this.httpClient.put<AddSearchKeyword>(this.apiURL + '/addSearchKeyword/' + id, JSON.stringify(addSearchKeyword), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteAddSearchKeyword(id) {
    return this.httpClient.delete<AddSearchKeywordResponse>(this.apiURL + '/addSearchKeyword/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      console.log('Client Side Error',errorMessage);
    } else {
      errorMessage = `Server Side Error Code: ${error.status}\n Message: ${error.message}`;
      console.log(errorMessage);
    }
    return throwError(console.log(errorMessage));
  }
}
