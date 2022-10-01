import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = this.oktaAuth.getAccessToken()
        console.log(token)

        if (token != undefined) {
            const req1 = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`),
            });

            return next.handle(req1);
        }
        else {
            return next.handle(req);
        }
    }

}