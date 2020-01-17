import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntryData } from '../model/entryData';

const contentType = 'application/json';
const ocpApimSubscriptionKey = '30462a9d27c6451e82eab03dcc422ca9';
const xSessionId = 'b4e29345-0816-ea11-93d1-000d3a1fd324';

interface Respuesta {
  LogicalName: string;
  Id: string;
  Attributes: {};
}

interface DataType {
  Respuesta: Respuesta[];
  Error: {};
}

@Injectable({
  providedIn: 'root'
})
export class DataservicesService {

  constructor(private http: HttpClient) { }

  getData(entryData: EntryData): Observable<DataType> {
    const url = entryData.url;
    const body = entryData.body;
    const httpOptions = {
      headers: new HttpHeaders(entryData.headers)
    };

    return this.http.post<DataType>(url, body, httpOptions);
  }


}
