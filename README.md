# Angular CLI Template for DNN 7.x, 8.x, 9.x.
This project was generted with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

# Description
To handle an Angular 6 project with DNN you need 2 different project:
1. Angular CLI project **(this project)**
2. DNN module that host your angular 


# Issues resolved with DNN 7.x and Angular 6
1. How to develop your Angular CLI (Tested for Angular CLI: 6.1.2) and deploy inside DNN 7.x.
2. How to pass information from DNN to Angular
3. Angulare 6 is too fast to load information than DNN. You need to make all information available to DNN in the correct format.
4. How to use DNN webapi and angular

# Features
### Example to read info from .ascx
**File**: /Service/DNN/context.service.ts
MODULE = 'AngularTEMPLATE'; **Remember to rename this constant as you write it in .ascx file.** 

### Example how to insert in HTTP ModuleId moduleid, TabId and RequestVerificationToken
**File**: /Http/interceptor.ts

### Example how to use DNN and webAPI
**file**: /Service/demo.service.ts
-  Automatic Routing with Angular app

```html 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // important - this changed in Angular 4.3 
  ],
  providers: [    
    Context,
    {                               // important for http interceptor
      provide: HTTP_INTERCEPTORS,   // important for http interceptor
      useClass: Interceptor,        // important for http interceptor
      multi: true                   // important for http interceptor
    },                              // important for http interceptor
    DemoService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
