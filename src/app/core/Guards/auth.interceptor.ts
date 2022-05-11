import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + localStorage.getItem('jwt'),
                'Content-Type': 'application/json',
                'No-Auth': 'True',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',
                'Cross-Origin': 'true',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            }
        });
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log(error.error);
                    //Toast
                    this.toastr.error(error.error['errorMessage'], "Error Interceptor");
                    return throwError(error.error);
                })
            );
    }
}