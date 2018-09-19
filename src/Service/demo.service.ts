import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Context } from './DNN/context.service';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  private _routingWebAPI: string;

  constructor(private context: Context, private http: HttpClient) {
    //this._routingWebAPI = "/DesktopModules/Rainbow_Staging/API/"
    this._routingWebAPI = this.context._properties.routingWebAPI;
    //console.log('TCL: DemoService -> constructor -> this.context._properties.routingWebAPI', this.context._properties.routingWebAPI);
    //console.log('TCL: DemoService -> constructor -> this._routingWebAPI', this._routingWebAPI);
  }

  public getStagingOutputList(): Observable<any> {
    let webAPIName = "DataOutput/list";
    let getUrl = this._routingWebAPI + webAPIName;
    // console.log('​---------------------------------');
    // console.log('​StagingService -> getUrl', getUrl);
    // console.log('​---------------------------------');
    return this.http.get<any>(getUrl)
  }
}
