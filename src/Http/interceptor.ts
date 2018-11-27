import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { Context } from "../Service/DNN/context.service";
import { take, mergeMap } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private context: Context) { 
    context.autoConfigure();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.context.all$.pipe(take(10)).pipe(mergeMap(ctx => {
      console.log('TCL: Interceptor -> ctx.antiForgeryToken -------------->', ctx.antiForgeryToken);
      const newReq = req.clone({
          setHeaders: {
            ModuleId: this.context._moduleId.toString(),
            TabId: ctx.tabId.toString(),
            RequestVerificationToken: ctx.antiForgeryToken,
            userid: this.context._userId,
            'X-Debugging-Hint': 'bootstrapped by bbAngular, 2SXC, OPSI',
          }
        });

        return next.handle(newReq);
      }));
  }
}