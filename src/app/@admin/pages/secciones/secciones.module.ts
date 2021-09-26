import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionesRoutingModule } from './secciones-routing.module';
import { SeccionesComponent } from './secciones.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SeccionesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SeccionesRoutingModule
  ]
})
export class SeccionesModule { }
