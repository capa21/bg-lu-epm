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
                this.dataOperator = new DataOperator(dataservice);
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
    if (this.dataOperator.callServiceSuccess()) {
      this.openDialog();
    } else {
      this.changePlaceHolderInput('Error al consultar el servicio');
    }
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
