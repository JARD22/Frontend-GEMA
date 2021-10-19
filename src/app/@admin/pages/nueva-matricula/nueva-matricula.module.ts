import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevaMatriculaRoutingModule } from './nueva-matricula-routing.module';
import { NuevaMatriculaComponent } from './nueva-matricula.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [NuevaMatriculaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NuevaMatriculaRoutingModule
  ]
})
export class NuevaMatriculaModule { }
