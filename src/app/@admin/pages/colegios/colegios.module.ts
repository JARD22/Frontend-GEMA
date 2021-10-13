import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColegiosRoutingModule } from './colegios-routing.module';
import { ColegiosComponent } from './colegios.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ColegiosComponent],
  imports: [
    CommonModule,
    ColegiosRoutingModule,
    ReactiveFormsModule
  ]
})
export class ColegiosModule { }
