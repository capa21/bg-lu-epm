import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const contentType = 'application/json';
const ocpApimSubscriptionKey = '30462a9d27c6451e82eab03dcc422ca9';
const xSessionId = 'b4e29345-0816-ea11-93d1-000d3a1fd324';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  contentType,
    'Ocp-Apim-Subscription-Key': ocpApimSubscriptionKey,
    'X-SessionId': xSessionId
  })
};

const body = {
  Instancia: 'ConectorCrm_MatrizDllo',
  // tslint:disable-next-line: max-line-length
  FetchXml: '<fetch version=\'1.0\' output-format=\'xml-platform\' mapping=\'logical\' distinct=\'false\'><entity name=\'contact\'><attribute name=\'fullname\' /><attribute name=\'epm_clidentificationnumber\' /><attribute name=\'contactid\' /><filter type=\'and\'><condition attribute=\'fullname\' operator=\'like\' value=\'%1%\' /></filter></entity></fetch>'
};

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

  url = 'https://epmapimdes.azure-api.net/ConectorCrm/api/Consultar';

  getData(): Observable<DataType> {
    return this.http.post<DataType>(this.url, body, httpOptions);
  }


}
