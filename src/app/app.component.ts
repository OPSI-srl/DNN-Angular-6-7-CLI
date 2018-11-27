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
  title = 'template-DNN7-DNN8-DNN9';

  constructor(public context: Context, private _demoService: DemoService) {
    this.getDataFromWebAPI();
    
  }

  private getDataFromWebAPI() {
    this._demoService.getStagingOutputList().subscribe(data => {
      var obj = JSON.parse(data, function (key, value) {
        //PARSE HERE SPECIAL DATA
        if (key == "message") {
          // return new Date(value);
        } else {
          //return value;
        }
        return (value == null && typeof (value) == 'string' ? '-' : value);
      });
      console.log('​---------------------------------');
      console.log('TCL: AppComponent -> privategetDataFromWebAPI -> obj', obj);
      console.log('​---------------------------------');
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('​---------------------------------');
          console.log('TCL: AppComponent -> privategetDataFromWebAPI -> ERROR', err.error);
          console.log('​---------------------------------');

        } else {

        }
      }
    );
  }

  log(par: any): string{
    return JSON.stringify(par).toString();
  }
}

