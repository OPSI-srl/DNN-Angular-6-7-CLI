import { Component } from '@angular/core';
import { DemoService } from '../Service/demo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Context } from '../Service/DNN/context.service';
import { take, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'template Angular for DNN7-DNN8-DNN9';
  webapiResult = '';

  constructor(public context: Context, private _demoService: DemoService) {
    context.autoConfigure();
  }

  private getDataFromWebAPI() {
    this._demoService.getStagingOutputList().subscribe(data => {
      this.webapiResult = data;
      console.log('​---------------------------------');
      console.log('Call webapi data -> data: ', data);
      console.log('​---------------------------------');
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('​---------------------------------');
          console.log('Call webapi error -> ERROR: ', err.error);
          console.log('​---------------------------------');
        } else {
          console.log('​---------------------------------');
          console.log('Call webapi error -> ERROR: ', err.error);
          console.log('​---------------------------------');
        }
      }
    );
  }

  log(par: any): string{
    return JSON.stringify(par).toString();
  }
}

