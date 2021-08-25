import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';


@NgModule({
  declarations: [ReportesComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    ChartsModule  
  ]
})
export class ReportesModule { }
