import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevaMatriculaRoutingModule } from './nueva-matricula-routing.module';
import { NuevaMatriculaComponent } from './nueva-matricula.component';


@NgModule({
  declarations: [NuevaMatriculaComponent],
  imports: [
    CommonModule,
    NuevaMatriculaRoutingModule
  ]
})
export class NuevaMatriculaModule { }
