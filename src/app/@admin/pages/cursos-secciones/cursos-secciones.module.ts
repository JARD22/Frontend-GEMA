import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosSeccionesRoutingModule } from './cursos-secciones-routing.module';
import { CursosSeccionesComponent } from './cursos-secciones.component';


@NgModule({
  declarations: [CursosSeccionesComponent],
  imports: [
    CommonModule,
    CursosSeccionesRoutingModule
  ]
})
export class CursosSeccionesModule { }
