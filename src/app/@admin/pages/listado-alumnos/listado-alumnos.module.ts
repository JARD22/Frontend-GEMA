import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoAlumnosRoutingModule } from './listado-alumnos-routing.module';
import { ListadoAlumnosComponent } from './listado-alumnos.component';


@NgModule({
  declarations: [ListadoAlumnosComponent],
  imports: [
    CommonModule,
    ListadoAlumnosRoutingModule
  ]
})
export class ListadoAlumnosModule { }
