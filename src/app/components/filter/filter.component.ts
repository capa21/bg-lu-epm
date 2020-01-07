import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '../modal/modal.component';
import { DataservicesService} from '../../../app/services/dataservices.service';
import { DataOperator} from './dataOperator';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  form: FormGroup;
  dataOperator: DataOperator;
  response: '';
  callServiceSuccessField = true;
  placeHolderInput = '';

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private dataservice: DataservicesService) {
                this.buildForm();
               }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      searchValue: ['', [Validators.required]],
      callServiceSuccessField: [true]
    });
  }

  get searchValueField() {
    return this.form.get('searchValue');
  }

  callService(): void {
    this.dataservice.getData()
    .subscribe (
      result => {
        console.log('respuesta', result);
        console.log(result.Error);
        result.Respuesta.forEach(item => {
          console.log(item.Attributes);
        });
        this.openDialog();
      },
      error => {
        this.changePlaceHolderInput('Error al consultar el servicio');
      }
    );
  }
  private changePlaceHolderInput(value: string) {
    this.placeHolderInput = value;
  }

  openDialog(): void {
    console.log('openDialog');
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
      data: {name: 'Jesús', response: this.response}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.response = result;
      console.log('información de retorno:', this.response);
    });
  }


}
