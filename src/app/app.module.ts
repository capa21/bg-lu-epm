import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { MaterialModule } from './material/material.module';
import { ModalComponent } from './components/modal/modal.component';
import { DataservicesService } from './services/dataservices.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [DataservicesService],
  bootstrap: [],
  entryComponents: [
    AppComponent,
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
    customElements.define('bg-epm', ngElement);
  }



}
