import { ContextInfo } from '../service/context-info';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { Context } from "../service/context.service";
import { HttpHeaders } from '@angular/common/http';
import { take, mergeMap } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private context: Context) { 
      context.autoConfigure();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.context.all$.pipe(take(10)).pipe(mergeMap(ctx => {
                 
        const newReq = req.clone({
          setHeaders: {
            ModuleId: this.context._moduleId.toString(),
            TabId: ctx.tabId.toString(),
            RequestVerificationToken: ctx.antiForgeryToken,
            'X-Debugging-Hint': 'bootstrapped by bbAngular and 2SXC',
          }
        });

        return next.handle(newReq);
      }));
  }
}