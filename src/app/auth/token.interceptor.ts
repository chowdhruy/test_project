import {Injectable, Injector} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public inj: Injector) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const auth = this.inj.get(AuthService);
        const apiUrl = environment.apiUrl;

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${auth.getToken()}`
            }
        });

        request = request.clone({
            url: `${apiUrl}/${request.url}`
        });

        return next.handle(request);
    }
}
