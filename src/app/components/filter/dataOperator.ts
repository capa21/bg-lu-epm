import { DataservicesService} from '../../../app/services/dataservices.service';

export class DataOperator  {

  dataTable: object[] = [];
  fieldsName: string[] = [];
  numberAtributtesFields: number[] = [];

  constructor(private dataservice: DataservicesService) {}

  callServiceSuccess(): boolean {
    this.dataservice.getData()
    .subscribe(result => {
      console.log('respuesta', result);
      console.log(result.Error);
      result.Respuesta.forEach(item => {
        console.log(item.Attributes);
      });
    });
    return true;
  }


}
