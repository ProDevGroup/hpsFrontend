import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, of, from, throwError } from "rxjs";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    token: any;

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

             this.token= localStorage.getItem(environment.TOKEN_NAME);


        //var token = localStorage.getItem("TIP_APP_TOEKN");
        if (this.token) {
            const newRequest = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + this.token)
            });
            return next.handle(newRequest)
            .pipe(catchError(err => {
                // onError
                console.log(err);
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401 && err.error.code === '013') {
                        window.location.href = "/login";
                    }
                }
                return throwError(err);
            })) as any;
        }
        else {

            return next.handle(request);
        }
    }

};



