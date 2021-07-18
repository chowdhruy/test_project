import {Injectable, Injector} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    console.log('401 You are not authorized!!');
                    // redirect to the login route
                    window.location.href = '/login';
                }
            }
        });
    }
}
