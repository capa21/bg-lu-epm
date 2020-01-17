import {ApplicationRef, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

import {ModalComponent} from '../modal/modal.component';
import {DataservicesService} from '../../../app/services/dataservices.service';
import {DataOperator} from './dataOperator';
import {NgElementsBase} from 'src/app/utils/ng-elements.base';
import {EmmitComponentLoad} from 'src/app/decorators/component-load.decorator';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent extends NgElementsBase implements OnInit {

  form: FormGroup;
  dataOperator: DataOperator;
  response: '';
  placeHolderInput = '';
  dataTable: object[] = [];
  fieldsName: string[] = [];
  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private dataservice: DataservicesService,
              app: ApplicationRef, el: ElementRef) {
    super(app, el);
    this.state = {
      entryData: null,
      inputValue: null,
      inputRefferenceName: null
    };
    this.dataOperator = new DataOperator();
    this.buildForm();
  }

  @EmmitComponentLoad
  ngOnInit() {
    this.form.get('searchValue').valueChanges.subscribe((newValue) => {
      this.setState({inputValue: newValue});
      this.emitEvent('input-change', newValue);
    });
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
    this.changePlaceHolderInput('Cargando...');
    this.dataservice.getData(this.state.entryData)
    .subscribe (
      result => {
        if (result.Error == null) {
          this.prepareDataTable(result.Respuesta);
          this.openDialog();
        } else {
          this.changePlaceHolderInput('Error al consultar servicio');
        }
      },
      error => {
        this.changePlaceHolderInput('Error al consultar servicio');
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
      this.form.get('searchValue').setValue(result[this.state.inputRefferenceName]);
      this.response = result;
      this.emitEvent('select-record', this.response);
    });
  }


}
