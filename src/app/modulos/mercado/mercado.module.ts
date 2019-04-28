import { MercadoComponent } from './mercado.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercadoRoutingModule } from './mercado-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ChartModule } from 'angular2-chartjs';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { MercadoService } from '../../services/mercadoService';

@NgModule({
  imports: [
    CommonModule,
    MercadoRoutingModule,
    SharedModule,
    ChartModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    SimpleNotificationsModule.forRoot()

  ],
  providers: [MercadoService],
  declarations: [MercadoComponent],
  bootstrap: [MercadoComponent]
})
export class MercadoModule { }
