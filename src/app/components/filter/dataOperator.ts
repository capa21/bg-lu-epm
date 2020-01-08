export class DataOperator  {

  dataTable: object[] = [];
  fieldsName: string[] = [];
  numberAtributtesFields: number[] = [];

  constructor() {}

  prepareDataTable(respuesta: any) {
    const attributes: any[] = [];
    // tslint:disable-next-line: no-shadowed-variable
    respuesta.forEach((element: { Attributes: any; }) => {
        attributes.push(element.Attributes);
    });

    attributes.forEach(element => {
      this.numberAtributtesFields.push(Object.keys(element).length);
      const fieldsName = Object.keys(element);
      const atribute = {};
      fieldsName.forEach(item => {
        // tslint:disable-next-line: no-eval
        atribute[item] = eval(`element.${item}.Value`);
      });
      this.dataTable.push(atribute);
    });
    this.fieldsName = this.getFieldsName(attributes);

    return {
      dataTable: this.dataTable,
      fieldsName: this.fieldsName
    };
  }

  private getFieldsName(attributes: any[]): string[] {
    let indexMayor = 0;
    let elementoMayor = this.numberAtributtesFields[0];
    for (let index = 1; index < this.numberAtributtesFields.length; index++) {
      if (this.numberAtributtesFields[index] > elementoMayor) {
        elementoMayor = this.numberAtributtesFields[index];
        indexMayor = index;
      }
    }
    return Object.keys(attributes[indexMayor]);
  }
}
