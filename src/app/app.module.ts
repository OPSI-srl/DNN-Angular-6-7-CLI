import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Context } from '../service/context.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../Http/interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [    
    Context,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
