import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClausulasContratoRoutingModule } from './clausulas-contrato-routing.module';
import { ClausulasContratoComponent } from './clausulas-contrato.component';


@NgModule({
  declarations: [ClausulasContratoComponent],
  imports: [
    CommonModule,
    ClausulasContratoRoutingModule
  ]
})
export class ClausulasContratoModule { }
