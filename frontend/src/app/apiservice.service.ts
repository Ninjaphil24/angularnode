import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

    // connect frontend to backend
    apiUrl = 'http://localhost:3000/user/'

    // get all data
    getAllData():Observable<any>
    {
      return this._http.get(`${this.apiUrl}`);
    }

    // create data
    createData(data:any):Observable<any>
    {
      console.log(data,'createapi=>')
      return this._http.post(`${this.apiUrl}`,data);
    }
    
}
