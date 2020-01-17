import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {createCustomElement} from '@angular/elements';
import {FilterComponent} from './components/filter/filter.component';
import {MaterialModule} from './material/material.module';
import {ModalComponent} from './components/modal/modal.component';
import {DataservicesService} from './services/dataservices.service';

@NgModule({
  declarations: [
    FilterComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [DataservicesService],
  bootstrap: [],
  entryComponents: [
    FilterComponent,
    ModalComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const ngElement = createCustomElement(FilterComponent, {
      injector: this.injector
    });
    customElements.define('epm-crm-search', ngElement);
  }


}
