import { Component, OnInit, ApplicationRef, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '../modal/modal.component';
import { DataservicesService} from '../../../app/services/dataservices.service';
import { DataOperator} from './dataOperator';
import { EntryData } from '../../model/entryData';
import { NgElementsBase } from 'src/app/utils/ng-elements.base';
import { EmmitComponentLoad } from 'src/app/decorators/component-load.decorator';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends NgElementsBase implements OnInit {

  form: FormGroup;
  dataOperator: DataOperator;
  response: '';
  placeHolderInput = '';
  dataTable: object[] = [];
  fieldsName: string[] = [];
  entryData: EntryData;
  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private dataservice: DataservicesService,
              app: ApplicationRef, el: ElementRef) {
    super(app, el);
    this.state = {
      entryData: this.entryData
    };
    this.dataOperator = new DataOperator();
    this.buildForm();
  }

  @EmmitComponentLoad
  ngOnInit() {
    console.log('FilterComponent ngOnInit executed');
    console.log('Sí toma modificación');
  }

  buildForm() {
    this.form = this.formBuilder.group({
      searchValue: [''],
      callServiceSuccessField: [true]
    });
  }

  get searchValueField() {
    return this.form.get('searchValue');
  }

  callService(): void {
    this.dataservice.getData(this.state.entryData)
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

  changePlaceHolderInput(value: string) {
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
