import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColegiosRoutingModule } from './colegios-routing.module';
import { ColegiosComponent } from './colegios.component';


@NgModule({
  declarations: [ColegiosComponent],
  imports: [
    CommonModule,
    ColegiosRoutingModule
  ]
})
export class ColegiosModule { }
