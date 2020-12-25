import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Constants } from '../constants';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(Constants.apiRoot)){
      return from(
        this.authService.getAccessToken()
        .then(token => {
          let contentType = 'application/json';
          if (req.headers.has('Content-Type')) {
                contentType = req.headers.get('Content-Type');
          }

          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
                                           .set('Content-Type', contentType);
          const authRequest = req.clone({ headers });
          return next.handle(authRequest)
          .pipe(
            catchError((err: HttpErrorResponse) => {
              if (err && (err.status === 401 || err.status === 403)){
                this.router.navigate(['/unauthorized']);
              }
              throw new Error('error in a request ' + err.status);
            })
          ).toPromise();
        })
      );
    }
    else {
      return next.handle(req);
    }
  }
}
