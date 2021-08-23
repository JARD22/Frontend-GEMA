import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarAlumnoRoutingModule } from './editar-alumno-routing.module';
import { EditarAlumnoComponent } from './editar-alumno.component';


@NgModule({
  declarations: [EditarAlumnoComponent],
  imports: [
    CommonModule,
    EditarAlumnoRoutingModule
  ]
})
export class EditarAlumnoModule { }
