import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevoUsuarioRoutingModule } from './nuevo-usuario-routing.module';
import { NuevoUsuarioComponent } from './nuevo-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NuevoUsuarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NuevoUsuarioRoutingModule
  ]
})
export class NuevoUsuarioModule { }
