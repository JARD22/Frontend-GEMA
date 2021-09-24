import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosSeccionesRoutingModule } from './cursos-secciones-routing.module';
import { CursosSeccionesComponent } from './cursos-secciones.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CursosSeccionesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CursosSeccionesRoutingModule
  ]
})
export class CursosSeccionesModule { }
