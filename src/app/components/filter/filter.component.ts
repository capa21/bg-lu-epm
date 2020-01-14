import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '../modal/modal.component';
import { DataservicesService} from '../../../app/services/dataservices.service';
import { DataOperator} from './dataOperator';
import { EntryData } from 'src/app/model/entryData';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  form: FormGroup;
  dataOperator: DataOperator;
  response: '';
  placeHolderInput = '';
  dataTable: object[] = [];
  fieldsName: string[] = [];

  @Input() filter: any;
  entryData: EntryData;

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private dataservice: DataservicesService) {
    this.dataOperator = new DataOperator();
    this.buildForm();
  }

  ngOnInit() {
    this.entryData = JSON.parse(this.filter);
    console.log(this.entryData.url);
    console.log(this.entryData.headers);
    console.log(this.entryData.body);
    console.log('Ten fe. Sí es !!!');
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      searchValue: [''],
      callServiceSuccessField: [true]
    });
  }

  get searchValueField() {
    return this.form.get('searchValue');
  }

  callService(): void {
    this.dataservice.getData(this.entryData)
    .subscribe (
      result => {
        if (result.Error == null) {
          this.prepareDataTable(result.Respuesta);
          this.openDialog();
        } else {
          this.changePlaceHolderInput('Error al consultar el servicio');
        }
      },
      error => {
        this.changePlaceHolderInput('Error al consultar el servicio');
      }
    );
  }

  prepareDataTable(respuesta: any) {
    const preparateData = this.dataOperator.prepareDataTable(respuesta);
    this.dataTable = preparateData.dataTable;
    this.fieldsName = preparateData.fieldsName;
  }

  private changePlaceHolderInput(value: string) {
    this.placeHolderInput = value;
  }

  openDialog(): void {
    console.log('openDialog');
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
      data: {filter: this.searchValueField.value, dataTable: this.dataTable, fieldsName: this.fieldsName, response: this.response},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.response = result;
      console.log('información de retorno:', this.response);
    });
  }


}
